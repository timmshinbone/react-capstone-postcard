import React from 'react'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'

const HeaderContainer = (props) => {
	return(
		<Header as='h1'>
		{props.loggedin ?
			<Segment.Group>
				<Segment>
					<Header.Content>{props.loggedInUsername}</Header.Content>
				</Segment>
				<Segment>
					<Button basic onClick={props.logout}>Log Out</Button>
				</Segment>				
			</Segment.Group>
			:
			<Segment>
				<Header.Content>Postcard</Header.Content>
			</Segment>
		}
		</Header>
	)
}

export default HeaderContainer