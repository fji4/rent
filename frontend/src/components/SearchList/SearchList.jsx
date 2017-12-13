import React, { Component } from 'react'
import { Button, Card, Input,Icon,Checkbox, Menu, Dropdown, Form, Select, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import {Redirect, browserHistory} from 'react-router';
import * as axios from 'axios';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './SearchList.scss'

const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&query=";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={14}
        defaultCenter={props.marker ? { lat: props.markers[0].lat, lng: props.markers[0].lng } : {lat: 40.112423, lng:  -88.226855}}
    >
        {/*{props.isMarkerShown && <Marker position={{ lat: props.markers[0].lat, lng: props.markers[0].lng }} />}*/}

        {props.markers ? props.markers.map(marker => (
                <Marker
                    clickable
                    key={marker.lat}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                        props.history.push('/detail');
                    }}
                />
            )) : null}

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
            <Image fluid src='http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg' />
            {/*<Image fluid src='uploads/Cosmos02.jpg' />*/}
            <Card.Content>
                <Card.Header>
                    <Link to={{ pathname: '/detail', state: { apt: apartment} }}>
                        {apartment.location}
                    </Link>
                </Card.Header>
                <Card.Meta><span className="gender">{`Restrict to ${apartment.gender}`}</span></Card.Meta>
                <Card.Meta className="date">
                    Subleasing Time: <p>{start.toDateString()} -- {end.toDateString()}</p>
                </Card.Meta>
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
            apartments: [],
            originapartments: [],
            position:[],
            value: {min: 0, max: 2000},
            priceRanking: "",
            gender: "",
            complete: "",
            startDate: null,
            endDate: null

        };

        this.markAlladdress = this.markAlladdress.bind(this);
        this.markAddress = this.markAddress.bind(this);
        this.wholeOnChange = this.wholeOnChange.bind(this);
        this.priceRangeChange = this.priceRangeChange.bind(this);
        this.priceRankingChange = this.priceRankingChange.bind(this);

    }



    priceRangeChange(value) {
        this.setState({value: value, position: []});
        if(this.state.originapartments) {
            var newapartment=[];
            for(var i = 0; i < this.state.originapartments.length; i++) {
                var current = this.state.originapartments[i];
                if (current.price >= value.min && current.price <= value.max) {
                    newapartment.push(current);
                }
            }

            this.setState({apartments: newapartment}, function () {
                this.markAlladdress(newapartment);
            });


        }
    }

    dateRangeChange() {
        this.setState({position: []});
        if(this.state.originapartments) {
            var newapartment=[];
            var currentStart = new Date(this.state.startDate._d).getTime();
            var currentEnd = new Date(this.state.endDate._d).getTime();
            for(var i = 0; i < this.state.originapartments.length; i++) {
                var current = this.state.originapartments[i];
                var start = new Date(this.state.originapartments[i].dateStarted).getTime();
                var end = new Date(this.state.originapartments[i].dateEnd).getTime();
                if (start >= currentStart && end <= currentEnd) {
                    newapartment.push(current);
                }
            }

            this.setState({apartments: newapartment}, function () {
                this.markAlladdress(newapartment);
            });


        }


    }

    wholeOnChange() {
        this.setState({position:[]});
        if (this.state.gender == "male") {
            if (this.state.priceRanking == "lowtohigh") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"male","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"male","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"male"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else if (this.state.priceRanking == "hightolow") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"male","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"male","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"male"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?where={"gender":"male","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?where={"gender":"male","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?where={"gender":"male"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }
        }

        else if (this.state.gender == "female") {
            if (this.state.priceRanking == "lowtohigh") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"female","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"female","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"female"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else if (this.state.priceRanking == "hightolow") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"female","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('http://localhost:3000/api/apartment?sort={"price": -1}&where={"gender":"female","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"female"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?where={"gender":"female","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?where={"gender":"female","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?where={"gender":"female"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }
        }

        else if (this.state.gender == "neither"){
            if (this.state.priceRanking == "lowtohigh") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"neither","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"neither","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": 1}&where={"gender":"neither"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else if (this.state.priceRanking == "hightolow") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"neither","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"neither","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": -1}&where={"gender":"neither"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?where={"gender":"neither","completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?where={"gender":"neither","completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?where={"gender":"neither"}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }
        }

        else {
            if (this.state.priceRanking == "lowtohigh") {
                if (this.state.complete == "complete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": 1}&where={"completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": 1}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else if (this.state.priceRanking == "hightolow") {
                if (this.state.complete == "complete") {
                    axios.get('http://localhost:3000/api/apartment?sort={"price": -1}&where={"completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?sort={"price": -1}&where={"completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment?sort={"price": -1}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

            else {
                if (this.state.complete == "complete") {
                    axios.get('http://localhost:3000/api/apartment?where={"completed":true}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else if (this.state.complete == "notcomplete") {
                    axios.get('/api/apartment?where={"completed":false}')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }

                else {
                    axios.get('/api/apartment')
                        .then(function (resp) {
                            this.markAlladdress(resp.data.data);
                            this.setState({apartments:resp.data.data, originapartments: resp.data.data});
                        }.bind(this));
                }
            }

        }

    }

    priceRankingChange(event, data) {
        this.setState({priceRanking: data.value}, () => {
            this.wholeOnChange();
        })
    }

    genderChange(event, data) {
        this.setState({gender: data.value}, () => {
            this.wholeOnChange();
        })
    }

    completeChange(event, data) {
        this.setState({complete: data.value}, () => {
            this.wholeOnChange();
        })
    }

    componentWillMount() {
        this.wholeOnChange();
    }

    getApt() {
        axios.get('/api/apartment')
            .then(function (resp) {
                this.markAlladdress(resp.data.data);
                this.setState({apartments:resp.data.data, originapartments: resp.data.data});
            }.bind(this));

    }

    markAddress(addresses) {
        var address = addresses.replace(/ /g, '+');
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs")
            .then(function(response){
                // console.log(response);
                this.setState({position: this.state.position.concat([response.data.results[0].geometry.location])})
            }.bind(this));
    }

    markAlladdress(apt) {
        for(var i = 0; i < apt.length; i++) {
            var temp = "";
            temp += apt[i].location;
            temp += '+';
            temp += apt[i].city;
            this.markAddress(temp);
        }

    }

    renderMap() {

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


    handleStartChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndtChange(date) {
        this.setState({
            endDate: date
        });
    }

    render() {
        return(

            <body>
            <header>
                <Menu fluid borderless stackable size="large" className="detailnav">
                    <Menu.Item>
                        <Link to="/">
                            <Icon name='home'/>
                        </Link>
                    </Menu.Item>

                    <Menu.Menu className="periodnav">
                        <Menu.Item>Start Date</Menu.Item>
                        <Menu.Item>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartChange.bind(this)}
                            />
                        </Menu.Item>
                        <Menu.Item>End Date</Menu.Item>


                        <Menu.Item>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndtChange.bind(this)}
                            />
                        </Menu.Item>


                        <Menu.Item>
                            <Button onClick={() => this.dateRangeChange()}>Submit</Button>
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
                                        onChange={value => this.priceRangeChange(value)} />
                                </div>
                            </div>
                            <br/>

                            <div className ='field'>
                                <Form.Field control={Select} lable='Price Ranking'
                                            options={[{ key: 'as', text: 'Low to High', value: 'lowtohigh' },
                                                { key: 'de', text: 'High to Low', value: 'hightolow' },]}
                                            value={this.state.priceRanking}
                                            placeholder='Price Ranking' onChange={this.priceRankingChange.bind(this)}/>
                            </div>

                            <div className ='field' id="genderdrop">
                                <Form.Field control={Select} label='Gender' options={options}
                                            placeholder='Gender' onChange={this.genderChange.bind(this)}/>
                            </div>

                            <div className ='field'>
                                <Form.Field control={Select} label='Is the subleasing completed?'
                                            options={[{ key: 'y', text: 'Completed', value: 'complete' },
                                                { key: 'n', text: 'Not Completed', value: 'notcomplete' },]}
                                            placeholder='Is the subleasing completed?'
                                            onChange={this.completeChange.bind(this)}/>
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
    { key: 'nei', text: 'Gender not Specified', value: 'neither' },
]

export default SearchList