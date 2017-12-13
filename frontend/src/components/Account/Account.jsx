import React, { Component } from 'react'
import { Item, Tab, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

require('./Account.scss');


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5a2f8f5bec914341c368a321",
            logged_in: false,
            register: false,
            cur_user: {
                local: {
                    name: "Default name",
                    email: "Default email",
                    ownedApt: []
                }
            },
            cur_apt: {}
        }

    }


    //this.props.location.list

    render() {

        //get the info of current user

        console.log(this.props.location.cur_user)
        if (!(this.state.logged_in)) {
            console.log("chishichishi", this.state.logged_in)
            //this.setState({ cur_user: this.props.location.cur_user })
            axios.get('/api/users/' + this.props.location.cur_user._id)
                .then(function (resp) {
                    console.log("set new user!\n" + resp.data.data.local.ownedApt)
                    this.setState({ cur_user: resp.data.data, logged_in: true })
                }.bind(this)
                )
        }
        if (this.state.cur_user)
            console.log("shit" , this.state.cur_user)


        const panes = [
            {
                menuItem: 'Subleasing', render: () => <Tab.Pane attached={false}>
                <div className="content1">
                        <Item.Group divided> 
                            {
                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content verticalAlign='middle'>Content A</Item.Content>
                                //</Item>

                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content verticalAlign='middle'>Content B</Item.Content>
                                //</Item>

                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content content='Content C' verticalAlign='middle' />
                                //</Item>


                            }

                            {
                                //<Image.Group size='medium'>
                                //    {this.props.movies.map((movie) => {
                                //        console.log('map movie', movie);
                                //        let Url = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
                                //        return (
                                //            <Link key={movie.id} to={{ pathname: '/detail/' + movie.id, state: this.props.movies }}> <Image src={Url} alt="Images not available" /></Link>
                                //        );
                                //    })}
                                //</Image.Group>
                            }

                            {
                                console.log("cur_user.local: " , this.state.cur_user.local)
                            }
                            {
                                    this.state.cur_user.local.ownedApt.map((apt_id) => {
                                        axios.get('/api/apartment/' + apt_id)
                                            .then(function (resp) {
                                                this.setState({cur_apt: resp.data.data})
                                                console.log("sdf", this.state.cur_apt)
                                            }.bind(this)
                                        );
                                        console.log("cur_apt: ", this.state.cur_apt);
                                        if (!this.state.cur_apt)
                                            return (
                                                <Item.Content verticalAlign='middle' key="1">error this house no longer available</Item.Content>

                                            )
                                        else if (!this.state.cur_apt.completed)
                                        return (
                                            <Item.Content verticalAlign='middle' key="this.state.cur_apt.">
                                                <Item.Image size='tiny' src='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjojbv6hIbYAhXLNSYKHSxcAAsQjRwIBw&url=http%3A%2F%2Fwww.ntc.edu.ph%2Fprogram%2Fcollege-arts-and-sciences&psig=AOvVaw1c9DTgWOpTkC4DpTthxllb&ust=1513221703399248' />


                                                {this.state.cur_apt.location}
                                            </Item.Content>
                                        )
                                            ;
                                    }
                                    )
                            }
                            
                            
                        </Item.Group>
                    </div>
                </Tab.Pane>
            },
            {
                menuItem: 'Completed', render: () => <Tab.Pane attached={false}>
                <div className="content2">
                        <Item.Group divided>
                            {
                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content verticalAlign='middle'>Content A</Item.Content>
                                //</Item>

                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content verticalAlign='middle'>Content B</Item.Content>
                                //</Item>

                                //<Item>
                                //    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                                //    <Item.Content content='Content C' verticalAlign='middle' />
                                //</Item>
                            }
                            {
                                this.state.cur_user.local.ownedApt.map((apt_id) => {
                                    axios.get('/api/apartment/' + apt_id)
                                        .then(function (resp) {
                                            this.setState({ cur_apt: resp.data.data })
                                            console.log("sdf", this.state.cur_apt)
                                        }.bind(this)
                                        );
                                    console.log("cur_apt: ", this.state.cur_apt);
                                    if (!this.state.cur_apt)
                                        return (
                                            <Item.Content verticalAlign='middle' key="1">error this house no longer available</Item.Content>

                                        )
                                    else if (this.state.cur_apt.completed)
                                        return (
                                            <Item.Content verticalAlign='middle' key="this.state.cur_apt.">
                                                <Item.Image size='tiny' src='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjojbv6hIbYAhXLNSYKHSxcAAsQjRwIBw&url=http%3A%2F%2Fwww.ntc.edu.ph%2Fprogram%2Fcollege-arts-and-sciences&psig=AOvVaw1c9DTgWOpTkC4DpTthxllb&ust=1513221703399248' />


                                                {this.state.cur_apt.location}
                                            </Item.Content>
                                        );
                                }
                                )
                            }

                        </Item.Group>
                    </div>
                </Tab.Pane>
            }
        ]
        return (
            <div id="everything">
                <div id="navBar">
                    <h1> Subleasing </h1>
                    <div> <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }/>
                         </div>
                    <div> Welcome back! {this.state.cur_user.local.email}
                        </div>
                    <div> Search </div>
                    <div>
                        <Link to={{ pathname: "/" }} >
                            Home
                        </Link>
                    </div>

                </div>

                <div id="sideBar">
                    <div className="touXiang">
                        <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }
                            alt="fairy" />
                        <ul>
                            <li>Welcome back! {this.state.cur_user.local.email}
                            </li>

                        </ul>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.logged_in }}>History</Link>

                            </div>
                        </li>
                        <li>
                            <div>
                                <Link to={{ pathname: "/personalinfo", cur_user: this.state.cur_user, state: this.state.logged_in }}>PersonalInfo</Link>
                            </div>
                        </li>

                        <li><div><Link to="/Notifications" >Notification</Link></div></li>
                    </ul>
                </div>

                <div className="acc_content">
                    {
                        //<h1 id="contentTitle">
                        //    Subleasing houses:
                        //</h1>
                        //<div className="subHouses">
                        //    <Houselist />
                        //</div>
                    }
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </div>


            </div>
        )
    }
}


class Houselist extends Component {
    render() {
        return (

            <Item.Group divided>
                <Item>
                    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                    <Item.Content verticalAlign='middle'>Content A</Item.Content>
                </Item>

                <Item>
                    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                    <Item.Content verticalAlign='middle'>Content B</Item.Content>
                </Item>

                <Item>
                    <Item.Image size='tiny' src='https://www.americanflex.com.br/skin/adminhtml/default/default/lib/jlukic_semanticui/examples/assets/images/wireframe/image.png' />
                    <Item.Content content='Content C' verticalAlign='middle' />
                </Item>
            </Item.Group>
        );
    }
}

export default Account
