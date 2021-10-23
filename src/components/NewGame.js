import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DividerText from "./DividerText";
import { useStore } from "../store/Store";
import { setPok } from "../store/Actions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import FactionInfo from "./FactionInfo";

function NewGame() {
    const [state, dispatch] = useStore();
    const history = useHistory();

    useEffect(() => {
        if (state.gameStarted) {
            history.push("/game");
        }
    }, []);

    return (
        <Container className="mb-5">
            <Row>
                <Col>
                    <DividerText title="New Game" lg />
                </Col>
            </Row>

            {state.faction ? null : (
                <Row>
                    <Col className="mb-2">
                        <Form.Check
                            type="checkbox"
                            style={{ fontSize: "1.2rem" }}
                            label="Prophecy of Kings"
                            checked={state.pok}
                            onChange={() => dispatch(setPok(!state.pok))}
                            type="switch"
                        />
                    </Col>
                </Row>
            )}

            <FactionInfo
                faction={state.faction}
                technologies={state.technologies}
                isNewGame
                searchPlaceholder="Choose your faction..."
            />

            {state.faction ? (
                <Row className="mt-2">
                    <Col>
                        <Link to="/game">
                            <Button variant="success" className="w-100">
                                Start Game
                            </Button>
                        </Link>
                    </Col>
                </Row>
            ) : null}
        </Container>
    );
}

export default NewGame;
