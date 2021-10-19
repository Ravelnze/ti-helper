import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./Header";
import { useStore } from "../store/Store";
import FactionInfo from "./FactionInfo";
import "./InfoContainer.css";
import Button from "react-bootstrap/Button";

function InfoContainer(props) {
    const [state, dispatch] = useStore();

    const Factions = "Faction Lookup";
    const Rules = "Rules";

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
                className="mt-2 justify-content-center"
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
                    key={Rules}
                    eventKey={Rules}
                    title={Rules}
                    className="pt-2"
                >
                    <a
                        target="_blank"
                        href={
                            state.pok
                                ? "https://images-cdn.fantasyflightgames.com/filer_public/51/55/51552c7f-c05c-445b-84bf-4b073456d008/ti10_pok_living_rules_reference_20_web.pdf"
                                : "https://images-cdn.fantasyflightgames.com/filer_public/da/df/dadf9f07-78f3-43ac-9cce-dd6b55b24ec2/ti4_living_rules_reference_v1_3_web.pdf"
                        }
                    >
                        <Button variant="dark" className="link-button">Living Rules Reference</Button>
                    </a>
                    <a
                        target="_blank"
                        href={
                                "https://twilight-imperium.fandom.com/wiki/Twilight_Imperium_Wiki#Fourth_Edition"
                        }
                    >
                        <Button variant="dark" className="link-button">Wiki</Button>
                    </a>
                </Tab>
            </Tabs>
        </>
    );
}

export default InfoContainer;
