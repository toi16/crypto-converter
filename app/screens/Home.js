import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { AlertConsumer } from '../components/Alert';
import { Container } from '../components/Container';
import { Header } from '../components/Header';

class Home extends Component {
  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

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

const mapStateToProps = state => ({
  primaryColor: state.theme.primaryColor,
});

const ConnectedHome = connect(mapStateToProps)(Home);

export default props => (
  <AlertConsumer>
    {context => <ConnectedHome alertWithType={context.alertWithType} {...props} />}
  </AlertConsumer>
);
