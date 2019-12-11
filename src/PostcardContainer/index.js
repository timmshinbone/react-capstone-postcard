import React, { useState, useRef } from 'react';
import Konva from 'konva';
import { Segment, Button, Icon, Form, Menu, Dropdown, Grid } from 'semantic-ui-react';
import { Stage, Layer } from 'react-konva';
import Rectangle from "./Rectangle";
// import { FreeLine } from "./FreeLine";

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
	const [brushSize, setBrushSize] = useState();

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

	const FreeLine = (stage, layer, mode = "brush") => {
		let isPaint = false;
		let lastLine;

		stage.on("mousedown touchstart", function(e) {
			isPaint = true;
			let pos = stage.getPointerPosition();
			lastLine = new Konva.Line({
				stroke: mode === "brush" ? `${color}` : "white",
				strokeWidth: mode === "brush" ? brushSize : brushSize,
				globalCompositeOperation:
					mode === "brush" ? "source-over" : "destination-out",
				points: [pos.x, pos.y],
			});
			layer.add(lastLine);
		});

		stage.on("mouseup touchend", function() {
			isPaint = false;
		});

		stage.on("mousemove touchmove", function() {
			if(!isPaint) {
				return;
			}
			const pos = stage.getPointerPosition();
				let newPoints = lastLine.points().concat([pos.x, pos.y]);
				lastLine.points(newPoints);
				layer.batchDraw();
		});
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
	}

	// const brushes = []

	const getBrushSizeOptions = (end) => {
		const brushes = []
		for(let i = 1; i <= end; i++){
			brushes.push(i)
		}
		return brushes.map((n) => {
			return({
				key: n,
				text: n,
				value: n
			})
		})
	}



	const handleBrushSizeChange = (e, value) => {
		setBrushSize(value.value)
	}

	return(
		<Segment className="postcard">
			<Segment>
			<span>
				Color:  
				<Dropdown 
					inline
					size='mini'
					scrolling
					label='color'
					options={getColorOptions()}
					placeholder='pick a color'
					closeOnChange
					onChange={handleColorChange}
				/>
			</span>
			<span>
				Brush Size:  
				<Dropdown 
					inline
					size='mini'
					scrolling
					label='brushSize'
					defaultValue={1}
					options={getBrushSizeOptions(50)}
					placeholder='size'
					closeOnChange
					onChange={handleBrushSizeChange}
				/>
				<Button size='mini' basic color="orange" onClick={drawLine}>
					<Icon size='small' name="pencil alternate" color="blue"/>draw
				</Button>
				<Button size="mini" basic color="orange" onClick={eraseLine}>
					<Icon size="small" name="eraser" color="blue"/>erase
				</Button>
			</span>
			<br/>
			<Button size='mini' basic color="blue" onClick={addRectangle}>
				<Icon name="square" color="blue"/>Rectangle
			</Button>
			<Button size='mini' basic color="red" onClick={undo}>
				<Icon name="undo alternate" color="red"/>Undo Last Shape
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
			<Grid.Row >
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
			</Grid.Row>
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