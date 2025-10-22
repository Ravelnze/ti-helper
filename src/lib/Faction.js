import Planets from "../data/planets.json";
import Factions from '../data/factions.json';
import { GetPlanetsByIds, UpdateInfluence, UpdateResources } from "./Planet";
import { Codex } from "./Codices";

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

    const ab = abilities.filter((a) =>
        a.phase.some((p) => ["Any", phase].includes(p))
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

export function GetSpecialUnitsAndLeaders(faction, pok, codex) {
    const unitList = [];
    const flagship = faction.flagship;
    flagship.type = UnitType.Flagship;
    unitList.push(flagship);

    if (!pok) {
        return unitList;
    }

    const mech = codex && faction.altMech ? faction.altMech : faction.mech;
    mech.type = UnitType.Mech;
    unitList.push(mech);

    const leaders = faction.leaders;
    leaders.forEach((leader) => {
        if (codex && leader.codex && leader.codex.includes(Codex.Vigil)) {
            const index = unitList.findIndex(l => l.type === leader.type);
            if (index) {
                unitList[index] = leader;
            }
            else {
                unitList.push(leader);
            }
        }
        else if (!leader.codex && !unitList.map(l => l.type).includes(leader.type)) {
            unitList.push(leader);
        }
    });

    return unitList;
}

export function GetSpecialUnitsAndLeadersForPhase(faction, phase, pok, codex) {
    return GetSpecialUnitsAndLeaders(faction, pok, codex).filter((u) =>
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

export function SetStartingFaction(state, {factionId, chosen}) {
    if (chosen) {
        const hero = state.faction.leaders.filter((l) => l.factionId === factionId);
        const leaders = state.faction.leaders.filter((l) => [UnitType.Agent, UnitType.Commander].includes(l.type)).concat(hero)
    
        const planetIds = Factions.find((f) => f.id === factionId).planets;
        const planets = GetPlanetsByIds(Planets, planetIds);
    
        const faction = state.faction;
        faction.leaders = leaders;

        return {
            ...state,
            planets: planets,
            faction: faction,
            keleresFactionChosen: true,
            ...UpdateResources(planets),
            ...UpdateInfluence(planets),
        }
    }

    return {
        ...state,
        keleresFactionChosen: false
    }
}
