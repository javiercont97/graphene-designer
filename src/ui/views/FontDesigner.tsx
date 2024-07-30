// src/FontEditor.tsx
import React, { useState } from 'react';
import GlyphEditor from '../components/GlyphEditor';

const FontEditor: React.FC = () => {
	const width = 16;
	const height = 16;

	const initialPixels = Array.from({ length: height }, () => Array(width).fill(false));

	const [pixels, setPixels] = useState<boolean[][]>(initialPixels);

	const handlePixelClick = (x: number, y: number) => {
		const newPixels = pixels.map((row, rowIndex) =>
			row.map((pixel, colIndex) => (rowIndex === y && colIndex === x ? !pixel : pixel))
		);
		setPixels(newPixels);
	};

	return (
		<div>
			<GlyphEditor width={width} height={height} pixels={pixels} onPixelClick={handlePixelClick} />
		</div>
	);
};

export default FontEditor;
