import { v4 as uuidv4 } from "uuid";

export const Categories = {
    Strategy: "Strategy",
    Action: "Action",
    Status: "Status",
    Agenda: "Agenda",
    GroundCombat: "GroundCombat",
    SpaceCombat: "SpaceCombat",
};

export function AddActionCard(actionCards, actionCard) {
    actionCard.instanceId = uuidv4();

    if (actionCards[actionCard.id]) {
        actionCards[actionCard.id].push(actionCard);
    } else {
        actionCards[actionCard.id] = [actionCard];
    }

    return actionCards;
}

export function RemoveActionCard(actionCards, actionCard) {
    if (!actionCards[actionCard.id]) {
        return actionCards;
    }

    actionCards[actionCard.id] = actionCards[actionCard.id].filter(
        (ac) => ac.instanceId !== actionCard.instanceId
    );

    if (actionCards[actionCard.id].length === 0) {
        delete actionCards[actionCard.id];
    }

    return actionCards;
}

export function GetTotalActionCardCount(actionCards) {
    let count = 0;
    for (let key of Object.keys(actionCards)) {
        count += actionCards[key].length;
    }

    return count;
}

export function GetActionCardsForPhase(actionCards, phase) {
    const cards = {};

    for (let key of Object.keys(actionCards)) {
        if (actionCards[key][0].phase.some(p => ["Any", phase].includes(p))) {
            cards[key] = actionCards[key];
        }
    }

    return cards;
}
