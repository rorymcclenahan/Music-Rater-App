import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import SongModal from "../../components/SongModal.js";
import RatingModal from "../../components/RatingModal.js";

function SongsScreen(navigation) {
  const [token, setToken] = useState(null);
  const [songsList, setSongs] = useState([]);
  const [ratingsList, setRatings] = useState([]);
  const [userSongs, setUserSongs] = useState([]);
  const [ratedSongs, setRatedSongs] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [songModal, setSongModal] = useState(false);
  const [activeSong, setActiveSong] = useState({
    id: null,
    song: "",
    artist: "",
    favorite: null,
    genre: "",
    rating_average: 0,
    song_artist: "",
  });
  const [ratingModal, setRatingModal] = useState(false);
  const [activeRating, setActiveRating] = useState({
    id: null,
    Owner: "test_user",
    song: "",
    rating: "",
  });

  useEffect(async () => {
    // Pass the URL to the fetch Songs API.
    refreshList().finally(() => setLoading(false));
    console.log("token", token);
    console.log("songs", songsList);
    console.log("ratings", ratingsList);
    console.log("user Songs", userSongs);
    console.log("rated Songs", ratedSongs);
  }, []);

  async function refreshList() {
    await getSongs();
    await getRatings();
    setActiveSong({
      id: null,
      song: "",
      artist: "",
      favorite: false,
      genre: "Rock",
      rating_average: 0,
      song_artist: "",
    });
    mapSongsToRating();
    // trackUserRatedSongs();
  }

  async function getSongs() {
    fetch("https://music-rater-comp333.herokuapp.com/api/songs/")
      // Parse the response object and extract the json response that is obtained.
      .then((response) => response.json())
      // Set the empty data variable to the fetched data.
      .then((json) => setSongs(json))
      // Catch any errors thrown from the fetch call.
      .catch((error) => console.error(error));
    // While the data is loading, show the isLoading view below.
    // Once setLoading() sets isLoading to false, show the view with the
    // loaded data.
    // .finally(() => setLoading(false));
  }

  async function getRatings() {
    // gets ratings from user
    if (!token) {
      await getUserToken();
    }
    fetch("https://music-rater-comp333.herokuapp.com/api/ratings/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setRatings(json))
      .catch((error) => console.error(error));
  }

  async function getUserToken() {
    // gets token for user "sample_user" to retrieve ratings
    await fetch("https://music-rater-comp333.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "sample_user",
        password: "password",
      }),
    })
      .then((response) => response.json())
      .then((json) => setToken(json.token))
      .catch((error) => console.error(error));
  }

  function editSong(song) {
    setActiveSong(song);
    setSongModal(true);
  }

  async function editRating(rating) {
    var flag = true;
    await  refreshList()
    ratingsList.forEach((r) => {
      if (r.song_artist === rating.song_artist) {
        setActiveRating(r);
        flag = false;
      }
    });
    if (flag) {
      setActiveRating(rating);
    }
    setRatingModal(true);
  }

  async function handleSubmitSong(item) {
    setSongModal(false);
    // console.log("item pre", item);
    item.song_artist = item.song + "_" + item.artist;
    // console.log("item post", item);
    if (!item.id) {
      fetch(`https://music-rater-comp333.herokuapp.com/api/songs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          // console.log("POST done", item);
          response.json();
        })
        .then((json) => refreshList())
        .catch((error) => console.error(error))
        .finally(() => refreshList());
    } else {
      fetch(`https://music-rater-comp333.herokuapp.com/api/songs/${item.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          // console.log("put done", item);
          response.json();
        })
        .then((json) => refreshList())
        .catch((error) => console.error(error))
        .finally(() => refreshList());
    }

    // fetch("https://music-rater-comp333.herokuapp.com/api/songs/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(item),
    // })
    //   .then((response) => {
    //     console.log("done");
    //     response.json();
    //   })
    //   .then((json) => refreshList())
    //   .catch((error) => console.error(error));
  }

  function handleSubmitRating(item) {
    setRatingModal(false);
    console.log(item.id)
    if (ratedSongs.includes(item.song_artist)) {
      var method = "PUT";
      var url = `https://music-rater-comp333.herokuapp.com/api/ratings/${item.id}/`;
    } else {
      var method = "POST";
      var url = `https://music-rater-comp333.herokuapp.com/api/ratings/`;
    }

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((json) => refreshList())
      .catch((error) => console.error(error))
      .finally(() => refreshList());
  }

  function handleDelete(item, type) {
    var header = {};
    if (type == "ratings") {
      var header = {
        Authorization: `Token ${token}`,
      };
    }
    fetch(`https://music-rater-comp333.herokuapp.com/api/${type}/${item.id}/`, {
      method: "DELETE",
      headers: header,
    })
      .then((res) => refreshList())
      .catch((error) => console.error(error));
  }

  function trackUserRatedSongs() {
    songsList.forEach((song) => {
      if (
        ratedSongs.includes(song.song_artist) &&
        !userSongs.includes(song.song_artist)
      ) {
        userSongs.push(song);
      }
    });
  }

  function mapSongsToRating() {
    if (!ratingsList) {return}
    ratingsList.forEach((rating) => {
      if (!ratedSongs.includes(rating.song_artist)) {
        ratedSongs.push(rating.song_artist);
      }
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          {songModal ? (
            <SongModal
              activeSong={activeSong}
              handleSubmit={handleSubmitSong}
              setModalVisible={setSongModal}
              modalVisible={songModal}
              setActiveSong={setActiveSong}
            />
          ) : null}
          {ratingModal ? (
            <RatingModal
              activeRating={activeRating}
              handleSubmit={handleSubmitRating}
              setModalVisible={setRatingModal}
              modalVisible={ratingModal}
              setActiveRating={setActiveRating}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                editSong(activeSong);
              }}
              title="Add Song"
              style={[styles.button, styles.buttonAdd]}
              accessibilityLabel={`Click this button to add a new song`}
            >
              <Icon name="add-outline" size={20} color={"crimson"} />
            </TouchableOpacity>
            <FlatList
              data={songsList}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.song}>{item.song}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                  <Text style={styles.rating}>
                    {item.rating_average.toFixed(2)}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        editSong(item);
                      }}
                      title="Edit"
                      style={styles.button}
                      accessibilityLabel={`Click this button to edit ${item.song}`}
                    >
                      <Icon name="create-outline" size={20} color={"crimson"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        editRating(item);
                      }}
                      title="Rate"
                      style={styles.button}
                      accessibilityLabel={`Click this button to rate ${item.song}`}
                    >
                      <Icon
                        name="star-half-outline"
                        size={20}
                        color={"crimson"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDelete(item, "songs");
                      }}
                      title="Delete"
                      style={styles.button}
                      accessibilityLabel={`Click this button to delete ${item.song}`}
                    >
                      <Icon name="trash-outline" size={20} color={"crimson"} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default SongsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  artist: {
    color: "crimson",
    textAlign: "center",
    padding: 5,
    flex: 1,
    justifyContent: "center",
  },
  rating: {
    color: "crimson",
    textAlign: "center",
    padding: 5,
    flex: 1,
    justifyContent: "center",
  },
  song: {
    color: "crimson",
    textAlign: "center",
    padding: 5,
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    color: "white",
    padding: 1,
    margin: 5,
    borderWidth: 0,
    borderColor: "black",
    borderRadius: 5,
  },
  listview: {
    flex: 1,
    paddingTop: 20,
  },
});
