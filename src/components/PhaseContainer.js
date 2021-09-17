import Container from "react-bootstrap/Container";
import { useStore } from "../store/Store";
import DividerText from "./DividerText";
import ScrollableCardList, { CardType } from "./ScrollableCardList";
import { GetAgendasForPhase } from "../lib/Agenda";
import { GetActionCardsForPhase } from "../lib/ActionCard";
import { GetTechnologiesForPhase } from "../lib/Technology";
import { GetObjectivesForPhase } from "../lib/Objective";

function PhaseContainer(props) {
    const [state, dispatch] = useStore();
    const agendas = GetAgendasForPhase(state.agendas, props.phase).filter(a => a.elected);
    const actionCards = GetActionCardsForPhase(state.actionCards, props.phase);
    const technologies = GetTechnologiesForPhase(
        state.technologies,
        props.phase
    );
    const objectives = GetObjectivesForPhase(state.objectives, props.phase).filter(o => !o.isComplete);

    return (
        <Container>
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
        </Container>
    );
}

export default PhaseContainer;
