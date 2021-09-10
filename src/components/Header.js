import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import DividerText from "./DividerText";

function Header(props) {
    return (
        <Row>
            <Col xs={2} />
            <Col>
                <DividerText title={props.title} />
            </Col>
            <Col xs={2}>
                
            </Col>
        </Row>
    );
}

export default Header;
