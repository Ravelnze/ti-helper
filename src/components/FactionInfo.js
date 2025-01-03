import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import DividerText from "./DividerText";
import UnitList from "./UnitList";
import ValueLabel from "./ValueLabel";
import { GetSpecialUnitsAndLeaders } from "../lib/Faction";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import FactionList from "./FactionList";
import { setFaction, setStartingFaction, setTech } from "../store/Actions";

import Technologies from "../data/technologies.json";
import PromissoryNotes from "../data/promissoryNotes.json";
import Planets from "../data/planets.json";
import {
    setLookupFaction,
    addLookupFaction,
    removeLookupFaction,
} from "../store/Actions";
import { useStore } from "../store/Store";
import GetLogoByKey from "../lib/Logos";
import { Codex } from "../lib/Codices";
import { ReplaceCodexTechnologies } from "../lib/Technology";
import { GetPlanetsByIds } from "../lib/Planet";

const keleresFactionId = 25;

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
    ).filter(
        (p) => state.codex.includes(Codex.Ordinian) && props.faction.id !== keleresFactionId ? p.replaces : !p.replaces
    );
    const startingTech = ReplaceCodexTechnologies(props.technologies.filter(
        (t) => !t.replacedBy
    ), state);
    const removeFaction = state.lookupFactionList
        .map((f) => f.id)
        .includes(props.faction?.id);
    const planets = !props.isNewGame ? GetPlanetsByIds(Planets, props.faction?.planets) : state.planets;

    return (
        <>
            {!props.isNewGame ? (
                <Row>
                    <Col className="text-center">
                        {props.faction ? (
                            <Button
                                variant={removeFaction ? "danger" : "success"}
                                className="w-100"
                                onClick={() => {
                                    if (removeFaction) {
                                        dispatch(
                                            removeLookupFaction(props.faction)
                                        );
                                    } else {
                                        dispatch(
                                            addLookupFaction(props.faction)
                                        );
                                    }
                                }}
                            >
                                {removeFaction
                                    ? "Remove Faction From Game"
                                    : "Add Faction To Game"}
                            </Button>
                        ) : (
                            <div className="mb-5">
                                {state.lookupFactionList.length > 0 ? (
                                    <DividerText title="Factions In Game" />
                                ) : null}
                                {state.lookupFactionList.map((lf, i) => (
                                    <Button
                                        key={i}
                                        variant="dark"
                                        className="w-100 mt-2"
                                        onClick={() =>
                                            dispatch(setLookupFaction(lf))
                                        }
                                    >
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                {lf.title}
                                            </div>
                                            <div>
                                                <Image
                                                    height="25px"
                                                    src={GetLogoByKey(lf.logo)}
                                                />
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            ) : null}

            {props.faction ? (
                <Row>
                    <Col>
                        <div
                            className="text-center pointer"
                            onClick={() => {
                                if (props.isNewGame) {
                                    dispatch(setFaction(null));
                                    dispatch(setTech([]));
                                    dispatch(setStartingFaction(null, false))
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
                <FactionList
                    isNewGame={props.isNewGame}
                />
            )}

            {props.faction && props.faction.chooseFaction && !state.keleresFactionChosen && props.isNewGame ? (
                <Row>
                    <Col>
                        <DividerText title="Faction Selection" />
                        <div className="text-center">
                            <sub className="text-light">
                                Choose from the following factions to set home planets and hero
                            </sub>
                        </div>
                        <FactionList
                            factionList={props.faction.factionIds}
                            chooseFaction={props.faction.chooseFaction}
                        />
                    </Col>
                </Row>
            ) : null}

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
                            title={`Faction Promissory Note${promissoryNotes.length === 1 ? "" : "s"
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
        </>
    );
}

export default FactionInfo;
