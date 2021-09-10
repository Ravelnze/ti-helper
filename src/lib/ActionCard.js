const Action = "Action";
const Strategy = "Strategy";
const Agenda = "Agenda";
const Status = "Status";
const GroundCombat = "GroundCombat";
const SpaceCombat = "SpaceCombat";

export const categories = [
    Strategy,
    Action,
    Status,
    Agenda,
    GroundCombat,
    SpaceCombat,
];

export function AddActionCard(actionCards, actionCard) {
    const index = actionCards.findIndex((ac) => ac.id === actionCard.id);

    if (index === -1) {
        // add the new card and set initial count
        actionCard.count = 1;
        return [...actionCards, actionCard];
    }

    actionCards[index].count++;
    return actionCards;
}

export function RemoveActionCard(actionCards, actionCard) {
    if (actionCard.count > 1) {
        const index = actionCards.findIndex((ac) => ac.id === actionCard.id);
        let count = actionCard.count;
        count--;
        console.log(actionCards[0]);
        actionCards[index].count = count;
        console.log(actionCards[0]);
        return actionCards;
    }

    return actionCards.filter((ac) => ac.id !== actionCard.id);
}
