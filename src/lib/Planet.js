export const Category = {
    Cultural: "Cultural",
    Hazardous: "Hazardous",
    Industrial: "Industrial",
};

const AttachType = {
    dmz: "dmz",
    tradeable: "tradeable",
    resource: "resource",
    influence: "influence",
    vp: "vp",
    techSpecialty: "techSpecialty",
    terraform: "terraform",
    geoform: "geoform",
    ability: "ability"
};

export const AttachmentCardType = {
    Exploration: "Exploration",
    Agenda: "Agenda",
    Promissory: "Promissory",
    Unit: "Unit",
};

export function GetPlanetVariantColour(trait) {
    let variant = {};

    switch (trait) {
        case Category.Industrial:
            variant = { colour: "success", text: "white" }; // Green
            break;
        case Category.Hazardous:
            variant = { colour: "danger", text: "white" }; // Red
            break;
        case Category.Cultural:
            variant = { colour: "primary", text: "white" }; // Blue
            break;
        default:
            variant = { colour: "dark", text: "white" }; // Unknown (faction?)
            break;
    }

    return variant;
}

export function UpdateResources(planets) {
    return {
        availableResources:
            planets.length > 0
                ? planets
                      .filter((p) => !p.isExhausted)
                      .map((p) => p.resource)
                      .reduce((a, b) => a + b, 0)
                : 0,
        totalResources:
            planets.length > 0
                ? planets.map((p) => p.resource).reduce((a, b) => a + b, 0)
                : 0,
    };
}

export function UpdateInfluence(planets) {
    return {
        availableInfluence:
            planets.length > 0
                ? planets
                      .filter((p) => !p.isExhausted)
                      .map((p) => p.influence)
                      .reduce((a, b) => a + b, 0)
                : 0,
        totalInfluence:
            planets.length > 0
                ? planets.map((p) => p.influence).reduce((a, b) => a + b, 0)
                : 0,
    };
}

export function AddPlanet(state, planet) {
    const newPlanet = {...planet};
    newPlanet.attachments = [];
    newPlanet.extraIcons = [];
    const planets = [...state.planets, newPlanet];
    const legendaryAbilities = [...state.legendaryPlanetAbilities];
    if (newPlanet.legendaryAbility) {
        const ability = newPlanet.legendaryAbility;
        ability.planetTitle = newPlanet.title;
        ability.isExhausted = false;
        legendaryAbilities.push(newPlanet.legendaryAbility);
    }

    return {
        ...state,
        planets: planets,
        legendaryPlanetAbilities: legendaryAbilities,
        ...UpdateResources(planets),
        ...UpdateInfluence(planets),
    };
}

export function ExhaustPlanets(state, { planets, exhaust }) {
    const existingPlanets = [...state.planets];

    planets.forEach((planet) => {
        const index = state.planets.findIndex((p) => p.id === planet.id);
        if (index === -1) return; // we have removed the planet and should not continue
        existingPlanets[index].isExhausted = exhaust;
    });

    return {
        ...state,
        planets: existingPlanets,
        ...UpdateResources(existingPlanets),
        ...UpdateInfluence(existingPlanets),
    };
}

export function RemovePlanet(state, planet) {
    const planets = state.planets.filter((p) => p.id !== planet.id);
    const legendaryAbilities = state.legendaryPlanetAbilities.filter(
        (la) => la.title !== planet?.legendaryAbility?.title
    );
    const explorationCards = state.explorationCards.filter(
        (ec) =>
            !planet.attachments
                .filter((a) => a.type === AttachmentCardType.Exploration)
                .map((a) => a.id)
                .includes(ec.id)
    );
    const agendas = state.agendas.filter(
        (ag) =>
            !planet.attachments
                .filter((a) => a.type === AttachmentCardType.Agenda)
                .map((a) => a.id)
                .includes(ag.id)
    );
    const promissoryNotes = state.promissoryNotes.filter(
        (pn) =>
            !planet.attachments
                .filter((a) => a.type === AttachmentCardType.Promissory)
                .map((a) => a.id)
                .includes(pn.id)
    );

    return {
        ...state,
        planets: planets,
        legendaryPlanetAbilities: legendaryAbilities,
        explorationCards: explorationCards,
        agendas: agendas,
        promissoryNotes: promissoryNotes,
        ...UpdateResources(planets),
        ...UpdateInfluence(planets),
    };
}

export function GetLegendaryAbilitiesForPhase(planets, phase) {
    return planets
        .filter(
            (pl) =>
                pl.legendaryAbility &&
                pl.legendaryAbility.phase.some((p) =>
                    ["Any", phase].includes(p)
                )
        )
        .map((planet) => planet.legendaryAbility);
}

export function ExhaustLegendaryAbility(state, { ability, exhaust }) {
    const abilities = [...state.legendaryPlanetAbilities];

    const index = state.legendaryPlanetAbilities.findIndex(
        (lpa) => lpa.title === ability.title
    );
    if (index === -1) return; // This ability doesn't exist in the list
    abilities[index].isExhausted = exhaust;

    return {
        ...state,
        legendaryPlanetAbilities: abilities,
    };
}

export function SetPlanet(state, planet) {
    const index = state.planets.findIndex((p) => p.id === planet?.id);
    if (index === -1) return state.planets; // Planet does not exist

    const planets = [...state.planets];
    planets[index] = planet;

    return {
        ...state,
        planets: planets,
        ...UpdateResources(planets),
        ...UpdateInfluence(planets),
    };
}

export function AugmentPlanet(
    attachmentCard,
    attachmentType,
    planet,
    attaching
) {
    if (!planet) {
        return;
    }

    attachmentCard.effects.forEach((attachment) => {
        switch (attachment.type) {
            case AttachType.resource:
                if (attaching) {
                    planet.attachments.push({
                        id: attachmentCard.id,
                        type: attachmentType,
                    });
                    planet.resource += attachment.value;
                } else {
                    planet.attachments = planet.attachments.filter(
                        (a) =>
                            a.id !== attachmentCard.id &&
                            a.attachmentType === attachmentType
                    );
                    planet.resource -= attachment.value;
                }
                break;
            case AttachType.influence:
                if (attaching) {
                    planet.attachments.push({
                        id: attachmentCard.id,
                        type: attachmentType,
                    });
                    planet.influence += attachment.value;
                } else {
                    planet.attachments = planet.attachments.filter(
                        (a) =>
                            a.id !== attachmentCard.id &&
                            a.attachmentType === attachmentType
                    );
                    planet.influence -= attachment.value;
                }
                break;
            case AttachType.techSpecialty:
                if (attaching) {
                    planet.attachments.push({
                        id: attachmentCard.id,
                        type: attachmentType,
                    });
                    if (planet.techSpecialty) {
                        planet.resource += 1;
                        planet.influence += 1;
                    } else {
                        planet.techSpecialty = attachment.value;
                        planet.addedAttachedSpecialty = attachment.value;
                    }
                } else {
                    planet.attachments = planet.attachments.filter(
                        (a) =>
                            a.id !== attachmentCard.id &&
                            a.attachmentType === attachmentType
                    );
                    if (planet.addedAttachedSpecialty === attachment.value) {
                        planet.techSpecialty = null;
                    } else {
                        planet.resource -= 1;
                        planet.influence -= 1;
                    }
                }
                break;
            case AttachType.ability: // Titans hero
                if (attaching) {
                    planet.abilities = [attachment.value];
                } else {
                    planet.abilities.filter(a => a.id !== attachment.value.id);
                }
                break;
            case AttachType.vp:
            case AttachType.dmz:
            case AttachType.terraform: // Titans promissory
            case AttachType.geoform: // Titans hero
                if (attaching) {
                    planet.attachments.push({
                        id: attachmentCard.id,
                        type: attachmentType,
                    });
                    planet.extraIcons.push(attachment.image);
                } else {
                    planet.attachments = planet.attachments.filter(
                        (a) =>
                            a.id !== attachmentCard.id &&
                            a.attachmentType === attachmentType
                    );
                    planet.extraIcons = planet.extraIcons.filter(
                        (ei) => ei !== attachment.image
                    );
                }
                break;
            default:
                console.warn(`Unknown attach type ${attachment.type}.`);
                break;
        }
    });

    return planet;
}
