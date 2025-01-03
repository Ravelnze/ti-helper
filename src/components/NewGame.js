import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useStore } from "../store/Store";
import { removeCodex, setCodex, setPok } from "../store/Actions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import FactionInfo from "./FactionInfo";
import { Codex } from "../lib/Codices";
import Header from "./Header";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import LinksContainer from "./LinksContainer";

function NewGame() {
    const [state, dispatch] = useStore();
    const history = useHistory();

    const NewGame = "Factions";
    const Links = "Links";

    useEffect(() => {
        if (state.gameStarted) {
            history.push("/game");
        }
        else {
            // This prevents the codices being turned on if the browser is refreshed once
            // the game is started... bug? misunderstanding? who knows but this works
            dispatch(setCodex(Codex.Ordinian));
            dispatch(setCodex(Codex.Affinity));
            dispatch(setCodex(Codex.Vigil));
        }
    }, []);

    return (
        <Container className="mb-5">
            <Header title="New Game" lg editModalVisible={false} sub={"Choose a faction and hit 'Start Game'"} />
            <Tabs
                variant="pills"
                defaultActiveKey={NewGame}
                id={NewGame}
                className="mt-2 justify-content-center sticky-top"
                style={{
                    backgroundColor: "rgba(33,37,41, 0.9)",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                }}>
                <Tab
                    key={NewGame}
                    eventKey={NewGame}
                    title={NewGame}
                    className="pt-2"
                >
                    {state.faction ? null :
                        (
                            <Accordion className="mb-2">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Change Ruleset</Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Check
                                                    type="switch"
                                                    style={{ fontSize: "1.2rem" }}
                                                    label="Prophecy of Kings"
                                                    checked={state.pok}
                                                    onChange={() => dispatch(setPok(!state.pok))}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Check
                                                    type="switch"
                                                    style={{ fontSize: "1.2rem" }}
                                                    label="Codex I - Ordinian"
                                                    checked={state.codex.includes(Codex.Ordinian)}
                                                    onChange={() => {
                                                        state.codex.includes(Codex.Ordinian) ? dispatch(removeCodex(Codex.Ordinian)) : dispatch(setCodex(Codex.Ordinian));
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Check
                                                    type="switch"
                                                    style={{ fontSize: "1.2rem" }}
                                                    label="Codex II - Affinity"
                                                    checked={state.codex.includes(Codex.Affinity)}
                                                    onChange={() => {
                                                        state.codex.includes(Codex.Affinity) ? dispatch(removeCodex(Codex.Affinity)) : dispatch(setCodex(Codex.Affinity));
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Check
                                                    type="switch"
                                                    style={{ fontSize: "1.2rem" }}
                                                    label="Codex III - Vigil"
                                                    checked={state.codex.includes(Codex.Vigil)}
                                                    onChange={() => {
                                                        state.codex.includes(Codex.Vigil) ? dispatch(removeCodex(Codex.Vigil)) : dispatch(setCodex(Codex.Vigil));
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    }

                    <FactionInfo
                        faction={state.faction}
                        technologies={state.technologies}
                        isNewGame
                        searchPlaceholder="Choose your faction..."
                    />

                    {
                        state.faction && (state.faction.chooseFaction ? state.keleresFactionChosen : true) ? (
                            <Row className="mt-2">
                                <Col>
                                    <Link to="/game">
                                        <Button variant="success" className="w-100">
                                            Start Game
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        ) : null
                    }
                </Tab>
                <Tab
                    key={Links}
                    eventKey={Links}
                    title={Links}
                    className="pt-2"
                >
                    <LinksContainer pok={state.pok} />
                </Tab>
            </Tabs>

        </Container >
    );
}

export default NewGame;
