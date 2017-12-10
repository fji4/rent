import React, { Component } from 'react'
import { Button, Card, Input,Icon,Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as axios from 'axios';
import { GoogleMap, Marker } from "react-google-maps"
const googleapi ='https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs'

import 'semantic-ui-css/semantic.min.css'


import styles from './SearchList.scss'

const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&query=";

const VideoList = props => {
    const videoItems = props.videos.map(video => {
        if (video.poster_path!==null) {
            return (
                <VideoListItem
                    video={video}
                />
            );
        }
    });

    return (
        <div className="ui three column grid">
            {videoItems}
        </div>
    );
};


const VideoListItem = props => {
    const imageUrl = "http://image.tmdb.org/t/p/w150/"+ props.video.poster_path;

    return (
        <ul  className="ui items" id ="itemshow">
            <div className="item">
                <div className="image">

                    <Link to={`/detail/${ props.video.genre_ids[0] }/${ props.video.id }`} className="active">
                        <img src={imageUrl} />
                    </Link>
                </div>
                {/*<div className="middle aligned content">*/}
                    {/*<a className="header">Title :{props.video.title}</a>*/}
                    {/*<br/>*/}
                    {/*<a className="header">Rate :{props.video.vote_average}</a>*/}
                    {/*<br/>*/}
                    {/*<a className="header">Popularity : {props.video.popularity}</a>*/}
                    {/*<br/>*/}
                    {/*<a className="header">ReleaseDate : {props.video.release_date}</a>*/}
                {/*</div>*/}

            </div>
        </ul>
    );
};

class SearchList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
            term: "",
            rate: "1",
            asc:"1"

        };
        // this.sortOnAsc= this.sortOnAsc.bind(this);
        // this.sortOnDes = this.sortOnDes.bind(this);

        this.sortVideosAsc = this.sortVideosAsc.bind(this);
        this.sortVideosDes = this.sortVideosDes.bind(this);

        this.sortType = this.sortType.bind(this);


        // this.videoSearch("and");
    }



    sortVideosAsc () {
        console.log ("clicked ASC");

        this.state.asc="1";
        console.log ("ascshouldbeone", this.state.asc);
        if (this.state.rate ==="1")   // sort on rate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
            });
            console.log ('ascrate');


        }
        else
        {
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (a.popularity - b.popularity))
            });
            console.log ('ascpop');

        }

    }
    sortVideosDes () {
        console.log ('clickedDes');
        this.state.asc="0";
        console.log ("asc should be 0", this.state.asc);
        if (this.state.rate ==="1")   // sort on rate
        {

            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

            });
            console.log ('desrate');


        }
        else
        {

            this.setState(prevState => {
                this.state.videos.sort((a, b) => (b.popularity - a.popularity))
            });
            console.log ('despop');

        }

    }

    sortType (event){
        let type= event.target.value;
        //let order= this.state.asc;

        this.setState({rate: event.target.value});



        if (this.state.asc==="1" && type==="1")  //ascrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
            });
            console.log ('ascrate');
        }
        if (this.state.asc==="1" && type==="0") //ascdate
        {
            console.log ('ascpop');
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (a.popularity - b.popularity))
            });

        }
        if (this.state.asc==="0" && type==="1") //desrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

            });
            console.log('desrate');
        }
        if (this.state.asc==="0" && type ==="0") //desdate
        {
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (b.popularity - a.popularity))
            });
            console.log ('despop');
        }
    }

    sortonSearch(){
        var asc= this.state.asc;
        var rate= this.state.rate;
        if (asc==="1" && rate==="1")  //ascrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
            });
            console.log ('ascrate');
        }
        if (asc==="1" && rate==="0") //ascdate
        {
            console.log ('ascpop');
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (a.popularity - b.popularity))
            });

        }
        if (asc==="0" && rate==="1") //desrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

            });
            console.log('desrate');
        }
        if (asc==="0" && rate ==="0") //desdate
        {
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (b.popularity - a.popularity))
            });
            console.log ('despop');
        }
    }
    videoSearch(term) {
        axios
            .get(
                apiURL +
                term
                // "&api-key=e7b459ccb253cab36bb660a78b72dd18"
                // this.state.apiKey
            )
            .then(response => {
                var results;

                results= response.data.results;
                this.setState({
                    videos: results,
                });
                this.sortonSearch();
            });
    };

    onInputChange(term) {
        this.setState({ term });
        if (term===null)
        {
            this.state.videos= null;
            this.state.poster_path=0;
        }
        else this.videoSearch(term);
    }

    render() {

        return(

             <body>
                <header>
                  <nav>
                    <Link to = '/account'>
                        <Icon id ='usericon' name='user' size ='big' />
                    </Link>
                    <Link to = '/home'>
                        <Icon id ='homeicon' name='home' size ='big' />
                    </Link>
                  </nav>
                </header>
                <div className='SearchList'>
                    <div className= 'SearchBar'>

                        <Input
                            value={this.state.term}
                            onChange={event => this.onInputChange(event.target.value)}
                            label = 'Start Semester' list='dates' placeholder='Start Date' />
                        <datalist id='dates'>
                            <option value='Spring 2018' />
                            <option value='Summer 2018' />
                            <option value='Fall 2018' />
                            <option value='Spring 2019' />
                            <option value='Fall 2019' />
                        </datalist>

                        <Input  label= 'End Semester' list='dates' placeholder='End Date' />
                        <datalist id='semesters'>
                            <option value='Spring 2018' />
                            <option value='Summer 2018' />
                            <option value='Fall 2018' />
                            <option value='Spring 2019' />
                            <option value='Fall 2019' />
                        </datalist>

                        <Input  label= 'Area'  list='areas'placeholder='Area' />
                        <datalist id='areas'>
                            <option value='North Campus' />
                            <option value='Mid campus' />
                            <option value='South Campus' />
                            <option value='off Campus' />

                        </datalist>

                    </div>



                        {/*<label>*/}
                            {/*Prices Low to High*/}
                        {/*</label>*/}
                        {/*<Icon name='checkmark box' size='big'> </Icon>*/}
                        {/*<label>*/}
                            {/*female only*/}
                        {/*</label>*/}
                        {/*<Icon name='checkmark box' size='big'> </Icon>*/}
                        {/*<label>*/}
                            {/*male only*/}
                        {/*</label>*/}


                </div>


                <div className='row'>
                    <div className='column small'>
                        <div id= 'googlemap'>
                            <img src="https://upload.wikimedia.org/wikipedia/en/2/23/GoogleMaps.svg" width="300" height="300"/>

                        </div>

                        <div className='ui form'>
                            <div className='grouped fields'>
                            <div className='field'>
                                <div className='filters'>
                                  <Checkbox label='Prices Low to High' size='big' />

                                </div>
                            </div>
                             <div className ='field'>
                                <div className='female'>
                                   <Checkbox label=' female only' size='big'/>

                                </div>
                             </div>
                                <div className ='field'>
                                    <div className='male'>
                                        <Checkbox label='male only' size='big'/>
                                    </div>
                                </div>
                                <div className ='field'>
                                    <div className='gender not specified'>
                                        <Checkbox label='gender not specified' size='big'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column large'>
                        <div className="List">
                            {this.state.term ? <VideoList videos={this.state.videos}/> : null}
                        </div>
                    </div>

                </div>

             </body>
        )
    }
}


export default SearchList
