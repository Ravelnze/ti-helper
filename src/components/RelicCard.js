import { useStore } from "../store/Store";
import { exhaustRelic, removeRelic } from "../store/Actions";
import RemoveButton from "./RemoveButton";
import Card from "react-bootstrap/Card";
import { GetRelicVariantColour } from "../lib/Relic";
import {
    AttachmentCardType,
    AugmentPlanet,
} from "../lib/Planet";
import {
    setPlanet,
} from "../store/Actions";
import PlanetAttachment from "./PlanetAttachment";

function RelicCard(props) {
    const [state, dispatch] = useStore();
    const variant = GetRelicVariantColour(props.relic.category);
    const textClass = props.relic.isExhausted ? "text-dark" : variant.text;

    return (
        <Card bg={props.relic.isExhausted ? "light" : variant.colour}>
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        if (props.relic.attachedPlanet) {
                            dispatch(
                                setPlanet(
                                    AugmentPlanet(
                                        props.relic,
                                        AttachmentCardType.Relic,
                                        props.relic.attachedPlanet,
                                        false
                                    )
                                )
                            );
                        }
                        dispatch(removeRelic(props.relic));
                    }}
                />
            ) : null}
            <Card.Header className={`text-center ${textClass}`}>
                {props.relic.title}
            </Card.Header>
            <Card.Body
                onClick={() => {
                    if (props.interactable && props.relic.canExhaust) {
                        dispatch(
                            exhaustRelic(props.relic, !props.relic.isExhausted)
                        );
                    }
                }}
                className="py-2 d-flex flex-column"
                style={{ minWidth: "220px", minHeight: "120px" }}
            >
                {props.relic.description.split("\r\n").map((s, i) => (
                    <Card.Text
                        key={i}
                        className={`${textClass} flex-grow-1`}
                        style={{ fontSize: "0.8rem" }}
                    >
                        {s}
                    </Card.Text>
                ))}
                {props.count > 1 ? (
                    <Card.Text
                        className={`${textClass} text-center`}
                        style={{ fontSize: "0.8rem" }}
                    >
                        x{props.count}
                    </Card.Text>
                ) : null}
            </Card.Body>
            <PlanetAttachment 
                interactable={props.interactable} 
                cardType={AttachmentCardType.Relic} 
                card={props.relic} 
                planets={state.planets.filter(
                    (p) => !p.legendaryAbility && !p.homeFactionId
                )}
                variant
            />
        </Card>
    );
}

export default RelicCard;
