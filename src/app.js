



require('./utils/config');
const { join } = require('path');

const { BrowserWindow, screen, ipcMain, nativeImage } = require('electron');


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


const showLoadingDialog = (dialogOptions = {}, mainWindow4) => {


    const width = 440, height = 230;
    const pageStyle = dialogOptions.pageStyle || 'vista';
    const loadingMsg = dialogOptions.loadingMsg || 'Please wait ..';

    const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
    const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);

    return new Promise((resolve) => {

        const mainWindow = new BrowserWindow({
            roundedCorners: true, show: false,
            resizable: false, maximizable: false,
            width, height, alwaysOnTop: true, skipTaskbar: false,
            icon, parent: mainWindow4,
            modal: true,
            frame: false, hasShadow: true, title: pageStyle,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg= " + JSON.stringify({ loadingMsg })]
            }
        });

        mainWindow.setAppDetails({
            appIconPath: icon,
            appId: 'avri.com.classic.window.dialog'
        });

        mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`));

        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
        const screenWidth = workAreaSize.width, screenHeight = workAreaSize.height;

        mainWindow.setBounds({
            x: Math.round((screenWidth - width) / 2),
            y: Math.round((screenHeight - height) / 2)
        });

        // mainWindow.once('ready-to-show', () => {

        mainWindow.webContents.on('did-finish-load', () => {

            process.env.dialogTest && mainWindow.webContents.openDevTools({ mode: 'undocked' });

            mainWindow.show();
            mainWindow.focus();
            const activeWindows = BrowserWindow.getAllWindows();
            console.log(activeWindows.length);

            mainWindow.setOverlayIcon(icon || null, '...');



            const closeDialogMs = dialogOptions.timeOut;

            if (closeDialogMs) {


                setTimeout(() => {


                    if (!mainWindow.isDestroyed()) {
                        mainWindow.close();
                        resolve('timeOutResolved');

                    };

                }, closeDialogMs);
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






// mainWindow.setFullScreen(true);

// if (mainWindow) {
// mainWindow.setIcon(originalIconPath);
// }

// }, fadeOutInterval);


// const dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

// const overlayIcon = nativeImage.createFromDataURL(dataURL);
// const activeWindows = BrowserWindow.getAllWindows();
// const otherWindows = BrowserWindow.getAllWindows().filter(win => win.);
// const otherWindows = BrowserWindow.getFocusedWindow().map(win => win);


// otherWindows.forEach(win => {


// console.log(JSON.stringify(win , null, 4));

// });
// otherWindows.forEach(win => {

//     win.setSkipTaskbar(true);
//     mainWindow.setParentWindow(null);

// });

// mainWindow.on('close', () => {

//     const otherWindows = BrowserWindow.getAllWindows().filter(win => win !== mainWindow);

//     otherWindows.forEach(win => {

//         win.setSkipTaskbar(false);

//     });
// });

// console.log(otherWindows);

// visibleWin.setSkipTaskbar(true);

// if (getVisibleWin) {
//     mainWindow.setIcon(icon); // Temporarily change the mainWindow icon
// }

// const parentWindow = activeWindows[1];
// const parentWindow2 = activeWindows[2];
// const icon3 = parentWindow.getMediaSourceId();
// const icon4 = parentWindow2.getMediaSourceId();

// console.log(icon3 + ' ' + icon4);
// const sources = await desktopCapturer.getSources({ types: ['window'] });
// const targetSource = sources.find(source => source.id === icon3 || source.id === icon4);
// console.log('Found source:', sources);
// console.log('Icon thumbnail available:', targetSource.thumbnail.toDataURL());
// mainWindow.setIcon(icon); // Temporarily change the mainWindow icon

