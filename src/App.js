import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GameContainer from "./components/GameContainer";
import NewGame from "./components/NewGame";
import { reducer, initialState } from "./store/Reducer";

export const Context = React.createContext();

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <Context.Provider
            value={{
                state,
                dispatch,
            }}
        >
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
        </Context.Provider>
    );
}

export default App;
