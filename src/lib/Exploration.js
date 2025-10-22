export function AddExplorationCard(explorationCards, card) {
    return [...explorationCards, card];
}

export function RemoveExplorationCard(explorationCards, card) {
    return explorationCards.filter((ec) => ec.id !== card.id);
}

export function SetAttachedPlanetExploration(state, cardType, planet) {
    const index = state.explorationCards.findIndex((ec) => ec.id === cardType.id);
    if (index === -1) return; // card doesn't exist

    const explorationCards = [...state.explorationCards];
    explorationCards[index].attachedPlanet = planet;

    return explorationCards;
}

export function GetExplorationAbilitiesForPhase(explorationCards, phase) {
    return explorationCards
        .filter((ec) =>
            ec.effects.some((e) => ["Any", phase].includes(e.phase))
        )
        .map((ec) => {
            return {
                ...ec,
                description: ec.effects.filter((e) => e.phase === phase)[0]
                    .description,
            };
        });
}
