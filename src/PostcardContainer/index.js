import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { Segment } from 'semantic-ui-react';

class PostcardContainer extends Component {
	render(){
		return(
			<Segment>
				<Stage width={window.innerWidth} height={window.innerHeight}>
					<Layer>
					</Layer>
				</Stage>
			</Segment>
		)
	}
}

export default PostcardContainer