import {Sheet, Stack } from "@mui/joy";
import React from "react";


export interface SidebarProps {
	onOpen: () => void;
	onExport: () => void;
	onImport: () => void;
}


export const ItemSelect: React.FC<SidebarProps> = ({ onOpen, onExport, onImport }) => {
	return (
		<Stack spacing={1}>
			<Sheet variant="outlined" onClick={() => {
				console.log('Sheet clicked')
			}} color="primary" sx={{ p: 4 }}>
				Hello world!
			</Sheet>
			<Sheet variant="outlined" onClick={() => {
				console.log('Sheet clicked')
			}} color="primary" sx={{ p: 4 }}>
				Hello world!
			</Sheet>
			<Sheet variant="outlined" onClick={() => {
				console.log('Sheet clicked')
			}} color="primary" sx={{ p: 4 }}>
				Hello world!
			</Sheet>
		</Stack>
	);
};
