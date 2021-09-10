function RemoveButton(props) {
    return (
        <a
            style={{ cursor: "pointer" }}
            onClick={() => {console.log("clicked"); props.onClick()}}
        >
            <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger px-2 pb-2 align-items-center">
                <strong>x</strong>
                <span className="visually-hidden">remove item</span>
            </span>
        </a>
    );
}

export default RemoveButton;
