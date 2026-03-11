


const { join } = require('path');
const { BrowserWindow, ipcMain, Menu } = require('electron');

const tryToGetParent = () => {
    return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || null;
};

const getDialogPath = (type, style, file) => {
    return join(__dirname, `pages/${type}/${style}/${file}`);
};

const getDialogIcon = (type, style) => {
    return getDialogPath(type, style, 'misc/icon.ico');
};

const getDialogPreload = (type, style) => {
    return getDialogPath(type, style, 'preload.js');
};

const getDialogHtml = (type, style) => {
    return getDialogPath(type, style, 'index.html');
};

const showConfirmDialog = (dialogOptions = {}) => {
    const rootWindow = dialogOptions.parentWindow || tryToGetParent();
    const title = dialogOptions.title || 'Information';
    const pageStyle = dialogOptions.pageStyle || 'vista';
    const windowsId = `dialogWin${Date.now()}_${Math.random()}`;
    const header = dialogOptions.message || 'Windows Confirm Dialog !';
    const body = dialogOptions.detail || 'Click continue to proceed ..';

    const width = 455, height = 213;
    const icon = getDialogIcon('confirm', pageStyle);
    const preload = getDialogPreload('confirm', pageStyle);

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

        mainWindow.loadFile(getDialogHtml('confirm', pageStyle));

        mainWindow.webContents.on('did-finish-load', () => {
            if (process.env.dialogTest) {
                mainWindow.webContents.openDevTools({ mode: 'undocked' });
            }
            mainWindow.show();
            mainWindow.focus();
        });

        ipcMain.handle(windowsId, (_, { clickOn }) => {
            if (mainWindow && !mainWindow.isDestroyed()) {
                ipcMain.removeHandler(windowsId);
                mainWindow.destroy();
            }
            resolve(clickOn);
        });
    });
};

const showLoadingDialog = async (dialogObj = {}) => {
    const width = 440, height = 230;
    const pageStyle = dialogObj.pageStyle || 'vista';
    const loadingMsg = dialogObj.loadingMsg || 'loading ..';
    const rootWindow = dialogObj.parentWindow || tryToGetParent();
    const preload = getDialogPreload('loading', pageStyle);
    const icon = getDialogIcon('loading', pageStyle);

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

        mainWindow.loadFile(getDialogHtml('loading', pageStyle));

        mainWindow.webContents.on('did-finish-load', async () => {
            if (rootWindow && !rootWindow.isDestroyed()) {
                rootWindow.setProgressBar(2);
                rootWindow.setOverlayIcon(icon, '..');
            }

            let timeout = null;

            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true);

            const closeLoadDialog = () => {
                clearTimeout(timeout);
                const parentWindow = mainWindow?.getParentWindow();
                if (parentWindow && !parentWindow.isDestroyed()) {
                    parentWindow.setProgressBar(-1);
                    parentWindow.setAlwaysOnTop(false);
                    parentWindow.setOverlayIcon(null, '..');
                }
                if (mainWindow && !mainWindow.isDestroyed()) {
                    mainWindow.destroy();
                }
            };

            resolve({ closeLoadDialog });
            timeout = dialogObj.timeOut && setTimeout(closeLoadDialog, dialogObj.timeOut);
            mainWindow.on('close', closeLoadDialog);
        });

        mainWindow.webContents.on('did-fail-load', () => {
            console.error('Failed to load the dialog .. ');
            mainWindow?.destroy();
        });
    });
};

module.exports = { showConfirmDialog, showLoadingDialog };


