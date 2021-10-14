import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FactionList from "./FactionList";
import DividerText from "./DividerText";
import UnitList from "./UnitList";
import ValueLabel from "./ValueLabel";
import { useStore } from "../store/Store";
import { setFaction, setPok, setTech } from "../store/Actions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { GetSpecialUnitsAndLeaders } from "../lib/Faction";
import ScrollableCardList, { CardType } from "./ScrollableCardList";

import Technologies from "../data/technologies.json";
import PromissoryNotes from "../data/promissoryNotes.json";
import Planets from "../data/planets.json";

function NewGame() {
    const [state, dispatch] = useStore();
    const history = useHistory();
    const abilities = state.faction?.abilities;
    const factionTech = Technologies.filter(
        (t) => t.factionId && t.factionId === state.faction?.id
    );
    const specialUnits = state.faction
        ? GetSpecialUnitsAndLeaders(state.faction, state.pok)
        : null;
    const promissoryNotes = PromissoryNotes.filter(
        (p) => p.factionId && p.factionId === state.faction?.id
    );
    const planets = Planets.filter(
        (p) => p.homeFactionId && p.homeFactionId === state.faction?.id
    );
    const startingTech = state.technologies.filter(
        (t) => !t.replacedBy
    )

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
                        />
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    {state.faction ? (
                        <div
                            className="text-center pointer"
                            onClick={() => {
                                dispatch(setFaction(null));
                                dispatch(setTech([]));
                            }}
                        >
                            <h4 className="text-center mb-0">
                                {state.faction.title}
                            </h4>
                            <sub style={{ color: "gray", top: "-7px" }}>
                                tap to change
                            </sub>
                        </div>
                    ) : (
                        <FactionList />
                    )}
                </Col>
            </Row>

            {abilities?.length > 0 ? (
                <Row>
                    <Col className="ps-4">
                        {abilities.map((a, i) => (
                            <li key={i} className="text-light">
                                {a.description}
                            </li>
                        ))}
                    </Col>
                </Row>
            ) : null}

            {specialUnits ? (
                <Row>
                    <Col>
                        <ScrollableCardList
                            cardType={CardType.Unit}
                            cardList={specialUnits}
                            special
                        />
                    </Col>
                </Row>
            ) : null}

            {factionTech.length > 0 ? (
                <Row>
                    <Col>
                        <DividerText title="Faction Technologies" />
                        <ScrollableCardList
                            cardType={CardType.Technology}
                            cardList={factionTech}
                        />
                    </Col>
                </Row>
            ) : null}

            {promissoryNotes.length > 0 ? (
                <Row>
                    <Col>
                        <DividerText
                            title={`Faction Promissory Note${
                                promissoryNotes.length === 1 ? "" : "s"
                            }`}
                        />
                        <ScrollableCardList
                            cardType={CardType.PromissoryNote}
                            cardList={promissoryNotes}
                        />
                    </Col>
                </Row>
            ) : null}

            {planets.length > 0 ? (
                <Row>
                    <Col>
                        <DividerText
                            title={`Planet${planets.length === 1 ? "" : "s"}`}
                        />
                        <ScrollableCardList
                            cardType={CardType.Planet}
                            cardList={planets}
                        />
                    </Col>
                </Row>
            ) : null}

            {state.faction ? (
                <ValueLabel
                    label="Commodities"
                    value={state.faction?.commodities}
                />
            ) : null}

            {state.faction ? (
                <Row style={{ paddingLeft: "4px" }}>
                    <Col>
                        <DividerText title="Starting Units" />
                        <UnitList units={state.faction.units} />
                    </Col>
                </Row>
            ) : null}

            {startingTech.length > 0 ? (
                <Row>
                    <Col>
                        <DividerText title="Starting Tech" />
                        <div className="text-center">
                            <sub className="text-light">
                                {state.faction?.chooseTechDesc}
                            </sub>
                        </div>
                        <ScrollableCardList
                            cardType={CardType.Technology}
                            cardList={startingTech}
                            interactable={state.faction?.chooseTech}
                        />
                    </Col>
                </Row>
            ) : null}

            {state.faction ? (
                <Row className="mt-2">
                    <Col>
                        <Link to="/game" className="float-end">
                            <Button variant="success">Start Game</Button>
                        </Link>
                    </Col>
                </Row>
            ) : null}
        </Container>
    );
}

export default NewGame;
