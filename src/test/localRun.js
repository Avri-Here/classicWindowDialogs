


// const { app } = require('electron');
// const { showConfirmDialog } = require('../app');
// // const { showConfirmDialog } = require('electron-classic-window-dialog');

// const confirmDialog = {
//     pageStyle: 'vista',
//     title: 'Information',
//     message: 'This is an information dialog .',
//     detail: 'It has a message and a detail section .'
// };





// (async () => {

//     try {

//         await app.whenReady();
//         const confirmDialogRes = await showConfirmDialog(confirmDialog);
//         console.log(confirmDialogRes);

//     } catch (e) {

//         console.error(e);

//     };

//     app.on('window-all-closed', () => {


//         if (process.platform !== 'darwin') {
//             app.quit();
//         };
//     });

// })();






// const { showLoadingDialog } = require('electron-classic-window-dialog');

const winXpLoading = {
    pageStyle: 'winXp',
    loadingMsg: 'Windows XP - Please Wait ..',
};

const vistaLoading = {
    // timeOut: 6000,
    pageStyle: 'vista',
    loadingMsg: 'Windows Vista - Preparing ..',
};

const win8Loading = {
    // timeOut: 8000,
    pageStyle: 'win8',
    loadingMsg: 'Windows 8 - Loading ..',
};

const win10Loading = {
    timeOut: 10000,
    pageStyle: 'win10',
    loadingMsg: 'Win 10 - One moment ..',
};


const { join } = require('path');
const { showLoadingDialog } = require('../app');
const { app, BrowserWindow } = require('electron');

(async () => {

    try {

        await app.whenReady();
        // new BrowserWindow({
        //     width: 80, height: 280,
        //     roundedCorners: true, show: true,
        //     icon: join(__dirname, `icon.ico`),
        //     frame: false, hasShadow: true, title: 'pageStyle1',
        //     resizable: false, maximizable: false, skipTaskbar: false,
        // });


        // await new Promise((resolve) => setTimeout(resolve, 20000));

        const mainWindow = new BrowserWindow({
            width: 280, height: 280,
            roundedCorners: true, show: true,
            icon: join(__dirname, `icon.ico`),
            frame: false, hasShadow: true, title: 'pageStyle2',
            resizable: false, maximizable: false, skipTaskbar: false,
        });

        mainWindow.loadURL('https://www.google.com');
        
        
        await showLoadingDialog(win10Loading, mainWindow);

    } catch (e) {

        console.error(e);

    };

    app.on('window-all-closed', () => {


        if (process.platform !== 'darwin') {
            app.quit();
        };
    });

})();

// const winXpLoad = await showLoadingDialog(winXpLoading);
// await showLoadingDialog(vistaLoading);
// await showLoadingDialog(win8Loading);

// winXpLoad.closeLoadDialog();