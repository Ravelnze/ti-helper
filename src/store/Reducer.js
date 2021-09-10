import { AddTech, RemoveTech, SetTech } from "../lib/Tech";
import { SetFaction } from "../lib/Faction";
import applyMiddleware from "./Middleware";
import * as Types from "./Types";
import { AddPlanet, ExhaustPlanets, RemovePlanet } from "../lib/Planet";
import {
    AddObjective,
    CompleteObjective,
    RemoveObjective,
} from "../lib/Objective";
import { AddActionCard, RemoveActionCard } from "../lib/ActionCard";

export const initialState = {
    faction: null,
    technologies: [],
    planets: [],
    objectives: [],
    actionCards: [],
    availableResources: 0,
    totalResources: 0,
    availableInfluence: 0,
    totalInfluence: 0,
};

// good guide on why the store is laid out this way
// https://dev.to/vanderleisilva/middlewares-with-react-context-and-hooks-2gm1

// #region handlers
function setFaction(state, { payload }) {
    return SetFaction(state, payload);
}

function setTech(state, { payload }) {
    return {
        ...state,
        technologies: payload != null ? SetTech(payload) : [],
    };
}

function addTech(state, { payload }) {
    return {
        ...state,
        technologies: AddTech(state.technologies, payload),
    };
}

function removeTech(state, { payload }) {
    return {
        ...state,
        technologies: RemoveTech(state.technologies, payload),
    };
}

function addPlanet(state, { payload }) {
    return AddPlanet(state, payload);
}

function exhaustPlanets(state, { payload }) {
    return ExhaustPlanets(state, payload);
}

function removePlanet(state, { payload }) {
    return RemovePlanet(state, payload);
}

function addObjective(state, { payload }) {
    return {
        ...state,
        objectives: AddObjective(state.objectives, payload),
    };
}

function completeObjective(state, { payload }) {
    return {
        ...state,
        objectives: CompleteObjective(
            state.objectives,
            payload.objective,
            payload.completed
        ),
    };
}

function removeObjective(state, { payload }) {
    return {
        ...state,
        objectives: RemoveObjective(state.objectives, payload),
    };
}

function addActionCard(state, { payload }) {
    return {
        ...state,
        actionCards: AddActionCard(state.actionCards, payload),
    };
}

function removeActionCard(state, { payload }) {
    console.log("remove")
    return {
        ...state,
        actionCards: RemoveActionCard(state.actionCards, payload),
    };
}

// #endregion

const createReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }

    return applyMiddleware({
        state,
        action,
        handler: handlers[action.type],
    });
};

export const reducer = createReducer({
    [Types.SETFACTION]: setFaction,
    [Types.SETTECH]: setTech,
    [Types.ADDTECH]: addTech,
    [Types.REMOVETECH]: removeTech,
    [Types.ADDPLANET]: addPlanet,
    [Types.EXHAUSTPLANET]: exhaustPlanets,
    [Types.REMOVEPLANET]: removePlanet,
    [Types.ADDOBJECTIVE]: addObjective,
    [Types.COMPLETEOBJECTIVE]: completeObjective,
    [Types.REMOVEOBJECTIVE]: removeObjective,
    [Types.ADDACTIONCARD]: addActionCard,
    [Types.REMOVEACTIONCARD]: removeActionCard,
});
