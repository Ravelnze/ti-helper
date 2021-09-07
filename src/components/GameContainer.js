// #region imports
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import StrategyPhase from "./StrategyPhase";
import ActionPhase from "./ActionPhase";
import StatusPhase from "./StatusPhase";
import AgendaPhase from "./AgendaPhase";
import SpaceCombat from "./SpaceCombat";
import GroundCombat from "./GroundCombat";
import Overview from "./Overview";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGavel,
    faSatelliteDish,
    faChess,
    faRedo,
    faRocket,
    faFlag,
} from "@fortawesome/free-solid-svg-icons";
// #endregion

function GameContainer({ props }) {
    const tabs = [
        {
            route: "/strategy",
            icon: faChess,
            label: "Strategy",
        },
        {
            route: "/action",
            icon: faSatelliteDish,
            label: "Action",
        },
        {
            route: "/status",
            icon: faRedo,
            label: "Status",
        },
        {
            route: "/agenda",
            icon: faGavel,
            label: "Agenda",
        },
        {
            route: "/space",
            icon: faRocket,
            label: "Space",
        },
        {
            route: "/ground",
            icon: faFlag,
            label: "Ground",
        }
    ];

    let match = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${match.path}/strategy`}>
                    <StrategyPhase />
                </Route>
                <Route path={`${match.path}/action`}>
                    <ActionPhase />
                </Route>
                <Route path={`${match.path}/status`}>
                    <StatusPhase />
                </Route>
                <Route path={`${match.path}/agenda`}>
                    <AgendaPhase />
                </Route>
                <Route path={`${match.path}/space`}>
                    <SpaceCombat />
                </Route>
                <Route path={`${match.path}/ground`}>
                    <GroundCombat />
                </Route>
                <Route path={`${match.path}`}>
                    <Overview />
                </Route>
            </Switch>

            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Nav className="w-100">
                    <div className="d-flex flex-row justify-content-around w-100">
                        {tabs.map((tab, index) => (
                            <NavItem key={index}>
                                <Link
                                    className="nav-link"
                                    to={`${match.url}${tab.route}`}
                                >
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <FontAwesomeIcon
                                            size="sm"
                                            icon={tab.icon}
                                            color='rgba(255, 255, 255, 0.85)'
                                        />
                                        <p style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: "0.8rem"}}>{tab.label}</p>
                                    </div>
                                </Link>
                            </NavItem>
                        ))}
                    </div>
                </Nav>
            </Navbar>
        </>
    );
}

export default GameContainer;
