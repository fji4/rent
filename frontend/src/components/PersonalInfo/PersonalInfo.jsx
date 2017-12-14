import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { Input, Menu, Form, TextArea, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios,{put} from 'axios'

require('./PersonalInfo.scss')


class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

            user_id: "",
            logged_in: false,
            register: false,
            cur_user: {
                local: {
                    name: "Default name",
                    email: "Default email",
                    ownedApt: []
                }
            },
            change_user: {
                name: '',
                description: ''
            },
            cur_apt: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

    }

    onSubmit(e) {
        console.log("enter onSubmit");
        e.preventDefault();

        console.log(this.state.change_user);
        console.log('cur_user',this.state.cur_user._id);
        var user = this.state.change_user;
        axios.put('/api/users/'+this.state.cur_user._id, {
                name: user.name,
                description: user.description
            }
        )
            .then((response) => {
                console.log(response)
            }, (err) => {
                console.log(err)
            })
    }



    onChangeName(e) {

        console.log("e: ", e);
        const user = this.state.change_user;
        user.name = e.target.value;
        this.setState({
            change_user: user

        });
        console.log('name',user.name);
    }

    onChangeDescription(e) {
        console.log("e: ", e)

        const user = this.state.change_user;
        user.description = e.target.value;
        this.setState({
            change_user: user
        })

        console.log('user description',user.description);
    }

    render() {

        //console.log(this.props.location.cur_user)
        if (!this.state.logged_in) {
            console.log("chishichishi", this.state.logged_in)
            //this.setState({ cur_user: this.props.location.cur_user })
            //axios.get('/api/users/' + this.props.location.cur_user._id)

            axios.get('/api/users/'+this.props.location.cur_user._id)
                .then(function (resp) {
                    console.log("set new user!\n" + resp.data.data.local.ownedApt)
                    this.setState({ cur_user: resp.data.data, logged_in: true })
                }.bind(this)
                )
        }
        if (this.state.cur_user)
            console.log("shit", this.state.cur_user)



        return (
            <div className='everything_PersonalInfo'>
                {
                    //<Nav activeItem={this.state.activeItem}
                    //    handleItemClick={this.handleItemClick} />
                    //<h1>Watching List</h1>
                    //<List />
                }
                
                <div id="everything">
                    {
                        ////<div id="navBar">
                        //    <h1> Subleasing </h1>
                        //    <div> <img src={'http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/static_jinrongbaguanv_com/5886a925e3bd5fc2a3adf8f9a36324c8.png'}
                        //        alt="fairy" /> </div>

                        //    <div> Welcome back! {this.state.cur_user.local.name}
                        //    </div>
                        //    <div> Search </div>
                        //    <div>
                        //        <Link to={{ pathname: "/" }} >
                        //            Home
                        //</Link>
                        //    </div>

                        //</div>

                        //<div id="sideBar">
                        //    <div className="touXiang">
                        //        <img src={'http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/static_jinrongbaguanv_com/5886a925e3bd5fc2a3adf8f9a36324c8.png'}
                        //            alt="fairy" />
                        //        <ul>
                        //            <li>Welcome back! {this.state.cur_user.local.email}
                        //            </li>

                        //        </ul>
                        //    </div>
                        //    <ul>
                        //        <li><div><Link to="/Account" >History</Link></div></li>
                        //        {/*<li>*/}
                        //        {/*<div>*/}
                        //        {/*<Link to={{ pathname: "/watchlist", cur_user: this.state.cur_user, state: this.state.logged_in }}>Watchlist</Link>*/}
                        //        {/*</div>*/}
                        //        {/*</li>*/}
                        //        <li>
                        //            <div>
                        //                <Link to={{ pathname: "/personalinfo", cur_user: this.state.cur_user, state: this.state.logged_in }}>PersonalInfo</Link>
                        //            </div>
                        //        </li>
                        //        <li><div><Link to="/Notifications" >Notification</Link></div></li>
                        //    </ul>
                        //</div>
                    }

                    <Menu secondary id="navibar">
                        <Menu.Item name='home'><Link to={{ pathname: "/", cur_user: this.state.cur_user, state: this.state.logged_in }}> Home </Link></Menu.Item>
                        <Menu.Item name='rent'><Link to={{ pathname: "/searchlist" }}>Rent</Link></Menu.Item>
                        <Menu.Menu position='right'>

                            <Dropdown icon='user' pointing='right' className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>{this.state.cur_user.local.name}</Dropdown.Item>
                                    <Dropdown.Item>{this.state.cur_user.local.email}</Dropdown.Item>
                                    <Dropdown.Item><Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.logged_in }}>History</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                    <div className="touXiang" id="sidemenu">
                        <Menu vertical>
                            <Menu.Item>
                                <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png'}
                                    alt="fairy" id="avatar" />
                            </Menu.Item>
                            <Menu.Item>
                                Welcome back! {this.state.cur_user.local.name}
                            </Menu.Item>
                            <Menu.Item>
                                email: {this.state.cur_user.local.email}
                            </Menu.Item>

                            <Menu.Item>
                                <Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.logged_in }}>History</Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to={{ pathname: "/personalinfo", cur_user: this.state.cur_user, state: this.state.logged_in }}>PersonalInfo</Link>
                            </Menu.Item>

                        </Menu>
                    </div>
                    <div className="acc_content">
                        <h1 id="contentTitle">
                            Personal Infomation:
                        </h1>
                        <Form onSubmit={this.onSubmit} id="theForm">
                            <Form.Input label="description" placeholder={this.state.cur_user.local.name} onChange={this.onChangeDescription}/>
                            <form className="uploader" encType="multipart/form-data">
                                <input type="file" id="file" />
                            </form>

                            <br />
                            <Form.Checkbox label='I agree to the Terms and Conditions' />
                            <button className="ui button" type="submit" >Submit</button>
                        </Form>
                    </div>


                </div>
            </div>
        );
    }
}



export default PersonalInfo