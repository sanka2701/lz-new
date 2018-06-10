import React, { Component } from 'react';
import PropTypes from "prop-types";
import Autocomplete from 'react-autocomplete';

// todo: do not callOnInputChange callback for each keystroke but wait for some time first
class AutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.inputValue,
            suggestions: props.suggestions
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.suggestions !== this.state.suggestions) {
            this.setState({ suggestions: nextProps.suggestions });
        }
    }

    render() {
        return (
            <Autocomplete
                getItemValue={(item) => item.name}
                items={this.state.suggestions}
                renderItem={(item, isHighlighted) =>
                    <div key={item.id} style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                        {item.name}
                    </div>
                }
                inputProps={{className:'form-control'}}
                renderMenu={(items, value, {minWidth}) => {
                    return <div style={{ ...this.menuStyle, minWidth, zIndex:1, position: 'absolute' }} children={items}/>
                }}
                value={this.state.value}
                onChange={e => {
                    this.setState({ value: e.target.value });
                    this.props.onInputChange(e.target.value);
                }}
                onSelect={value => {
                    this.setState({ value });
                    this.props.onSuggestionSelect(value)
                }}
            />
        )
    }
}

AutocompleteInput.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSuggestionSelect: PropTypes.func.isRequired,
    inputValue: PropTypes.string
};

export default AutocompleteInput;