import Factions from "../data/factions.json";
import Agendas from "../data/agendas.json";
import Objectives from "../data/objectives.json";
import Planets from "../data/planets.json";

import {
    PublicCategories,
    Categories as ObjectiveCategories,
} from "./Objective";
import { Category as PlanetCategories } from "./Planet";

export const Primary = {
    Player: "Player",
    Agenda: "Agenda",
    Objective: "Objective",
    Planet: "Planet",
};

export const Secondary = {
    Objective: { Secret: "Secret", Public: "Public" },
    Planet: {
        Hazardous: "Hazardous",
        Cultural: "Cultural",
        Industrial: "Industrial",
    },
};

export const Gain = {
    VP: "Victory Point",
    Attach: "Attach",
    Resource: "Resource",
    Influence: "Influence",
    IgnorePrerequisite: "Ignore Prerequisite",
    UseProduction: "Use Production",
    UseActionCards: "Use Action Cards",
};

export function AddAgenda(agendas, agenda) {
    return [...agendas, agenda];
}

export function RemoveAgenda(agendas, agenda) {
    return agendas.filter((a) => a.id !== agenda.id);
}

export function DetermineElectType(agenda) {
    switch (agenda.electPrimary) {
        case Primary.Player:
            return Factions;
        case Primary.Agenda:
            return Agendas;
        case Primary.Objective:
            switch (agenda.electSecondary) {
                case Secondary.Objective.Secret:
                    return Objectives.filter(
                        (o) => o.cat === ObjectiveCategories.Secret
                    );
                case Secondary.Objective.Public:
                    return Objectives.filter((o) =>
                        PublicCategories.includes(o.cat)
                    );
                default:
                    console.error(
                        `Unknown secondary elect for Objective type "${agenda.electSecondary}"`
                    );
                    return [];
            }
        case Primary.Planet:
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
    const filteredAgendas = agendas.filter(
        (a) =>
            a.elected &&
            a.electPrimary === Primary.Player &&
            a.elected.id === faction.id
    );

    return filteredAgendas.length > 0
        ? filteredAgendas
              ?.map((a) => a.gain)
              ?.reduce((g) => g)
              ?.filter((g) => g.cat === Gain.VP)
              ?.map((g) => g.value)
              ?.reduce((a, b) => a + b) ?? 0
        : 0;
}

export function GetAgendasForPhase(agendas, phase) {
    return agendas.filter((a) => ["Any", phase].includes(a.phase));
}
