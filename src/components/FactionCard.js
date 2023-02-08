import { useRef } from "react";
import { Badge, Button } from "react-bootstrap";
import GetLogoByKey from "../lib/Logos";
import { setFaction, setLookupFaction, setTech } from "../store/Actions";
import { useStore } from "../store/Store";
import "./FactionCard.css";

function FactionCard(props) {
    const [state, dispatch] = useStore();
    const target = useRef(null);

    return (
        <>
            <Button
                ref={target}
                className="d-flex align-items-start faction-image-button"
                onClick={() => {
                    if (props.isNewGame) {
                        dispatch(setFaction(props.faction));
                        dispatch(setTech(props.faction.tech));
                    } else {
                        dispatch(setLookupFaction(props.faction));
                    }
                }}
                style={{
                    backgroundImage: `url(${GetLogoByKey(props.faction.logo)})`,
                }}
            ></Button>
            <Badge bg="none" className="faction-badge">
                {props.faction.title}
            </Badge>
        </>
    );
}

export default FactionCard;
