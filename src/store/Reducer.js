import { AddTech, RemoveTech, SetTech } from "../lib/Technology";
import { SetFaction, SetStartingFaction, SetUnitAvailable } from "../lib/Faction";
import applyMiddleware from "./Middleware";
import * as Types from "./Types";
import {
    AddPlanet,
    ExhaustLegendaryAbility,
    ExhaustPlanets,
    RemovePlanet,
    SetPlanet,
} from "../lib/Planet";
import {
    AddObjective,
    CompleteObjective,
    RemoveObjective,
} from "../lib/Objective";
import { AddActionCard, RemoveActionCard } from "../lib/ActionCard";
import { AddAgenda, ElectOutcome, RemoveAgenda } from "../lib/Agenda";
import {
    AddPromissory,
    RemovePromissory,
    SetAttachment,
    SetPromissoryColour,
} from "../lib/PromissoryNote";
import {
    AddExplorationCard,
    RemoveExplorationCard,
    SetAttachedPlanetExploration,
} from "../lib/Exploration";
import { AddRelic, ExhaustRelic, RemoveRelic, SetAttachedPlanetRelic } from "../lib/Relic";
import {
    AppendUnitAbilities,
    RemoveExtraAbility,
    UpdateUnitProperies,
} from "../lib/Unit";
import { AddCodex, RemoveCodex } from "../lib/Codices";

export const initialState = () => ({
    pok: true,
    gameStarted: false,
    faction: null,
    extraVictoryPoints: 0,
    technologies: [],
    planets: [],
    legendaryPlanetAbilities: [],
    objectives: [],
    actionCards: {},
    agendas: [],
    promissoryNotes: [],
    explorationCards: [],
    relics: {},
    availableResources: 0,
    totalResources: 0,
    availableInfluence: 0,
    totalInfluence: 0,
    phaseTab: null,
    combatTab: null,
    lookupFaction: null,
    lookupFactionList: [],
    codex: [],
});

// Good guide on why the store is laid out this way
// https://dev.to/vanderleisilva/middlewares-with-react-context-and-hooks-2gm1

// #region handlers
function resetGame() {
    return initialState();
}

function setPok(state, { payload }) {
    return {
        ...state,
        pok: payload,
    };
}

function setGameStarted(state, { payload }) {
    return {
        ...state,
        gameStarted: payload,
    };
}

function setFaction(state, { payload }) {
    return SetFaction(state, payload);
}

function setUnitAvailable(state, { payload }) {
    return {
        ...state,
        faction: SetUnitAvailable(
            state.faction,
            payload.unit,
            payload.available
        ),
    };
}

function appendUnitAbilities(state, { payload }) {
    return AppendUnitAbilities(state, payload.unit, payload.abilities);
}

function removeExtraAbility(state, { payload }) {
    return RemoveExtraAbility(
        state,
        payload.updateableType,
        payload.unit,
        payload.instanceId
    );
}

function setUnitProperties(state, { payload }) {
    return {
        ...state,
        faction: UpdateUnitProperies(
            { ...state.faction },
            payload.unitType,
            payload.properties
        ),
    };
}

function setExtraVictoryPoints(state, { payload }) {
    return {
        ...state,
        extraVictoryPoints: payload,
    };
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

function exhaustLegendaryAbility(state, { payload }) {
    return ExhaustLegendaryAbility(state, payload);
}

function setPlanet(state, { payload }) {
    return SetPlanet(state, payload);
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
    return {
        ...state,
        actionCards: RemoveActionCard(state.actionCards, payload),
    };
}

function addAgenda(state, { payload }) {
    return {
        ...state,
        agendas: AddAgenda(state.agendas, payload),
    };
}

function removeAgenda(state, { payload }) {
    return {
        ...state,
        agendas: RemoveAgenda(state.agendas, payload),
    };
}

function electOutcome(state, { payload }) {
    return {
        ...state,
        agendas: ElectOutcome(state.agendas, payload.agenda, payload.outcome),
    };
}

function setPhaseTab(state, { payload }) {
    return {
        ...state,
        phaseTab: payload,
    };
}

function setCombatTab(state, { payload }) {
    return {
        ...state,
        combatTab: payload,
    };
}

function addPromissory(state, { payload }) {
    return {
        ...state,
        promissoryNotes: AddPromissory([...state.promissoryNotes], payload),
    };
}

function removePromissory(state, { payload }) {
    return {
        ...state,
        promissoryNotes: RemovePromissory([...state.promissoryNotes], payload),
    };
}

function setPromissoryColour(state, { payload }) {
    return {
        ...state,
        promissoryNotes: SetPromissoryColour(
            [...state.promissoryNotes],
            payload.note,
            payload.colour
        ),
    };
}

function setPromissoryAttached(state, { payload }) {
    return {
        ...state,
        promissoryNotes: SetAttachment(
            [...state.promissoryNotes],
            payload.note,
            payload.attachment
        ),
    };
}

function addExplorationCard(state, { payload }) {
    return {
        ...state,
        explorationCards: AddExplorationCard(state.explorationCards, payload),
    };
}

function removeExplorationCard(state, { payload }) {
    return {
        ...state,
        explorationCards: RemoveExplorationCard(
            state.explorationCards,
            payload
        ),
    };
}

function setAttachedPlanetExploration(state, { payload }) {
    return {
        ...state,
        explorationCards: SetAttachedPlanetExploration(
            state,
            payload.cardType,
            payload.planet
        ),
    };
}

function setAttachedPlanetRelic(state, { payload }) {
    return {
        ...state,
        relics: SetAttachedPlanetRelic(
            { ...state.relics },
            payload.card,
            payload.planet
        ),
    };
}

function addRelic(state, { payload }) {
    return {
        ...state,
        relics: AddRelic(state.relics, payload),
    };
}

function removeRelic(state, { payload }) {
    return {
        ...state,
        relics: RemoveRelic(state.relics, payload),
    };
}

function exhaustRelic(state, { payload }) {
    return {
        ...state,
        relics: ExhaustRelic(
            { ...state.relics },
            payload.relic,
            payload.exhaust
        ),
    };
}

function setLookupFaction(state, { payload }) {
    return {
        ...state,
        lookupFaction: payload,
    };
}

function addLookupFaction(state, { payload }) {
    return {
        ...state,
        lookupFactionList: [...state.lookupFactionList, payload].sortFactionTitles(),
    };
}

function removeLookupFaction(state, { payload }) {
    return {
        ...state,
        lookupFactionList: state.lookupFactionList.filter(
            (lf) => lf.id !== payload.id
        ),
    };
}

function setCodex(state, { payload }) {
    return {
        ...state,
        codex: AddCodex(state.codex, payload)
    }
}

function removeCodex(state, { payload }) {
    return {
        ...state,
        codex: RemoveCodex(state.codex, payload)
    }
}

function setStartingFaction(state, { payload }) {
    return SetStartingFaction(state, payload);
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
    [Types.SETPOK]: setPok,
    [Types.SETGAMESTARTED]: setGameStarted,
    [Types.SETFACTION]: setFaction,
    [Types.SETUNITAVAILABLE]: setUnitAvailable,
    [Types.APPENDUNITABILITY]: appendUnitAbilities,
    [Types.REMOVEEXTRAABILITY]: removeExtraAbility,
    [Types.SETUNITPROPERTIES]: setUnitProperties,
    [Types.SETEXTRAVICTORYPOINTS]: setExtraVictoryPoints,
    [Types.SETTECH]: setTech,
    [Types.ADDTECH]: addTech,
    [Types.REMOVETECH]: removeTech,
    [Types.ADDPLANET]: addPlanet,
    [Types.EXHAUSTPLANET]: exhaustPlanets,
    [Types.REMOVEPLANET]: removePlanet,
    [Types.EXHAUSTLEGENDARY]: exhaustLegendaryAbility,
    [Types.SETPLANET]: setPlanet,
    [Types.ADDOBJECTIVE]: addObjective,
    [Types.COMPLETEOBJECTIVE]: completeObjective,
    [Types.REMOVEOBJECTIVE]: removeObjective,
    [Types.ADDACTIONCARD]: addActionCard,
    [Types.REMOVEACTIONCARD]: removeActionCard,
    [Types.ADDAGENDA]: addAgenda,
    [Types.REMOVEAGENDA]: removeAgenda,
    [Types.ELECTOUTCOME]: electOutcome,
    [Types.SETPHASETAB]: setPhaseTab,
    [Types.SETCOMBATTAB]: setCombatTab,
    [Types.RESETGAME]: resetGame,
    [Types.ADDPROMISSORY]: addPromissory,
    [Types.REMOVEPROMISSORY]: removePromissory,
    [Types.SETPROMISSORYCOLOUR]: setPromissoryColour,
    [Types.SETPROMISSORYATTACHED]: setPromissoryAttached,
    [Types.ADDEXPLORATIONCARD]: addExplorationCard,
    [Types.REMOVEEXPLORATIONCARD]: removeExplorationCard,
    [Types.SETATTACHEDPLANETEXPLORATION]: setAttachedPlanetExploration,
    [Types.SETATTACHEDPLANETRELIC]: setAttachedPlanetRelic,
    [Types.ADDRELIC]: addRelic,
    [Types.REMOVERELIC]: removeRelic,
    [Types.EXHAUSTRELIC]: exhaustRelic,
    [Types.SETLOOKUPFACTION]: setLookupFaction,
    [Types.ADDLOOKUPFACTION]: addLookupFaction,
    [Types.REMOVELOOKUPFACTION]: removeLookupFaction,
    [Types.SETCODEX]: setCodex,
    [Types.REMOVECODEX]: removeCodex,
    [Types.SETSTARTINGFACTION]: setStartingFaction
});
