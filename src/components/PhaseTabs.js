import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./Header";
import PhaseContainer from "./PhaseContainer";
import { useEffect } from "react";

function PhaseTabs(props) {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
    })
    
    return (
        <div>
            <Header title={props.title} showEditModal={props.showEditModal} />
            <Tabs
                variant="pills"
                defaultActiveKey={props.activeKey}
                id={props.id}
                className="mt-2 justify-content-center sticky-top"
                onSelect={(key) => props.setKey(key)}
                style={{backgroundColor: "rgba(33,37,41, 0.9)", marginLeft: "-12px", marginRight: "-12px"}}
            >
                {props.tabs.map((tab, i) => {
                    return (
                        <Tab
                            key={i}
                            eventKey={tab.title}
                            title={tab.title}
                        >
                            <PhaseContainer phase={tab.phase} />
                        </Tab>
                    );
                })}
            </Tabs>
            {!props.activeKey ? (
                <p className="text-light text-center">
                    Choose a tab to get started
                </p>
            ) : null}
        </div>
    );
}

export default PhaseTabs;
