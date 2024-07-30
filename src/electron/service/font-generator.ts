import * as fs from 'node:fs';
import * as path from 'node:path';
import { FontFace, NewFace, Glyph } from 'freetype2';

// const fontPath = '/home/javier/Graphene.ttf';
// const fontPath = '/home/javier/Documents/graphene/fonts/Ubuntu-Light.ttf';
const charmap = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

export type FontSize = {
	width: number;
	height: number;
}

function computePixmapSize(charmap: string, face: FontFace, wholeByte = true): FontSize {
	let width = 0;
	let height = 0;
	const margin_bytes = 0;

	for (let i = 0; i < charmap.length; i++) {
		const char: number = charmap.charCodeAt(i);
		const glyph: Glyph = face.loadChar(char, {
			render: true
		});

		if (glyph.bitmap) {
			width = Math.max(width, glyph.bitmap.width);
			height = Math.max(height, glyph.bitmap.height);
		}
	}

	return {
		width: wholeByte ? 8 * (Math.floor((width + 7) / 8) + margin_bytes) : width,
		height
	};
}

function glyphToPixmap(glyph: Glyph, size: FontSize, baseLine: number): number[] {
	const buffer: number[] = new Array(size.width * size.height).fill(0);

	if (!glyph.bitmap) {
		return buffer;
	}

	const glyphTop = glyph.bitmapTop ? glyph.bitmapTop : 0;

	for (let y = 0; y < glyph.bitmap.height; y++) {
		for (let x = 0; x < glyph.bitmap.width; x++) {
			const pixel = glyph.bitmap.buffer[(y * glyph.bitmap.width) + x];
			const row = y + (size.height - glyphTop) - baseLine;
			if (row >= 0 && row < size.height) {
				buffer[(row * size.width) + x] = pixel ? 1 : 0;
			}
		}
	}

	return buffer;
}

function pixmapToHex(pixmap: number[], size: FontSize, comment: string): string {
	let hex = '';

	hex += `\t/* '${comment}' */\n`;
	for (let y = 0; y < size.height; y++) {
		let row = '';
		for (let x = 0; x < size.width; x += 8) {
			let octet = 0;
			for (let bit = 0; bit < 8; bit++) {
				const pixel = pixmap[(y * size.width) + x + bit];
				octet |= pixel << (7 - bit);
			}

			row += `0x${octet.toString(16).padStart(2, '0')}, `;
		}

		hex += `\t${row}\n`;
	}

	return hex;
}

function writeOutputFile(generatedFontName: string, outFilePath: string, hexPixmapList: string[], size: FontSize): void {
	const outStream = fs.createWriteStream(outFilePath);
	outStream.write(`#if !defined(FONT_${generatedFontName.toUpperCase()}_H)\n`);
	outStream.write(`#define FONT_${generatedFontName.toUpperCase()}_H\n`);
	outStream.write(`\n`);
	outStream.write(`#include <Graphene.h>\n`);
	outStream.write(`#include <stdint.h>\n\n`);
	outStream.write(`const uint8_t ${generatedFontName.toLowerCase()}_table[] = {\n`);
	outStream.write(hexPixmapList.join('\n'));
	outStream.write(`};\n\n`);
	outStream.write(`Graphene::Font ${generatedFontName}(${generatedFontName.toLowerCase()}_table, ${size.width}, ${size.height});\n\n`);
	outStream.write(`#endif // FONT_${generatedFontName}_H\n`);
	outStream.end();
	outStream.close();
}

export function convertFontToHex(fontName: string, fontPath: string, width: number, height: number): string[] {
	// const width: number = 30;
	// const height: number = 72;
	// const width: number = 20;
	// const height: number = 36;
	// const width: number = 24;
	// const height: number = 72;
	// const width = 6;
	// const height = 8;

	// const fontName = 'Ubuntu_Light';

	const face: FontFace = NewFace(fontPath, 0);
	face.setPixelSizes(width, height);

	const pixmapSize = computePixmapSize(charmap, face);
	const baseLine = Math.floor(face.properties().ascender / (64*72/height));

	console.log(`Max size: ${pixmapSize.width}x${pixmapSize.height}`);
	console.log(`baseLine: ${baseLine}`);

	const hexPixmapList: string[] = [];
	for (let i = 0; i < charmap.length; i++) {
		const glyph = face.loadChar(charmap[i].charCodeAt(0), {
			render: true
		});
		const pixmap = glyphToPixmap(glyph, pixmapSize, baseLine);
		const hexPixmap = pixmapToHex(pixmap, pixmapSize, charmap[i]);
		hexPixmapList.push(hexPixmap);
	}

	const generatedFontName = `${fontName}_${pixmapSize.height}px`.toLowerCase();
	const outFilePath = path.join(__dirname, 'font.h');
	const size = computePixmapSize(charmap, face, false);

	writeOutputFile(generatedFontName, outFilePath, hexPixmapList, size);
	return hexPixmapList;
}
