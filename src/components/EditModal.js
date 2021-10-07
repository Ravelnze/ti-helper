import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
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
} from "../store/Actions";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import "../lib/ArrayExtensions";
import { GetSpecialUnitsAndLeaders } from "../lib/Faction";

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

    function pokFilter(items) {
        return state.pok
            ? items.filter((a) => a.pok !== false)
            : items.filter((a) => a.pok !== true);
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
                                <Accordion.Header>Units</Accordion.Header>

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
                                                items={pokFilter(
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
                                                items={pokFilter(
                                                    Technology
                                                ).exclude(state.technologies)}
                                                setValue={(tech) =>
                                                    dispatch(addTech(tech))
                                                }
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
                                                items={pokFilter(
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
                                                items={pokFilter(ActionCards)}
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
                                                items={pokFilter(
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
                                                items={pokFilter(
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
