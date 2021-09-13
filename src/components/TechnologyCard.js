import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { GetTechVariantColour, Upgrade } from "../lib/Tech";
import GetLogoByKey from "../lib/Logos";
import "./TechnologyCard.css";
import ValueLabel from "./ValueLabel";
import Abilites from "../data/abilites.json";
import RemoveButton from "./RemoveButton";
import { useStore } from "../store/Store";
import { removeTech } from "../store/Actions";
import Factions from "../data/factions.json";

function TechnologyCard(props) {
    const [state, dispatch] = useStore();
    const variant = GetTechVariantColour(props.tech.cat);

    return (
        <Card bg={variant.colour} text={variant.text} border="dark">
            {props.displayBody ? (
                <RemoveButton
                    onClick={() => dispatch(removeTech(props.tech))}
                />
            ) : null}
            <Card.Header style={{ fontSize: "0.95rem" }}>
                {props.tech.title}
                {props.tech.factionId ? (
                    <span className="float-end">
                        <Image
                            width="15px"
                            src={GetLogoByKey(
                                Factions.find(
                                    (f) => f.id === props.tech.factionId
                                ).logo
                            )}
                        />
                    </span>
                ) : null}
                {props.tech.subTitle ? (
                    <p className="mb-0" style={{ fontSize: "0.8rem" }}>
                        {props.tech.subTitle}
                    </p>
                ) : null}
            </Card.Header>
            {props.displayBody ? (
                <>
                    <Card.Body
                        className="pt-1"
                        style={{ minWidth: "250px", minHeight: "200px" }}
                    >
                        {props.tech.cat === Upgrade ? (
                            <>
                                {props.tech.cost ? (
                                    <ValueLabel
                                        sm
                                        label="Cost"
                                        value={props.tech.cost}
                                    />
                                ) : null}
                                {props.tech.combat ? (
                                    <ValueLabel
                                        sm
                                        label="Combat"
                                        value={props.tech.combat}
                                    />
                                ) : null}
                                {props.tech.move ? (
                                    <ValueLabel
                                        sm
                                        label="Move"
                                        value={props.tech.move}
                                    />
                                ) : null}
                                {props.tech.capacity ? (
                                    <ValueLabel
                                        sm
                                        label="Capacity"
                                        value={props.tech.capacity}
                                    />
                                ) : null}
                            </>
                        ) : null}
                        {props.tech.desc ? (
                            <Card.Text
                                className={
                                    props.tech.cat === Upgrade ? "mt-3" : ""
                                }
                            >
                                {props.tech.desc}
                            </Card.Text>
                        ) : null}
                        {props.tech.abilities?.map((a) => {
                            return (
                                <li
                                    style={{
                                        fontSize: "0.8rem",
                                        marginLeft: "10px",
                                    }}
                                >
                                    {
                                        Abilites.find((ab) => ab.id === a.id)
                                            .title
                                    }{" "}
                                    {a.value} {a.rolls ? `(x${a.rolls})` : null}
                                </li>
                            );
                        })}
                    </Card.Body>
                    {props.tech.req != null ? (
                        <Card.Footer className="bg-dark">
                            {props.tech.req.map((r, i) => (
                                <Image
                                    key={i}
                                    className="prereq"
                                    width="15px"
                                    src={GetLogoByKey(r)}
                                />
                            ))}
                        </Card.Footer>
                    ) : null}
                </>
            ) : null}
        </Card>
    );
}

export default TechnologyCard;
