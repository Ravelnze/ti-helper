import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Units from "../data/units.json";
import UnitCard from "./UnitCard";
import { v4 as uuidv4 } from "uuid";

function UnitList(props) {
    return (
        <Row>
            {props.units.map((u, i) => {
                const unit = Units.find((ua) => ua.id === u.id);
                return (
                    <Col
                        className="d-flex justify-content-left p-0"
                        key={uuidv4()}
                    >
                        <UnitCard unit={unit} count={u.count} />
                    </Col>
                );
            })}
            {/* padding columns */}
            {props.units.length === 1 ||
            props.units.length === 4 ||
            props.units.length === 7 ? (
                <Col className="p-0" />
            ) : null}
            {props.units.length === 1 ||
            props.units.length === 2 ||
            props.units.length === 4 ||
            props.units.length === 5 ||
            props.units.length === 7 ||
            props.units.length === 8 ? (
                <Col className="p-0" />
            ) : null}
        </Row>
    );
}

export default UnitList;
