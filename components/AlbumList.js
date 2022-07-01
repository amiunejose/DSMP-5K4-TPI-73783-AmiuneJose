import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';


function AlbumList(props) {
  const [state, setState] = useState({photoset:null});

  useEffect(() => {
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      )
      .then((response) =>
        setState({photoset: response.data.photosets.photoset}),
      );

});

let renderAlbums = () => {
    return state.photoset.map((album) => (
      <AlbumDetail style={styles.item}
        navigation={props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    ));
  }

  if(!state.photoset){
    return (<Text>Loading...</Text>);
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



export default AlbumList;
