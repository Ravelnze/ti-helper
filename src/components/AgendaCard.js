import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import { electOutcome, removeAgenda } from "../store/Actions";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DetermineElectType } from "../lib/Agenda";
import { useState } from "react";
import AutoSuggestionInput from "./AutoSuggestionInput";
import { Badge } from "react-bootstrap";

function AgendaCard(props) {
    const [state, dispatch] = useStore();
    const [electList, setElectList] = useState([]);

    return (
        <Card bg="primary">
            {props.interactable ? (
                <RemoveButton
                    onClick={() => dispatch(removeAgenda(props.agenda))}
                />
            ) : null}
            <Card.Header className="text-center text-light">
                {props.agenda.title}
            </Card.Header>
            <Card.Body className="pt-1" style={{ minWidth: "200px", minHeight: "80px" }}>
                <Card.Text
                    className="text-light"
                    style={{ fontSize: "0.8rem" }}
                >
                    {props.agenda.for ?? props.agenda.desc}
                </Card.Text>
            </Card.Body>
            {props.agenda.electPrimary ? (
                <Card.Footer className="text-center">
                    <a
                        className={`text-light ${
                            props.interactable ? "pointer" : ""
                        }`}
                        onClick={() => {
                            if (props.interactable && electList.length === 0) {
                                dispatch(electOutcome(props.agenda, null));
                                setElectList(DetermineElectType(props.agenda));
                            }
                        }}
                    >
                        {props.agenda.elected ? (
                            <Badge bg="primary" style={{ fontSize: "0.8rem" }}>
                                {props.agenda.elected.title}
                            </Badge>
                        ) : electList.length > 0 ? (
                            <AutoSuggestionInput
                                items={electList}
                                setValue={(item) => {
                                    dispatch(electOutcome(props.agenda, item));
                                    setElectList([]);
                                }}
                                placeholder={props.agenda.electTitle}
                            />
                        ) : (
                            <>
                                {`Elect ${props.agenda.electTitle} `}
                                <span>
                                    <FontAwesomeIcon
                                        size="lg"
                                        icon={faEdit}
                                        color="rgba(255, 255, 255, 0.8)"
                                    />
                                </span>
                            </>
                        )}
                    </a>
                </Card.Footer>
            ) : null}
        </Card>
    );
}

export default AgendaCard;
