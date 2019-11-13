import React from 'react';
import { View, Button } from 'react-native';

export default class UserListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('User')}
        />
      </View>
    );
  }
}
