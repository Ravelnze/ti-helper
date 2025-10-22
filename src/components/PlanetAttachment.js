import { useState } from "react";
import { AttachmentCardType, AugmentPlanet, GetPlanetVariantColour } from "../lib/Planet";
import { setAttachedPlanetExploration, setAttachedPlanetRelic, setPlanet } from "../store/Actions";
import { Badge, Card } from "react-bootstrap";
import AutoSuggestionInput from "./AutoSuggestionInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store/Store";

function PlanetAttachment(props) {
    const [state, dispatch] = useStore();
    const [planetList, setPlanetList] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState({});

    return (
        props.card.attach ? (
            <Card.Footer className="text-center">
                <a
                    className={`${props.variant.text === "white"
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
                                            props.cardType,
                                            props.card.attachedPlanet,
                                            false
                                        )
                                    )
                                );
                                switch (props.cardType) {
                                    case AttachmentCardType.Exploration:
                                        dispatch(setAttachedPlanetExploration(props.card, null));
                                        break;
                                    case AttachmentCardType.Relic:
                                        dispatch(
                                            setAttachedPlanetRelic(props.card, null)
                                        );
                                    default:
                                        break;
                                }
                            }
                            setPlanetList(props.planets);
                        }
                    }}
                >
                    {props.card.attachedPlanet ? (
                        <Badge
                            bg={GetPlanetVariantColour(selectedPlanet?.trait).colour}
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
                                switch (props.cardType) {
                                    case AttachmentCardType.Exploration:
                                        dispatch(setAttachedPlanetExploration(props.card, planet));
                                        break;
                                    case AttachmentCardType.Relic:
                                        dispatch(
                                            setAttachedPlanetRelic(props.card, planet)
                                        );
                                    default:
                                        break;
                                }
                                dispatch(
                                    setPlanet(
                                        AugmentPlanet(
                                            props.card,
                                            props.cardType,
                                            planet,
                                            true
                                        )
                                    )
                                );
                                setPlanetList([]);
                                setSelectedPlanet(item);
                            }}
                            placeholder={`Choose${props.cardType == AttachmentCardType.Exploration ? ' ' + props.card.trait : ''} planet`}
                        />
                    ) : (
                        <>
                            <span>
                                <FontAwesomeIcon
                                    size="lg"
                                    icon={faEdit}
                                    color="rgba(255, 255, 255, 0.8)"
                                />
                            </span>
                            {`${' '}Choose${props.cardType == AttachmentCardType.Exploration ? ' ' + props.card.trait : ''} Planet`}
                        </>
                    )}
                </a>
            </Card.Footer>
        ) : null
    )
}

export default PlanetAttachment;