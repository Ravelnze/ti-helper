import Card from "react-bootstrap/Card";

function TechnologyCard(props) {
    let variant = [];

    switch (props.tech.cat.toLowerCase()) {
        case "cybernetic":
            variant = ["warning", "dark"]; // Yellow
            break;
        case "biotic":
            variant = ["success", "white"]; // Green
            break;
        case "warfare":
            variant = ["danger", "white"]; // Red
            break;
        case "propulsion":
            variant = ["primary", "white"]; // Blue
            break;
        default:
            variant = ["light", "dark"]; // Unknown (faction?)
            break;
    }

    return (
        <Card bg={variant[0]} text={variant[1]}>
            <Card.Header>{props.tech.title}</Card.Header>
            {props.displayBody ? (
                <Card.Body>
                    <Card.Text>{props.tech.desc}</Card.Text>
                </Card.Body>
            ) : null}
        </Card>
    );
}

export default TechnologyCard;
