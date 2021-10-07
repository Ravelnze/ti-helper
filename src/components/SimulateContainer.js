import Container from "react-bootstrap/Container";
import Header from "./Header";

function SimulateContainer(props) {
    return (
        <Container>
            <Header title="Simulate" lg showEditModal={props.showEditModal} />
            <h4 className="text-center">Coming Soon</h4>
        </Container>
    );
}

export default SimulateContainer;
