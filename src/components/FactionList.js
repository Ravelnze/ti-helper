import { useStore } from "../store/Store";
import Factions from "../data/factions.json";
import FactionCard from "./FactionCard";
import { Col, Row } from "react-bootstrap";
import { Codex } from "../lib/Codices";

function FactionList(props) {
    const [state, ] = useStore();

    let factionList = [];

    if (!props.factionList) {
        factionList = !state.pok 
            ? Factions.filter(f => !f.pok)
            : Factions;

        factionList = !state.codex.includes(Codex.Vigil)
            ? factionList.filter(f => !f.codex?.includes(Codex.Vigil))
            : factionList;

        if (state.faction) {
            factionList = factionList.filter(
                (f) =>
                    f.id !== state.faction.id &&
                    !state.lookupFactionList.map((a) => a.id).includes(f.id)
            );
        }
    } else {
        factionList = Factions.filter((f) => props.factionList.includes(f.id))
    }

    factionList.sortFactionTitles();

    let factions = [];
    // skip every second one and push a new chunk
    for (let i = 0; i < factionList.length; i += 2) {
        const chunk = factionList.slice(i, i + 2);
        factions.push(chunk);
    }

    // Deep copy the factions array
    factions = JSON.parse(JSON.stringify(factions));
    
    return (
        <Row className="mx-auto">
            <Col>
                {factions.map((faction, i) => {
                    return (
                        <Row key={i} className="mb-4">
                            {faction.map((f) => {
                                return (
                                    <Col key={f.id}>
                                        <FactionCard
                                            isNewGame={props.isNewGame}
                                            faction={f}
                                            chooseFaction={props.chooseFaction}
                                        ></FactionCard>
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}
                ;
            </Col>
        </Row>
    );
}

export default FactionList;
