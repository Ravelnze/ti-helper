import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavIcon(props) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon
                size="sm"
                icon={props.icon}
                color="rgba(255, 255, 255, 0.85)"
            />
            <p
                style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: "0.8rem",
                }}
            >
                {props.title}
            </p>
        </div>
    );
}

export default NavIcon;
