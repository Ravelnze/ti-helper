import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FactionList from "./FactionList";
import DividerText from "./DividerText";
import TechnologyCardGroup from "./TechnologyCardGroup";
import UnitList from "./UnitList";
import ValueLabel from "./ValueLabel";
import { useStore } from "../store/Store";
import { setPok } from "../store/Actions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { GetAbilitiesForPhase } from "../lib/Faction";

function NewGame() {
    const [state, dispatch] = useStore();
    const history = useHistory();
    const abilities = GetAbilitiesForPhase(state.faction?.abilities, "Setup");

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
            <Row>
                <Col className="mb-2">
                    <Form.Check
                        type="checkbox"
                        style={{ fontSize: "1.2rem" }}
                        label="Prophecy of Kings"
                        checked={state.pok}
                        onChange={() => dispatch(setPok(!state.pok))}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FactionList />
                </Col>
            </Row>
            <Row>
                <Col className="ps-4">
                    {abilities.length > 0
                        ? abilities.map((a, i) => (<li key={i} className="text-light">{a.description}</li>))
                        : null}
                </Col>
            </Row>
            <Row style={{ paddingLeft: "4px" }}>
                <Col>
                    {state.faction ? (
                        <>
                            <DividerText title="Starting Units" />
                            <UnitList units={state.faction.units} />
                        </>
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    {state.technologies?.length > 0 ? (
                        <>
                            <DividerText title="Starting Tech" />
                            <TechnologyCardGroup
                                technologies={state.technologies}
                            />
                        </>
                    ) : null}
                </Col>
            </Row>
            {state.faction ? (
                <ValueLabel
                    label="Commodities"
                    value={state.faction?.commodities}
                />
            ) : null}
            <Row className="mt-2">
                <Col>
                    {state.faction ? (
                        <Link to="/game" className="float-end">
                            <Button variant="light">Start Game</Button>
                        </Link>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
}

export default NewGame;
