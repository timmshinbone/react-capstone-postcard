import Konva from "konva";

export const FreeLine = (stage, layer, mode = "brush") => {
	let isPaint = false;
	let lastLine;

	stage.on("mousedown touchstart", function(e) {
		isPaint = true;
		let pos = stage.getPointerPosition();
		lastLine = new Konva.Line({
			stroke: mode === "brush" ? "black" : "white",
			strokeWidth: mode === "brush" ? 3 : 15,
			globalCompositeOperation:
				mode === "brush" ? "source-over" : "destination-out",
			points: [pos.x, pos.y],
			draggable: mode === "brush",
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