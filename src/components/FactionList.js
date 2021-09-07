import { useContext, useState } from "react";
import { Context } from "../App";
import Form from "react-bootstrap/Form";
import * as Types from "../store/Types";

// Data
import Factions from "../data/factions.json";

function FactionList() {
    const { dispatch } = useContext(Context);
    const [faction, setFaction] = useState(null);

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
        setFaction(f);
        dispatch({
            type: Types.SETFACTION,
            payload: f,
        });
        dispatch({
            type: Types.SETTECH,
            payload: f?.tech,
        });
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
