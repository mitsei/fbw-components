// MissionsManager.js

'use strict';
import React, {
    Component,
} from 'react';

import {
  Text,
  ListView,
  ScrollView,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Drawer from 'react-native-drawer';

var _ = require('lodash');
var Icon = require('react-native-vector-icons/FontAwesome');

var AssessmentStore = require('../../stores/Assessment');
var UserStore = require('../../stores/User');

var MissionsSidebar = require('./MissionsSidebar');
var MissionsMainContent = require('./MissionsMainContent');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});


class MissionsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'calendar',
      drawerOpen: true,
      loading: true,
      missions: [],
      selectedMission: {}
    };
    AssessmentStore.addChangeListener(this._updateMissionsFromStore);
  }
  componentWillUnmount() {
    console.log('unmounted');
    AssessmentStore.removeChangeListener(this._updateMissionsFromStore);
  }
  componentDidMount() {
    var bankId = UserStore.getData().bankId;

    AssessmentStore.getAssessments(bankId);
  }
  setMissions(missions) {
    this.setState({ missions: missions });
    this.setState({ loading: false });
  }
  setSelectedMission = (mission, mode) => {
    if (typeof mode === 'undefined') {
      mode = 'missionStatus'
    }
    this.setState({ selectedMission: mission });
    this.setState({ content: mode });
  }
  render() {
    var bankId = UserStore.getData().bankId;

    if (this.state.loading) {
      return this.renderLoadingView();
    }
    // set panThreshold to 1.5 because acceptPan doesn't seem to work?
    return (
      <Drawer acceptPan={false}
              content={<MissionsSidebar changeContent={this._changeContent}
                                        missions={this.state.missions}
                                        selectMission={this.setSelectedMission}
                                        sidebarOpen={this.state.drawerOpen}
                                        toggleSidebar={this._toggleSidebar} />}
              open={this.state.drawerOpen}
              openDrawerOffset={0.75}
              panThreshold={1.5}
              side='left'
              style={styles.container}
              tweenHandler={Drawer.tweenPresets.parallax}>
        <View>
          <MissionsMainContent bankId={bankId}
                               changeContent={this._changeContent}
                               content={this.state.content}
                               missions={this.state.missions}
                               selectedMission={this.state.selectedMission}
                               sidebarOpen={this.state.drawerOpen}
                               toggleSidebar={this._toggleSidebar} />
        </View>
      </Drawer>
    )
  }

  renderLoadingView() {
    return ( <View>
      <Text>
        Loading your missions ...
      </Text>
      <ActivityIndicatorIOS
        hidden='true'
        size='large'/>
    </View> );
  }
  _changeContent = (newContent) => {
    this.setState({ content: newContent });
  }
  _toggleSidebar = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  _updateMissionsFromStore = (missions) => {
    // sort missions by startTime first
    this.setMissions(_.sortBy(missions,
      ['startTime.year', 'startTime.month', 'startTime.day',
       'deadline.year', 'deadline.month', 'deadline.day',
       'displayName.text']));
  }
}

module.exports = MissionsManager;
