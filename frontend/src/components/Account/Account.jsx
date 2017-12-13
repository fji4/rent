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
                    name: "Default name",
                    email: "Default email",
                    ownedApt: []
                
            },
            cur_apt: {}
        }

    }




    render() {

        //get the info of current user
        if (!(this.state.logged_in)) {
            axios.get('/api/users/' + this.state.user_id)
                .then(function (resp) {
                    console.log("set new user!\n" + resp.data.data.local.ownedApt)
                    this.setState({ cur_user: resp.data.data.local, logged_in: true })
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
                                console.log("cur_user: " , this.state.cur_user)
                            }
                            {
                                    this.state.cur_user.ownedApt.map((apt_id) => {
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
                                        else
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
            },
            {
                menuItem: 'Completed', render: () => <Tab.Pane attached={false}>Tab 2 Content
                <div className="content2">
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
                    </div>
                </Tab.Pane>
            },
            { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
        ]
        return (
            <div id="everything">
                <div id="navBar">
                    <h1> Subleasing </h1>
                    <div> <img src={'http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/static_jinrongbaguanv_com/5886a925e3bd5fc2a3adf8f9a36324c8.png'}
                        alt="fairy" /> </div>
                    <div> Welcome back! Default username{//this.state.cur_user.name
                    }
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
                        <img src={'http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/static_jinrongbaguanv_com/5886a925e3bd5fc2a3adf8f9a36324c8.png'}
                            alt="fairy" />
                        <ul>
                            <li>Welcome back! {//this.state.cur_user.name
                            }
                            </li>
                            <li>email: {//this.state.cur_user.email
                            }
                            </li>
                            <li>tel: 88888888</li>
                        </ul>
                    </div>
                    <ul>
                        <li><div><Link to="/Account" >History</Link></div></li>
                        <li><div><Link to="/watchlist">Watchlist</Link></div></li>
                        <li><div><Link to="/personalInfo">Personal Info</Link></div></li>
                        <li><div><Link to="/Notifications">Notification</Link></div></li>
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
