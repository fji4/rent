import React, { Component } from 'react'
import { Item, Tab, List, Menu,Image, Card, Icon } from 'semantic-ui-react'
import { Input, Form, TextArea, Dropdown } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import axios from 'axios'

require('./Account.scss');





const ApartmentList = props => {
    const apartmentItems = props.apartments.map(apartment => {
        return (
            <ApartmentListItem
                key={apartment._id}
                apartment={apartment}
            />
        );

    });

    return (
        <Card.Group stackable doubling itemsPerRow={3}>
            {apartmentItems}
        </Card.Group>
    );
};


const ApartmentListItem = ({ apartment }) => {
    // const imageUrl = "http://image.tmdb.org/t/p/w150/"+ props.video.poster_path;
    const start = new Date(apartment.dateStarted);
    const end = new Date(apartment.dateEnd);
    return (

        <Card>
            <Image fluid src='http://advantageproperties.com/wp-content/uploads/2015/01/1010WMA-2F-04-Kit-305-DSC_0136-small-Large.jpg' />
            {/*<Image fluid src='uploads/Cosmos02.jpg' />*/}
            <Card.Content>
                <Card.Header>
                    <Link to={{ pathname: '/detail', state: { apt: apartment } }}>
                        {apartment.location}
                    </Link>
                </Card.Header>
                <Card.Meta><span className="gender">{`Restrict to ${apartment.gender}`}</span></Card.Meta>
                <Card.Meta className="date">
                    Subleasing Time: <p>{start.toDateString()} -- {end.toDateString()}</p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='dollar' />
                    {apartment.price}
                </a>
            </Card.Content>
        </Card>

    );
};


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
            //axios.get('/api/users/' + this.props.location.cur_user._id)
            axios.get('/api/users/5a2f8f5bec914341c368a321')

                .then(function (resp) {
                    console.log("set new user!\n" + resp.data.data.local.ownedApt)
                    this.setState({ cur_user: resp.data.data, logged_in: true })
                }.bind(this)
                )
        }


        const panes = [
            {
                menuItem: 'Subleasing', render: () => <Tab.Pane attached={false}>
                <div className="content1">
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



                                            //<Item.Content verticalAlign='middle' key="this.state.cur_apt._id">
                                            //    <Link to={{ pathname: "/detail", state: { apt: this.state.cur_apt } }}>
                                            //        <div>
                                            //        <Item.Image size='tiny' src='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjojbv6hIbYAhXLNSYKHSxcAAsQjRwIBw&url=http%3A%2F%2Fwww.ntc.edu.ph%2Fprogram%2Fcollege-arts-and-sciences&psig=AOvVaw1c9DTgWOpTkC4DpTthxllb&ust=1513221703399248' />
                                            //        {this.state.cur_apt.location}</div>
                                            //    </Link>
                                            //</Item.Content>

                                            <div>
                                                <ApartmentListItem apartment={this.state.cur_apt}/>
                                            </div>
                                        )
                                            ;
                                    }
                                    )
                            }
                            
                            
                    </div>
                </Tab.Pane>
            },
            {
                menuItem: 'Completed', render: () => <Tab.Pane attached={false}>
                <div className="content2">
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
                                            //<Item.Content verticalAlign='middle' key="this.state.cur_apt.">
                                            //    <Link to={{ pathname: "/detail", state: { apt: this.state.cur_apt._id } }}>
                                            //        <Item.Image size='tiny' src='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjojbv6hIbYAhXLNSYKHSxcAAsQjRwIBw&url=http%3A%2F%2Fwww.ntc.edu.ph%2Fprogram%2Fcollege-arts-and-sciences&psig=AOvVaw1c9DTgWOpTkC4DpTthxllb&ust=1513221703399248' />
                                            //        <div>{this.state.cur_apt.location}</div>
                                            //    </Link>
                                            //</Item.Content>
                                            <div>
                                                <ApartmentListItem apartment={this.state.cur_apt} />
                                            </div>
                                        );
                                }
                                )
                            }

                    </div>
                </Tab.Pane>
            }
        ]
        return (
            <div id="everything">
                {
                    //<div id="navBar">
                    //    <h1> Subleasing </h1>
                    //    <div> <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png'} />
                    //    </div>
                    //    <div> Welcome back! {this.state.cur_user.local.email}
                    //    </div>
                    //    <div> Search </div>
                    //    <div>
                    //        <Link to={{ pathname: "/" }} >
                    //            Home
                    //    </Link>
                    //    </div>

                    //</div>
                }

                <Menu secondary id="navibar">
                    <Menu.Item name='home'><Link to={{ pathname: "/" }}> Home </Link></Menu.Item>
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



                {
                    //<div id="sideBar">
                    //    <div className="touXiang">
                    //        <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png'}
                    //            alt="fairy" />
                    //        <ul>
                    //            <li>Welcome back! {this.state.cur_user.local.email}
                    //            </li>

                    //        </ul>
                    //    </div>
                    //    <ul>
                    //        <li>
                    //            <div>
                    //                <Link to={{ pathname: "/account", cur_user: this.state.cur_user, state: this.state.logged_in }}>History</Link>

                    //            </div>
                    //        </li>
                    //        <li>
                    //            <div>
                    //                <Link to={{ pathname: "/personalinfo", cur_user: this.state.cur_user, state: this.state.logged_in }}>PersonalInfo</Link>
                    //            </div>
                    //        </li>

                    //        <li><div><Link to="/Notifications" >Notification</Link></div></li>
                    //    </ul>
                    //</div>
                }
                <div className="touXiang" id="sidemenu">
                    <Menu vertical>
                        <Menu.Item>
                            <img src={'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png'}
                                alt="fairy" id="avatar"/>
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
