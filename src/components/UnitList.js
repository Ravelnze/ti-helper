import Form from "react-bootstrap/Form";

import Units from "../data/units.json";

function UnitList(props) {
    return (
        <Form className="mb-2">
            {props.units.map((u, i) => {
                const unit = Units.find((ua) => ua.id === u.id);
                return (
                    <Form.Check
                        key={i}
                        inline
                        type="checkbox"
                        style={{fontSize: "1.2rem"}}
                        label={`${unit.title} - ${u.count}`}
                    />
                );
            })}
        </Form>
    );
}

export default UnitList;
