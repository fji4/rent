import React, { Component } from 'react'
import { Button, Card, Modal, Header,Input, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Home.scss'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log_in: false,
            logged_in: false,
            registered: false,
            register: false,
            login_user: {
                password: '',
                email: ''
            },
            register_user:{
                name:'',
                password: '',
                email: ''
            },
            message: '',
            users: [],

            cur_user: "",
            src: "",
            set: false
        };
        this.checklogin = this.checklogin.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.onChangeEmailSignUp = this.onChangeEmailSignUp.bind(this);
        this.onChangePasswordSignUp = this.onChangePasswordSignUp.bind(this);
        this.onChangeNameSignUp = this.onChangeNameSignUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showlog = this.showlog.bind(this);
        this.closelog = this.closelog.bind(this);
        this.showregister = this.showregister.bind(this);
        this.closeregister = this.closeregister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onHandleUser = this.onHandleUser.bind(this);
    }




    onChangeNameSignUp(e){
        console.log("target is ",e);
        const user = this.state.register_user;
        console.log(e.target);
        user.name = e.target.value;
        this.setState({
            register_user: user
        })
    }


    onChangeEmail(e) {
        console.log(e);
        const user = this.state.login_user;
        user.email = e.target.value;
        this.setState({
            login_user:user
        });
    }

    onChangePassword(e) {
        const user = this.state.login_user;
        user.password = e.target.value;
        this.setState({
            login_user:user
        })
    }

    onSubmit(e) {
        this.onHandleUser(e);

        console.log("enter onSubmit");
        e.preventDefault();

        const email = encodeURIComponent(this.state.login_user.email);
        console.log(email);
        const password = encodeURIComponent(this.state.login_user.password);
        console.log(password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!',
                    logged_in: true
                })
                this.setState({ log_in: false })
                console.log("set the state logged in to true");
            } else {
                this.setState({
                    message: 'Unable to log in'
                })
            }
        });
        xhr.send(formData);


    }

    //keep track of the current user.
    onHandleUser(e){
        console.log("enter handle current_user");

        axios.get('/api/users')
            .then(function(response){
                console.log('response is', response);
                var user = response.data.data;
                this.setState({
                    users:user
                });
                const users = this.state.users;
                console.log("users is 111",this.state.users);
                const email = this.state.login_user.email;
                console.log("handleuser email",email);
                console.log(users.length,users);
                for(var i = 0; i < users.length; i++){
                    console.log("enter for loop",i, users[i].local.email);
                    if(users[i].local.email === email){
                        console.log(users[i].local.email);
                        this.setState({cur_user:users[i]});
                        console.log("cur-user is ",this.state.cur_user);
                        break;
                    }
                }
                console.log("users is ",this.state.users);
            }.bind(this));
    }



    onSignupSubmit(e){
        console.log("onsignupsubmit");
        e.preventDefault();

        // create a string for an HTTP body message
        // const name = encodeURIComponent(this.state.register_user.name);
        const email = encodeURIComponent(this.state.register_user.email);
        const password = encodeURIComponent(this.state.register_user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!',
                    logged_in: true,
                    log_in: false
                });
                // this.props.history.push('/');
            } else {
                console.log('The form is invalid');
                this.setState({
                    message: 'Unable to register'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmailSignUp(e){
        console.log("target is ",e);
        const user = this.state.register_user;
        console.log(e.target);
        user.email = e.target.value;
        this.setState({
            register_user: user
        })
    }

    onChangePasswordSignUp(e) {
        const user = this.state.register_user;
        user.password = e.target.value;
        this.setState({
            register_user: user
        })
    }

    checklogin(e){
        console.log("!!!!!!!!!!!!checklogin!!!!!!!!!!",this.state.logged_in);
        if(this.state.logged_in){
            console.log("looged in here");
            //this.props.history.push('/sublease');
        }else{
            console.log("show log modal");
            e.preventDefault();
            this.setState({ log_in: true, register: false });
            if (e.target.source = "acc") {
                this.setState({ src: "acc" })
            }
            else {
                this.setState({ src: "but" })
            }
        }
    }
    checkloginAcc(e) {
        console.log("!!!!!!!!!!!!checklogin acc!!!!!!!!!!", this.state.logged_in);
        if (this.state.logged_in) {
            console.log("looged in here");
            //this.props.history.push('/account');
        } else {
            console.log("show log modal");
            e.preventDefault();
            this.setState({ log_in: true, register: false });
        }
    }

    showlog(e) {
        console.log("show log modal")
        e.preventDefault()

        this.setState({ log_in: true, register: false, message: "" })
    }

    closelog(e) {
        console.log("close log modal")
        e.preventDefault()
        this.setState({ log_in: false })
    }

    showregister(e) {
        console.log("show register modal")
        e.preventDefault()
        this.setState({ register: true, log_in: false, message: "" })
    }

    closeregister(e) {
        console.log("close register modal")
        e.preventDefault()
        this.setState({ register: false })
    }

    render() {
        console.log("start")
        //if (this.props.location.cur_user)
        //    this.setState({ logged_in: false })
        if (!(this.state.logged_in)) {
            console.log("chishichishi", this.state.logged_in)
            if (this.props.location.cur_user != undefined) {
                this.setState({ cur_user: this.props.location.cur_user, logged_in:true })
                console.log("zhendechishi", this.props.location.cur_user)
                axios.get('/api/users/' + this.props.location.cur_user._id)
                    .then(function (resp) {
                        console.log("set new user!\n" + resp.data.data.local.ownedApt)
                        this.setState({ cur_user: resp.data.data, logged_in: true })
                    }.bind(this)
                    )
            }
        }
        if (this.state.cur_user)
            console.log("shit", this.state.cur_user)

        return (
            <div className="Home">
                <div className="bar">
                    {
                        //<Link to="/" className="HomeIcon">
                        //    <i className="home icon huge"></i>
                        //</Link>

                        //<div className="AccountIcon">
                        //    <i className="user icon huge" onClick={this.showlog}></i>
                        //</div>
                    }
                    <div className="home_acc">
                        <div>Home</div>
                        <div>
                            <Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.logged_in }} onClick={this.checklogin} source="acc">
                                Account
                            </Link>
                        </div>
                    </div>

                    <h1>Subleasing</h1>
                </div>
                <div className="content">
                    <ul>

                        <li><SubButton showlog={this.showlog} checklogin={this.checklogin} user={this.state.cur_user} login={this.state.logged_in} source="but"/></li>
                        <li><RentButton user = {this.state.cur_user} login = {this.state.logged_in}/></li>
                    </ul>
                </div>

                <Modal
                    open={this.state.log_in}
                    onClose={this.closelog}
                >
                    <Modal.Header>Log In</Modal.Header>
                    <Icon name="close" onClick={this.closelog} />
                    <Modal.Content>
                        <form className="ui form" onSubmit = {this.onSubmit}>
                            <div className="field">
                                <label>Email</label>
                                <Input type="text" name="email" placeholder="email" onChange={this.onChangeEmail}>
                                </Input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <Input type="password" name="password" placeholder="password" onChange={this.onChangePassword}>
                                </Input>
                            </div>
                            <p>{this.state.message}</p>
                            <div>
                                <button className="ui button" type="submit" >Submit</button>
                            </div>
                        </form>

                        <div className="reg">
                            <div> You don't have an account?</div>
                            <div><Button onClick={this.showregister}>register</Button></div>
                        </div >
                    </Modal.Content>
                </Modal>


                <Modal
                    open={this.state.register}
                    onClose={this.closeregister}
                >
                    <Modal.Header>Register</Modal.Header>
                    <Icon name="close" onClick={this.closeregister} />
                    <Modal.Content>
                        <form className="ui form" onSubmit={this.onSignupSubmit}>
                            {/*<div className="field">*/}
                            {/*<label>Username</label>*/}
                            {/*<Input type="text" name="username" placeholder="username" onChange={this.onChangeNameSignUp}>*/}
                            {/*</Input>*/}
                            {/*</div>*/}
                            <div className="field">
                                <label>Email</label>
                                <Input type="text" name="email" placeholder="abc@mail.com" onChange={this.onChangeEmailSignUp}>
                                </Input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <Input type="password" name="password" placeholder="password" onChange={this.onChangePasswordSignUp}>
                                </Input>
                            </div>

                            <div>
                                <button className="ui button" type="submit">Submit</button>
                            </div>
                        </form>
                        <p>{this.state.message}</p>
                        <div className="reg">
                            <div> Already have an account? </div>
                            <div><Button onClick={this.showlog}>log in</Button></div>
                        </div >
                    </Modal.Content>
                </Modal>




                {
                    //<div className="Model register" id="register">
                    //    <i className="close icon"></i>

                    //</div>
                }

                {
                    //                <form>
                    //                    <label>
                    //                        Name:
                    //<input type="text" name="name" />
                    //                    </label>
                    //                    <input type="submit" value="Submit" />
                    //                </form>
                    //    <div className="Model" id="register">
                    //    register
                    //</div>
                }

            </div>
        )
    }
}

class SubButton extends Component {
    render() {
        return (
            <div>
                <Link to={{ pathname: "/sublease", cur_user: this.props.user , state:  this.props.login  }} onClick={this.props.checklogin}>

                    <Button className="theButtons" id="subb">Want to sublease</Button>
                </Link>
            </div>
        )
    }
}

class RentButton extends Component {
    render() {
        return (
            <div><Link to = {{pathname:"/SearchList", cur_user:this.props.user, state:this.props.login}}><Button id="rentb" className="theButtons">Want to rent</Button></Link></div>
        )
    }
}



export default Home



//if want to do full page: https://github.com/subtirelumihail/react-fullpage