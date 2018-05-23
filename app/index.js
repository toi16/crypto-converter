import React, { Component } from 'react';
import { View } from 'react-native';
import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';

class App extends Component {
  render() {
    return (
      <View>
        <AlertProvider>
          <Navigator onNavigationStateChange={null} />
        </AlertProvider>
      </View>
    );
  }
}

export default App;
