export const Categories = {
    Stage1: "Stage 1",
    Stage2: "Stage 2",
    Secret: "Secret",
};
export const PublicCategories = {
    Stage1: Categories.Stage1,
    Stage2: Categories.Stage2,
};

export function GetObjectiveVariantColour(cat) {
    let variant = {};

    switch (cat) {
        case Categories.Stage1:
            variant = { colour: "warning", text: "dark" }; // Yellow
            break;
        case Categories.Secret:
            variant = { colour: "danger", text: "white" }; // Red
            break;
        case Categories.Stage2:
            variant = { colour: "primary", text: "white" }; // Blue
            break;
        default:
            variant = { colour: "dark", text: "white" }; // Unknown
            break;
    }

    return variant;
}

export function GetTotalPublicObjectives(objectives) {
    return objectives.filter((o) =>
        [Categories.Stage1, Categories.Stage2].includes(o.cat)
    );
}

export function GetCompletedPublicObjectives(objectives) {
    return objectives.filter(
        (o) =>
            [Categories.Stage1, Categories.Stage2].includes(o.cat) &&
            o.isComplete
    );
}

export function GetTotalSecretObjectives(objectives) {
    return objectives.filter((o) => o.cat === Categories.Secret);
}

export function GetCompletedSecretObjectives(objectives) {
    return objectives.filter(
        (o) => o.cat === Categories.Secret && o.isComplete
    );
}

export function GetCompletedObjectivesPoints(objectives) {
    return GetCompletedPublicObjectives(objectives)
        .concat(GetCompletedSecretObjectives(objectives))
        .map((o) => o.points)
        .reduce((a, b) => a + b, 0);
}

export function AddObjective(objectives, objective) {
    return [...objectives, objective];
}

export function CompleteObjective(objectives, objective, completed) {
    const index = objectives.findIndex((o) => o.id === objective.id);
    if (index === -1) return objectives; // we have removed the objective and should not continue
    const currentObjectives = objectives;
    currentObjectives[index].isComplete = completed;

    return currentObjectives;
}

export function RemoveObjective(objectives, objective) {
    return objectives.filter((o) => o.id !== objective.id);
}

export function GetObjectivesForPhase(objectives, phase) {
    return objectives.filter((o) =>
        o.phase.some((p) => ["Any", phase].includes(p))
    );
}
