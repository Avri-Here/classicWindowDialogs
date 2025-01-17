


require('./utils/conf');
const { join } = require('path');
const { BrowserWindow, screen, ipcMain, Menu } = require('electron');
const { log } = require('console');


const showConfirmDialog = (dialogOptions = {}) => {

    const title = dialogOptions.title || 'Information';
    const pageStyle = dialogOptions.pageStyle || 'vista';
    const windowsId = `dialogWin${Date.now()}_${Math.random()}`;
    const header = dialogOptions.message || 'Windows Confirm Dialog !';
    const body = dialogOptions.detail || 'Click continue to proceed ..';


    const width = 455, height = 213;
    const icon = join(__dirname, `pages/confirm/${pageStyle}/misc/icon.ico`);
    const preload = join(__dirname, `pages/confirm/${pageStyle}/preload.js`);

    return new Promise((resolve) => {

        const mainWindow = new BrowserWindow({
            width, height, alwaysOnTop: true,
            roundedCorners: true, show: false,
            resizable: false, maximizable: false, icon,
            frame: false, hasShadow: true, title: pageStyle,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg= " + JSON.stringify({
                    windowsId, title, header, body
                })]
            }
        });

        mainWindow.loadFile(join(__dirname, `pages/confirm/${pageStyle}/index.html`));

        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
        const screenWidth = workAreaSize.width, screenHeight = workAreaSize.height;

        mainWindow.setBounds({
            x: Math.round((screenWidth - width) / 2),
            y: Math.round((screenHeight - height) / 2)
        });

        mainWindow.webContents.on('did-finish-load', () => {

            process.env.dialogTest && mainWindow.webContents.openDevTools({ mode: 'undocked' });
            mainWindow.show();
        });


        ipcMain.handle(windowsId, (_, { clickOn }) => {


            if (!mainWindow.isDestroyed()) {
                mainWindow.close();
            };

            ipcMain.removeHandler(windowsId);
            resolve(clickOn);

        });

    });


};

// const { BrowserWindow } = require('electron');
// 
const getCallerWindow = (webContents) => {

    const allWindows = BrowserWindow.getAllWindows();
    for (const win of allWindows) {
        if (win.webContents.id === webContents.id) {
            return win;
        }
    }
    return null;
};


const tryToGetParent = () => {

    return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || null;
};

const showLoadingDialog = async (dialogObj = {}) => {


    const width = 440, height = 230;
    const pageStyle = dialogObj.pageStyle || 'vista';
    const loadingMsg = dialogObj.loadingMsg || 'loading ..';

    const rootWindow = dialogObj.parentWindow || tryToGetParent();
    log('rootWindow', rootWindow);

    const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
    const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);

    return new Promise(resolve => {

        Menu.setApplicationMenu(null);

        const mainWindow = new BrowserWindow({

            title: 'loadingDialog', icon,
            roundedCorners: true, show: false,
            resizable: false, maximizable: false,
            modal: Boolean(rootWindow), parent: rootWindow,
            alwaysOnTop: true, skipTaskbar: false, hasShadow: true,
            width, height, frame: false, center: true, modal: true,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg=" + JSON.stringify({ loadingMsg })],
            }
        });


        setTimeout(() => {

            if (!mainWindow.isFocused()) {

                mainWindow.flashFrame(true);
            }
        }, 5000);

        mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`));

        mainWindow.webContents.on('did-finish-load', async () => {


            if (rootWindow && !rootWindow?.isDestroyed()) {

                rootWindow.setProgressBar(2);
                rootWindow.setOverlayIcon(icon, '..');
            };

            let timeout = null;
            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true);
            mainWindow.mergeAllWindows()


            const closeDialog = () => {

                clearTimeout(timeout);

                const rootWindow = mainWindow?.getParentWindow();

                if (rootWindow && !rootWindow.isDestroyed()) {

                    rootWindow.setProgressBar(-1);

                    rootWindow.setAlwaysOnTop(false);
                    rootWindow.setOverlayIcon(null, '..');

                };

                if (mainWindow && !mainWindow.isDestroyed()) {

                    mainWindow.destroy();
                };
            };

            resolve({ closeDialog });

            timeout = dialogObj.timeOut && setTimeout(closeDialog, dialogObj.timeOut);

            mainWindow.on('close', closeDialog);
        });


        mainWindow.webContents.on('did-fail-load', () => {

            console.error('Failed to load the dialog .. ');
            mainWindow?.destroy();
        });

    });
};

// const preventClose = (win) => {

module.exports = { showConfirmDialog, showLoadingDialog };


