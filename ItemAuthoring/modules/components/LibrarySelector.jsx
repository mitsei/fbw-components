// LibrarySelector.js
'use strict';

var React = require('react');
var ReactBS = require('react-bootstrap');
var ControlLabel = ReactBS.ControlLabel;
var FormControl = ReactBS.FormControl;
var FormGroup = ReactBS.FormGroup;


var LibraryItemsStore = require('../stores/LibraryItemsStore');

var LibrarySelector = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    componentWillMount: function() {
    },
    componentDidMount: function () {
    },
    renderLibraries: function () {
        return _.map(this.props.libraries, function (library) {
            return <option value={library.id}
                           title={library.description.text}
                           key={library.id}>
                {library.displayName.text}
            </option>;
        });
    },
    showItems: function (e) {
        var option = e.currentTarget.selectedOptions[0],
            id = option.value,
            description = option.title;
        if (id !== '-1') {
            LibraryItemsStore.getItems(id);
            this.props.onSelect(id, description);
        } else {
            this.props.hideItems();
        }
    },
    render: function () {
        return <FormGroup controlId="librarySelector">
            <ControlLabel>Select class ...</ControlLabel>
            <FormControl componentClass="select"
                         placeholder="Select a class"
                         onChange={this.showItems}>
                <option value="-1">Please select a content domain ... </option>
                {this.renderLibraries()}
            </FormControl>
        </FormGroup>
    }
});

module.exports = LibrarySelector;