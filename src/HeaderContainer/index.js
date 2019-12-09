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
					<Grid.Row columns={5} divided>
						<Grid.Column width={1} />
						<Grid.Column width={4} >
							<Header.Content>{props.loggedInUsername}</Header.Content>
							<Button size='mini' pointing='left' basic onClick={props.logout}>Log Out</Button>
						</Grid.Column>
						<Grid.Column width={5} >
							<Button basic >POSTCARD</Button>
							<Button basic >HISTORY</Button>
						</Grid.Column>
						<Grid.Column width={5} >
							<Button basic >FRIENDS</Button>
							<Button basic >INBOX</Button>
						</Grid.Column>
						<Grid.Column width={1} />
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