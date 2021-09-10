import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import { GetObjectiveVariantColour } from "../lib/Objective";
import { useStore } from "../store/Store";
import GetLogoByKey from "../lib/Logos";
import { completeObjective, removeObjective } from "../store/Actions";
import RemoveButton from "./RemoveButton";

function ObjectiveCard(props) {
    const [state, dispatch] = useStore();
    const variant = GetObjectiveVariantColour(props.objective.cat);

    return (
        <Card
            style={{ cursor: "pointer" }}
            bg={variant.colour}
            text={variant.text}
            onClick={() =>
                dispatch(
                    completeObjective(
                        props.objective,
                        !props.objective.isComplete
                    )
                )
            }
        >
            <RemoveButton
                onClick={() => dispatch(removeObjective(props.objective))}
            />
            <Card.Header className="text-center">
                {props.objective.title}
            </Card.Header>
            <Card.Body style={{ minWidth: "250px", minHeight: "80px" }}>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                    {props.objective.condition}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col />
                    <Col className="text-center">
                        <Badge pill bg="dark" style={{ fontSize: "0.8rem" }}>
                            {props.objective.points}
                        </Badge>
                    </Col>
                    <Col>
                        {props.objective.isComplete ? (
                            <Image
                                className="float-end"
                                width="18px"
                                src={GetLogoByKey(state.faction.logo)}
                            />
                        ) : null}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
}

export default ObjectiveCard;
