import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AutoSuggestionInput from "./AutoSuggestionInput";
import { Badge } from "react-bootstrap";

import { AugmentPlanet, GetPlanetVariantColour } from "../lib/Planet";
import {
    removeExplorationCard,
    setAttachedPlanet,
    setPlanet,
} from "../store/Actions";

function ExplorationCard(props) {
    const [state, dispatch] = useStore();
    const [planetList, setPlanetList] = useState([]);
    const variant = GetPlanetVariantColour(props.card.trait);

    return (
        <Card bg={variant.colour} text={variant.text}>
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        if (props.card.attachedPlanet) {
                            dispatch(
                                setPlanet(
                                    AugmentPlanet(
                                        props.card,
                                        props.card.attachedPlanet,
                                        false
                                    ),
                                    props.card
                                )
                            );
                        }
                        dispatch(removeExplorationCard(props.card));
                    }}
                />
            ) : null}
            <Card.Header className="text-center">
                {props.card.title}
            </Card.Header>
            <Card.Body className="pt-1" style={{ minWidth: "220px" }}>
                <Card.Text
                    className={variant.text}
                    style={{ fontSize: "0.8rem" }}
                >
                    {props.card.description}
                </Card.Text>
            </Card.Body>
            {props.card.attach ? (
                <Card.Footer className="text-center">
                    <a
                        className={`${
                            variant.text === "white"
                                ? "text-light"
                                : "text-dark"
                        } ${props.interactable ? "pointer" : ""}`}
                        onClick={() => {
                            if (props.interactable && planetList.length === 0) {
                                if (props.card.attachedPlanet) {
                                    dispatch(
                                        setPlanet(
                                            AugmentPlanet(
                                                props.card,
                                                props.card.attachedPlanet,
                                                false
                                            ),
                                            props.card
                                        )
                                    );
                                    dispatch(
                                        setAttachedPlanet(props.card, null)
                                    );
                                }
                                setPlanetList(
                                    state.planets.filter(
                                        (p) => p.trait === props.card.trait
                                    )
                                );
                            }
                        }}
                    >
                        {props.card.attachedPlanet ? (
                            <Badge
                                bg={variant.colour}
                                style={{ fontSize: "0.8rem" }}
                            >
                                {props.card.attachedPlanet.title}
                            </Badge>
                        ) : planetList.length > 0 ? (
                            <AutoSuggestionInput
                                items={planetList}
                                setValue={(item) => {
                                    const planet = state.planets.find(
                                        (p) => p.id === item.id
                                    );
                                    dispatch(
                                        setAttachedPlanet(props.card, planet)
                                    );
                                    dispatch(
                                        setPlanet(
                                            AugmentPlanet(
                                                props.card,
                                                planet,
                                                true
                                            ),
                                            props.card
                                        )
                                    );
                                    setPlanetList([]);
                                }}
                                placeholder={`Choose ${props.card.trait} planet`}
                            />
                        ) : (
                            <>
                                {`Choose ${props.card.trait} Planet `}
                                <span>
                                    <FontAwesomeIcon
                                        size="lg"
                                        icon={faEdit}
                                        color="rgba(255, 255, 255, 0.8)"
                                    />
                                </span>
                            </>
                        )}
                    </a>
                </Card.Footer>
            ) : null}
        </Card>
    );
}

export default ExplorationCard;
