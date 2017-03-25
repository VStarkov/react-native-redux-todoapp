import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { List } from 'immutable';
import immutable from 'immutable';

import TaskItem from './TaskItem';
import Header from './Header';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
});

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => !immutable.is(r1, r2)
});

const renderRow = (rowData) => (
  <TaskItem text={rowData.get('text')} completed={rowData.get('complete')} />
);

const renderSeparator = (sectionId, rowId) => (
  <View key={rowId} style={styles.separator} />
);

const TaskList = ({
  tasks
}) =>  (
    <ListView
      stickyHeaderIndices={[0]}
      renderSeparator={renderSeparator}
      dataSource={ds.cloneWithRows(tasks.toArray())}
      renderRow={renderRow}
      renderHeader={() => <Header />}
    />
  );

const mapStateToProps = (state) => ({
  tasks: state.getIn('tasks', List())
});

export const TaskListContainer = connect(mapStateToProps)(TaskList)