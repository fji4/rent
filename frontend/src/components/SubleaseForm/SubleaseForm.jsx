import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { Input, Form, TextArea, Dropdown, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap'
// import Sidebar from 'react-bootstrap-sidebar'

import axios,{ post } from 'axios';
require('./SubleaseForm.scss');

class SubleaseForm extends Component {
    constructor(props){
        super(props);
        this.state = {
                    visible: false,
                    activeItem: 'home',
                    file:null,
                    username: '',
                    gender: '',
                    address:'',
                    city:'',
                    startDate: null,
                    endDate: null,
                    price: '',
                    description:'',
                    img:[],
                    user:{},
                    cur_user:{},
                    login: false,
                    once: true,
                    apartmentt: null,
                    submitted: false
                };
        this.onSubmit = this.onSubmit.bind(this);
        this.setUser = this.setUser.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onImgChange = this.onImgChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    };


    onSubmit(e){
        console.log('submit the ofrm',this.state);
        const cur_user = this.props.location.cur_user;
        console.log("dddddd", cur_user);
        axios.post('/api/apartment',{
            location:this.state.address,
            city:this.state.city,
            price:this.state.price,
            assignedOwner:cur_user,

            gender:this.state.gender,
            contactEmail :cur_user.local.email,
            description:this.state.description,
            datePosted:Date.now(),
            dateStarted: this.state.startDate,
            dateEnd:this.state.endDate,
            complete:false,
            img:this.state.img

        }).then(function (response) {
            console.log(response);
            console.log("response.data.data:", response.data.data)
            var temp = response.data.data
            this.setState({ apartmentt: temp, submitted: true }, function () {
                console.log("apartmentt: ", this.state.apartmentt)
                console.log("submitted:", this.state.submitted)

            })
            console.log(cur_user);
            var array = cur_user.local.ownedApt;
            console.log("array is ", array);
            console.log(this.state.apartmentt);
            array.push(this.state.apartmentt._id);
            console.log('array', array);
            axios.put('/api/users/'+cur_user._id,{
                    ownedApt: array
                }
            )
                .then((response) => {
                    console.log(response)
                }, (err) => {
                    console.log(err)
                })
            //console.log("apartmentt: ", this.state.apartmentt)

            }.bind(this))
        //    .catch(error => {
        //    console.log("err: ", error.response)
        //});


    }

    handleUsername(e){
        console.log('username',e.target.value);
        this.setState({username: e.target.value});
    }
    handleGender(e,data){
        console.log('gender target', e.target);
        console.log('data',data.value);
        this.setState({gender:data.value});
    }
    handleAddress(e){
        console.log('address',e.target.value);
        this.setState({address: e.target.value});
    }
    handleCity(e){
        console.log('city',e.target.value);
        this.setState({city: e.target.value});
    }
    handleStartDate(e){
        console.log('sdate',e.target.value );
        this.setState({startDate: e.target.value});
    }
    handleEndDate(e){
        console.log('edate',e.target.value );
        this.setState({endDate: e.target.value});
    }
    handlePrice(e){
        console.log('price',e.target.value );
        this.setState({price: e.target.value});
    }
    handleDescription(e){
        console.log('description',e.target.value );
        this.setState({description: e.target.value});
    }
    onFormSubmit(e){
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log("onformsubmit: ", response);

            console.log('data is ',response.data);
            var img_path = response.data[0].path;
            var array = this.state.img;

            array.push(img_path);
            console.log("img path is ",array);
            this.setState({img: array});
            console.log("img is",this.state.img);
        });



    }
    onImgChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = '/api/image';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    setUser(user){
        this.setState({cur_user: user});
    }




    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
        console.log("state changes", this.state.visible);
    }
    handleItemClick(e, { name }) {
        this.setState({activeItem: name})
    }
    render(){
        const cur_user = this.props.location.cur_user;
        if (!this.state.login) {
            console.log("login user ")
            this.setState({ cur_user: cur_user, login: true })
        }
        console.log("cur_user is what  ",cur_user,this.state.cur_user);
        return(
            <div className = "formm" >

                <div id="subFnavBar">

                    <div>
                        <Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.login }}>
                            <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }
                                alt="fairy" />
                        </Link>
                    </div>
                    <div> Welcome back!
                    </div>
                    <div>
                        <Link to={{ pathname: "/searchlist", cur_user: this.state.cur_user, state: this.state.login }}>Search</Link>
                    </div>
                    <div>
                        <Link to={{ pathname: "/" }} >
                            Home
                        </Link>
                    </div>
                </div>
z

                <Sublease
                    handleUsername = {this.handleUsername}
                    handleGender = {this.handleGender}
                    handleAddress   =  {this.handleAddress}
                    handleCity = {this.handleCity}
                    handleStartDate={this.handleStartDate}
                    handleEndDate={this.handleEndDate}
                    handlePrice={this.handlePrice}
                    handleDescription ={this.handleDescription}
                    onFormSubmit = {this.onFormSubmit}
                    onImgChange = {this.onImgChange}
                    fileUpload = {this.fileUpload}
                    onSubmit = {this.onSubmit}
                />
            </div>
        )
    }
}




class ImageForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log("imageform: ", response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = '/api/image';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }
    // handleFileUpload({ file }) {
    //     // const file = files[0];
    //     // this.uploadRequest({
    //     //     file,
    //     //
    //     // })
    //     console.log(file, "input is ----");
    //     let formData = new FormData();    //formdata object
    //
    //     formData.append('file', file);   //append the values with key, value pair
    //     //formData.append('name', name);
    //
    //     const config = {
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }
    //
    //     axios.post('/image', formData, config)
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    render() {
        return (

        <form onSubmit={this.onFormSubmit}>
            <h1>Image Upload</h1>

            <input type="file" onChange={this.onChange} />
            <Button type="submit">Upload</Button>
        </form>

        )

    }
}

class Sublease extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstname: null,
            lastname: null,
            gender: null,
            preferenceGender: null,
            address1: null,
            address2: null,
            city: null,
            startdate: null,
            enddate: null,
            price: null,
            description: null

        }
        // this.onFormSubmit = this.onFormSubmit.bind(this)
        // this.onChange = this.onChange.bind(this)
        // this.fileUpload = this.fileUpload.bind(this)
    }

    render(){
        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
        ];
        const preference = [
            { key: 'mo', text: 'Male only', value: 'male only' },
            { key: 'fo', text: 'Female only', value: 'female only' },
            { key: 'bo', text: 'both', value: 'both' }
        ];
        return(
            <div className="sublease">
                <h2>Sublease Form</h2>
                <Form onSubmit={this.props.onSubmit}>

                    <Form.Select label = "preference of gender to sublease" options={preference} value = {preference.value} placeholder='Gender' onChange = {this.props.handleGender} />
                    <Form.Input label = "address" placeholder = 'address' onChange = {this.props.handleAddress}/>
                    <Form.Input label = "city" placeholder = 'city' onChange = {this.props.handleCity}/>
                    <Form.Input label = "start date" type = "date"  onChange = {this.props.handleStartDate}/>
                    <Form.Input label = "end date" type = "date" onChange = {this.props.handleEndDate}/>
                    <Form.Input label="price" placeholder="price" onChange={this.props.handlePrice} />
                    <Form.Input label='description' placeholder='Tell us more about the apartment...'
                        onChange={this.props.handleDescription} />
                    <Form.Group>
                        <p>Image Upload: After hitting submit, you could submit the second image</p>>
                        <Form.Input input={{ multiple: true }} type = "file" onChange={this.props.onImgChange}/>
                        <Form.Button content='Submit' onClick = {this.props.onFormSubmit}/>
                    </Form.Group>

                    
                    <br/>
                    
                    <Button className="submit" type="submit" >
                        Submit
                    </Button>                    

                </Form>


            </div>
        )
    }
}
//


export default SubleaseForm