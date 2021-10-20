import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./Header";
import { useStore } from "../store/Store";
import FactionInfo from "./FactionInfo";
import LinksContainer from "./LinksContainer";

function InfoContainer(props) {
    const [state, dispatch] = useStore();

    const Factions = "Faction Lookup";
    const Links = "Links";

    return (
        <>
            <Header
                title="Information"
                lg
                showEditModal={props.showEditModal}
            />
            <Tabs
                variant="pills"
                defaultActiveKey={props.activeKey}
                id={props.id}
                className="mt-2 justify-content-center sticky-top"
                style={{backgroundColor: "rgba(33,37,41, 0.9)", marginLeft: "-12px", marginRight: "-12px"}}
            >
                <Tab
                    key={Factions}
                    eventKey={Factions}
                    title={Factions}
                    className="pt-2"
                >
                    <FactionInfo
                        faction={state.lookupFaction}
                        technologies={[]}
                        searchPlaceholder="Choose a faction..."
                    />
                </Tab>
                <Tab
                    key={Links}
                    eventKey={Links}
                    title={Links}
                    className="pt-2"
                >
                    <LinksContainer pok={state.pok} />
                </Tab>
            </Tabs>
        </>
    );
}

export default InfoContainer;
