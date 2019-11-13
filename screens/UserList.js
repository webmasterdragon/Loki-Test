import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Unsplash from 'unsplash-js';
import SearchBar from 'react-native-search-bar';
import styled from 'styled-components';
import { UNSPLASH } from '../const';

const unsplash = new Unsplash(UNSPLASH);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const UserRow = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  height: 70;
  padding-left: 8px;
  padding-right: 8px;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const UserInfoText = styled.Text`
  color: #5f5f5f;
  font-size: 24px;
  margin-left: 16px;
`;

const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default class UserListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStarted: false,
      searchKey: ''
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
    this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
  }

  componentDidMount() {
    this.refs.searchBar.focus();
  }

  onChangeText = (text) => {
    this.setState({ searchKey: text, searchStarted: true });

    // debounce for api call
    // debounce(this.getUsers(), 500);
    this.getUsers();
  };

  getUsers = () => {
    const { searchKey } = this.state;

    unsplash.search
      .users(searchKey, 1)
      .then((res) => res.json())
      .then((json) => {
        if (json && json.results) {
          this.setState({ users: json.results });
        }
      })
      .catch((e) => console.log(e));
  };

  onSearchButtonPress = (text) => {
    this.setState({ text });
  };

  onCancelButtonPress = (text) => {
    this.setState({ text });
  };

  goUserInfo = (user) => {
    this.props.navigation.navigate('User', { user });
  };

  renderUser = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.goUserInfo(item)} key={item.id}>
        <UserRow key={index}>
          <Avatar source={{ uri: item.profile_image.medium }} />
          <UserInfoText>{item.name}</UserInfoText>
        </UserRow>
      </TouchableOpacity>
    );
  };

  render() {
    const { searchStarted, users } = this.state;

    return (
      <SafeAreaView>
        <SearchBar
          ref="searchBar"
          placeholder="Search"
          barStyle="default"
          onChangeText={this.onChangeText}
          onSearchButtonPress={this.onSearchButtonPress}
          onCancelButtonPress={this.onCancelButtonPress}
        />
        <ScrollView>
          {!searchStarted && (
            <Container>
              <Text>Please search to get users</Text>
            </Container>
          )}

          {users && users.length === 0 ? (
            <Container>
              <Text>No result</Text>
            </Container>
          ) : (
            <FlatList
              data={users}
              extraData={this.state}
              renderItem={(item, index) => this.renderUser(item, index)}
              keyExtractor={(item, index) => `${item.id}-${index}`}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
