import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

function PhotoList(props) {
    const [state, setState] = useState({photo:null});
    
    useEffect(() => {
        axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
        )
        .then((response) =>
          setState({photos: response.data.photoset.photo}),
        );
    });

    let renderAlbums = () => {
        return state.photos.map((photo) => (
            <PhotoDetail
              key={photo.title}
              title={photo.title}
              imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            />
          ));
      }

    if(!state.photos){
        return (
            <View style={{flex: 1}}>
              <Text>Loading...</Text>
            </View>);
    }

    return (
        <View style={{flex: 1}}>
        <FlatList data = {renderAlbums()} renderItem={({item}) => <View style={styles.item}>{item}</View>}/>
      </View>
        );
        
}
const styles = StyleSheet.create({
  item: {
    padding: 20},
})


export default PhotoList;
