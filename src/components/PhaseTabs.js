import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./Header";
import PhaseContainer from "./PhaseContainer";

function PhaseTabs(props) {
    return (
        <>
            <Header title={props.title} showEditModal={props.showEditModal} />
            <Tabs
                variant="pills"
                defaultActiveKey={props.activeKey}
                id={props.id}
                className="mt-2 justify-content-center"
                onSelect={(key) => props.setKey(key)}
            >
                {props.tabs.map((tab, i) => {
                    return (
                        <Tab key={i} eventKey={tab.title} title={tab.title}>
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
        </>
    );
}

export default PhaseTabs;
