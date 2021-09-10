import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import PlanetCard from "./PlanetCard";
import { useStore } from "../store/Store";
import "./EditModal.css";
import TechnologyCard from "./TechnologyCard";
import AutoSuggestionInput from "./AutoSuggestionInput";
import {
    addPlanet,
    exhaustPlanets,
    addTech,
    addObjective,
    addActionCard,
} from "../store/Actions";
import ObjectiveCard from "./ObjectiveCard";

// data
import Planets from "../data/planets.json";
import Technology from "../data/technologies.json";
import Objectives from "../data/objectives.json";
import ActionCards from "../data/actionCards.json";
import ActionCardCard from "./ActionCardCard";

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
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={Planets.filter(
                                                    (p) =>
                                                        !state.planets
                                                            .map((p1) => p1.id)
                                                            .includes(p.id)
                                                )}
                                                setValue={(planet) =>
                                                    dispatch(addPlanet(planet))
                                                }
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
                                <Accordion.Body>
                                    <Row className="d-flex flex-row flex-nowrap">
                                        {state.planets.map((planet, i) => (
                                            <Col key={i}>
                                                <PlanetCard planet={planet} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Technology</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={Technology.filter(
                                                    (t) =>
                                                        !state.technologies
                                                            .map((t1) => t1.id)
                                                            .includes(t.id)
                                                )}
                                                setValue={(tech) =>
                                                    dispatch(addTech(tech))
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                <Accordion.Body>
                                    <Row className="d-flex flex-row flex-nowrap">
                                        {state.technologies.map((tech, i) => (
                                            <Col key={i}>
                                                <TechnologyCard
                                                    tech={tech}
                                                    displayBody={true}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Objectives</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <AutoSuggestionInput
                                                items={Objectives.filter(
                                                    (o) =>
                                                        !state.objectives
                                                            .map((o1) => o1.id)
                                                            .includes(o.id)
                                                )}
                                                setValue={(objective) =>
                                                    dispatch(
                                                        addObjective(objective)
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                <Accordion.Body>
                                    <Row className="d-flex flex-row flex-nowrap">
                                        {state.objectives.map((obj, i) => (
                                            <Col key={i}>
                                                <ObjectiveCard
                                                    objective={obj}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                    Action Cards
                                </Accordion.Header>
                                <Accordion.Body>
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
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                                <Accordion.Body>
                                    <Row className="d-flex flex-row flex-nowrap">
                                        {state.actionCards.map((ac, i) => (
                                            <Col key={i}>
                                                <ActionCardCard
                                                    card={ac}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Laws */}
                        </Accordion>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
