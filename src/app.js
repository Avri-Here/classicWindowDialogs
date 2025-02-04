


require('./utils/conf');
const { join } = require('path');
const { BrowserWindow, ipcMain, Menu } = require('electron');




const tryToGetParent = () => {

    return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || null;
};


const showConfirmDialog = (dialogOptions = {}) => {

    const rootWindow = dialogOptions.parentWindow || tryToGetParent();

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
            resizable: false, maximizable: false, icon,
            modal: Boolean(rootWindow), parent: rootWindow,
            roundedCorners: true, show: false, center: true,
            frame: false, hasShadow: true, title: pageStyle,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg= " + JSON.stringify({
                    windowsId, title, header, body
                })]
            }
        });

        mainWindow.loadFile(join(__dirname, `pages/confirm/${pageStyle}/index.html`));

        mainWindow.webContents.on('did-finish-load', () => {

            process.env.dialogTest && mainWindow.webContents.openDevTools({ mode: 'undocked' });
            mainWindow.show();
            mainWindow.focus();
        });

        ipcMain.handle(windowsId, (_, { clickOn }) => {

            if (mainWindow && !mainWindow.isDestroyed()) {

                ipcMain.removeHandler(windowsId);
                mainWindow.destroy();
            };

            resolve(clickOn);
        });

    });


};


const showLoadingDialog = async (dialogObj = {}) => {

    const width = 440, height = 230;
    const pageStyle = dialogObj.pageStyle || 'vista';
    const loadingMsg = dialogObj.loadingMsg || 'loading ..';

    const rootWindow = dialogObj.parentWindow || tryToGetParent();

    const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
    const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);

    return new Promise(resolve => {

        Menu.setApplicationMenu(null);

        const mainWindow = new BrowserWindow({

            title: 'loadingDialog', icon,
            roundedCorners: true, show: false,
            resizable: false, maximizable: false,
            width, height, frame: false, center: true,
            modal: Boolean(rootWindow), parent: rootWindow,
            alwaysOnTop: true, skipTaskbar: false, hasShadow: true,
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


module.exports = { showConfirmDialog, showLoadingDialog };


