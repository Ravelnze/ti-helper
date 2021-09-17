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
} from "../store/Actions";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import "../lib/ArrayExtensions";

// data
import Planets from "../data/planets.json";
import Technology from "../data/technologies.json";
import Objectives from "../data/objectives.json";
import ActionCards from "../data/actionCards.json";
import Agendas from "../data/agendas.json";

function EditModal(props) {
    const [state, dispatch] = useStore();

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
                                <Accordion.Header>Planets</Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row className="px-3">
                                        <Col className="p-0">
                                            <AutoSuggestionInput
                                                items={Planets.exclude(
                                                    state.planets
                                                )}
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
                                    <Accordion.Body>
                                        <ScrollableCardList
                                            cardList={state.planets}
                                            cardType={CardType.Planet}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Technology</Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={Technology.exclude(
                                                    state.technologies
                                                )}
                                                setValue={(tech) =>
                                                    dispatch(addTech(tech))
                                                }
                                                placeholder="Search for a technology"
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                {state.technologies.length > 0 ? (
                                    <Accordion.Body>
                                        <ScrollableCardList
                                            cardList={state.technologies}
                                            cardType={CardType.Technology}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Objectives</Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={Objectives.exclude(
                                                    state.objectives
                                                )}
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
                                    <Accordion.Body>
                                        <ScrollableCardList
                                            cardList={state.objectives}
                                            cardType={CardType.Objective}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                    Action Cards
                                </Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={ActionCards}
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
                                {Object.keys(state.actionCards).length >
                                0 ? (
                                    <Accordion.Body>
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

                            <Accordion.Item eventKey="6">
                                <Accordion.Header>Agendas</Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={(state.pok
                                                    ? Agendas.filter(
                                                          (a) => a.pok !== false
                                                      )
                                                    : Agendas
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
                                    <Accordion.Body>
                                        <ScrollableCardList
                                            cardList={state.agendas}
                                            cardType={CardType.Agenda}
                                            interactable
                                        />
                                    </Accordion.Body>
                                ) : null}
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
