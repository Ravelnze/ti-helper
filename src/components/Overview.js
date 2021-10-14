import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useHistory } from "react-router-dom";

import { Categories, GetTechVariantColour } from "../lib/Technology";
import { useStore } from "../store/Store";
import { resetGame } from "../store/Actions";
import ValueLabel from "./ValueLabel";
import DividerText from "./DividerText";
import { GetPlanetVariantColour } from "../lib/Planet";
import {
    GetCompletedObjectivesPoints,
    GetCompletedPublicObjectives,
    GetCompletedSecretObjectives,
    GetTotalPublicObjectives,
    GetTotalSecretObjectives,
} from "../lib/Objective";
import { GetTotalActionCardCount } from "../lib/ActionCard";
import { GetVictoryPointsFromAgendas } from "../lib/Agenda";
import Header from "./Header";
import { setPlanet } from "../store/Actions";
import { AugmentPlanet, AttachmentCardType } from "../lib/Planet";
import { UnitType } from "../lib/Faction";
import Planets from "../data/planets";
import Factions from "../data/factions";

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
        // Reset Titans homeworld
        const homeId = Factions.find((f) => f.title === "The Titans of Ul")
            .planets[0];
        if (state.planets.find((p) => p.id === homeId)) {
            dispatch(
                setPlanet(
                    AugmentPlanet(
                        state.faction.leaders.find(
                            (l) => l.type === UnitType.Hero
                        ).specialAbility.attachment,
                        AttachmentCardType.Unit,
                        state.planets.find(
                            (p) => p.id === homeId // Elysium
                        ),
                        false
                    )
                )
            );
        }
        dispatch(resetGame());
        history.replace(".");
    };

    return (
        <>
            <Header
                title="Overview"
                showEditModal={props.showEditModal}
                left={
                    <CloseButton
                        variant="white"
                        onClick={showExitModal}
                        className="mt-3"
                    />
                }
            />

            {/* Technology */}
            <Row>
                <Col>
                    <DividerText title="Technology" />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    {Object.entries(Categories).map(([key, cat], i) => {
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

            {/* Planets */}
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

            {/* Action Cards */}
            <Row>
                <Col>
                    <DividerText title="Action Cards" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ValueLabel
                        label="Total"
                        value={GetTotalActionCardCount(state.actionCards)}
                    />
                    <ValueLabel
                        label="Sabotage"
                        value={state.actionCards[1]?.length ?? 0}
                        hidden
                    />
                </Col>
            </Row>

            {/* Objectives */}
            <Row>
                <Col>
                    <DividerText title="Objectives" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ValueLabel
                        label="Victory Points"
                        value={
                            Number(
                                GetCompletedObjectivesPoints(state.objectives)
                            ) +
                            Number(
                                GetVictoryPointsFromAgendas(
                                    state.agendas,
                                    state.faction
                                )
                            ) +
                            Number(state.extraVictoryPoints)
                        }
                    />
                    <ValueLabel
                        label="Public"
                        bg="primary"
                        value={`${
                            GetCompletedPublicObjectives(state.objectives)
                                .length
                        }/${GetTotalPublicObjectives(state.objectives).length}`}
                    />
                    <ValueLabel
                        label="Secret"
                        bg="danger"
                        value={`${
                            GetCompletedSecretObjectives(state.objectives)
                                .length
                        }/${GetTotalSecretObjectives(state.objectives).length}`}
                    />
                </Col>
            </Row>

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
        </>
    );
}

export default Overview;
