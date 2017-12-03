import React, { Component } from 'react'
import { Menu, Icon, Image, Button } from 'semantic-ui-react'
// import {Carousel} from 'react-bootstrap'
import Carousel from 'react-bootstrap/lib/Carousel';
import { Link } from 'react-router-dom'

import styles from './styles.scss'



class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            photo: [],
            description: "",
        };
    }


    componentDidMount() {
        if (this.refs.myRef) {

            this.setState({
                address: "1010 West Main St.",
                photo: [
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-02-LivRm-305-DSC_0183-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-03-LivRm-305-DSC_0137-c-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-05-Kit-305-DSC_0125-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-06-Bed1-305-DSC_0001-small-Large.jpg",
                    "http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-07-Bath2-305-DSC_0054-small-Large.jpg"
                ],
                description: "HUGE, spacious apartment with 2 bathrooms! Secured building, washer & dryer right in the apartment and dishwasher. Covered parking available in the garage on the first floor. Secured Package Room to keep your delivered packages safe! Secured Bicycle Room on the first floor as well. FREE HIGH-SPEED GIGABIT INTERNET Internet service included! Covered parking available. Conveniently located just ONE BLOCK from the University of Illinois campus!"
            });
            console.log("setState!")
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
            <div>
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


            </div>
        )
    }
}

export default Detail
