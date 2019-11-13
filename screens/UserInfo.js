import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import Gallery from 'react-native-image-gallery';
import { FlatGrid } from 'react-native-super-grid';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const GridImage = styled.Image`
  width: ${width / 2 - 16}px;
  height: ${width / 2 - 16}px;
`;

const UserInfoText = styled.Text`
  color: #5f5f5f;
  font-size: 24px;
  margin-top: 16px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const CloseButton = styled.TouchableOpacity`
  z-index: 1000;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const CloseButtonText = styled.Text`
  z-index: 1000;
  color: #fff;
  font-size: 16px;
`;

const GalleryCountView = styled.View`
  bottom: 0;
  height: 65;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  position: absolute;
  justify-content: center;
`;

const GalleryCountText = styled.Text`
  text-align: right;
  color: white;
  font-size: 15;
  font-style: italic;
  padding-right: 10%;
`;

const Caption = styled.View`
  bottom: 0;
  height: 65;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  position: absolute;
  justify-content: center;
`;

const CaptionText = styled.Text`
  text-align: center;
  color: white;
  font-size: 15;
  font-style: italic;
`;

export default class UserInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.navigation.state.params.user,
      isShowGalllery: false,
      index: 0
    };

    this.onChangeImage = this.onChangeImage.bind(this);
  }

  componentDidMount() {
    const { photos } = this.state.user;
    let galleryPhotos = [];
    let gridPhotos = [];
    photos &&
      photos.length !== 0 &&
      photos.map((item) => {
        galleryPhotos.push({ source: { uri: item.urls.thumb } });
        gridPhotos.push({ uri: item.urls.thumb });
      });

    this.setState({ galleryPhotos, gridPhotos });
  }

  onChangeImage(index) {
    this.setState({ index });
  }

  caption = () => {
    const { galleryPhotos, index } = this.state;
    return (
      <Caption>
        <CaptionText>
          {(galleryPhotos[index] && galleryPhotos[index].caption) || ''}
        </CaptionText>
      </Caption>
    );
  };

  galleryCount = () => {
    const { index, galleryPhotos } = this.state;

    return (
      <GalleryCountView
        // need to remove
        style={{
          top: 0,
          height: 65,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: '100%',
          position: 'absolute',
          justifyContent: 'center'
        }}
      >
        <GalleryCountText>
          {index + 1} / {galleryPhotos.length}
        </GalleryCountText>
      </GalleryCountView>
    );
  };

  render() {
    const { user, galleryPhotos, isShowGalllery, gridPhotos } = this.state;

    return (
      <SafeAreaView>
        {!isShowGalllery ? (
          <ScrollView>
            <Container>
              <Avatar source={{ uri: user.profile_image.medium }} />
              <UserInfoText>{user.name}</UserInfoText>
            </Container>

            {user && user.photos.length === 0 ? (
              <Container>
                <Text>This user does not have photos</Text>
              </Container>
            ) : (
              !isShowGalllery && (
                <FlatGrid
                  itemDimension={130}
                  items={gridPhotos}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.setState({ isShowGalllery: true })}
                    >
                      <GridImage
                        resizeMode="stretch"
                        source={{ uri: item.uri }}
                      />
                    </TouchableOpacity>
                  )}
                />
              )
            )}
          </ScrollView>
        ) : (
          <ScrollView scrollEnabled={false}>
            <CloseButton
              onPress={() => {
                this.setState({ isShowGalllery: false });
              }}
            >
              <CloseButtonText>X</CloseButtonText>
            </CloseButton>
            <Gallery
              style={{ backgroundColor: 'black' }}
              images={galleryPhotos}
              onPageSelected={this.onChangeImage}
            />
            {this.galleryCount()}
            {this.caption()}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
