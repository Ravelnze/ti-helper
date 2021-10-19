import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DividerText from "./DividerText";
import UnitList from "./UnitList";
import ValueLabel from "./ValueLabel";
import { GetSpecialUnitsAndLeaders } from "../lib/Faction";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import FactionList from "./FactionList";
import { Link } from "react-router-dom";
import { setFaction, setTech } from "../store/Actions";

import Technologies from "../data/technologies.json";
import PromissoryNotes from "../data/promissoryNotes.json";
import Planets from "../data/planets.json";
import { setLookupFaction } from "../store/Actions";
import { useStore } from "../store/Store";

function FactionInfo(props) {
    const [state, dispatch] = useStore();

    const abilities = props.faction?.abilities;
    const factionTech = Technologies.filter(
        (t) => t.factionId && t.factionId === props.faction?.id
    );
    const specialUnits = props.faction
        ? GetSpecialUnitsAndLeaders(props.faction, state.pok)
        : null;
    const promissoryNotes = PromissoryNotes.filter(
        (p) => p.factionId && p.factionId === props.faction?.id
    );
    const planets = Planets.filter(
        (p) => p.homeFactionId && p.homeFactionId === props.faction?.id
    );
    const startingTech = props.technologies.filter((t) => !t.replacedBy);

    return (
        <>
            {props.faction ? (
                <Row>
                    <Col>
                        <div
                            className="text-center pointer"
                            onClick={() => {
                                if (props.isNewGame) {
                                    dispatch(setFaction(null));
                                    dispatch(setTech([]));
                                } else {
                                    dispatch(setLookupFaction(null));
                                }
                            }}
                        >
                            <h4 className="text-center mb-0">
                                {props.faction.title}
                            </h4>
                            <sub style={{ color: "gray", top: "-7px" }}>
                                tap to change
                            </sub>
                        </div>
                    </Col>
                </Row>
            ) : (
                <FactionList isNewGame={props.isNewGame} searchPlaceholder={props.searchPlaceholder} />
            )}

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
                            lookup={!props.isNewGame}
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

            {props.faction ? (
                <ValueLabel
                    label="Commodities"
                    value={props.faction?.commodities}
                />
            ) : null}

            {props.faction && props.isNewGame ? (
                <Row style={{ paddingLeft: "4px" }}>
                    <Col>
                        <DividerText title="Starting Units" />
                        <UnitList units={props.faction.units} />
                    </Col>
                </Row>
            ) : null}

            {startingTech.length > 0 && props.isNewGame ? (
                <Row>
                    <Col>
                        <DividerText title="Starting Tech" />
                        <div className="text-center">
                            <sub className="text-light">
                                {props.faction?.chooseTechDesc}
                            </sub>
                        </div>
                        <ScrollableCardList
                            cardType={CardType.Technology}
                            cardList={startingTech}
                            interactable={props.faction?.chooseTech}
                        />
                    </Col>
                </Row>
            ) : null}

            {props.faction && props.isNewGame ? (
                <Row className="mt-2">
                    <Col>
                        <Link to="/game" className="float-end">
                            <Button variant="success">Start Game</Button>
                        </Link>
                    </Col>
                </Row>
            ) : null}
        </>
    );
}

export default FactionInfo;
