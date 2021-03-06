import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PlanetCard from "./PlanetCard";
import TechnologyCard from "./TechnologyCard";
import ObjectiveCard from "./ObjectiveCard";
import ActionCardCard from "./ActionCardCard";
import AgendaCard from "./AgendaCard";
import PromissoryNoteCard from "./PromissoryNoteCard";
import UnitCard from "./UnitCard";
import LegendaryPlanetAbilityCard from "./LegendaryPlanetAbilityCard";
import ExplorationCard from "./ExplorationCard";
import RelicCard from "./RelicCard";

export const CardType = {
    Planet: "Planet",
    Technology: "Technology",
    Objective: "Objective",
    Action: "Action",
    Agenda: "Agenda",
    PromissoryNote: "PromissoryNote",
    Unit: "Unit",
    LegendaryAbility: "LegendaryAbility",
    Exploration: "Exploration",
    Relic: "Relic",
};

function ScrollableCardList(props) {
    function calculateMargins(i) {
        return `${i === 0 ? "ms-2" : ""} ${
            i === 0 && props.cardList.length === 1 && props.interactable
                ? "me-3"
                : ""
        }`;
    }

    function renderCardList() {
        switch (props.cardType) {
            case CardType.Planet:
                return props.cardList.map((planet, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <PlanetCard
                            planet={planet}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Technology:
                return props.cardList.map((tech, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <TechnologyCard
                            tech={tech}
                            displayBody
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Objective:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <ObjectiveCard
                            objective={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Action:
                return props.cardList.map(([key, value], i) => (
                    <Col key={key} className={calculateMargins(i)}>
                        <ActionCardCard
                            card={value[0]}
                            count={value.length}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Agenda:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <AgendaCard
                            agenda={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.PromissoryNote:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <PromissoryNoteCard
                            note={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Unit:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <UnitCard
                            unit={obj}
                            interactable={props.interactable}
                            special
                            flippable={obj.flippable}
                            lookup={props.lookup}
                        />
                    </Col>
                ));
            case CardType.LegendaryAbility:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <LegendaryPlanetAbilityCard
                            ability={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Exploration:
                return props.cardList.map((obj, i) => (
                    <Col key={i} className={calculateMargins(i)}>
                        <ExplorationCard
                            card={obj}
                            interactable={props.interactable}
                        />
                    </Col>
                ));
            case CardType.Relic:
                return props.cardList.map(([key, value], i) => (
                    <Col key={key} className={calculateMargins(i)}>
                        <RelicCard
                            relic={value[0]}
                            count={value.length}
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
        <Container
            className="pt-3 pb-2 px-1 m-0"
            style={{ overflowX: "scroll" }}
        >
            <Row className="d-flex flex-row flex-nowrap">
                {renderCardList()}
            </Row>
        </Container>
    );
}

export default ScrollableCardList;
