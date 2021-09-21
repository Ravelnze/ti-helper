import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import GetLogoByKey from "../lib/Logos";
import { useEffect, useState } from "react";
import "./UnitCard.css";
import { useStore } from "../store/Store";

function UnitCard(props) {
    const [state, dispatch] = useStore();
    const [checked, setChecked] = useState(false);

    return (
        <Button
            className="mb-2 d-flex align-items-start image-button"
            onClick={() => setChecked(!checked)}
            style={{
                backgroundImage: `url(${GetLogoByKey(props.logo)})`,
                backgroundColor: checked ? "#6c757d" : "rgba(255,255,255,1)",
            }}
        >
            <Badge
                bg="dark"
                className="text-small unit-badge"
            >{`${props.title} x${props.count}`}</Badge>
        </Button>
    );
}

export default UnitCard;
