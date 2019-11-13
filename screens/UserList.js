import React from 'react';
import { View, Button } from 'react-native';
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: 'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5'
});
export default class UserListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    unsplash.search
      .users('steve', 1)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }

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
