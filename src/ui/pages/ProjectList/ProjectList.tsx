import React, { useState } from "react";
import { styles } from './Styles';

export const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const handleCreateProject = () => {
		// Create a new project
	}

	const handleOpenProject = () => {
		// Open the project
	}

	const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm));

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<input
				type="text"
				placeholder="Search Projects"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={styles.searchBar}
				/>
			</div>
			<div style={styles.projectList}>
				{filteredProjects.map((project, index) => (
				<div key={index} style={styles.projectItem}>
					{project.name}
				</div>
				))}
			</div>
			<div style={styles.footer}>
				<button onClick={handleCreateProject} style={styles.button}>Create Project</button>
				<button onClick={handleOpenProject} style={styles.button}>Open Project</button>
			</div>
		</div>
	)
}