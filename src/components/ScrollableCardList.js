import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./ScrollableCardList.css";
import PlanetCard from "./PlanetCard";
import TechnologyCard from "./TechnologyCard";
import ObjectiveCard from "./ObjectiveCard";
import ActionCardCard from "./ActionCardCard";
import AgendaCard from "./AgendaCard";

export const CardType = {
    Planet: "Planet",
    Technology: "Technology",
    Objective: "Objective",
    Action: "Action",
    Agenda: "Agenda",
};

function ScrollableCardList(props) {
    function calculateMargins(i) {
        return `${i === 0 ? "ms-2" : ""} ${
            i === 0 &&
            props.cardList.length === 1 &&
            props.removeButton
                ? "me-3"
                : "me-2"
        }`
    }

    function renderCardList() {
        switch (props.cardType) {
            case CardType.Planet:
                return props.cardList.map((planet, i) => (
                    <Col
                        key={i}
                        className={calculateMargins(i)}
                    >
                        <PlanetCard
                            planet={planet}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Technology:
                return props.cardList.map((tech, i) => (
                    <Col
                        key={i}
                        className={calculateMargins(i)}
                    >
                        <TechnologyCard
                            tech={tech}
                            displayBody
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Objective:
                return props.cardList.map((obj, i) => (
                    <Col
                        key={i}
                        className={calculateMargins(i)}
                    >
                        <ObjectiveCard
                            objective={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Action:
                return props.cardList.map(([key, value], i) => (
                    <Col
                        key={key}
                        className={calculateMargins(i)}
                    >
                        <ActionCardCard
                            card={value[0]}
                            count={value.length}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Agenda:
                return props.cardList.map((obj, i) => (
                    <Col
                        key={i}
                        className={calculateMargins(i)}
                    >
                        <AgendaCard
                            agenda={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            default:
                console.error(`Unknown card type: ${props.cardType}`);
                break;
        }
    }

    return (
        <Container className="pt-3 pb-2 px-0 m-0 scrollable">
            <Row className="d-flex flex-row flex-nowrap">
                {renderCardList()}
            </Row>
        </Container>
    );
}

export default ScrollableCardList;
