import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { ListItem, Separator, Icon } from '../components/List';
import { AlertConsumer } from '../components/Alert';

const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  handlePressThemes = () => {
    this.props.navigation.navigate('Themes');
  };

  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handlePressThemes}
          customIcon={
            <Icon
              visible
              iconName="arrow-forward"
              iconSize={ICON_SIZE}
              iconColor={ICON_COLOR}
              iconBackground="transparent"
            />
          }
        />
        <Separator />
      </ScrollView>
    );
  }
}
export default props => (
  <AlertConsumer>
    {context => <Options alertWithType={context.alertWithType} {...props} />}
  </AlertConsumer>
);
