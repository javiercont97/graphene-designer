import React, { useState } from 'react';
import { ItemSelect } from '../components/Graphene/ItemSelect';
import FontDesigner from '../views/FontDesigner';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Tab, TabList, TabPanel, Tabs } from '@mui/joy';


const AppContainer: React.FC = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [leftWidth, setLeftWidth] = useState(10);

	const handleMouseDown = () => {
		setIsDragging(true);
		document.body.style.cursor = 'col-resize';
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		const container = document.querySelector('.container') as HTMLDivElement;
		if (!container) return;

		const containerRect = container.getBoundingClientRect();
		const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

		if (newWidth < 5 || newWidth > 30) return;

		setLeftWidth(newWidth);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		document.body.style.cursor = 'default';
	};

	React.useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div className="container">
			<div className="panel left-panel" style={{ width: `${leftWidth}%` }}>
				<AccordionGroup>
					<Accordion>
						<AccordionSummary color='primary'>Glyphs</AccordionSummary>
						<AccordionDetails>
							<ItemSelect onOpen={() => {
								console.log('Open Glyph');
							}}
								onExport={() => {
									console.log('Export Glyph');
								}}
								onImport={() => {
									console.log('Import Glyph');
								}}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary color='primary'>Pixmaps</AccordionSummary>
						<AccordionDetails>
							<ItemSelect onOpen={() => {
								console.log('Open Glyph');
							}}
								onExport={() => {
									console.log('Export Glyph');
								}}
								onImport={() => {
									console.log('Import Glyph');
								}}
							/>
						</AccordionDetails>
					</Accordion>
				</AccordionGroup>
			</div>
			<div className="divider" onMouseDown={handleMouseDown}></div>
			<div className="panel right-panel" style={{ width: `${100 - leftWidth}%` }}>
				<Tabs sx={{ backgroundColor: '#1b1b1e' }}>
					<TabList>
						<Tab
							variant="solid"
							color="neutral">Glyph A
						</Tab>
					</TabList>
					<TabPanel>
						<FontDesigner />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default AppContainer;
