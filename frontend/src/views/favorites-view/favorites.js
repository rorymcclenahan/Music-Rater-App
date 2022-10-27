// STARTED FROM HERE
import React, { Component} from "react";
// import SongModal from "../../components/songModal";
// import RatingModal from "../../components/ratingModal";

import axios from "axios";

class Favorite extends Component {
    constructor(props){
        super(props);
        this.state = {
            songsList:[],
            ratingsList:[],
            activeSong:{
                id: null,
                song: '',
                artist: '',
                favorite: '',
            },
            activeRating: {
                id: null,
                username: 'test_user',
                song: '',
                rating: '',
            },
            songModal: false,
            ratingModal: false,
            errorFlag: false,
        }
    };

    componentDidMount() {
        this.refreshList();
    };

    refreshList = () => {
        this.setState({errorMessage: null})
        axios
            .get("https://music-rater-comp333.herokuapp.com/api/songs/")
            .then((res) => this.setState({songsList: res.data}))
            .catch((err) => console.log(err))
        console.log('getting ratings')
        axios
            .get("https://music-rater-comp333.herokuapp.com/api/ratings/test_user/")
            .then((res) => this.setState({ratingsList: res.data}))
            .catch((err) => console.log(err))
        console.log('ratings', this.state.ratingsList)
        // console.log(this.state.songsList)
    };
    
    /* toggleSongModal = () => {
        this.setState({songModal: !this.state.songModal});
    };

    toggleRatingModal = () => {
        this.setState({ratingModal: !this.state.ratingModal});
    };
*/
    /*handleSubmit = (item, type) => {
        if (type == 'songs') {
            this.toggleSongModal();
            item.song_artist = item.song + '_'+item.artist

        } else {
            this.toggleRatingModal();
            item.username = "test_user"
        }
        console.log(item)
        // create method 
        if (!item.id) {
            axios
                .post(`http://localhost:8000/api/${type}/`, item)
                .then((res) => this.refreshList())
                .catch((e) => this.setState({errorFlag:true, errorMessage: 'this song and artist combination already exists'}))
            return;
        }
        // update method
        axios 
            .put(`http://localhost:8000/api/${type}/${item.id}/`, item)
            .then((res) => this.refreshList());

    }

    handleDelete = (item, type) => {
        axios
            .delete(`http://localhost:8000/api/${type}/${item.id}/`, item)
            .then((res) => this.refreshList());
    };



    createSong = () => {
        // console.log("new song")
        const item = { song_artist: "", song: "", artist: "", genre: "" };
        this.setState({activeSong: item, songModal: !this.state.songModal})
        if (this.state.ratingModal) {
            this.setState({ratingModal: !this.state.ratingModal})
        }
    };

    editSong = (item) => {
        // console.log(item)
        this.setState({ activeSong: item, songModal: !this.state.songModal });
        if (this.state.ratingModal) {
            this.setState({ratingModal: !this.state.ratingModal})
        }
    };

    editRating = (item) => {
        // console.log(item)
        this.setState({ activeRating: item, ratingModal: !this.state.ratingModal });
        if (this.state.songModal) {
            this.setState({songModal: !this.state.songModal})
        }
    };
*/
    renderSongs = () => {
        var songs = this.state.songsList
        
        var flag = true
        
        if(flag === true)
            return songs.map((item,i) => (
            <div>
                <li
                key={i}
                className="songList"
                >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.favorite ? (item.song) : (null)}
                </span>
                </li>

            </div>));
            }
            

        // console.log(songs)
        
        /*
        return (songs().map(item=> {
            return (
                <div>{item.title}</div>
            )
        }))
        */
        /*
        songs.map(id => {
            if(this.props.favorites == True) 
                return (//songs.map()
                <li
                key={i}
                className=""
            >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.song} | Artist: {item.artist} | Genre: {item.genre} | {item.rating_average}
                </span>;
    
            }
                
            return
        })
        return songs.map((item,i) => (
            if ({item.favorites} == True) 
            return
                <li
                key={i}
                className=""
            >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.song}
                </span>

            </li> 
            )
            return <h1>Trash</h1>

            }

            /* <li
                key={i}
                className=""
            >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.favorites} ? null : {item.song}
                </span>

            </li> 
        ))
    
    };
    */
    render() {
        return(
            <main className="container">
                <h1 className="header">Favorites</h1>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            {this.renderSongs()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
};

export default Favorite;


/*general

get and retrieve the data
var songs = this.state.songsList
return song.title if songs.favorites == True else nothing
*/
