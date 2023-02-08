function DividerText(props) {
    return props.lg ? (
        <div className="text-center">
            <h3 className="mt-3">{props.title}</h3>
            {props.sub ? (
                <sub style={{ color: "gray", top: "-7px" }}>{props.sub}</sub>
            ) : null}
        </div>
    ) : (
        <div className="text-center">
            <h5 className="mt-3">{props.title}</h5>
            {props.sub ? (
                <sub style={{ color: "gray", top: "-7px" }}>{props.sub}</sub>
            ) : null}
        </div>
    );
}

export default DividerText;
