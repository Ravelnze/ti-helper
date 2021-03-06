import Button from "react-bootstrap/Button";

import Links from "../data/links.json";

function LinksContainer(props) {
    return (
        <>
            {Links.map((link, i) => (
                <a
                    key={i}
                    target="_blank"
                    href={
                        link.pokUrl
                            ? props.pok
                                ? link.pokUrl
                                : link.defaultUrl
                            : link.defaultUrl
                    }
                >
                    <Button
                        variant="dark"
                        className="w-100"
                        style={{ marginBottom: "0.5rem" }}
                    >
                        {link.title}
                    </Button>
                </a>
            ))}
        </>
    );
}

export default LinksContainer;
