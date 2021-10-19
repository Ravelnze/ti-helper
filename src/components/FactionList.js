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

    factionList.sort((a, b) => {
        const aTitleParts = a.title.split("The ");
        const aTitle = aTitleParts.length > 1 ? aTitleParts[1] : a.title;

        const bTitleParts = b.title.split("The ");
        const bTitle = bTitleParts.length > 1 ? bTitleParts[1] : b.title;

        return aTitle > bTitle;
    });

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
