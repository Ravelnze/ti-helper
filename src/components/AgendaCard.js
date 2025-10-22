import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import { electOutcome, removeAgenda, setPlanet } from "../store/Actions";
import { useStore } from "../store/Store";
import RemoveButton from "./RemoveButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DetermineElectType, Primary } from "../lib/Agenda";
import { useState } from "react";
import AutoSuggestionInput from "./AutoSuggestionInput";
import { Badge } from "react-bootstrap";
import { AttachmentCardType, AugmentPlanet } from "../lib/Planet";

function AgendaCard(props) {
    const [state, dispatch] = useStore();
    const [electList, setElectList] = useState([]);

    return (
        <Card bg="primary">
            {props.interactable ? (
                <RemoveButton
                    onClick={() => {
                        dispatch(removeAgenda(props.agenda));
                        if (
                            props.agenda.electPrimary === Primary.Planet &&
                            props.agenda.effects &&
                            props.agenda.elected
                        ) {
                            dispatch(
                                setPlanet(
                                    AugmentPlanet(
                                        props.agenda,
                                        AttachmentCardType.Agenda,
                                        props.agenda.elected,
                                        false
                                    )
                                )
                            );
                        }
                    }}
                />
            ) : null}
            <Card.Header className="text-center text-light">
                {props.agenda.title}
            </Card.Header>
            <Card.Body
                className="pt-1"
                style={{ minWidth: "200px", minHeight: "80px" }}
            >
                {props.agenda.for ? (
                    <Card.Text
                        className="text-light"
                        style={{ fontSize: "0.8rem" }}
                    >
                        {props.agenda.for}
                    </Card.Text>
                ) : (
                    props.agenda.desc.split("\r\n").map((s, i) => (
                        <Card.Text
                            key={i}
                            className="text-light"
                            style={{ fontSize: "0.8rem" }}
                        >
                            {s}
                        </Card.Text>
                    ))
                )}
            </Card.Body>
            {props.agenda.electPrimary ? (
                <Card.Footer className="text-center">
                    <a
                        className={`text-light ${
                            props.interactable ? "pointer" : ""
                        }`}
                        onClick={() => {
                            if (props.interactable && electList.length === 0) {
                                if (
                                    props.agenda.electPrimary ===
                                        Primary.Planet &&
                                    props.agenda.effects &&
                                    props.agenda.elected
                                ) {
                                    dispatch(
                                        setPlanet(
                                            AugmentPlanet(
                                                props.agenda,
                                                AttachmentCardType.Agenda,
                                                props.agenda.elected,
                                                false
                                            )
                                        )
                                    );
                                }
                                dispatch(electOutcome(props.agenda, null));
                                setElectList(
                                    DetermineElectType(props.agenda, state)
                                );
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
                                    if (
                                        props.agenda.electPrimary ===
                                            Primary.Planet &&
                                        props.agenda.effects
                                    ) {
                                        dispatch(
                                            setPlanet(
                                                AugmentPlanet(
                                                    props.agenda,
                                                    AttachmentCardType.Agenda,
                                                    item,
                                                    true
                                                )
                                            )
                                        );
                                    }
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
