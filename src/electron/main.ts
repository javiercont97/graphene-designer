import { app, BrowserWindow } from 'electron';
import path from 'path';
// import { convertFontToHex, FontSize } from './service/font-generator';


if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		height: 600,
		width: 800,
	});

	// mainWindow.setMenu(null);
	// mainWindow.maximize();

	mainWindow.webContents.session.setCertificateVerifyProc(
		(request, callback) => {
			callback(0); // Ignore all certificates errors
		}
	);

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL("https://172.19.0.2:32650");
		// mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});