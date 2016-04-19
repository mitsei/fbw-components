// ItemStatus.js

'use strict';

var React = require('react');
var ReactBS = require('react-bootstrap');
var Label = ReactBS.Label;

var LibraryItemsStore = require('../stores/LibraryItemsStore');



var ItemStatus = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    componentWillMount: function() {
    },
    componentDidMount: function () {

    },
    render: function () {
        // How to figure out how many are uncurated?
        var libraryName = this.props.libraryDescription,
            numberItems = this.props.items.length,
            numberUncuratedItems = 42;

        return <div>
            <div>
                {libraryName}: {numberItems} questions
            </div>
            <div>
                Number of uncurated questions: <Label bsStyle="danger">{numberUncuratedItems}</Label>
            </div>
        </div>
    }
});

module.exports = ItemStatus;