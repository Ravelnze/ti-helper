import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ValueLabel(props) {
    return (
        <Row className="mx-1 mt-2">
            <Col>
                <h5>{props.label}</h5>
            </Col>
            <Col>
                <h5 className="text-end">{props.value}</h5>
            </Col>
        </Row>
    );
}

export default ValueLabel;