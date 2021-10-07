import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import GetLogoByKey from "../lib/Logos";
import Factions from "../data/factions.json";
import { Badge } from "react-bootstrap";
import { GetPlanetVariantColour } from "../lib/Planet";
import { useStore } from "../store/Store";
import { exhaustPlanets, removePlanet } from "../store/Actions";
import RemoveButton from "./RemoveButton";

function PlanetCard(props) {
    const [state, dispatch] = useStore();
    const variant = GetPlanetVariantColour(props.planet.trait);

    return (
        <Card
            className={props.interactable ? "pointer" : ""}
            bg={props.planet.isExhausted ? "light" : variant.colour}
            text={props.planet.isExhausted ? "dark" : variant.text}
            border="dark"
            onClick={() => {
                if (props.interactable) {
                    dispatch(
                        exhaustPlanets(
                            [props.planet],
                            !props.planet.isExhausted
                        )
                    );
                }
            }}
        >
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        dispatch(removePlanet(props.planet));
                    }}
                />
            ) : null}
            <Card.Header
                className={
                    props.planet.isExhausted
                        ? "bg-light text-dark"
                        : "bg-dark text-light"
                }
            >
                <Row>
                    <Col className="pe-0">
                        <Badge pill bg="secondary">
                            <span className="text-warning mb-0">
                                {props.planet.resource}
                            </span>
                            {"/"}
                            <span className="text-info mb-0">
                                {props.planet.influence}
                            </span>
                        </Badge>
                    </Col>
                    <Col className="px-0 text-center">
                        <p className="mb-0" style={{ display: "inline-block" }}>
                            {props.planet.title}
                        </p>
                        {props.planet.techSpecialty ? (
                            <span>
                                {" "}
                                <Image
                                    className="align-text-bottom"
                                    width="15px"
                                    src={GetLogoByKey(
                                        props.planet.techSpecialty.toLowerCase()
                                    )}
                                />
                            </span>
                        ) : null}
                    </Col>
                    <Col className="ps-0">
                        {props.planet.homeFactionId ? (
                            <Image
                                className="float-end"
                                width="20px"
                                src={GetLogoByKey(
                                    Factions.find(
                                        (faction) =>
                                            faction.id ===
                                            props.planet.homeFactionId
                                    ).logo
                                )}
                            />
                        ) : null}
                        {props.planet.legendaryAbility ? (
                            <Image
                                className="float-end"
                                width="20px"
                                src={GetLogoByKey("legendary")}
                            />
                        ) : null}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{ minWidth: "250px", minHeight: "170px" }}>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                    {props.planet.desc}
                </Card.Text>
                <div className="text-center">
                    {props.planet.extraIcons?.map((ei, i) => (
                        <Image
                            key={i}
                            width="25px"
                            className="me-1"
                            src={GetLogoByKey(ei)}
                        />
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
}

export default PlanetCard;
