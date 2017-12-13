import React, { Component } from 'react'
import { Menu, Icon, Image, Button, Label } from 'semantic-ui-react'
// import {Carousel} from 'react-bootstrap'
import {Carousel, Table} from 'react-bootstrap';
// import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{lat: 40.112423, lng:  -88.226855}}
    >
        {props.isMarkerShown && <Marker clickable position={{ lat: props.pos.lat, lng: props.pos.lng }} />}
    </GoogleMap>
));


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            photo: [],
            description: "",
            position:{},
            apt: {}
        };

    }

    markAddress() {
        console.log(this.state.address);
        var marker = {lat:-34.397,lng:150.644};
        var address = this.state.address.replace(/ /g, '+');
        console.log(this.state.address);
        var axios = require('axios');
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs")
            .then(function(response){
                console.log(response);
                console.log(response.data.results[0].geometry.location);
                this.setState({position: response.data.results[0].geometry.location})
            }.bind(this));
    }

    renderMap(marker) {
        return(
            <div className="mappos">
                <MyMapComponent

                    isMarkerShown
                    pos={this.state.position}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLNLZK0eVgZMOPh5-3u5qe3IDvJhNSNcA&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` ,width:`100%`}} />}
                />
            </div>
        )
    }

    componentDidMount() {
        if (this.refs.myRef) {
            var temp = this.props.location.state.apt.location;
            temp += ' ';
            temp += this.props.location.state.apt.city;
            console.log(temp);
            this.setState({
                address: temp,
                apt: this.props.location.state.apt,
                photo: [
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-02-LivRm-305-DSC_0183-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-03-LivRm-305-DSC_0137-c-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-05-Kit-305-DSC_0125-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-06-Bed1-305-DSC_0001-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-07-Bath2-305-DSC_0054-small-Large.jpg"
                ],
                description: this.props.location.state.apt.description
            }, function () {
                this.markAddress();
            });
            console.log("setState!");
        }
    }

    renderAllPhoto() {
        var allPhoto = [];
        for (var i = 0; i < this.state.photo.length; i++) {
            allPhoto.push(this.renderPhoto(i));
        }

        return (
            <Carousel className="photo">
                {allPhoto}
            </Carousel>
        );
    }

    renderPhoto(n) {
        return (
            <Carousel.Item key={n}>
                <Image  src={this.state.photo[n]}/>
            </Carousel.Item>
        )
    }



    render() {
        const start = new Date(this.state.apt.dateStarted);
        const end = new Date(this.state.apt.dateEnd);
        return(
            <div className="outdiv">
                <head>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                </head>
                <Menu className="detailnav">
                    <Menu.Item>
                        <Link to="/">
                            <Icon name='home'/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item position="right">
                        <Link to="/account">
                            <Icon name='user'/>
                        </Link>
                    </Menu.Item>
                </Menu>

                <h1 ref="myRef" className="addressCenter">{this.state.address}</h1>

                {this.renderAllPhoto()}
                <br/>
                {this.renderMap(this.state.position)}
                <div className="description">
                    <Table  className="descriptable">
                        <thead>
                        <tr>
                            <th colSpan="2">Detail</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td className="boldtext">Owner</td>
                            <td>{this.state.apt.assignedOwner}</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Price</td>
                            <td>${this.state.apt.price}</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Preference of Gender to Sublease</td>
                            <td>{this.state.apt.gender}</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Subleasing Period</td>
                            <td>{start.toDateString()} -- {end.toDateString()}</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Contact Info</td>
                            <td>{this.state.apt.contactEmail}
                                <p>{this.state.apt.contactPhone}</p></td>
                        </tr>
                        <tr>
                            <td className="boldtext">Other</td>
                            <td>{this.state.description}</td>
                        </tr>
                        </tbody>

                    </Table>
                </div>

                <div className="bottombutton">
                    <Button size="massive" className="contact">Contact</Button>
                    <Button size="massive" className="wishlist" floated="right">Add to Wishlist</Button>
                </div>


            </div>
        )
    }
}

export default Detail