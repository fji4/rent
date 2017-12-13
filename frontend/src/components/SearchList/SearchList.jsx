import React, { Component } from 'react'
import { Button, Card, Input,Icon,Checkbox, Menu, Dropdown, Form, Select, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import {Redirect, browserHistory} from 'react-router';
import * as axios from 'axios';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
import styles from './SearchList.scss'

const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&query=";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={14}
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

const ApartmentList = props => {
    const apartmentItems = props.apartments.map(apartment => {
            return (
                <ApartmentListItem
                    key={apartment._id}
                    apartment={apartment}
                />
            );

    });

    return (
        <Card.Group stackable doubling itemsPerRow={3}>
            {apartmentItems}
        </Card.Group>
    );
};


const ApartmentListItem = ({apartment}) => {
    // const imageUrl = "http://image.tmdb.org/t/p/w150/"+ props.video.poster_path;
    const start = new Date(apartment.dateStarted);
    const end = new Date(apartment.dateEnd);
    return (
        <Card>
            <Image src='http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg' />
            <Card.Content>
                <Card.Header>
                    {apartment.location}
                </Card.Header>
                <Card.Meta>
        <span className='date'>
          From {start.toDateString()} to {end.toDateString()}
        </span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='dollar' />
                    {apartment.price}
                </a>
            </Card.Content>
        </Card>
    );
};

class SearchList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apartments: null,

            position:[],
            value: {min: 0, max: 2000}

        };

        this.markAlladdress = this.markAlladdress.bind(this);
        this.markAddress = this.markAddress.bind(this);


    }




    onInputChange(term) {
        this.setState({ term });
        if (term===null)
        {
            this.state.videos= null;
            this.state.poster_path=0;
        }
        // else this.videoSearch(term);
    }

    componentWillMount() {
       this.getApt();
        console.log("before render");
    }

    getApt() {
        axios.get('http://localhost:3000/api/apartment')
            .then(function (resp) {
                this.markAlladdress(resp.data.data);
                this.setState({apartments:resp.data.data});
                console.log(resp.data.data);
            }.bind(this));

    }

    markAddress(addresses) {
        var address = addresses.replace(/ /g, '+');
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs")
            .then(function(response){
                // console.log(response);
                console.log(response.data.results[0].geometry.location);
                this.setState({position: this.state.position.concat([response.data.results[0].geometry.location])})
            }.bind(this));
    }

    markAlladdress(apt) {
        for(var i = 0; i < apt.length; i++) {
            var temp = "";
            temp += apt[i].location;
            temp += '+';
            temp += apt[i].city;
            console.log(temp);
            this.markAddress(temp);
        }

        // apt.forEach(function (element) {
        //     var temp = "";
        //     temp += element.location;
        //     temp += '+';
        //     temp += element.city;
        //     console.log(temp);
        //     this.markAddress(temp);
        // })
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
                    <Menu fluid borderless size="massive" className="detailnav">
                        <Menu.Item>
                            <Link to="/">
                                <Icon name='home'/>
                            </Link>
                        </Menu.Item>

                        <Menu.Menu className="periodnav">
                            <Menu.Item className="period">
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
                            </Menu.Item>

                            <Menu.Item  className="period">
                            <Input  label= 'End Semester' list='dates' placeholder='End Date' />
                            <datalist id='semesters'>
                                <option value='Spring 2018' />
                                <option value='Summer 2018' />
                                <option value='Fall 2018' />
                                <option value='Spring 2019' />
                                <option value='Fall 2019' />
                            </datalist>
                            </Menu.Item>

                            <Menu.Item  className="period">
                            <Input label= 'Area'  list='areas'placeholder='Area' />
                            <datalist id='areas'>
                                <option value='North Campus' />
                                <option value='Mid campus' />
                                <option value='South Campus' />
                                <option value='off Campus' />

                            </datalist>
                            </Menu.Item>

                            <Menu.Item className="period">
                                <Button>Submit</Button>
                            </Menu.Item>
                        </Menu.Menu>

                        <Menu.Item position="right">
                            <Link to="/account">
                                <Icon  name='user'/>
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

                                  {/*<Checkbox label='Prices Low to High' size='big' />*/}
                                    <div>Price Range</div>
                                    <br/>
                                    <InputRange
                                        formatLabel={value => `${value}$`}
                                        step={100}
                                        maxValue={2000}
                                        minValue={0}
                                        value={this.state.value}
                                        onChange={value => this.setState({ value })} />
                                </div>
                            </div>
                                <br/>

                                <div className ='field' id="genderdrop">
                                    <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='column large'>
                        <div className="List">
                    {this.state.apartments ? <ApartmentList apartments={this.state.apartments}/> : null}
                        </div>
                    </div>

                </div>

             </body>
        )
    }
}

const options = [
    { key: 'm', text: 'Male Only', value: 'male' },
    { key: 'f', text: 'Female Only', value: 'female' },
    { key: 'n', text: 'Gender not Specified', value: 'neither' },
]

export default SearchList
