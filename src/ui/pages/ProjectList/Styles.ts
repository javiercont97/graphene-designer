import React from "react";

export const styles: {
	// [key: string]: React.CSSProperties
	container: React.CSSProperties,
	header: React.CSSProperties,
	searchBar: React.CSSProperties,
	projectList: React.CSSProperties,
	projectItem: React.CSSProperties,
	footer: React.CSSProperties,
	button: React.CSSProperties,
} = {
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		backgroundColor: "#1e1e1e",
		color: "#d4d4d4",
		fontFamily: "Segoe UI, sans-serif",
	},
	header: {
		padding: "10px",
		borderBottom: "1px solid #333",
	},
	searchBar: {
		width: "95%",
		padding: "10px",
		borderRadius: "4px",
		border: "none",
		backgroundColor: "#252526",
		color: "#d4d4d4",
	},
	projectList: {
		flex: 1,
		padding: "10px",
		overflowY: "auto",
	},
	projectItem: {
		padding: "10px",
		borderBottom: "1px solid #333",
		cursor: "pointer",
	},
	footer: {
		padding: "10px",
		borderTop: "1px solid #333",
		display: "flex",
		justifyContent: "space-between",
	},
	button: {
		padding: "10px 20px",
		borderRadius: "4px",
		border: "none",
		backgroundColor: "#007acc",
		color: "#fff",
		cursor: "pointer",
	},
};
