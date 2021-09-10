import { useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Overview from "./Overview";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSatelliteDish,
    faChess,
    faRocket,
} from "@fortawesome/free-solid-svg-icons";

import PhaseContainer from "./PhaseContainer";
import CombatContainer from "./CombatContainer";
import PlannerContainer from "./PlannerContainer";
import EditModal from "./EditModal";
import { useStore } from "../store/Store";
import getLogoByKey from "../lib/Logos";

function GameContainer() {
    const [state, dispatch] = useStore();
    let match = useRouteMatch();

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    const hideModal = () => {
        setShow(false);
    };

    return (
        <>
            <Switch>
                <Route path={`${match.path}/phases`}>
                    <PhaseContainer showEditModal={() => showModal()} />
                </Route>
                <Route path={`${match.path}/combat`}>
                    <CombatContainer showEditModal={() => showModal()} />
                </Route>
                <Route path={`${match.path}/planners`}>
                    <PlannerContainer showEditModal={() => showModal()} />
                </Route>
                {/* <Route path={`${match.path}/something`}>
                    <AgendaPhase />
                </Route> */}
                <Route path={`${match.path}`}>
                    <Overview showEditModal={() => showModal()} />
                </Route>
            </Switch>

            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Nav className="w-100">
                    <div className="d-flex flex-row justify-content-around w-100">
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/phases`}
                            >
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faSatelliteDish}
                                        color="rgba(255, 255, 255, 0.85)"
                                    />
                                    <p
                                        style={{
                                            color: "rgba(255, 255, 255, 0.85)",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        Phases
                                    </p>
                                </div>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/combat`}
                            >
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faRocket}
                                        color="rgba(255, 255, 255, 0.85)"
                                    />
                                    <p
                                        style={{
                                            color: "rgba(255, 255, 255, 0.85)",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        Combat
                                    </p>
                                </div>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${match.url}`}>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <Image
                                        src={getLogoByKey(state.faction.logo)}
                                        width="50px"
                                    />
                                </div>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/planners`}
                            >
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faChess}
                                        color="rgba(255, 255, 255, 0.85)"
                                    />
                                    <p
                                        style={{
                                            color: "rgba(255, 255, 255, 0.85)",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        Planners
                                    </p>
                                </div>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${match.url}`}>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faChess}
                                        color="rgba(255, 255, 255, 0.85)"
                                    />
                                    <p
                                        style={{
                                            color: "rgba(255, 255, 255, 0.85)",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        Empty
                                    </p>
                                </div>
                            </Link>
                        </NavItem>
                    </div>
                </Nav>
            </Navbar>

            <EditModal show={show} hide={hideModal} />
        </>
    );
}

export default GameContainer;
