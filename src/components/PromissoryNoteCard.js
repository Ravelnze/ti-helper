import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import { removePromissory, setPromissoryColour } from "../store/Actions";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";
import AutoSuggestionInput from "./AutoSuggestionInput";

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
                    onClick={() => dispatch(removePromissory(props.note))}
                />
            ) : null}
            <Card.Header
                className={`text-center text-${props.note.colour?.text ?? "light"}`}
            >
                {props.note.title}
            </Card.Header>
            <Card.Body className={`text-${props.note.colour?.text ?? "light"}`}>
                <Card.Text>{setTextColour(props.note.condition)}</Card.Text>
                <Card.Text>{setTextColour(props.note.desc)}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
                {props.note.colour || props.note.factionId ? (
                    props.note.factionId ? (
                        <Image
                            width="18px"
                            src={GetLogoByKey(
                                Factions.find(
                                    (f) => f.id === props.note.factionId
                                ).logo
                            )}
                        />
                    ) : (
                        <a
                            className={`${props.interactable ? "pointer" : ""}`}
                            onClick={() => {
                                if (props.interactable) {
                                    dispatch(
                                        setPromissoryColour(props.note, null)
                                    );
                                }
                            }}
                        >
                            <Badge bg="dark">{props.note.colour.title} Player</Badge>
                        </a>
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
            </Card.Footer>
        </Card>
    );
}

export default PromissoryNoteCard;
