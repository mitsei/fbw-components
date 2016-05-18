// AnswerText.js

'use strict';

require('./AnswerText.css');
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
var AnswerFeedback = require('../AnswerFeedback');
var Dispatcher = require('../../dispatcher/LibraryItemsDispatcher');
var SetIFrameHeight = require('../../utilities/SetIFrameHeight');
var WrapHTML = require('../../utilities/WrapHTML');

var AnswerText = React.createClass({
    getInitialState: function () {
        var confusedLO = this.props.confusedLO === 'None linked yet' ? '' : this.props.confusedLO;
        return {
            confusedLO: confusedLO,
            showModal: false
        };
    },
    componentWillMount: function() {
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.expanded) {
            SetIFrameHeight(this.refs.myFrame);
        }
    },
    render: function () {
        var formattedOutcomes = _.map(this.props.outcomes, function (outcome) {
            return {
                value: outcome.id,
                label: outcome.displayName.text
            };
        }),
            linkButton = '',
            answerHTML = WrapHTML(this.props.answerText);

        if (this.props.enableClickthrough) {
            if (!this.props.correctAnswer) {
                linkButton = <div className="wrong-answer-actions">
                    <AnswerFeedback answerId={this.props.answerId}
                                    feedback={this.props.feedback}
                                    feedbackSource={this.props.label}
                                    itemId={this.props.itemId}
                                    libraryId={this.props.libraryId} />
                </div>
            } else {
                linkButton = <div className="right-answer-actions">
                    <Glyphicon className="right-answer-check"
                               glyph="ok" />
                    <AnswerFeedback answerId={this.props.answerId}
                                    feedback={this.props.feedback}
                                    feedbackSource={this.props.label}
                                    itemId={this.props.itemId}
                                    libraryId={this.props.libraryId} />
                </div>
            }
        }

        return <div className="taggable-text">
            <div className="text-blob">
                <iframe ref="myFrame"
                        srcDoc={answerHTML}
                        frameBorder={0}
                        width="100%"
                        sandbox="allow-scripts allow-same-origin"
                        ></iframe>
            </div>
            {linkButton}
        </div>

    }
});

module.exports = AnswerText;