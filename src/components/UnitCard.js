import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import GetLogoByKey from "../lib/Logos";
import { useState, useRef } from "react";
import "./UnitCard.css";
import { useStore } from "../store/Store";
import {
    appendUnitAbilities,
    removeExtraAbility,
    setUnitAvailable,
} from "../store/Actions";
import { UnitType } from "../lib/Faction";
import ValueLabel from "./ValueLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import AutoSuggestionInput from "./AutoSuggestionInput";

import Abilities from "../data/abilities.json";
import { GetUpdateableValueList, MapValuesFromType } from "../lib/Unit";

function UnitCard(props) {
    const [state, dispatch] = useStore();
    const [checked, setChecked] = useState(props.unit.available ?? false);
    const [showPopover, setShowPopover] = useState(false);
    const target = useRef(null);
    const [flipped, setFlipped] = useState(false);
    const unit = flipped ? props.unit.alt : props.unit;
    const updateableValuesList = GetUpdateableValueList(
        props.unit.specialAbility?.updateableType
    );

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
                        {unit.title}
                        {props.flippable ? (
                            <Button
                                variant="dark"
                                className="p-0 float-end"
                                onClick={() => {
                                    if (props.flippable) {
                                        const flip = !flipped;
                                        setFlipped(flip);
                                    }
                                }}
                            >
                                <FontAwesomeIcon
                                    size="sm"
                                    icon={faSync}
                                    color="rgba(255, 255, 255, 0.85)"
                                />
                            </Button>
                        ) : null}
                    </Popover.Header>
                    <Popover.Body className="bg-dark text-light py-2">
                        {[UnitType.Flagship, UnitType.Mech].includes(
                            props.unit.type
                        ) ? (
                            <>
                                <ValueLabel sm label="Cost" value={unit.cost} />
                                <ValueLabel
                                    sm
                                    label="Combat"
                                    value={`${unit.combat}${
                                        unit.rolls ? `(x${unit.rolls})` : ""
                                    }`}
                                />
                                {unit.move ? (
                                    <ValueLabel
                                        sm
                                        label="Move"
                                        value={unit.move}
                                    />
                                ) : null}
                                {unit.capacity ? (
                                    <ValueLabel
                                        sm
                                        label="Capacity"
                                        value={unit.capacity}
                                    />
                                ) : null}
                                {unit.abilities?.map((a, i) => {
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

                        {unit.specialAbility ? (
                            <p className="mt-2">{unit.specialAbility.desc}</p>
                        ) : null}

                        {updateableValuesList ? (
                            <>
                                {props.unit.extraAbilities?.length > 0 ? (
                                    <>
                                        <ul>
                                            {props.unit.extraAbilities?.map(
                                                (ea, i) => (
                                                    <li
                                                        key={i}
                                                        className="pointer"
                                                        onClick={() =>
                                                            dispatch(
                                                                removeExtraAbility(
                                                                    props.unit
                                                                        .specialAbility
                                                                        .updateableType,
                                                                    props.unit,
                                                                    ea.instanceId
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {ea.faction} - {
                                                            ea?.leader
                                                                .specialAbility
                                                                .desc
                                                        }
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <p>* Tap an ability above to remove</p>
                                    </>
                                ) : null}
                                <AutoSuggestionInput
                                    items={updateableValuesList}
                                    setValue={(item) => {
                                        dispatch(
                                            appendUnitAbilities(
                                                props.unit,
                                                MapValuesFromType(
                                                    props.unit.specialAbility
                                                        ?.updateableType,
                                                    item
                                                )
                                            )
                                        );
                                    }}
                                    placeholder={props.unit.specialAbility?.updateText}
                                />
                            </>
                        ) : null}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default UnitCard;
