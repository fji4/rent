import React, { Component } from 'react'
import { Item, Tab, List } from 'semantic-ui-react'
import { Input, Menu, Form, TextArea, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

require('./Account.scss');


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5a2dc92d7ad47271b6b7c307",
            logged_in: false,
            register: false,
            cur_user: { local: {}}
        }

    }



    render() {

        //get the info of current user
        if (!(this.state.logged_in)) {
            axios.get('http://localhost:3000/api/users/5a2ce4f2039511da2469e462')
                .then(function (resp) {
                    this.setState({ cur_user: resp.data.data, logged_in: true })
                }.bind(this)
                )
        }
        if (this.state.cur_user)
            console.log(this.state.cur_user.local.email)


        const panes = [
            {
                menuItem: 'Subleasing', render: () => <Tab.Pane attached={false}>Tab 1 Content
                <div className="content1">
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
                            <li>Welcome back! Default username{//this.state.cur_user.name
                            }
                            </li>
                            <li>email: {this.state.cur_user.local.email}{//this.state.cur_user.email
                            }
                            </li>
                            <li>tel: 88888888</li>
                        </ul>
                    </div>
                    <ul>
                        <li><div><Link to="/Account">History</Link></div></li>
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