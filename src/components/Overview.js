import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useHistory } from "react-router-dom";

import { categories, GetTechVariantColour } from "../lib/Tech";
import { useStore } from "../store/Store";
import { setFaction, setTech } from "../store/Actions";
import ValueLabel from "./ValueLabel";
import DividerText from "./DividerText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { GetPlanetVariantColour } from "../lib/Planet";
import {
    GetCompletedObjectivesPoints,
    GetCompletedPublicObjectives,
    GetCompletedSecretObjectives,
    GetTotalPublicObjectives,
    GetTotalSecretObjectives,
} from "../lib/Objective";

function Overview(props) {
    const [state, dispatch] = useStore();
    const [showExit, setShowExit] = useState(false);

    const history = useHistory();

    const showExitModal = () => {
        setShowExit(true);
    };
    const hideExitModal = () => {
        setShowExit(false);
    };

    const exitGame = () => {
        dispatch(setFaction(null));
        dispatch(setTech(null));
        history.replace(".");
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CloseButton
                        variant="white"
                        onClick={showExitModal}
                        className="mt-3"
                    />
                </Col>
                <Col>
                    <DividerText title="Overview" />
                </Col>
                <Col>
                    <a
                        className="float-end mt-3 pointer"
                        onClick={props.showEditModal}
                    >
                        <FontAwesomeIcon
                            size="lg"
                            icon={faEdit}
                            color="rgba(255, 255, 255, 0.8)"
                        />
                    </a>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DividerText title="Technology" />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    {categories.map((cat, i) => {
                        const variant = GetTechVariantColour(cat);
                        return (
                            <Badge
                                pill
                                key={i}
                                bg={variant.colour}
                                className={`text-${variant.text} me-1`}
                            >{`${cat} ${
                                state.technologies.filter((t) => t.cat === cat)
                                    .length
                            }`}</Badge>
                        );
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <DividerText title="Planets" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="text-center light-text mb-0">
                        <strong>
                            {state.planets.map((p, i) => {
                                const variant = GetPlanetVariantColour(p.trait);
                                return (
                                    <Badge
                                        pill
                                        key={i}
                                        bg={variant.colour}
                                        className={`text-${variant.text} me-1`}
                                    >
                                        {p.title}
                                    </Badge>
                                );
                            })}
                        </strong>
                    </p>
                </Col>
            </Row>
            <ValueLabel
                label="Resources"
                bg="warning"
                pillText="dark"
                value={`${state.availableResources}/${state.totalResources}`}
            />
            <ValueLabel
                label="Influence"
                pillText="dark"
                bg="info"
                value={`${state.availableInfluence}/${state.totalInfluence}`}
            />
            <Row>
                <Col>
                    <DividerText title="Objectives" />
                </Col>
            </Row>
            <ValueLabel
                label="Points Scored"
                value={GetCompletedObjectivesPoints(state.objectives)}
            />
            <ValueLabel
                label="Public"
                bg="primary"
                value={`${
                    GetCompletedPublicObjectives(state.objectives).length
                }/${GetTotalPublicObjectives(state.objectives).length}`}
            />
            <ValueLabel
                label="Secret"
                bg="danger"
                value={`${
                    GetCompletedSecretObjectives(state.objectives).length
                }/${GetTotalSecretObjectives(state.objectives).length}`}
            />
            {/* Total Action Cards */}

            {/* Exit Game Modal */}
            <Modal show={showExit} onHide={hideExitModal}>
                <Modal.Header>
                    <Modal.Title>Exit Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to exit your current game?
                    <br />
                    <br /> <strong>WARNING:</strong> All data will be lost!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={hideExitModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={exitGame}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Overview;
