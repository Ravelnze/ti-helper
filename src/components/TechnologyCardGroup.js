import CardGroup from "react-bootstrap/CardGroup";
import TechnologyCard from "./TechnologyCard";
import DividerText from "./DividerText";

function TechnologyCardGroup(props) {
    return (
        <>
            <CardGroup>
                {props.technologies.map((tech, i) => {
                    return (
                        <TechnologyCard
                            key={i}
                            tech={tech}
                            displayBody={props.displayBody}
                        />
                    );
                })}
            </CardGroup>
        </>
    );
}

export default TechnologyCardGroup;