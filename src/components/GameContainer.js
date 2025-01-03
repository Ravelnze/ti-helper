import { useState, useEffect } from "react";
import { Route, Link, useRouteMatch, useLocation } from "react-router-dom";
import { AnimatedSwitch as Switch } from "react-router-transition";
import Overview from "./Overview";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {
    faSatelliteDish,
    faChess,
    faRocket,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import PhaseTabs from "./PhaseTabs";
import PlannerContainer from "./PlannerContainer";
import EditModal from "./EditModal";
import { useStore } from "../store/Store";
import getLogoByKey from "../lib/Logos";
import InfoContainer from "./InfoContainer";
import NavIcon from "./NavIcon";
import Phase from "../lib/Phase";
import { setCombatTab, setGameStarted, setPhaseTab } from "../store/Actions";
import './GameContainer.css'

function GameContainer(props) {
    const [state, dispatch] = useStore();
    let match = useRouteMatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(setGameStarted(true));
        window.scrollTo(0, 0);
    }, []);

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };

    const route = {
        phase: "phase",
        combat: "combat",
        overview: "",
        plan: "plan",
        info: "info",
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

    const activeClass = (route) => {
        var isActive = location.pathname === (route ? `${match.path}/${route}`: match.path);
        return `flex-grow-1 text-center pt-1 pb-2 ${isActive ? "nav-active" : ""}`;
    }

    return (
        <>
            <Container>
                <Switch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                    <Route path={`${match.path}/${route.phase}`}>
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
                    <Route path={`${match.path}/${route.combat}`}>
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
                    <Route path={`${match.path}/${route.plan}`}>
                        <PlannerContainer showEditModal={() => showModal()} />
                    </Route>
                    <Route path={`${match.path}/${route.info}`}>
                        <InfoContainer showEditModal={() => showModal()} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <Overview showEditModal={() => showModal()} />
                    </Route>
                </Switch>
            </Container>

            <Navbar
                bg="dark"
                variant="dark"
                fixed="bottom"
                className="pt-0 pb-0"
            >
                <Nav className="w-100">
                    <div className="d-flex flex-row justify-content-around w-100">
                        <Nav.Item className={activeClass(route.phase)}>
                            <Link
                                className="nav-link"
                                to={`${match.url}/${route.phase}`}
                            >
                                <NavIcon icon={faSatelliteDish} />
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={activeClass(route.combat)}>
                            <Link
                                className="nav-link"
                                to={`${match.url}/${route.combat}`}
                            >
                                <NavIcon icon={faRocket} />
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={activeClass()}>
                            <Link
                                className="nav-link pt-0"
                                to={`${match.url}`}
                            >
                                <Image
                                    src={getLogoByKey(state.faction.logo)}
                                    height="40px"
                                />
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={activeClass(route.plan)}>
                            <Link
                                className="nav-link"
                                to={`${match.url}/${route.plan}`}
                            >
                                <NavIcon icon={faChess} />
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={activeClass(route.info)}>
                            <Link
                                className="nav-link"
                                to={`${match.url}/${route.info}`}
                            >
                                <NavIcon icon={faInfoCircle} />
                            </Link>
                        </Nav.Item>
                    </div>
                </Nav>
            </Navbar>

            <EditModal show={show} hide={hideModal} />
        </>
    );
}

export default GameContainer;
