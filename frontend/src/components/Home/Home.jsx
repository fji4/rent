import React, { Component } from 'react'
import { Button, Card, Modal, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log_in: false,
            register: false
        }

        this.showlog = this.showlog.bind(this);
        this.closelog = this.closelog.bind(this);
        this.showregister = this.showregister.bind(this);
        this.closeregister = this.closeregister.bind(this);
    }

    showlog(e) {
        console.log("show log modal")
        e.preventDefault()
        this.setState({ log_in: true, register: false })
    }

    closelog(e) {
        console.log("close log modal")
        e.preventDefault()
        this.setState({ log_in: false })
    }

    showregister(e) {
        console.log("show register modal")
        e.preventDefault()
        this.setState({ register: true, log_in: false })
    }

    closeregister(e) {
        console.log("close register modal")
        e.preventDefault()
        this.setState({ register: false })
    }

    render() {
        console.log("start")
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
                        <div onClick={this.showlog}>Account</div>
                    </div>

                    <h1>Subleasing</h1>
                </div>
                <div className="content">
                    <ul>
                        <li><SubButton showlog={this.showlog} /></li>
                        <li><RentButton /></li>
                    </ul>
                </div>

                <Modal
                    open={this.state.log_in}
                    onClose={this.closelog}
                >
                    <Modal.Header>Log In</Modal.Header>
                    <i className="close icon" onClick={this.closelog}></i>
                    <Modal.Content>
                        <form className="ui form">
                            <div className="field">
                                <label>Username</label>
                                <input type="text" name="username" placeholder="username">
                                </input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="text" name="password" placeholder="password">
                                </input>
                            </div>
                            <div>
                                <button className="ui button" type="submit">Submit</button>
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
                    <i className="close icon" onClick={this.closeregister}></i>
                    <Modal.Content>
                        <form className="ui form">
                            <div className="field">
                                <label>Username</label>
                                <input type="text" name="username" placeholder="username">
                                </input>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="text" name="email" placeholder="abc@mail.com">
                                </input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="text" name="password" placeholder="password">
                                </input>
                            </div>
                            <div className="field">
                                <label>Re-enter Password</label>
                                <input type="text" name="re-password" placeholder="confirm password">
                                </input>
                            </div>
                            <div>
                                <button className="ui button" type="submit">Submit</button>
                            </div>
                        </form>
                        <div className="reg">
                            <div> Already have an account? </div>
                            <div><Button onClick={this.showlog}>log in</Button></div>
                        </div >
                    </Modal.Content>
                </Modal>

                {
                    //<div className="Model"
                    //    id="log"
                    //    style={{ display: this.log_in }}
                    //>
                    //    <i className="close icon"></i>
                    //    <form className="ui form">
                    //        <div class="field">
                    //            <label>Username</label>
                    //            <input type="text" name="username" placeholder="username">
                    //            </input>
                    //        </div>
                    //        <div className="field">
                    //            <label>Password</label>
                    //            <input type="text" name="password" placeholder="password">
                    //            </input>
                    //        </div>
                    //        <div className="but">
                    //            <button className="ui button" type="submit">Submit</button>
                    //        </div>
                    //    </form>
                    //    <div className="reg">
                    //        <div> You don't have an account?</div>
                    //        <div><Button>register</Button></div>
                    //    </div >
                    //</div>
                }


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
            <div><Button className="theButtons" id="subb" onClick={this.props.showlog}>Want to sublease</Button></div>
        )
    }
}

class RentButton extends Component {
    render() {
        return (
            <div><Link to="/SearchList"><Button id="rentb" className="theButtons">Want to rent</Button></Link></div>
        )
    }
}



export default Home

//{<Card>
//    <h1>Welcome to MP2!</h1>

//    <span>
//        <Link to="/login">
//            <Button>
//                Login
//            </Button>
//        </Link>

//        <Link to="/register">
//            <Button>
//                Register
//            </Button>
//        </Link>
//    </span>

//    <br />
//</Card>}


//if want to do full page: https://github.com/subtirelumihail/react-fullpage