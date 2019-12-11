import React from 'react'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'

const HeaderContainer = (props) => {
	return(
		<Header as='h1'>
		{props.loggedin 
			?
			<Segment>
			<Grid.Row>
				<Grid divided="vertically">
					<Grid.Row columns={3} divided>
						<Grid.Column width={3} />
						<Grid.Column width={10} >
							<Header.Content>Welcome, {props.loggedInUsername}</Header.Content><br/>
							<Button size='mini' pointing='left' basic onClick={props.logout}>Log Out</Button>
						</Grid.Column>
						<Grid.Column width={3} />
					</Grid.Row>
				</Grid>
			</Grid.Row>
			</Segment>
			:
			<Segment>
				<Header.Content>Postcard</Header.Content>
			</Segment>
		}
		</Header>
	)
}

export default HeaderContainer