



require('./utils/config');
const { join } = require('path');
const { BrowserWindow, screen, ipcMain } = require('electron');



const showConfirmDialog = (dialogOptions = {}) => {

    const title = dialogOptions.title || 'Information';
    const pageStyle = dialogOptions.pageStyle || 'vista';
    const windowsId = `dialogWin${Date.now()}_${Math.random()}`;
    const header = dialogOptions.message || 'Windows Confirm Dialog .';
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


const showLoadingDialog = (dialogOptions = {}) => {

    const pageStyle = dialogOptions.pageStyle || 'vista';
    const loadingMsg = dialogOptions.loadingMsg || 'Please wait ..';

    const width = 440, height = 230;

    const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
    const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);

    return new Promise((resolve) => {

        const mainWindow = new BrowserWindow({
            width, height, alwaysOnTop: true,
            roundedCorners: true, show: false,
            resizable: false, maximizable: false, icon,
            frame: false, hasShadow: true, title: pageStyle,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg= " + JSON.stringify({ loadingMsg })]
            }
        });

        mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`));

        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
        const screenWidth = workAreaSize.width, screenHeight = workAreaSize.height;

        mainWindow.setBounds({
            x: Math.round((screenWidth - width) / 2),
            y: Math.round((screenHeight - height) / 2)
        });

        mainWindow.webContents.on('did-finish-load', () => {

            process.env.dialogTest && mainWindow.webContents.openDevTools({ mode: 'undocked' });

            mainWindow.show();

            if (dialogOptions.timeOut) {

                const closeLoadDialog = dialogOptions.timeOut;

                setTimeout(() => {

                    let opacity = 1;
                    const fadeOutInterval = 10, fadeStep = 0.15;

                    const fadeOut = setInterval(() => {

                        if (opacity > 0) {

                            opacity -= fadeStep;
                            mainWindow.setOpacity(opacity);
                            return;
                        };

                        clearInterval(fadeOut);


                        if (!mainWindow.isDestroyed()) {
                            mainWindow.close();
                        };

                    }, fadeOutInterval);

                }, closeLoadDialog);
            };

            resolve({
                closeLoadDialog: () => {

                    if (!mainWindow.isDestroyed()) {
                        mainWindow.close();
                    };

                }
            });

        });

    });
};

module.exports = { showConfirmDialog, showLoadingDialog };







