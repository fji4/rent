import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { Input,Menu,Form,TextArea,Dropdown } from 'semantic-ui-react'
require('./WatchList.scss')


class WatchList extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: 'home'
        }
        this.handleItemClick = this.handleItemClick.bind(this);

    }

    handleItemClick(e, { name }) {
        this.setState({activeItem: name})
    }
    render(){
        return(
          <div className = 'list'>
              <Nav activeItem = {this.state.activeItem}
                   handleItemClick = {this.handleItemClick}/>
              <h1>Watching List</h1>
             <List />
          </div>
        );
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



class List extends Component{
    render(){
        return(

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

export default WatchList