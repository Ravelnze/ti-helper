import Container from "react-bootstrap/Container";
import Header from "./Header";

function SimulateContainer(props) {
    return (
        <Container>
            <Header title="Simulate" lg showEditModal={props.showEditModal} />
            <h3 className="text-center">Coming Soon</h3>
        </Container>
    );
}

export default SimulateContainer;
