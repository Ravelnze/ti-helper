import Factions from "../data/factions.json";
import { UnitType } from "./Faction";
import { v4 as uuidv4 } from "uuid";

const typeLists = {
    Faction: Factions,
};

export function GetUpdateableValueList(type) {
    switch (type) {
        case UnitType.Agent:
            return typeLists["Faction"];
        default:
            return;
    }
}

export function MapValuesFromType(type, obj) {
    switch (type) {
        case UnitType.Agent:
        case UnitType.Commander:
        case UnitType.Hero:
            return obj.leaders
                .filter((l) => l.type === type)
                .map((leader) => ({
                    faction: obj.title,
                    instanceId: uuidv4(),
                    leader,
                }));
        default:
            console.warn(`Unknown value type: ${type}`);
            return;
    }
}

export function AppendUnitAbilities(state, unit, abilities) {
    if (!abilities) return state;

    let updateUnit = {};

    switch (unit.type) {
        case UnitType.Mech:
            updateUnit = state.faction.mech;
            updateUnit.extraAbilities = updateUnit.extraAbilities
                ? updateUnit.extraAbilities.concat(abilities)
                : abilities;
            return {
                ...state,
                faction: { ...state.faction, mech: updateUnit },
            };
        case UnitType.Flagship:
            updateUnit = state.faction.flagship;
            updateUnit.extraAbilities = updateUnit.extraAbilities
                ? updateUnit.extraAbilities.concat(abilities)
                : abilities;
            return {
                ...state,
                faction: { ...state.faction, flagship: updateUnit },
            };
        case UnitType.Agent:
        case UnitType.Commander:
        case UnitType.Hero:
            const leaders = [...state.faction.leaders];
            const index = leaders.findIndex(
                (l) => l.type === unit.type && l.title === unit.title
            );
            leaders[index].extraAbilities = leaders[index].extraAbilities
                ? leaders[index].extraAbilities.concat(abilities)
                : abilities;

            return {
                ...state,
                faction: {
                    ...state.faction,
                    leaders: leaders,
                },
            };
        default:
            console.warn(`Unknown unit type: ${unit.type}`);
            return state;
    }
}

export function RemoveExtraAbility(state, type, unit, instanceId) {
    let updateUnit = null;

    switch (type) {
        case UnitType.Mech:
            updateUnit = state.mech;
            updateUnit.extraAbilities = updateUnit.extraAbilities.filter(
                (ea) => ea.instanceId !== instanceId
            );
            return {
                ...state,
                mech: updateUnit,
            };
        case UnitType.Flagship:
            updateUnit = state.flagship;
            updateUnit.extraAbilities = updateUnit.extraAbilities.filter(
                (ea) => ea.instanceId !== instanceId
            );
            return {
                ...state,
                flagship: updateUnit,
            };
        case UnitType.Agent:
        case UnitType.Commander:
        case UnitType.Hero:
            const leaders = [...state.faction.leaders];
            const index = leaders.findIndex(
                (l) => l.type === unit.type && l.title === unit.title
            );
            leaders[index].extraAbilities = leaders[
                index
            ].extraAbilities.filter((ea) => ea.instanceId !== instanceId);

            return {
                ...state,
                faction: {
                    ...state.faction,
                    leaders: leaders,
                },
            };
        default:
            console.warn(`Unknown value type: ${type}`);
            return state;
    }
}
