import { useState } from "react";
import Form from "react-bootstrap/Form";

// Data
import Factions from "../data/factions.json";
import { setFaction,setTech } from "../store/Actions";
import { useStore } from "../store/Store";

function FactionList() {
    const [state,dispatch] = useStore();
    const [faction, setFactionState] = useState(null);

    const factionOptions = [];
    for (var i = 0; i < Factions.length; i++) {
        factionOptions.push(
            <option
                key={i}
                id={Factions[i].id}
                value={JSON.stringify(Factions[i])}
            >
                {Factions[i].title}
            </option>
        );
    }

    const handleOnChange = (e) => {
        const f =
            e.target.selectedIndex == 0 ? null : JSON.parse(e.target.value);
        setFactionState(f);
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
