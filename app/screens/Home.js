import React, { Component } from 'react';
import { Text } from 'react-native';
import { AlertConsumer } from '../components/Alert';
import { Container } from '../components/Container';
import { Header } from '../components/Header';

class Home extends Component {
  render() {
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <Header
          onPress={this.handleOptionsPress}
          isConnected={this.props.isConnected}
          onWarningPress={this.handleDisconnectedPress}
        />
        <Text> Home</Text>
      </Container>
    );
  }
}

export default props => (
  <AlertConsumer>
    {context => <Home alertWithType={context.alertWithType} {...props} />}
  </AlertConsumer>
);
