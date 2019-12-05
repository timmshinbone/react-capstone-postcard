import React from 'react'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'

const HeaderContainer = (props) => {
	return(
		<Header as='h1'>
		{props.loggedin ?
			<Segment>
			<Grid.Row>
				<Grid divided="vertically">
					<Grid.Row columns={1}>
						<Grid.Column width={4} >
							<Header.Content>{props.loggedInUsername}</Header.Content>
							<Button basic onClick={props.logout}>Log Out</Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column width={4} >
							<Button basic color='blue'>POSTCARD</Button>
							<Button basic color='yellow'>FRIENDS</Button>
							<Button basic color='blue'>HISTORY</Button>
							<Button basic color='yellow'>INBOX</Button>
						</Grid.Column>
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