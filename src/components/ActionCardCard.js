import Card from "react-bootstrap/Card";
import RemoveButton from "./RemoveButton";
import { useStore } from "../store/Store";
import { removeActionCard } from "../store/Actions";

function ActionCardCard(props) {
    const [state, dispatch] = useStore();
    return (
        <Card bg="danger">
            <RemoveButton
                onClick={() => {
                    dispatch(removeActionCard(props.card));
                }}
            />
            <Card.Header className="text-center">
                <span className="float-start">x{props.count}</span>
                {props.card.title}
            </Card.Header>
            <Card.Body style={{ minWidth: "200px", minHeight: "80px" }}>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                    {props.card.timing}
                </Card.Text>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                    {props.card.effect}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ActionCardCard;
