import { useStore } from "../store/Store";
import { removeRelic } from "../store/Actions";
import RemoveButton from "./RemoveButton";
import Card from "react-bootstrap/Card";
import { GetRelicVariantColour } from "../lib/Relic";

function RelicCard(props) {
    const [state, dispatch] = useStore();
    const variant = GetRelicVariantColour(props.relic.category);

    return (
        <Card bg={variant.colour}>
            {props.interactable ? (
                <RemoveButton
                    onClick={() => dispatch(removeRelic(props.relic))}
                />
            ) : null}
            <Card.Header className={`text-center ${variant.text}`}>
                {props.relic.title}
            </Card.Header>
            <Card.Body
                className="py-2 d-flex flex-column"
                style={{ minWidth: "220px", minHeight: "120px" }}
            >
                <Card.Text
                    className={`${variant.text} flex-grow-1`}
                    style={{ fontSize: "0.8rem" }}
                >
                    {props.relic.description}
                </Card.Text>
                {props.count > 1 ? (
                    <Card.Text
                        className={`${variant.text} text-center`}
                        style={{ fontSize: "0.8rem" }}
                    >
                        x{props.count}
                    </Card.Text>
                ) : null}
            </Card.Body>
        </Card>
    );
}

export default RelicCard;
