import Technologies from "../data/technologies.json";

export const categories = ["Cybernetic", "Propulsion", "Biotic", "Warfare", "Upgrade"];

// takes an array of integer ids
export const SetTech = (techIds) => {
    return Technologies.filter((t) => techIds.includes(t.id));
}

// take current tech array
// and an array of integer ids
export const UpdateTech = (initialTech, techIds) => {
    return SetTech(techIds).concat(
        initialTech
    );
};
