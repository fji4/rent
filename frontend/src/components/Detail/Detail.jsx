import React, { Component } from 'react'
import { Menu, Icon, Image, Button, Label } from 'semantic-ui-react'
// import {Carousel} from 'react-bootstrap'
import Carousel from 'react-bootstrap/lib/Carousel';
import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: props.pos.lat, lng: props.pos.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.pos.lat, lng: props.pos.lng }} />}
    </GoogleMap>
));


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            photo: [],
            description: "",
            position:{}
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
                pos={marker}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` ,width:`40%`}} />}
            />
            </div>
        )
    }

    componentDidMount() {
        if (this.refs.myRef) {

            this.setState({
                address: "1010 West Main St. Urbana",
                photo: [
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-02-LivRm-305-DSC_0183-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-03-LivRm-305-DSC_0137-c-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-05-Kit-305-DSC_0125-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-06-Bed1-305-DSC_0001-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-07-Bath2-305-DSC_0054-small-Large.jpg"
                ],
                description: "HUGE, spacious apartment with 2 bathrooms! Secured building, washer & dryer right in the apartment and dishwasher. Covered parking available in the garage on the first floor. Secured Package Room to keep your delivered packages safe! Secured Bicycle Room on the first floor as well. FREE HIGH-SPEED GIGABIT INTERNET Internet service included! Covered parking available. Conveniently located just ONE BLOCK from the University of Illinois campus!"
            }, this.markAddress);
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
        return(
            <div className="outdiv">
                <Menu>
                    <Menu.Item
                    >
                        <Icon name='home'/>
                    </Menu.Item>

                    <Menu.Item position="right"
                    >
                        <Icon name='user'/>
                    </Menu.Item>
                </Menu>

                <h1 ref="myRef" className="addressCenter">{this.state.address}</h1>

                {this.renderAllPhoto()}
                <br/>
                {this.renderMap(this.state.position)}

                <Table responsive className="description">
                    <thead>
                        <tr>
                            <th colSpan="2">Detail</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="boldtext">Owner</td>
                            <td>Fanyin Ji</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Price</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Preference of Gender to Sublease</td>
                            <td>Female</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Subleasing Period</td>
                            <td>Spring 2017</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Contact Info</td>
                            <td>2179796948</td>
                        </tr>
                        <tr>
                            <td className="boldtext">Other</td>
                            <td>Love cat</td>
                        </tr>
                    </tbody>

                </Table>

                <div className="bottombutton">
                    <Button size="massive" className="contact">Contact</Button>
                    <Button size="massive" className="wishlist" floated="right">Add to Wishlist</Button>
                </div>


            </div>
        )
    }
}

export default Detail
