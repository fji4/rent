import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { Input,Form,TextArea,Dropdown } from 'semantic-ui-react'

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
                    once : true
                };
        this. onSubmit = this.onSubmit.bind(this);
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
        console.log("dddddd",cur_user);
        // const cur_user = this.state.cur_user;
        // console.log(cur_user);
        axios.post('/api/apartment',{
            location:this.state.address,
            city:this.state.city,
            price:this.state.price,
            assignedOwner:cur_user._id,
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
        }).catch(error => {
            console.log(error.response)
        });

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
            console.log(response);
            console.log(response.data);
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
        // console.log(cur_user);
        // if(this.state.once) {
        //     this.setState({cur_user: cur_user, once:false});
        // }
        console.log("cur_user is ",cur_user,this.state.cur_user);
        return(
            <div className = "form" >
                <Nav activeItem = {this.state.activeItem}
                handleItemClick = {this.handleItemClick}/>
                {/*<User toggleVisibility = {this.toggleVisibility}*/}
                        {/*visible = {this.state.visible}/>*/}
                {/*{console.log(this.state.visible)}*/}
                <LeftBar />
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

class Nav extends Component{
    render() {
        const { activeItem } = this.props.activeItem;

        return (
            <Menu secondary>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.props.handleItemClick} />
                <Menu.Item name='notification' active={activeItem === 'notification'} onClick={this.props.handleItemClick} />
                <Menu.Item name='message' active={activeItem === 'message'} onClick={this.props.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    {/*<Menu.Item  onClick={this.props.handleItemClick}>*/}

                        <Dropdown icon='user' pointing = 'right' className='link item'>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Username</Dropdown.Item>
                                    <Dropdown.Item>
                                        <Dropdown text='Contact' pointing='right' className='link item'>
                                            <Dropdown.Menu>
                                                <Dropdown.Header>phone</Dropdown.Header>
                                                <Dropdown.Item>email</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Dropdown.Item>

                                <Dropdown.Item>History</Dropdown.Item>
                                <Dropdown.Item>Watch List</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}



class LeftBar extends Component {
    render(){
        return(
            <div>

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
            console.log(response.data);
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
            <button type="submit">Upload</button>
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
                {/*<Input placeholder='address...' />*/}
                <Form onSubmit={this.props.onSubmit}>

                    <Form.Input label='Username' placeholder='Username' onChange = {this.props.handleUsername}/>
                    <Form.Select label = "preference of gender to sublease" options={preference} value = {preference.value} placeholder='Gender' onChange = {this.props.handleGender} />
                    <Form.Input label = "address" placeholder = 'address' onChange = {this.props.handleAddress}/>
                    <Form.Input label = "city" placeholder = 'city' onChange = {this.props.handleCity}/>
                    <Form.Input label = "start date" type = "date"  onChange = {this.props.handleStartDate}/>
                    <Form.Input label = "end date" type = "date" onChange = {this.props.handleEndDate}/>
                    <Form.Input label = "price" placeholder = "price" onChange = {this.props.handlePrice}/>
                    {/*<Form.Input label = "description" placeholder = "description"/>*/}
                    <Form.Field control={TextArea} label='description' placeholder='Tell us more about the apartment...' onChange = {this.props.handleDescription}/>

                    {/*<Form.Input type="file" name="img" multiple />*/}
                    {/*<form className="uploader" encType="multipart/form-data">*/}
                        {/*<input type="file" id="file" />*/}
                    {/*</form>*/}
                    <Form.Group>
                        <p>Image Upload: After hitting submit, you could submit the second image</p>>
                        <Form.Input input={{ multiple: true }} type = "file" onChange={this.props.onImgChange}/>
                        <Form.Button content='Submit' onClick = {this.props.onFormSubmit}/>
                    </Form.Group>
                    {/*<Form.Group>*/}
                        {/*<Form.Input label = "Image Upload" type = "file" onChange={this.props.onImgChange}/>*/}
                        {/*<Form.Button content='Submit' onClick = {this.props.onFormSubmit}/>*/}
                    {/*</Form.Group>*/}
                    {/*<ImageForm />*/}

                    <br/>
                    <br />
                    <Button className="submit">
                        submit
                    </Button>

                </Form>


            </div>
        )
    }
}
//


export default SubleaseForm