import { setFaction, setLookupFaction, setTech } from "../store/Actions";
import { useStore } from "../store/Store";
import Factions from "../data/factions.json";
import AutoSuggestionInput from "./AutoSuggestionInput";

function FactionList(props) {
    const [state, dispatch] = useStore();

    let factionList = state.pok
        ? Factions
        : Factions.filter((f) => f.pok !== true);

    if (state.faction) {
        factionList = factionList.filter((f) => f.id !== state.faction.id);
    }

    factionList.sortFactionTitles();

    return (
        <AutoSuggestionInput
            items={factionList}
            setValue={(item) => {
                if (props.isNewGame) {
                    dispatch(setFaction(item));
                    dispatch(setTech(item.tech));
                } else {
                    dispatch(setLookupFaction(item));
                }
            }}
            placeholder={props.searchPlaceholder}
        />
    );
}

export default FactionList;
