import { v4 as uuidv4 } from "uuid";

export function AddPromissory(notes, note) {
    note.instanceId = uuidv4();
    return [...notes, note];
}

export function RemovePromissory(notes, note) {
    return notes.filter((n) => n.instanceId !== note.instanceId);
}

export function SetPromissoryColour(notes, note, colour) {
    const index = notes.findIndex((n) => n.instanceId === note.instanceId);
    if (index === -1) {
        return notes;
    }

    notes[index].colour = colour;
    return notes;
}

export function GetPromissoryNotesForPhase(notes, phase) {
    return notes.filter((n) => !n.attached && n.phase.some((p) => ["Any", phase].includes(p)));
}

export function SetAttachment(notes, note, attachment) {
    const index = notes.findIndex((n) => n.instanceId === note.instanceId);
    if (index === -1) {
        return notes;
    }

    notes[index].attached = attachment;
    return notes;
}
