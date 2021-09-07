import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GameContainer from "./components/GameContainer";
import NewGame from "./components/NewGame";
import { StoreProvider } from "./store/Store";
import { reducer, initialState as state } from "./store/Reducer";
import { get } from './store/middlewares/LocalStorage';
import merge from "lodash.merge";

function App() {
    return (
        <StoreProvider initialState={merge(state, get(state))} reducer={reducer}>
        <Router>
            <Switch>
                <Route path="/game">
                    <GameContainer />
                </Route>
                <Route path="/">
                    <NewGame />
                </Route>
            </Switch>
        </Router>
        </StoreProvider>
    );
}

export default App;
