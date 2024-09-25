import React from 'react';
import { createRoot } from 'react-dom/client';
// import AppContainer from './pages/AppContainer';
import './styles/App.css';
import { ProjectList } from './pages/ProjectList/ProjectList';

const App: React.FC = () => {
	return (
		<React.StrictMode>
			<ProjectList />
		</React.StrictMode>
	);
};
  

const root = createRoot(document.getElementById('root'));
root.render(<App />);