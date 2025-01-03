import Card from "react-bootstrap/Card";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";

import {
    AttachmentCardType,
    AugmentPlanet,
    GetPlanetVariantColour,
} from "../lib/Planet";
import {
    removeExplorationCard,
    setPlanet,
} from "../store/Actions";
import PlanetAttachment from "./PlanetAttachment";

function ExplorationCard(props) {
    const [state, dispatch] = useStore();
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
                                        AttachmentCardType.Exploration,
                                        props.card.attachedPlanet,
                                        false
                                    )
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
                {props.card.description.split("\r\n").map((s, i) => (
                    <Card.Text
                        key={i}
                        className={variant.text}
                        style={{ fontSize: "0.8rem" }}
                    >
                        {s}
                    </Card.Text>
                ))}
            </Card.Body>
            <PlanetAttachment
                interactable={props.interactable} 
                cardType={AttachmentCardType.Exploration} 
                card={props.card} 
                planets={state.planets.filter(
                    (p) => p.trait === props.card.trait
                )}
                variant={variant}
            />
        </Card>
    );
}

export default ExplorationCard;
