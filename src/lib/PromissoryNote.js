import { v4 as uuidv4 } from "uuid";
import { Codex } from "./Codices";

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

export function ReplaceCodexPromissories(promissoryNotes, codex) {
    promissoryNotes.forEach(pn => {
        if (codex.includes(Codex.Ordinian) && pn.replaces) {
            promissoryNotes = promissoryNotes.filter(p => !(p.id === pn.replaces));
        }
        else if (!codex.includes(Codex.Ordinian)) {
            promissoryNotes = promissoryNotes.filter(p => !p.codex)
        }
    });

    return promissoryNotes;
}