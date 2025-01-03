import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useStore } from "../store/Store";
import "./EditModal.css";
import AutoSuggestionInput from "./AutoSuggestionInput";
import {
    addPlanet,
    exhaustPlanets,
    addTech,
    addObjective,
    addActionCard,
    addAgenda,
    addPromissory,
    addExplorationCard,
    addRelic,
    setUnitProperties,
    setExtraVictoryPoints,
} from "../store/Actions";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import "../lib/ArrayExtensions";
import { GetSpecialUnitsAndLeaders, UnitType } from "../lib/Faction";
import { ReplaceCodexTechnologies } from "../lib/Technology";
import { Codex } from "../lib/Codices";

// data
import Planets from "../data/planets.json";
import Technology from "../data/technologies.json";
import Objectives from "../data/objectives.json";
import ActionCards from "../data/actionCards.json";
import Agendas from "../data/agendas.json";
import PromissoryNotes from "../data/promissoryNotes.json";
import Exploration from "../data/exploration.json";
import Relics from "../data/relics.json";

function EditModal(props) {
    const [state, dispatch] = useStore();

    function ruleFilter(items) {

        function replaceCodex(codexId, items) {
            if (state.codex.includes(codexId)) {
                items.forEach(i => {
                    if (i.codex?.includes(codexId)) {
                        items = items.filter((e) => e.id !== i.replaces)
                    }
                });

                return items;
            }
            else {
                return items.filter(i => !i.replaces);
            }
        }

        items = state.pok
            ? items.filter((i) => i.pok !== false)
            : items.filter((i) => i.pok !== true);

        items = !state.codex.includes(Codex.Ordinian)
            ? items.filter((a) => !a.codex?.includes(Codex.Ordinian))
            : replaceCodex(Codex.Ordinian, items);

        items = !state.codex.includes(Codex.Affinity)
            ? items.filter((a) => !a.codex?.includes(Codex.Affinity))
            : replaceCodex(Codex.Affinity, items);

        items = !state.codex.includes(Codex.Vigil)
            ? items.filter((a) => !a.codex?.includes(Codex.Vigil))
            : replaceCodex(Codex.Vigil, items);

        return items;
    }

    return (
        <Modal
            variant="dark"
            show={props.show}
            onHide={props.hide}
            fullscreen={true}
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Faction</Accordion.Header>
                                <Accordion.Body className="pb-0">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <span className="m-0 align-middle">
                                                {`Extra Victory Points ${state.extraVictoryPoints}`}
                                            </span>
                                        </div>
                                        <div className="flex-shrink">
                                            <ButtonGroup>
                                                <Button
                                                    variant="dark"
                                                    onClick={() =>
                                                        dispatch(
                                                            setExtraVictoryPoints(
                                                                state.extraVictoryPoints +
                                                                1
                                                            )
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    variant="dark"
                                                    onClick={() =>
                                                        dispatch(
                                                            setExtraVictoryPoints(
                                                                state.extraVictoryPoints -
                                                                1
                                                            )
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </Accordion.Body>
                                <Accordion.Body className="p-0">
                                    <ScrollableCardList
                                        cardList={GetSpecialUnitsAndLeaders(
                                            state.faction,
                                            state.pok
                                        )}
                                        cardType={CardType.Unit}
                                        interactable
                                    />
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Planets</Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row className="px-3">
                                        <Col className="p-0">
                                            <AutoSuggestionInput
                                                items={ruleFilter(
                                                    Planets
                                                ).exclude(state.planets)}
                                                setValue={(planet) =>
                                                    dispatch(addPlanet(planet))
                                                }
                                                placeholder="Search for a planet"
                                            />
                                        </Col>
                                        <Col xs={4} className="px-0">
                                            <Button
                                                variant="dark"
                                                className="float-end"
                                                onClick={() =>
                                                    dispatch(
                                                        exhaustPlanets(
                                                            state.planets,
                                                            false
                                                        )
                                                    )
                                                }
                                            >
                                                Refresh All
                                            </Button>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.planets.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={state.planets}
                                            cardType={CardType.Planet}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                                {state.legendaryPlanetAbilities.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={
                                                state.legendaryPlanetAbilities
                                            }
                                            cardType={CardType.LegendaryAbility}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Technology</Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ReplaceCodexTechnologies(
                                                    ruleFilter(
                                                        Technology
                                                    ).exclude(
                                                        // exclude existing technologies,
                                                        state.technologies.concat(
                                                            Technology.filter(
                                                                (t) =>
                                                                    // previously replaced technologies,
                                                                    state.technologies
                                                                        .map(
                                                                            (st) =>
                                                                                st.id
                                                                        )
                                                                        .includes(
                                                                            t.replacedBy
                                                                        ) ||
                                                                    // techs with different upgrades
                                                                    t.excludeFactions?.includes(
                                                                        state
                                                                            .faction
                                                                            .id
                                                                    ) ||
                                                                    // and techs from other factions
                                                                    (t.factionId &&
                                                                        t.factionId !==
                                                                        state
                                                                            .faction
                                                                            .id)
                                                            )
                                                        )
                                                    ), state
                                                )}
                                                setValue={(tech) => {
                                                    dispatch(addTech(tech));
                                                    if (tech.id === 49) {
                                                        // Nomad flagship
                                                        dispatch(
                                                            setUnitProperties(
                                                                UnitType.Flagship,
                                                                tech
                                                            )
                                                        );
                                                    }
                                                }}
                                                placeholder="Search for a technology"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.technologies.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={state.technologies}
                                            cardType={CardType.Technology}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Objectives</Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ruleFilter(
                                                    Objectives
                                                ).exclude(state.objectives)}
                                                setValue={(objective) =>
                                                    dispatch(
                                                        addObjective(objective)
                                                    )
                                                }
                                                placeholder="Search for an objective"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.objectives.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={state.objectives}
                                            cardType={CardType.Objective}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>
                                    Action Cards
                                </Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ruleFilter(ActionCards)}
                                                setValue={(actionCard) =>
                                                    dispatch(
                                                        addActionCard(
                                                            actionCard
                                                        )
                                                    )
                                                }
                                                placeholder="Search for an action card"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {Object.keys(state.actionCards).length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={Object.entries(
                                                state.actionCards
                                            )}
                                            cardType={CardType.Action}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Agendas</Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ruleFilter(
                                                    Agendas
                                                ).exclude(state.agendas)}
                                                setValue={(agenda) =>
                                                    dispatch(addAgenda(agenda))
                                                }
                                                placeholder="Search for an agenda"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.agendas.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={state.agendas}
                                            cardType={CardType.Agenda}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="6">
                                <Accordion.Header>
                                    Promissory Notes
                                </Accordion.Header>
                                <Accordion.Body className="py-2 px-0">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ruleFilter(
                                                    PromissoryNotes
                                                )}
                                                setValue={(note) =>
                                                    dispatch(
                                                        addPromissory(note)
                                                    )
                                                }
                                                placeholder="Search for a promissory note"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.promissoryNotes.length > 0 ? (
                                    <Accordion.Body className="p-0">
                                        <ScrollableCardList
                                            cardList={state.promissoryNotes}
                                            cardType={CardType.PromissoryNote}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            {state.pok ? (
                                <Accordion.Item eventKey="7">
                                    <Accordion.Header>
                                        Exploration Cards
                                    </Accordion.Header>
                                    <Accordion.Body className="py-2 px-0">
                                        <Row>
                                            <Col>
                                                <AutoSuggestionInput
                                                    items={Exploration}
                                                    setValue={(card) =>
                                                        dispatch(
                                                            addExplorationCard(
                                                                card
                                                            )
                                                        )
                                                    }
                                                    placeholder="Search for an exploration card"
                                                />
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                    {state.explorationCards.length > 0 ? (
                                        <Accordion.Body className="p-0">
                                            <ScrollableCardList
                                                cardList={
                                                    state.explorationCards
                                                }
                                                cardType={CardType.Exploration}
                                                interactable
                                            />
                                        </Accordion.Body>
                                    ) : null}
                                </Accordion.Item>
                            ) : null}

                            {state.pok ? (
                                <Accordion.Item eventKey="8">
                                    <Accordion.Header>
                                        {"Relics & Fragments"}
                                    </Accordion.Header>
                                    <Accordion.Body className="py-2 px-0">
                                        <Row>
                                            <Col>
                                                <AutoSuggestionInput
                                                    items={Relics.excludeSingle(
                                                        Object.entries(
                                                            state.relics
                                                        )
                                                    )}
                                                    setValue={(card) =>
                                                        dispatch(addRelic(card))
                                                    }
                                                    placeholder="Search for a relic"
                                                />
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                    {Object.keys(state.relics).length > 0 ? (
                                        <Accordion.Body className="p-0">
                                            <ScrollableCardList
                                                cardList={Object.entries(
                                                    state.relics
                                                )}
                                                cardType={CardType.Relic}
                                                interactable
                                            />
                                        </Accordion.Body>
                                    ) : null}
                                </Accordion.Item>
                            ) : null}
                        </Accordion>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
