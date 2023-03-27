import { useEffect } from "react";
import Header from "./Header";

function PlannerContainer(props) {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
    })

    return (
        <>
            <Header title="Planners" />
            <h4 className="text-center">Coming Soon</h4>
        </>
    );
}

export default PlannerContainer;
