import { setFaction, setTech } from "../store/Actions";
import { useStore } from "../store/Store";
import Factions from "../data/factions.json";
import AutoSuggestionInput from "./AutoSuggestionInput";

function FactionList() {
    const [state, dispatch] = useStore();

    const factionList = state.pok
        ? Factions
        : Factions.filter((f) => f.pok !== true);

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
                dispatch(setFaction(item));
                dispatch(setTech(item.tech));
            }}
            placeholder="Choose your Faction..."
        />
    );
}

export default FactionList;
