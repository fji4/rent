import React, { Component } from 'react'
import { Item, Tab, List } from 'semantic-ui-react'
import { Input, Menu, Form, TextArea, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

require('./Notifications.scss');


class Notifications extends Component {

    render() {
        
        return (
            <div id="everything">
                <div id="navBar">
                    <h1> Subleasing </h1>
                    <div> <img src={'http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/static_jinrongbaguanv_com/5886a925e3bd5fc2a3adf8f9a36324c8.png'}
                        alt="fairy" /> </div>
                    <div> Welcome back! wuzaiyunshang</div>
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
                            <li>welcome back! wuzaiyunshang</li>
                            <li>email: jjj@shi.com</li>
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
                    <div> Notifications</div>
                    <div>
                        <ul>
                            <li>good</li>
                            <li>message</li>
                        </ul>
                    </div>

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

export default Notifications