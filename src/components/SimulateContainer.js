import Container from "react-bootstrap/Container";
import Header from "./Header";

function SimulateContainer(props) {
    return (
        <Container>
            <Header title="Simulate" lg showEditModal={props.showEditModal} />
        </Container>
    );
}

export default SimulateContainer;
