


// const { app } = require('electron');
// const { showConfirmDialog } = require('../app');
// const { showConfirmDialog } = require('electron-classic-window-dialog');






(async () => {

    const { join } = require('path');
    const { showConfirmDialog } = require('../app');
    const { app, BrowserWindow } = require('electron');
    try {

        await app.whenReady();


        const icon = join(__dirname, '../pages/loading/winXp/misc', `icon.ico`);

        const mainWindow = new BrowserWindow({
            width: 370, height: 350,
            icon, show: false, center: true
        });

        mainWindow.loadURL('https://www.google.com');


        mainWindow.webContents.on('did-finish-load', async () => {

            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true);
            mainWindow.setTitle('mainWindowCall');

            const confirmDialog = {
                pageStyle: 'vista',
                title: 'Information',
                message: 'This is an information dialog .',
                detail: 'It has a message and a detail section .'
            };

            const confirmDialogRes = await showConfirmDialog(confirmDialog);
            console.log(confirmDialogRes);

        });



    } catch (e) {

        console.error(e);

    };

    app.on('window-all-closed', () => {


        if (process.platform !== 'darwin') {
            app.quit();
        };
    });

})();






// const { showLoadingDialog } = require('electron-classic-window-dialog');

// const winXpLoading = {
//     pageStyle: 'winXp',
//     loadingMsg: 'Windows XP - Please Wait ..',
// };



// const win8Loading = {
//     // timeOut: 8000,
//     pageStyle: 'win8',
//     loadingMsg: 'Windows 8 - Loading ..',
// };

// const win10Loading = {
//     // timeOut: 10000,
//     pageStyle: 'win10',
//     loadingMsg: 'Win 10 - One moment ..',
// };




// (async () => {

//     const { join } = require('path');
//     const { showLoadingDialog } = require('../app');
//     const { app, BrowserWindow } = require('electron');

//     try {

//         await app.whenReady();

//         const icon1 = join(__dirname, '../pages/loading/winXp/misc', `icon.ico`);
//         const icon2 = join(__dirname, '../pages/loading/win10/misc', `icon.ico`);

//         const mainWindow = new BrowserWindow({
//             width: 680, height: 580,
//             icon: icon1, show: false, center: true,
//         });

//         mainWindow.loadURL('https://www.google.com');


//         mainWindow.webContents.on('did-finish-load', async () => {

//             mainWindow.show();
//             mainWindow.focus();
//             mainWindow.setAlwaysOnTop(true);
//             mainWindow.setTitle('mainWindowCall');

//             const vistaLoading = {
//                 // parentTitle: 'mainWindowCall',
//                 pageStyle: 'vista', timeOut: 19000,
//                 loadingMsg: 'Windows vista - preparing ..',
//             };

//             const ins = await showLoadingDialog(vistaLoading);
//             // ins.closeLoadDialog();
//         });



//     } catch (e) {

//         console.error(e);

//     };

//     // app.on('window-all-closed', () => {


//     //     if (process.platform !== 'darwin') {
//     //         app.quit();
//     //     };
//     // });

// })();

// // const winXpLoad = await showLoadingDialog(winXpLoading);
// // await showLoadingDialog(vistaLoading);
// // await showLoadingDialog(win8Loading);

// winXpLoad.closeLoadDialog();