import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DividerText from "./DividerText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
    return (
        <Row>
            <Col xs={2}>
                {props.left}
            </Col>
            <Col>
                <DividerText title={props.title} sub={props.sub} lg />
            </Col>
            <Col xs={2}>
                {props.editModalVisible === false ? null : (
                    <a
                        className="float-end mt-3 pointer"
                        onClick={props.showEditModal}
                    >
                        <FontAwesomeIcon
                            size="lg"
                            icon={faEdit}
                            color="rgba(255, 255, 255, 0.8)"
                        />
                    </a>)
                }
            </Col>
        </Row>
    );
}

export default Header;
