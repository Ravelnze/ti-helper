import Planets from "../data/planets.json";
import { UpdateInfluence, UpdateResources } from "./Planet";

export function SetFaction(state, faction) {
    const planets = Planets.filter((planet) =>
        faction?.planets.includes(planet.id)
    );
    const resources = UpdateResources(planets);
    const influence = UpdateInfluence(planets);

    return {
        ...state,
        availableResources: resources,
        totalResources: resources,
        availableInfluence: influence,
        totalInfluence: influence,
        planets: planets,
        faction: faction,
    };
}
