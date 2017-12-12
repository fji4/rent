import React, { Component } from 'react'
import { Item,Tab } from 'semantic-ui-react'
import { Input,Menu,Form,TextArea,Dropdown } from 'semantic-ui-react'


class History extends Component{
    render(){
        const panes = [
            { menuItem: 'Subleasing', render: () => <Tab.Pane attached={false}>Tab 1 Content
                <div className = "content1">
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
            </Tab.Pane> },
            { menuItem: 'Completed', render: () => <Tab.Pane attached={false}>Tab 2 Content
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
            </Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
        ]
        return(

            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        )
    }


}

export default History