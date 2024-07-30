import React from 'react';
import { createRoot } from 'react-dom/client';
import AppContainer from './views/AppContainer';
import './styles/App.css';

const App: React.FC = () => {
	return (
		<React.StrictMode>
			<AppContainer />
		</React.StrictMode>
	);
};
  

const root = createRoot(document.getElementById('root'));
root.render(<App />);