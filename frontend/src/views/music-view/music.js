// STARTED FROM HERE
import React, { Component, useEffect, useState } from "react";

import SongModal from "../../components/songModal";
import RatingModal from "../../components/ratingModal";
import StatsModal from "../../components/statsModal";

import axios from "axios";

class Music extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            username: 'sample_user',
            songsList: [],
            ratingsList: [],
            ratedSongs: [],
            userSongs: [],
            token: null,

            activeSong: {
                id: null,
                song: '',
                artist: '',
                favorite: null,
                genre: '',
                rating_average: 0,
            },
            activeRating: {
                id: null,
                username: 'test_user',
                song: '',
                rating: '',
            },

            songModal: false,
            ratingModal: false,
            statsModal: false,

            errorFlag: false,
            errorMsg: null,

        }
    };

    async componentDidMount() {
        if (this.state.token === null){
            console.log('getting user token')
            await this.getUserToken();
        }
        await this.refreshList();
        console.log(this.state.ratingsList)
    };

    // browser.cookie.store secure cookie
    refreshList = async () => {
        // console.log('state', this.state)
        this.setState({errorMessage: null})
        axios
            .get("https://music-rater-comp333.herokuapp.com/api/songs/")
            .then((res) => this.setState({songsList: res.data}))
            .catch((err) => console.log(err))

        await axios
            .get("https://music-rater-comp333.herokuapp.com/api/ratings/", this.state.config)
            .then((res) => {
                this.setState({ratingsList: res.data})
            })
            .catch((err) => console.log(err))
        this.mapSongsToRating()
        this.trackUserRatedSongs()
        console.log('user rated songs', this.state.userSongs)
    };

    async getUserToken() {
        const loginInfo = {
            'username': 'sample_user',
            'password': 'password'    
        }
        await axios
            .post("https://music-rater-comp333.herokuapp.com/api/auth/login", loginInfo)
            .then((res) => { 
                this.setState({
                    config: {
                        headers: {
                            "Authorization": `Token ${res.data.token}`
                        }
                    }
                })
             })
            .catch((err) => console.log(err))
    }

    toggleSongModal = () => {
        this.setState({ songModal: !this.state.songModal });
    };

    toggleRatingModal = () => {
        this.setState({ ratingModal: !this.state.ratingModal });
    };

    toggleStatsModal = () => {
        this.setState({statsModal: !this.state.statsModal});
    };

    handleSubmit = (item, type) => {
        console.log('item', item)
        this.refreshList()
        if (type === 'songs') {
            this.toggleSongModal();
            item.song_artist = item.song + '_'+item.artist
            if (!item.id) {
                axios
                    .post(`https://music-rater-comp333.herokuapp.com/api/${type}/`, item)
                    .then((res) => this.refreshList())
                    .catch((e) => this.setState({errorFlag:true, errorMessage: 'this song and artist combination already exists'}))
                return;
            }
            // update method
            axios 
                .put(`https://music-rater-comp333.herokuapp.com/api/${type}/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        } else {
            this.toggleRatingModal();
            if (item.rating < 1 || item.rating > 5){ 
                this.setState({errorFlag: true, errorMessage: 'rating is not within the range of 1 and 5, please try another rating.'})
                return;
            }
            if (this.state.ratedSongs.includes(item.song_artist)){
                console.log('already rated')
                axios
                    .put(`https://music-rater-comp333.herokuapp.com/api/ratings/${item.id}/`, item, this.state.config)
                    .then((res) => this.refreshList())
                    .catch((e) => console.log(e))
                return;
            } else {
                axios
                    .post(`https://music-rater-comp333.herokuapp.com/api/ratings/`, item, this.state.config)
                    .then((res) => this.refreshList())
                    .catch((e) => console.log(e))
                return;
            }
            
            // update method           
        }
        // create method 
    }

    handleDelete = (item, type) => {
        axios
            .delete(`https://music-rater-comp333.herokuapp.com/api/${type}/${item.id}/`, item)
            .then((res) => this.refreshList());
    };



    createSong = () => {
        // console.log("new song")
        const item = { song_artist: "", song: "", artist: "", genre: "" };
        this.setState({ activeSong: item, songModal: !this.state.songModal })
        if (this.state.ratingModal) {
            this.setState({ ratingModal: !this.state.ratingModal })
        }
    };

    editSong = (item) => {
        // console.log(item)
        this.setState({ activeSong: item, songModal: !this.state.songModal });
        if (this.state.ratingModal) {
            this.setState({ ratingModal: !this.state.ratingModal })
        }
    };

    editRating = (item) => {
        if (this.state.songModal) {
            this.setState({ songModal: !this.state.songModal })
        }
        var flag = true;
        axios
            .get(`https://music-rater-comp333.herokuapp.com/api/ratings/`, this.state.config)
            .then((res) => {
                console.log('res', res.data)
                res.data.forEach((rating) => {
                    if (rating.song === item.song && rating.artist === item.artist){
                        console.log('found', rating)
                        this.setState({activeRating: rating, ratingModal: !this.state.ratingModal})
                        flag = false
                    }
                })
                if (flag) {
                    this.setState({activeRating: item, ratingModal: !this.state.ratingModal})
                }
            })
            .catch((error) => console.log(error))
        // console.log(item)
    };

    checkStats = () => {
        this.setState({statsModal: !this.state.statsModal})
    }

    trackUserRatedSongs () {
        this.state.songsList.forEach((song) => {
            if (this.state.ratedSongs.includes(song.song_artist)  && !this.state.userSongs.includes(song.song_artist)){
                this.state.userSongs.push(song.song_artist)
            }   
        })
    }

    mapSongsToRating = () => {
        this.state.ratingsList.forEach((rating) => {
            // console.log(rating.id)
            if (!this.state.ratedSongs.includes(rating.song_artist)){
                this.state.ratedSongs.push(rating.song_artist)
            }
        })
    }

    renderSongs = () => {
        var songs = this.state.songsList
        // console.log('songs',songs)
        // console.log(songs)
        return songs.map((item, i) => (
            <li
                key={i}
                className=""
            >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.song} | Artist: {item.artist} | Genre: {item.genre} | {item.rating_average.toFixed(2)}
                </span>
                <span>
                    <button
                        onClick={() => this.editSong(item)}
                    >
                        edit
                    </button>
                    <button
                        onClick={() => this.editRating(item)}
                    >
                        rate
                    </button>
                    <button
                        onClick={() => this.handleDelete(item, 'songs')}
                    >
                        delete
                    </button>

                </span>

            </li>
        ));
    };

    /* renderSearch = () => {
        //var songs = this.state.songsList;
        const [searchTerm, setSearchTerm] = useState("");
        // console.log(songs)
        return (
            <div className="Search">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                        />
                    {this.state.songsList.map((item, i) => {
                        return <div className="user" key={i}> <p>{item.song}</p></div>;
                    })}
                </div>
        );
    };

*/


    render() {
        return (
            <main className="container">
                <h1 className="header">songs</h1>

                <div className="row">
                    <div className="column">
                        <div className="card">
                            {this.state.songModal ? (
                                <SongModal
                                    activeItem={this.state.activeSong}
                                    toggle={this.toggleSongModal}
                                    onSave={this.handleSubmit}
                                />
                            ) : null}
                            {this.state.ratingModal ? (
                                <RatingModal
                                    activeItem={this.state.activeRating}
                                    toggle={this.toggleRatingModal}
                                    onSave={this.handleSubmit}
                                />
                            ) : null}
                            {this.state.statsModal ? (
                                <StatsModal
                                    activeItem = {this.state}
                                    toggle = {this.toggleStatsModal}
                                />
                            ): null}
                            {this.state.errorFlag ? (
                                <p className="errorMessage">{this.state.errorMessage}</p>
                            ) : null}
                            {this.renderSongs()}
                        </div>
                        <div className="">
                            <button
                                className=""
                                onClick={this.createSong}
                            >
                                add song
                            </button>
                            <button
                                    onClick={this.checkStats}
                                >
                                    song stats
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
};

export default Music;
