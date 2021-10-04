import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import GetLogoByKey from "../lib/Logos";
import { useState, useRef } from "react";
import "./UnitCard.css";
import { useStore } from "../store/Store";
import { setUnitAvailable } from "../store/Actions";
import { UnitType } from "../lib/Faction";
import ValueLabel from "./ValueLabel";

import Abilities from "../data/abilities.json";

function UnitCard(props) {
    const [state, dispatch] = useStore();
    const [checked, setChecked] = useState(props.unit.available ?? false);
    const [showPopover, setShowPopover] = useState(false);
    const target = useRef(null);

    return (
        <div>
            <Badge bg="dark" className="text-small unit-badge">{`${
                props.special ? props.unit.type : props.unit.title
            }${props.count ? ` x${props.count}` : ""}`}</Badge>
            <Button
                ref={target}
                className="mb-2 d-flex align-items-start image-button"
                onClick={() => {
                    if (props.special) {
                        if (props.interactable) {
                            const newChecked = !checked;
                            setChecked(newChecked);
                            dispatch(setUnitAvailable(props.unit, newChecked));
                        } else {
                            setShowPopover(!showPopover);
                        }
                    } else {
                        setChecked(!checked);
                    }
                }}
                style={{
                    opacity: checked ? 1 : 0.3,
                    backgroundImage: `url(${GetLogoByKey(props.unit.logo)})`,
                }}
            ></Button>

            <Overlay
                target={target.current}
                show={showPopover}
                rootClose
                rootCloseEvent="mousedown"
                placement="bottom"
                onHide={() => setShowPopover(false)}
            >
                <Popover id={`popover-${props.unit.type}`}>
                    <Popover.Header className="bg-dark text-center" as="h3">
                        {props.unit.title}
                    </Popover.Header>
                    <Popover.Body className="bg-dark text-light py-2">
                        {[UnitType.Flagship, UnitType.Mech].includes(
                            props.unit.type
                        ) ? (
                            <>
                                <ValueLabel
                                    sm
                                    label="Cost"
                                    value={props.unit.cost}
                                />
                                <ValueLabel
                                    sm
                                    label="Combat"
                                    value={`${props.unit.combat}${
                                        props.unit.rolls
                                            ? `(x${props.unit.rolls})`
                                            : ""
                                    }`}
                                />
                                {props.unit.move ? (
                                    <ValueLabel
                                        sm
                                        label="Move"
                                        value={props.unit.move}
                                    />
                                ) : null}
                                {props.unit.capacity ? (
                                    <ValueLabel
                                        sm
                                        label="Capacity"
                                        value={props.unit.capacity}
                                    />
                                ) : null}
                                {props.unit.abilities?.map((a, i) => {
                                    return (
                                        <li key={i} className="abilities">
                                            {
                                                Abilities.find(
                                                    (ab) => ab.id === a.id
                                                ).title
                                            }{" "}
                                            {a.value}{" "}
                                            {a.rolls ? `(x${a.rolls})` : null}
                                        </li>
                                    );
                                })}
                            </>
                        ) : null}

                        {props.unit.specialAbility ? (
                            <p className="mt-2">
                                {props.unit.specialAbility.desc}
                            </p>
                        ) : null}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default UnitCard;
