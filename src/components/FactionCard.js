import { useRef } from "react";
import { Badge, Button } from "react-bootstrap";
import GetLogoByKey from "../lib/Logos";
import { setFaction, setLookupFaction, setStartingFaction, setTech } from "../store/Actions";
import { useStore } from "../store/Store";
import "./FactionCard.css";
import { ReplaceCodexTechnologyIds } from "../lib/Technology";

function FactionCard(props) {
    const [state, dispatch] = useStore();
    const target = useRef(null);
    function scrollTop() {
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
    }

    return (
        <>
            <Button
                ref={target}
                className="d-flex align-items-start faction-image-button"
                onClick={() => {
                    if (props.isNewGame) {
                        dispatch(setFaction(props.faction));
                        dispatch(setTech(ReplaceCodexTechnologyIds(props.faction.tech, state)));
                        scrollTop();
                    } else if (props.chooseFaction) {
                        dispatch(setStartingFaction(props.faction.id, true));
                    }
                    else {
                        dispatch(setLookupFaction(props.faction));
                        scrollTop();
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
