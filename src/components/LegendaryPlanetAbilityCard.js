import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import GetLogoByKey from "../lib/Logos";
import { exhaustLegendary } from "../store/Actions";
import { useStore } from "../store/Store";

function LegendaryPlanetAbilityCard(props) {
    const [state, dispatch] = useStore();

    return (
        <Card
            className={props.interactable ? "pointer" : ""}
            bg={props.ability.isExhausted ? "light" : "dark"}
            text={props.ability.isExhausted ? "dark" : "white"}
            onClick={() => {
                if (props.interactable) {
                    dispatch(
                        exhaustLegendary(
                            props.ability,
                            !props.ability.isExhausted
                        )
                    );
                }
            }}
        >
            <Card.Header className="text-center">
                <Image
                    className="me-1 align-text-bottom"
                    width="20px"
                    src={GetLogoByKey("legendary")}
                />
                {props.ability.planetTitle} - {props.ability.title}
            </Card.Header>
            <Card.Body className="pt-1">
                <Card.Text>{props.ability.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default LegendaryPlanetAbilityCard;
