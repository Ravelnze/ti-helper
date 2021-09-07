import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DividerText from "./DividerText";
import { CloseButton, Container } from "react-bootstrap";
import ValueLabel from "./ValueLabel";

import { categories } from "../lib/Tech";
import { useHistory } from "react-router-dom";
import { useStore } from "../store/Store";
import {setFaction, setTech} from '../store/Actions';

function Overview(props) {
    const [state, dispatch] = useStore();
    const history = useHistory();
    
    const handleClose = () => {
        // TODO: this should show an alert
        dispatch(setFaction(null));
        dispatch(setTech(null));
        history.replace(".");
    }

    return (
        <Container>
            <Row>
                <Col>
                    <CloseButton
                        variant="white"
                        onClick={handleClose}
                        className="mt-3"
                    />
                </Col>
                <Col>
                    <DividerText title="Overview" />
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <DividerText title="Technology" />
                </Col>
            </Row>
            {categories.map((cat, i) => (
                <ValueLabel
                    key={i}
                    label={cat}
                    value={
                        state.technologies.filter((t) => t.cat == cat).length
                    }
                />
            ))}
            <Row>
                <Col>
                    <DividerText title="Planets" />
                </Col>
            </Row>
            {/* Total Action Cards */}
            <ValueLabel label="Total Resources" value={0} />
            <ValueLabel label="Total Influence" value={0} />
        </Container>
    );
}

export default Overview;
