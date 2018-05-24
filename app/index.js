import React, { Component } from 'react';
import { View } from 'react-native';
import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';

class App extends Component {
  render() {
    return (
      <AlertProvider>
        <Navigator />
      </AlertProvider>
    );
  }
}

export default App;
