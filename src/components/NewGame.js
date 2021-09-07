//#region imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import FactionList from "./FactionList";
import DividerText from "./DividerText";
import TechnologyCardGroup from "./TechnologyCardGroup";
import UnitList from "./UnitList";
import ValueLabel from "./ValueLabel";
import { useStore } from "../store/Store";
//#endregion

function NewGame() {
    const [state, dispatch] = useStore();

    return (
        <Container className="mb-5">
            <Row>
                <Col>
                    <DividerText title="New Game" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FactionList />
                </Col>
            </Row>
            {state.faction != null ? (
                <ValueLabel
                    label="Commodities"
                    value={state.faction.commodities}
                />
            ) : null}
            <Row>
                <Col>
                    {state.faction != null ? (
                        <>
                        <DividerText title="Starting Units" />
                        <UnitList units={state.faction.units} />
                        </>
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    {state.technologies.length > 0 ? (
                        <>
                            <DividerText title="Starting Tech" />
                            <TechnologyCardGroup
                                technologies={state.technologies}
                            />
                        </>
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    {state.faction != null ? (
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
