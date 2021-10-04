import { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Overview from "./Overview";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {
    faSatelliteDish,
    faChess,
    faRocket,
} from "@fortawesome/free-solid-svg-icons";

import PhaseTabs from "./PhaseTabs";
import PlannerContainer from "./PlannerContainer";
import EditModal from "./EditModal";
import { useStore } from "../store/Store";
import getLogoByKey from "../lib/Logos";
import SimulateContainer from "./SimulateContainer";
import NavIcon from "./NavIcon";
import Phase from "../lib/Phase";
import { setCombatTab, setGameStarted, setPhaseTab } from "../store/Actions";

function GameContainer() {
    const [state, dispatch] = useStore();
    let match = useRouteMatch();

    useEffect(() => {
        dispatch(setGameStarted(true));
    }, []);

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };

    const phaseTabs = [
        { title: Phase.Strategy, phase: Phase.Strategy },
        { title: Phase.Action, phase: Phase.Action },
        { title: Phase.Status, phase: Phase.Status },
        { title: Phase.Agenda, phase: Phase.Agenda },
    ];

    const combatTabs = [
        { title: Phase.SpaceCombat.split("C")[0], phase: Phase.SpaceCombat },
        { title: Phase.GroundCombat.split("C")[0], phase: Phase.GroundCombat },
    ];

    return (
        <>
            <Container>
                <Switch>
                    <Route path={`${match.path}/phase`}>
                        <PhaseTabs
                            key="phase-tab"
                            tabs={phaseTabs}
                            id="phase-tab"
                            title="Phases"
                            setKey={(key) => dispatch(setPhaseTab(key))}
                            showEditModal={() => showModal()}
                            activeKey={state.phaseTab}
                        />
                    </Route>
                    <Route path={`${match.path}/combat`}>
                        <PhaseTabs
                            key="combat-tab"
                            tabs={combatTabs}
                            id="combat-tab"
                            title="Combat"
                            setKey={(key) => dispatch(setCombatTab(key))}
                            showEditModal={() => showModal()}
                            activeKey={state.combatTab}
                        />
                    </Route>
                    <Route path={`${match.path}/plan`}>
                        <PlannerContainer showEditModal={() => showModal()} />
                    </Route>
                    <Route path={`${match.path}/simulate`}>
                        <SimulateContainer showEditModal={() => showModal()} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <Overview showEditModal={() => showModal()} />
                    </Route>
                </Switch>
            </Container>

            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Nav className="w-100">
                    <div className="d-flex flex-row justify-content-around w-100">
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/phase`}
                            >
                                <NavIcon title="Phase" icon={faSatelliteDish} />
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/combat`}
                            >
                                <NavIcon title="Combat" icon={faRocket} />
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
                            <Link className="nav-link" to={`${match.url}/plan`}>
                                <NavIcon title="Plan" icon={faChess} />
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={`${match.url}/simulate`}
                            >
                                <NavIcon title="Simulate" icon={faChess} />
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
