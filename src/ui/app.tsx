import './styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const root = createRoot(document.getElementById('root'));
root.render(<h2>Hello from React!</h2>);