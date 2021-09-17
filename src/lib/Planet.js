const Cultural = "Cultural";
const Hazardous = "Hazardous";
const Industrial = "Industrial";

export const Categories = { Cultural, Hazardous, Industrial };

export function GetPlanetVariantColour(trait) {
    let variant = {};

    switch (trait) {
        case Industrial:
            variant = { colour: "success", text: "white" }; // Green
            break;
        case Hazardous:
            variant = { colour: "danger", text: "white" }; // Red
            break;
        case Cultural:
            variant = { colour: "primary", text: "white" }; // Blue
            break;
        default:
            variant = { colour: "dark", text: "white" }; // Unknown (faction?)
            break;
    }

    return variant;
}

export function UpdateResources(planets) {
    return planets.length > 0
        ? planets.map((p) => p.resource).reduce((a, b) => a + b, 0)
        : 0;
}

export function UpdateInfluence(planets) {
    return planets.length > 0
        ? planets.map((p) => p.influence).reduce((a, b) => a + b, 0)
        : 0;
}

export function AddPlanet(state, planet) {
    const planets = [...state.planets, planet];
    const resources = UpdateResources(planets);
    const influence = UpdateInfluence(planets);

    return {
        ...state,
        availableResources: resources,
        totalResources: resources,
        availableInfluence: influence,
        totalInfluence: influence,
        planets: planets,
    };
}

export function ExhaustPlanets(state, { planets, exhaust }) {
    const existingPlanets = state.planets;

    planets.forEach((planet) => {
        const index = state.planets.findIndex((p) => p.id === planet.id);
        if (index === -1) return; // we have removed the planet and should not continue
        existingPlanets[index].isExhausted = exhaust;
    });

    const available = existingPlanets.filter((p) => !p.isExhausted);

    return {
        ...state,
        planets: existingPlanets,
        availableResources: UpdateResources(available),
        availableInfluence: UpdateInfluence(available),
    };
}

export function RemovePlanet(state, planet) {
    const planets = state.planets.filter((p) => p.id !== planet.id);
    const readyPlanets = planets.filter((p) => !p.isExhausted);

    return {
        ...state,
        planets: planets,
        availableResources: UpdateResources(readyPlanets),
        totalResources: UpdateResources(planets),
        availableInfluence: UpdateInfluence(readyPlanets),
        totalInfluence: UpdateInfluence(planets),
    };
}
