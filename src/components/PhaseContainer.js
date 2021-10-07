import Container from "react-bootstrap/Container";
import { useStore } from "../store/Store";
import DividerText from "./DividerText";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import { GetAgendasForPhase } from "../lib/Agenda";
import { GetActionCardsForPhase } from "../lib/ActionCard";
import { GetTechnologiesForPhase } from "../lib/Technology";
import { GetObjectivesForPhase } from "../lib/Objective";
import {
    GetAbilitiesForPhase,
    GetSpecialUnitsAndLeadersForPhase,
} from "../lib/Faction";
import { GetPromissoryNotesForPhase } from "../lib/PromissoryNote";
import { GetLegendaryAbilitiesForPhase } from "../lib/Planet";
import { GetExplorationAbilitiesForPhase } from "../lib/Exploration";
import { GetRelicsForPhase } from "../lib/Relic";

function PhaseContainer(props) {
    const [state, dispatch] = useStore();

    const agendas = GetAgendasForPhase(state.agendas, props.phase).filter(
        (a) => a.elected
    );

    const actionCards = GetActionCardsForPhase(state.actionCards, props.phase);

    const technologies = GetTechnologiesForPhase(
        state.technologies,
        props.phase
    );

    const objectives = GetObjectivesForPhase(
        state.objectives,
        props.phase
    ).filter((o) => !o.isComplete);

    const abilities = GetAbilitiesForPhase(
        state.faction.abilities,
        props.phase
    );

    const promissoryNotes = GetPromissoryNotesForPhase(
        state.promissoryNotes,
        props.phase
    ).filter((p) => p.colour || p.factionId);

    const units = GetSpecialUnitsAndLeadersForPhase(
        state.faction,
        props.phase,
        state.pok
    ).filter((u) => u.available);

    const legendaryAbilities = GetLegendaryAbilitiesForPhase(
        state.planets,
        props.phase
    ).filter((a) => !a.isExhausted);

    const exploration = GetExplorationAbilitiesForPhase(
        state.explorationCards,
        props.phase
    );

    const relics = GetRelicsForPhase(state.relics, props.phase);

    return (
        <Container>
            {abilities.map((ability, i) => (
                <div key={i} className="mt-3">
                    <span className="light-text">
                        <strong>{ability.title}</strong> - {ability.description}
                    </span>
                </div>
            ))}

            <ScrollableCardList cardList={units} cardType={CardType.Unit} />

            {Object.keys(actionCards).length > 0 ? (
                <>
                    <DividerText title="Action Cards" />
                    <ScrollableCardList
                        cardList={Object.entries(actionCards)}
                        cardType={CardType.Action}
                    />
                </>
            ) : null}

            {technologies.length > 0 ? (
                <>
                    <DividerText title="Technology" />
                    <ScrollableCardList
                        cardList={technologies}
                        cardType={CardType.Technology}
                    />
                </>
            ) : null}

            {agendas.length > 0 ? (
                <>
                    <DividerText title="Agendas" />
                    <ScrollableCardList
                        cardList={agendas}
                        cardType={CardType.Agenda}
                    />
                </>
            ) : null}

            {objectives.length > 0 ? (
                <>
                    <DividerText title="Objectives" />
                    <ScrollableCardList
                        cardList={objectives}
                        cardType={CardType.Objective}
                    />
                </>
            ) : null}

            {promissoryNotes.length > 0 ? (
                <>
                    <DividerText title="Promissory Notes" />
                    <ScrollableCardList
                        cardList={promissoryNotes}
                        cardType={CardType.PromissoryNote}
                    />
                </>
            ) : null}

            {legendaryAbilities.length > 0 ? (
                <>
                    <DividerText title="Legendary Planet Abilities" />
                    <ScrollableCardList
                        cardList={legendaryAbilities}
                        cardType={CardType.LegendaryAbility}
                    />
                </>
            ) : null}

            {exploration.length > 0 ? (
                <>
                    <DividerText title="Exploration Cards" />
                    <ScrollableCardList
                        cardList={exploration}
                        cardType={CardType.Exploration}
                    />
                </>
            ) : null}

            {Object.keys(relics).length > 0 ? (
                <>
                    <DividerText title={"Relics & Fragments"} />
                    <ScrollableCardList
                        cardList={Object.entries(relics)}
                        cardType={CardType.Relic}
                    />
                </>
            ) : null}
        </Container>
    );
}

export default PhaseContainer;
