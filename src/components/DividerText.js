function DividerText(props) {
    return props.lg ? (
        <h3 className="text-center mt-3">{props.title}</h3>
    ) : (
        <h5 className="text-center mt-3">{props.title}</h5>
    );
}

export default DividerText;
