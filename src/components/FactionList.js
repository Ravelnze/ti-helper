import Form from "react-bootstrap/Form";
import { setFaction, setTech } from "../store/Actions";
import { useStore } from "../store/Store";
import Factions from "../data/factions.json";

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

    const factionOptions = [];
    for (var i = 0; i < factionList.length; i++) {
        factionOptions.push(
            <option
                key={i}
                id={factionList[i].id}
                value={JSON.stringify(factionList[i])}
            >
                {factionList[i].title}
            </option>
        );
    }

    const handleOnChange = (e) => {
        const f =
            e.target.selectedIndex === 0 ? null : JSON.parse(e.target.value);
        dispatch(setFaction(f));
        dispatch(setTech(f?.tech));
    };

    return (
        <Form.Select
            onChange={handleOnChange}
            aria-label="Faction list"
            className="mb-2"
        >
            <option key={null} id={null}>
                Choose your Faction...
            </option>
            {factionOptions}
        </Form.Select>
    );
}

export default FactionList;
