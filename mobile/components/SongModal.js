import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

export default class SongModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: this.props.activeSong,
      song : "",
      artist : "",
    };
  }
 
  handleChange = (name, field) => {
    // this.setState({ [name]: field }); s
    // console.log("handleChange", name, field);
    // this.setState({ activeSong: { ...this.state.activeSong, [field]: name } });
    if (name == "song") {
        // console.log("setting song")
        this.setState({ activeSong: {
            id : this.state.activeSong.id,
            song : field,
            artist : this.state.activeSong.artist,
            genre : this.state.activeSong.genre,
            favorite : this.state.activeSong.favorite,
            }
          });
    } else if (name == "artist") {
        this.setState({ activeSong: {
            id : this.state.activeSong.id,
            song : this.state.activeSong.song,
            artist : field,
            genre : this.state.activeSong.genre,
            favorite : this.state.activeSong.favorite,
            }
            });
        }
    // console.log("handleChange", this.state.activeSong);
  };

  onSave = (song) => {
    console.log("onSave", song);
    if (song.song == "") {
      Alert.alert("Song name cannot be empty.");
    } else if (song.artist == "") {
      Alert.alert("Artist name cannot be empty.");
    } else if (song.genre == "") {
      Alert.alert("Genre cannot be empty.");
    } else {
      this.props.setSongModal(false);
      this.props.handleSubmit(this.props.activeSong);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.props.setModalVisible(!this.props.modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Song</Text>
              <View style={styles.inputView}>
                <TextInput
                  type="text"
                  name="song"
                  placeholder="Song Name"
                  style={styles.input}
                  value={this.state.activeSong.song}
                  onChangeText={(text) => this.handleChange("song", text)}
                />
                <TextInput
                  type="text"
                  name="artist"
                  placeholder="Artist"
                  style={styles.input}
                  value={this.state.activeSong.artist}
                  onChangeText={text => this.handleChange("artist", text)}
                />
              </View>
              <View style={styles.buttonView}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.props.handleSubmit(this.state.activeSong)}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    this.props.setModalVisible(!this.props.modalVisible)
                  }
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "crimson",
  },
  buttonClose: {
    backgroundColor: "crimson",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "crimson",
    height: 40,
    width: 200,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  inputView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
/*
<Picker
                  selectedValue={this.props.activeSong.genre}
                  onValueChange={(genre) =>
                    this.updateValue(genre, "genre")
                  }
                >
                  <Picker.Item label="Pop" value="Pop" />
                  <Picker.Item label="Hip-Hop" value="Hip-Hop" />
                  <Picker.Item label="Rock" value="Rock" />
                  <Picker.Item label="Classic" value="Classic" />
                  <Picker.Item label="Country" value="Country" />
                  <Picker.Item label="Indie" value="Indie" />
                  <Picker.Item label="EDM" value="EDM" />
                  <Picker.Item label="Jazz" value="Jazz" />
                  <Picker.Item label="RnB" value="RnB" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
 updateValue = (e) => {
    let { name, value } = e.target;
    console.log("updateValue", name, value);
    console.log("event", e.name);
    const activeSong = { ...this.state.activeSong, [name]: value };
    this.setState({ activeSong });
    console.log("updateValue", this.state.activeSong);
    // if (field == "name") {
    //   this.setState({this.props.activeSong.song: text});
    // } else if (field == "artist") {
    //   this.setState((this.props.activeSong.artist = text));
    // } else if (field == "genre") {
    //   this.setState((this.props.activeSong.genre = text));
    // }
  };
*/
