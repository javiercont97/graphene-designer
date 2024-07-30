import React from "react";
import '../styles/GlyphEditor.css';

interface GridProps {
	width: number;
	height: number;
	pixels: boolean[][];
	onPixelClick: (x: number, y: number) => void;
}


const GlyphEditor: React.FC<GridProps> = ({ width, height, pixels, onPixelClick }) => {
	const handleClick = (x: number, y: number) => {
		onPixelClick(x, y);
	};

	return (
		<div className="grid">
			{pixels.map((row, y) => (
				<div key={y} className="row">
					{row.map((pixel, x) => (
						<div
							key={x}
							className={`pixel ${pixel ? 'on' : 'off'}`}
							onClick={() => handleClick(x, y)}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default GlyphEditor;