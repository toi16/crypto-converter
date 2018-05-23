import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AlertConsumer } from '../components/Alert';

class Home extends Component {
  render() {
    return (
      <View>
        <Text> Home</Text>
      </View>
    );
  }
}

export default props => (
  <AlertConsumer>
    {context => <Home alertWithType={context.alertWithType} {...props} />}
  </AlertConsumer>
);
