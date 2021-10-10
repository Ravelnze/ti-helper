import Planets from "../data/planets.json";
import { UpdateInfluence, UpdateResources } from "./Planet";

export const UnitType = {
    Flagship: "Flagship",
    Mech: "Mech",
    Agent: "Agent",
    Commander: "Commander",
    Hero: "Hero",
};

export function GetAbilitiesForPhase(abilities, phase) {
    if (!abilities) {
        return [];
    }

    // Setup should not include in-game effects
    const phases = phase === "Setup" ? [phase] : ["Any", phase];

    const ab = abilities.filter((a) =>
        a.phase.some((p) => phases.includes(p))
    );

    return ab;
}

export function SetFaction(state, faction) {
    const planets = Planets.filter((planet) =>
        faction?.planets.includes(planet.id)
    );
    planets.forEach((planet) => {
        planet.extraIcons = [];
        planet.attachments = [];
    });

    return {
        ...state,
        ...UpdateResources(planets),
        ...UpdateInfluence(planets),
        planets: planets,
        faction: faction,
    };
}

export function GetSpecialUnitsAndLeaders(faction, pok) {
    const unitList = [];
    const flagship = faction.flagship;
    flagship.type = UnitType.Flagship;
    unitList.push(flagship);

    if (!pok) {
        return unitList;
    }

    const mech = faction.mech;
    mech.type = UnitType.Mech;
    unitList.push(mech);

    const leaders = faction.leaders;
    leaders.forEach((leader) => {
        unitList.push(leader);
    });

    return unitList;
}

export function GetSpecialUnitsAndLeadersForPhase(faction, phase, pok) {
    return GetSpecialUnitsAndLeaders(faction, pok).filter((u) =>
        u.specialAbility.phase.some((p) => ["Any", phase].includes(p))
    );
}

export function SetUnitAvailable(faction, unit, available) {
    switch (unit.type) {
        case UnitType.Agent:
        case UnitType.Commander:
        case UnitType.Hero:
            const index = faction.leaders.findIndex(
                (l) => l.type === unit.type && l.title === unit.title
            );
            if (index !== -1) {
                faction.leaders[index].available = available;
            }
            break;
        case UnitType.Mech:
            faction.mech.available = available;
            break;
        case UnitType.Flagship:
            faction.flagship.available = available;
            break;
        default:
            console.warn(`Unknown unit type ${unit.type}`);
            break;
    }

    return faction;
}
