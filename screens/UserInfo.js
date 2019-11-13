import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import Gallery from 'react-native-image-gallery';
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

export default class UserInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.navigation.state.params.user
    };
  }

  componentDidMount() {
    const { photos } = this.state.user;
    let galleryPhotos = [];
    photos &&
      photos.length !== 0 &&
      photos.map((item) => {
        console.log(item.urls.regular);
        galleryPhotos.push({ source: { uri: item.urls.thumb } });
      });

    this.setState({ galleryPhotos });
  }

  //   renderUser = ({ item, index }) => {
  //     console.log(item, index);
  //     return (
  //       <TouchableOpacity onPress={() => this.goUserInfo(item)} key={item.id}>
  //         <UserRow key={index}>
  //           <Avatar source={{ uri: item.profile_image.medium }} />
  //           <UserInfoText>{item.name}</UserInfoText>
  //         </UserRow>
  //       </TouchableOpacity>
  //     );
  //   };

  render() {
    const { user, galleryPhotos } = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          {user && user.photos.length === 0 ? (
            <Container>
              <Text>This user does not have photos</Text>
            </Container>
          ) : (
            <Gallery
              style={{ flex: 1, backgroundColor: 'black' }}
              images={galleryPhotos}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
