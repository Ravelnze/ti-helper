import Technologies from "../data/technologies.json";

export const Cybernetic = "Cybernetic";
export const Propulsion = "Propulsion";
export const Biotic = "Biotic";
export const Warfare = "Warfare";
export const Upgrade = "Upgrade";

export const categories = [Cybernetic, Propulsion, Biotic, Warfare, Upgrade];

export function GetTechVariantColour(category) {
    let variant = {};

    switch (category) {
        case Cybernetic:
            variant = { colour: "warning", text: "dark" }; // Yellow
            break;
        case Biotic:
            variant = { colour: "success", text: "white" }; // Green
            break;
        case Warfare:
            variant = { colour: "danger", text: "white" }; // Red
            break;
        case Propulsion:
            variant = { colour: "primary", text: "white" }; // Blue
            break;
        default:
            variant = { colour: "dark", text: "white" }; // Unknown (faction?)
            break;
    }

    return variant;
}

// takes an array of integer ids
export const SetTech = (techIds) => {
    return Technologies.filter((t) => techIds.includes(t.id));
};

export function AddTech(currentTech, newTech) {
    return [...currentTech, newTech];
}

export function RemoveTech(currentTech, tech) {
    return currentTech.filter(t => t.id !== tech.id);
}