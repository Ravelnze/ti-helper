import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import DividerText from "./DividerText";

function Header(props) {
    let history = useHistory();

    return (
        <Row>
            <Col xs={2}>
                <CloseButton
                    className="mt-3"
                    aria-label="Back to overview"
                    variant="white"
                    onClick={() => history.push("/game")}
                />
            </Col>
            <Col>
                <DividerText title={props.title} />
            </Col>
            <Col xs={2} />
        </Row>
    );
}

export default Header;
