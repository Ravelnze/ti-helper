import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

function ValueLabel(props) {
    return (
        <Row className={props.sm ? "" : "mx-1 mt-2"}>
            <Col>
                {props.sm ? <p className="m-0">{props.label}</p> : <h5>{props.label}</h5>}
            </Col>
            <Col>
                {props.sm ? (
                    <p className="text-end m-0"><Badge pill bg={props.bg ?? "dark"} text={props.pillText}>{props.value}</Badge></p>
                ) : (
                    <h5 className="text-end"><Badge pill bg={props.bg ?? "dark"} text={props.pillText}>{props.value}</Badge></h5>
                )}
            </Col>
        </Row>
    );
}

export default ValueLabel;
