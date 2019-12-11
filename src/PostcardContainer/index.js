import React, { useState, useRef } from 'react';
import Konva from 'konva';
import { Segment, Button, Icon, Form, Menu, Dropdown } from 'semantic-ui-react';
import { Stage, Layer } from 'react-konva';
import Rectangle from "./Rectangle";
import { FreeLine } from "./FreeLine";

function PostcardContainer() {
	const [rectangles, setRectangles] = useState([]);
	//set other shapes + line drawing above this
	const [selectedId, selectShape] = useState(null);
	const [shapes, setShapes] = useState([]);
	const [, updateState] = React.useState();
	const stageEl = React.createRef();
	const layerEl = React.createRef();
	const [message, setMessage] = useState("");
	const [color, setColor] = useState();

	const addRectangle = () => {
		const rect = {
			x: 150,
			y: 150,
			width: 100,
			height: 100,
			fill: `${color}`,
			id: `rect${rectangles.length + 1}`,
		};
		const rects = rectangles.concat([rect]);
		setRectangles(rects);
		const shs = shapes.concat([`rect${rectangles.length + 1}`]);
		setShapes(shs);
	};

	const drawLine = () => {
		FreeLine(stageEl.current.getStage(), layerEl.current);
	};

	const eraseLine = () => {
		FreeLine(stageEl.current.getStage(), layerEl.current, "erase");
	}

	//place all other shape + drawing components here
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const undo = () => {
		const lastId = shapes[shapes.length - 1];
		//rectangle undo
		let index = rectangles.findIndex(r => r.id === lastId);
		if(index !== -1) {
			rectangles.splice(index, 1);
			setRectangles(rectangles);
		}

		//place undos for other shapes above this
		shapes.pop();
		setShapes(shapes);
		forceUpdate();
	};
	

	const handleMessageSubmit = (e) => {
		e.preventDefault()
		alert(`Changed Message to ${message}` )
	}

	const savePcardData = async () => {

		const stageData = stageEl.current.toDataURL()
		// console.log(stageData);
		const stageDataURL = {
			drawing: stageData,
			message: message
		}

		const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/postcards/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(stageDataURL),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedPcardResponse = await response.json()
		// console.log(parsedPcardResponse);
		
	} 

	const pickColors = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal',
		'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ]
	
	const getColorOptions = () => {
		return pickColors.map((c) => {
			return ({
				key: c,
				text: c,
				value: c
			})
		})
	}

	const handleColorChange = (e, value) => {
		setColor(value.value)
		console.log(color);
	}

	return(
		<Segment className="postcard">
			<Segment>
			<span>
				Color:  
				<Dropdown 
					inline
					label='color'
					options={getColorOptions()}
					placeholder='pick a color'
					closeOnChange
					onChange={handleColorChange}
				/>
			</span><br/>
			<Button size='mini' basic color="blue" onClick={addRectangle}>
				<Icon name="square" color="blue"/>Rectangle
			</Button>
			<Button size='mini' basic color="blue" onClick={drawLine}>
				<Icon name="pencil alternate" color="blue"/>Draw
			</Button>
			<Button size='mini' basic color="blue" onClick={eraseLine}>
				<Icon name="eraser" color="blue"/>Erase
			</Button>
			<Button size='mini' basic color="red" onClick={undo}>
				<Icon name="undo alternate" color="red"/>Undo
			</Button>
			</Segment>
			<Segment>
			<Stage 
				width={window.innerWidth * .75} 
				height={window.innerHeight * .75}
				ref={stageEl}
				onMouseDown={e => {
					const clickedOnEmpty = e.target === e.target.getStage();
					if(clickedOnEmpty) {
						selectShape(null);
					}
				}}
			>
				<Layer ref={layerEl}>
					{rectangles.map((rect, i) => {
						return(
							<Rectangle
								key={i}
								shapeProps={rect}
								isSelected={rect.id === selectedId}
								onSelect={() => {
									selectShape(rect.id);
								}}
								onChange={newAttrs => {
									const rects = rectangles.slice();
									rects[i] = newAttrs;
									setRectangles(rects);
								}}
							/>
						)
					})}
				</Layer>
			</Stage>
			</Segment>
			<Form size='mini' onSubmit={handleMessageSubmit} >
				<Form.Input inline
					label='message'
					control='input'
					placeholder='type your message here...'
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
				<Form.Button 
					basic size='mini' 
					color='olive' 
					content='save message'
					type='Submit'
				/>
				
			</Form>

			<Button basic color="green" onClick={savePcardData}>
				<Icon name="save outline" color="green"/> Save
			</Button>
			<Button basic color="blue">
				<Icon name="dot circle outline" color="blue"/> Update
			</Button>
		</Segment>
	)
}


export default PostcardContainer