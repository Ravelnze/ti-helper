import Factions from "../data/factions.json";
import Agendas from "../data/agendas.json";
import Objectives from "../data/objectives.json";
import Planets from "../data/planets.json";

import {
    publicCategories,
    Secret as SecretObjectiveCategory,
} from "./Objective";
import { categories as PlanetCategories } from "./Planet";

// Elect
const Objective = "Objective";
const Secret = "Secret";
const Public = "Public";
const Player = "Player";
const Planet = "Planet";
const Hazardous = "Hazardous";
const Cultural = "Cultural";
const Industrial = "Industrial";
const Agenda = "Agenda";

// Gain
const VP = "Victory Point";
const Attach = "Attach";
const Resource = "Resource";
const Influence = "Influence";
const IgnorePrerequisite = "Ignore Prerequisite";
const UseProduction = "Use Production";
const UseActionCards = "Use Action Cards";

export const Primary = [Player, Agenda, Objective, Planet];

export const Secondary = {
    Objective: [Secret, Public],
    Planet: [Hazardous, Cultural, Industrial],
};

export function AddAgenda(agendas, agenda) {
    return [...agendas, agenda];
}

export function RemoveAgenda(agendas, agenda) {
    return agendas.filter((a) => a.id !== agenda.id);
}

export function DetermineElectType(agenda) {
    switch (agenda.electPrimary) {
        case Player:
            return Factions;
        case Agenda:
            return Agendas;
        case Objective:
            switch (agenda.electSecondary) {
                case Secret:
                    return Objectives.filter(
                        (o) => o.cat === SecretObjectiveCategory
                    );
                case Public:
                    return Objectives.filter((o) =>
                        publicCategories.includes(o.cat)
                    );
                default:
                    console.error(
                        `Unknown secondary elect for Objective type "${agenda.electSecondary}"`
                    );
                    return [];
            }
        case Planet:
            if (!PlanetCategories.includes(agenda.electSecondary)) {
                console.error(
                    `Unknown secondary elect for Planet type "${agenda.electSecondary}"`
                );
                return [];
            }
            return Planets.filter((p) => p.trait === agenda.electSecondary);
        default:
            console.error(`Unknown elect type "${agenda.electPrimary}"`);
            return [];
    }
}

export function ElectOutcome(agendas, agenda, outcome) {
    const index = agendas.findIndex((a) => a.id === agenda.id);
    if (index === -1) {
        return agendas;
    }

    agendas[index].elected = outcome;
    return agendas;
}

export function GetVictoryPointsFromAgendas(agendas, faction) {
    const filteredAgendas = agendas.filter(a => a.elected && a.electPrimary === Player && a.elected.id === faction.id);

    return filteredAgendas.length > 0 ? filteredAgendas
        ?.map((a) => a.gain)
        ?.reduce((g) => g)
        ?.filter((g) => g.cat === VP)
        ?.map((g) => g.value)
        ?.reduce((a, b) => a + b) ?? 0 : 0;
}
