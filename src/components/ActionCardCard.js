import Card from "react-bootstrap/Card";
import RemoveButton from "./RemoveButton";
import { useStore } from "../store/Store";
import { removeActionCard } from "../store/Actions";
import "./ActionCardCard.css";

function ActionCardCard(props) {
    const [state, dispatch] = useStore();

    return (
        <Card bg="danger">
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        if (props.interactable) {
                            dispatch(removeActionCard(props.card));
                        }
                    }}
                />
            ) : null}
            <Card.Header className="text-center text-light">
                <span className="float-start">x{props.count}</span>
                {props.card.title}
            </Card.Header>
            <Card.Body className="text-light pt-1">
                <Card.Text>{props.card.timing}</Card.Text>
                {props.card.effect.split("\r\n").map((s, i) => (
                    <Card.Text key={i}>{s}</Card.Text>
                ))}
            </Card.Body>
        </Card>
    );
}

export default ActionCardCard;
