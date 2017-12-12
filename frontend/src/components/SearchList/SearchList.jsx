import React, { Component } from 'react'
import { Button, Card, Input,Icon,Checkbox, Menu, Dropdown } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import {Redirect, browserHistory} from 'react-router';
import * as axios from 'axios';

import 'semantic-ui-css/semantic.min.css'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
import styles from './SearchList.scss'

const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&query=";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
    >
        {/*{props.isMarkerShown && <Marker position={{ lat: props.markers[0].lat, lng: props.markers[0].lng }} />}*/}

            {props.markers.map(marker => (
                <Marker
                    clickable
                    key={marker.lat}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                        console.log("click");
                        props.history.push('/detail');
            }}
                />
            ))}

    </GoogleMap>
));

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

                    <Link to="/detail" className="active">
                        <img src={imageUrl} />
                    </Link>
                </div>
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
            asc:"1",
            position:[]

        };
        this.sortVideosAsc = this.sortVideosAsc.bind(this);
        this.sortVideosDes = this.sortVideosDes.bind(this);

        this.sortType = this.sortType.bind(this);
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

    componentWillMount() {
        this.markAddress("1010 West Main St. Urbana");
        this.markAddress("1007 West Clark St. Urbana");
        console.log("before render");
    }

    markAddress(addresses) {
        var address = addresses.replace(/ /g, '+');
        var axios = require('axios');
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs")
            .then(function(response){
                // console.log(response);
                console.log(response.data.results[0].geometry.location);
                this.setState({position: this.state.position.concat([response.data.results[0].geometry.location])})
            }.bind(this));
    }

    renderMap() {
        console.log(this.state.position);
        return(
            <div>
                <MyMapComponent
                    isMarkerShown
                    markers={this.state.position}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLNLZK0eVgZMOPh5-3u5qe3IDvJhNSNcA&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `200px` }} />}
                    mapElement={<div style={{ height: `100%` ,width:`100%`}} />}
                />
            </div>
        )
    }

    render() {

        return(

             <body>
                <header>
                    <Menu fluid size="massive" className="detailnav">
                        <Menu.Item>
                            <Link to="/">
                                <Icon size="large" name='home'/>
                            </Link>
                        </Menu.Item>

                        <Menu.Menu id="filternav" position="left">
                            <div className="period">
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
                            </div>

                            <div className="period">
                            <Input  label= 'End Semester' list='dates' placeholder='End Date' />
                            <datalist id='semesters'>
                                <option value='Spring 2018' />
                                <option value='Summer 2018' />
                                <option value='Fall 2018' />
                                <option value='Spring 2019' />
                                <option value='Fall 2019' />
                            </datalist>
                            </div>

                            <div className="period">
                            <Input label= 'Area'  list='areas'placeholder='Area' />
                            <datalist id='areas'>
                                <option value='North Campus' />
                                <option value='Mid campus' />
                                <option value='South Campus' />
                                <option value='off Campus' />

                            </datalist>
                            </div>

                            <div className="period">
                                <Button>Submit</Button>
                            </div>
                        </Menu.Menu>

                        <Menu.Item position="right">
                            <Link to="/account">
                                <Icon size="large" name='user'/>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </header>



                <div className='row'>
                    <div className='column small'>
                        {this.renderMap()}


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
