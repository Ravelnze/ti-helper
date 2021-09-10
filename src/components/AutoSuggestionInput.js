import Autosuggest from "react-autosuggest";
import { useState } from "react";
import "./AutoSuggestionInput.css";

function AutoSuggestionInput(props) {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : props.items.filter((item) =>
                  item.title.toLowerCase().includes(inputValue)
              );
    };

    const getSuggestionValue = (suggestion) => {
        // Perform a deep copy on the object
        props.setValue(JSON.parse(JSON.stringify(suggestion)));
        return "";
    };

    const renderSuggestion = (suggestion, index) => (
        <div key={index}>{suggestion.title}</div>
    );

    const onSuggestionsFetchRequested = ({ value }) =>
        setSuggestions(getSuggestions(value));

    const onSuggestionsClearRequested = () => setSuggestions([]);

    const inputProps = {
        placeholder: "Start typing",
        value,
        onChange: (event, { newValue, method }) => setValue(newValue),
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
}

export default AutoSuggestionInput;
