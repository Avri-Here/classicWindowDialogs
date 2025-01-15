


require('./utils/conf');
const { join } = require('path');
const { getActiveWinFromApp, extractFromExe } = require('./utils/utils');
const { BrowserWindow, screen, ipcMain, app, nativeImage } = require('electron');

// app.commandLine.appendSwitch('enable-logging');

// const demoObj = { electronWin: new BrowserWindow };

// app.on('browser-window-focus', (_, window) => {

//     // const isDialogAlreadyOpen = BrowserWindow.getAllWindows.some(win => win.title === 'Confirm Dialog');

//     // process.env.lastFocusedWindow = window.title;
//     console.log('Focused Window : ' + window.title);

// });

// app.on('browser-window-created', (event, window) => {

//     console.log('A new BrowserWindow was created !');



//     window.webContents.openDevTools();
// });

// app.on('browser-window-created', (event, window) => {

//     console.log('A new BrowserWindow was created !');

//     // Log details about the window
//     console.log('URL loaded in the window :', window.webContents.getURL());
//     console.log('Window ID:', window.id);

//     window.webContents.openDevTools();

//     // Listen for webContents events for more details
//     window.webContents.on('did-start-navigation', (event, url) => {

//         console.log('Navigation started to :', url);
//         console.log('Navigation started from :', event.url);
//     });
// });

// app.on('window-all-closed', () => {

//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

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

// const uniqueWinId = `${Date.now()}-${Math.random()}`;
// const lastWindow = await getActiveWinFromApp();
// const parentWin = BrowserWindow.fromId(dialogObj.parentId);

// const isRootWinOn = lastWindow?.electronWin && !lastWindow.electronWin.isDestroyed();
// title: pageStyle + '_' + uniqueWinId,


const showLoadingDialog = async (dialogObj = {}) => {

    const { openWindows } = await import('get-windows');

    const width = 440, height = 230;
    const pageStyle = dialogObj.pageStyle || 'vista';
    const perentDIalog = dialogObj.parentTitle || false;
    const loadingMsg = dialogObj.loadingMsg || 'loading ..';


    const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
    const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);


    return new Promise(resolve => {

        const allWindows = BrowserWindow.getAllWindows();
        const parentWin = allWindows.find(win => win.title === dialogObj.parentTitle);
        // const isPrviouseDialogOpen = allWindows.some(win => win.title === 'showLoadingDialog');

        const mainWindow = new BrowserWindow({

            title: 'showLoadingDialog',
            roundedCorners: true, show: false,
            resizable: false, maximizable: false,
            modal: perentDIalog, parent: parentWin,
            width, height, frame: false, icon, center: true,
            alwaysOnTop: true, skipTaskbar: false, hasShadow: true,
            webPreferences: {
                sandbox: false, nodeIntegration: true, preload,
                additionalArguments: ["--dialogArg=" + JSON.stringify({ loadingMsg })],
            }
        });

        mainWindow.setProgressBar(2);
        mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`));


        mainWindow.webContents.on('did-finish-load', async () => {

            const rootWindow = mainWindow.getParentWindow();

            if (!rootWindow) {

                //  parent window is pass - 
                //  set the dialogWindow on the top of the parent, or in separate one ..
                mainWindow.setParentWindow(null);
                mainWindow.setAppDetails({
                    appIconPath: icon,
                    appId: 'dialog.loading.' + pageStyle + '.' + Date.now()
                });
            };


            if (!rootWindow?.isDestroyed()) {

                const allOpenWindows = await openWindows();
                const fromOpenWindow = allOpenWindows.find(win => win.title === dialogObj.parentTitle);

                if (fromOpenWindow) {

                    console.log(`Active Window Title : ${fromOpenWindow.title}`);
                    console.log(`Executable Path ( EXE ) : ${fromOpenWindow.owner.path}`);

                    process.env.parentIconPath = extractFromExe(fromOpenWindow.owner.path);
                    const icoHere = nativeImage.createFromPath(process.env.parentIconPath);

                    rootWindow.setIcon(icon);
                    rootWindow.setProgressBar(3);
                    rootWindow.setOverlayIcon(icoHere, '..');

                };

                if (dialogObj.parentTitle && !fromOpenWindow) {

                    console.warn('Expected to get root Window !');
                    console.warn('Set the dialogWindow in separate Window .. ');
                    console.warn('The parentTitle was passed and find it via BrowserWindow .. ');
                };

            };

            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true);

            // const closeLoadingDialog = () => {

            //     if (!mainWindow?.isDestroyed()) {
            //         mainWindow.close();
            //     };

            //     if (!rootWindow?.isDestroyed()) {

            //         const pathIco = process.env.parentIconPath;
            //         console.log('Path Icon : ', pathIco);
            //         const icoHere = nativeImage.createFromPath(pathIco);

            //         rootWindow.focus(true);
            //         rootWindow.setProgressBar(-1);
            //         rootWindow.setIcon(icoHere || null);
            //         rootWindow.setOverlayIcon(null, '...');
            //     };
            // };

            const closeLoadingDialog = () => {

                if (mainWindow && !mainWindow.isDestroyed()) {
                    mainWindow.close();

                };

                if (rootWindow && !rootWindow.isDestroyed()) {

                    const pathIco = process.env.parentIconPath;
                    rootWindow.setIcon(pathIco);
                    rootWindow.setProgressBar(0);
                    rootWindow.setOverlayIcon(null, '..');
                }
            };

            resolve(closeLoadingDialog);
            dialogObj.timeOut && setTimeout(closeLoadingDialog, dialogObj.timeOut);

            mainWindow.on('closed', () => {

                closeLoadingDialog();
                mainWindow.removeAllListeners();
            });

        });

    });
};


module.exports = { showConfirmDialog, showLoadingDialog };


