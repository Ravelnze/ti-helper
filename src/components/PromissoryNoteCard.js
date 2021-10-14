import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import {
    removePromissory,
    setPlanet,
    setPromissoryAttached,
    setPromissoryColour,
} from "../store/Actions";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";
import AutoSuggestionInput from "./AutoSuggestionInput";
import { AttachmentCardType, AugmentPlanet } from "../lib/Planet";

import Colours from "../data/colours.json";
import Factions from "../data/factions.json";
import GetLogoByKey from "../lib/Logos";

function PromissoryNoteCard(props) {
    const [state, dispatch] = useStore();

    function setTextColour(text) {
        return text.replaceAll(
            "(color)",
            props.note.colour?.title.toLowerCase() ?? "(color)"
        );
    }

    return (
        <Card
            style={{
                backgroundColor: props.note.colour
                    ? props.note.colour.hex
                    : "#212529",
            }}
        >
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        if (props.note.attached) {
                            dispatch(
                                setPlanet(
                                    AugmentPlanet(
                                        props.note,
                                        AttachmentCardType.Promissory,
                                        props.note.attached,
                                        false
                                    )
                                )
                            );
                        }
                        dispatch(removePromissory(props.note));
                    }}
                />
            ) : null}
            <Card.Header
                className={`text-center text-${
                    props.note.colour?.text ?? "light"
                }`}
            >
                {props.note.title}
            </Card.Header>
            <Card.Body className={`text-${props.note.colour?.text ?? "light"}`}>
                <Card.Text>{setTextColour(props.note.condition)}</Card.Text>
                {props.note.desc.split("\r\n").map((s, i) => (
                    <Card.Text key={i}>{setTextColour(s)}</Card.Text>
                ))}
            </Card.Body>
            <Card.Footer className="text-center">
                {props.note.colour || props.note.factionId ? (
                    props.note.factionId ? (
                        <Image
                            className={props.note.attach ? "pb-2" : ""}
                            width="18px"
                            src={GetLogoByKey(
                                Factions.find(
                                    (f) => f.id === props.note.factionId
                                ).logo
                            )}
                        />
                    ) : (
                        <div
                            className={props.interactable ? "pointer" : ""}
                            onClick={() => {
                                if (props.interactable) {
                                    dispatch(
                                        setPromissoryColour(props.note, null)
                                    );
                                }
                            }}
                        >
                            <Badge bg="dark">
                                {props.note.colour.title} Player
                            </Badge>
                        </div>
                    )
                ) : (
                    <AutoSuggestionInput
                        items={Colours}
                        setValue={(item) => {
                            dispatch(setPromissoryColour(props.note, item));
                        }}
                        placeholder="Choose a colour"
                    />
                )}
                {props.note.attach && props.interactable ? (
                    props.note.attached ? (
                        <div
                            className="pointer"
                            onClick={() => {
                                if (props.note.attached) {
                                    dispatch(
                                        setPlanet(
                                            AugmentPlanet(
                                                props.note,
                                                AttachmentCardType.Promissory,
                                                props.note.attached,
                                                false
                                            )
                                        )
                                    );
                                    dispatch(
                                        setPromissoryAttached(props.note, null)
                                    );
                                }
                            }}
                        >
                            <Badge bg="dark">{props.note.attached.title}</Badge>
                        </div>
                    ) : (
                        <AutoSuggestionInput
                            items={state.planets.filter(
                                (p) =>
                                    !p.homeFactionId &&
                                    p.title !== "Mecatol Rex"
                            )}
                            setValue={(item) => {
                                dispatch(
                                    setPromissoryAttached(props.note, item)
                                );
                                dispatch(
                                    setPlanet(
                                        AugmentPlanet(
                                            props.note,
                                            AttachmentCardType.Promissory,
                                            item,
                                            true
                                        )
                                    )
                                );
                            }}
                            placeholder="Choose a planet"
                        />
                    )
                ) : null}
            </Card.Footer>
        </Card>
    );
}

export default PromissoryNoteCard;
