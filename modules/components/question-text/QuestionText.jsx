// QuestionText.js

'use strict';

require('./QuestionText.css');
require('../../../stylesheets/vendor/reactSelectOverride.css');

var React = require('react');
var ReactBS = require('react-bootstrap');
var Select = require('react-select');

var Button = ReactBS.Button;
var ControlLabel = ReactBS.ControlLabel;
var FormGroup = ReactBS.FormGroup;
var Glyphicon = ReactBS.Glyphicon;
var Modal = ReactBS.Modal;

var ActionTypes = require('../../constants/AuthoringConstants').ActionTypes;
var Dispatcher = require('../../dispatcher/LibraryItemsDispatcher');
var SetIFrameHeight = require('../../utilities/SetIFrameHeight');
var WrapHTML = require('../../utilities/WrapHTML');

var QuestionText = React.createClass({
    getInitialState: function () {
        var questionLO = this.props.questionLO === '' ? '' : this.props.questionLO;
        return {
            questionLO: questionLO,
            showModal: false
        };
    },
    componentWillMount: function() {
    },
    componentDidMount: function () {
        // this seems hacky...but without the timeout
        // it sets the height before the iframe content
        // has fully rendered, making the height 10px;
        var _this = this;
        window.setTimeout(function () {
            SetIFrameHeight(_this.refs.myFrame);
        }, 100);
    },
    close: function () {
        this.setState({showModal: false});
        this.reset();
    },
    onChange: function (e) {
        if (e == null) {
            this.setState({ questionLO: '' });
        } else {
            this.setState({ questionLO: e.value });
        }
    },
    open: function (e) {
        this.setState({showModal: true}, function () {

        });
    },
    renderOutcomes: function () {
        return _.map(this.props.outcomes, function (outcome) {
            return <option value={outcome.id}
                           title={outcome.description.text}
                           key={outcome.id}>
                {outcome.displayName.text}
            </option>;
        });
    },
    reset: function () {

    },
    save: function (e) {
        var payload = {
            learningObjectiveId: this.state.questionLO,
            itemId: this.props.questionId,
            libraryId: this.props.libraryId
        };

        Dispatcher.dispatch({
            type: ActionTypes.LINK_ITEM_LO,
            content: payload
        });
        this.close();
    },
    render: function () {
        var formattedOutcomes = _.map(this.props.outcomes, function (outcome) {
            return {
                value: outcome.id,
                label: outcome.displayName.text
            };
        }),
            linkButton = '',
            questionText = WrapHTML(this.props.questionText);

        if (this.props.enableClickthrough) {
            linkButton = <div className="pull-right question-actions">
                <div>
                    <Button onClick={this.open} bsSize="small">
                        <Glyphicon glyph="link" />
                    </Button>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Link Question to Outcome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="outcomeSelector">
                                <ControlLabel>Select a learning outcome ...</ControlLabel>
                                <Select name="questionOutcomeSelector"
                                        placeholder="Select an outcome ... "
                                        value={this.state.questionLO}
                                        onChange={this.onChange}
                                        options={formattedOutcomes}>
                                </Select>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button bsStyle="success" onClick={this.save}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        }

        return <div className="taggable-text">
            <div className="text-blob">
                <iframe ref="myFrame"
                        srcDoc={questionText}
                        frameBorder={0}
                        width="100%"
                        sandbox="allow-same-origin"
                        ></iframe>
            </div>
            {linkButton}
        </div>

    }
});

module.exports = QuestionText;