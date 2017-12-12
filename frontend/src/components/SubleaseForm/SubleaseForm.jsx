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
                    activeItem: 'home'
                }
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    };
    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
        console.log("state changes", this.state.visible);
    }
    handleItemClick(e, { name }) {
        this.setState({activeItem: name})
    }
    render(){
        return(
            <div className = "form">
                <Nav activeItem = {this.state.activeItem}
                handleItemClick = {this.handleItemClick}/>
                {/*<User toggleVisibility = {this.toggleVisibility}*/}
                        {/*visible = {this.state.visible}/>*/}
                {/*{console.log(this.state.visible)}*/}
                <LeftBar />
                <Sublease />
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

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }
    //
    // updateModal(isVisible) {
    //     this.state.isVisible = isVisible;
    //     this.forceUpdate();
    // }
    //
    // render() {
    //     return (
    //         <div>
    //             <Button bsStyle="primary" onClick={ () => this.updateModal(true) }><Glyphicon glyph="menu-hamburger"/></Button>
    //             <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
    //                 <Nav>
    //                     <NavItem href="#">Link 1</NavItem>
    //                     <NavItem href="#">Link 2</NavItem>
    //                     <NavItem href="#">Link 3</NavItem>
    //                     <NavItem href="#">Link 4</NavItem>
    //                 </Nav>
    //             </Sidebar>
    //         </div>
    //     );
    // }
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         visible: false
    //     }
    //
    // }


    render(){
        const visible  = this.props.visible;
        console.log("visible",visible);
        return(
            <div className = "user_icon">
                <Icon className="user" onClick={this.props.toggleVisibility} size = "big" />
                {console.log("visible",visible)}
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        width='thin'
                        direction='right'
                        visible={visible}
                        icon='labeled'
                        vertical
                        inverted
                    >
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Segment basic className = "segment">
                        {console.log(this)}
                        { this.props.children}
                    </Segment>
                </Sidebar.Pushable>
            </div>
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
        const url = '/image';
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
            <h1>File Upload</h1>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
        </form>

        )

    }
}

class Sublease extends Component {
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
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input label='First name' placeholder='First name' />
                        <Form.Input label='Last name' placeholder='Last name' />
                    </Form.Group>
                    <Form.Select label = "Gender" options={options} placeholder='Gender' />
                    <Form.Select label = "preference of gender to sublease" options={preference} placeholder='Gender' />
                    <Form.Input label = "address1" placeholder = 'address1'/>
                    <Form.Input label = "address2" placeholder = 'address2' />
                    <Form.Input label = "city" placeholder = 'city' />
                    <Form.Input label = "start date" type = "date"  />
                    <Form.Input label = "end date" type = "date" />
                    <Form.Input label = "price" placeholder = "price" />
                    {/*<Form.Input label = "description" placeholder = "description"/>*/}
                    <Form.Field control={TextArea} label='description' placeholder='Tell us more about the apartment...' />
                    {/*<Form.Input type="file" name="img" multiple />*/}
                    {/*<form className="uploader" encType="multipart/form-data">*/}
                        {/*<input type="file" id="file" />*/}
                    {/*</form>*/}
                    <ImageForm />

                    <br/>
                    <Form.Checkbox label='I agree to the Terms and Conditions'  />

                </Form>

                <Button className="submit">
                    submit
                </Button>
            </div>
        )
    }
}
//


export default SubleaseForm