export const Codex = {
    Ordinian: 1,
    Affinity: 2,
    Vigil: 3
}

export function AddCodex(codexes, codexId) {
    return [...codexes, codexId];
}

export function RemoveCodex(codexes, codexId) {
    return codexes.filter((c) => c !== codexId);
}