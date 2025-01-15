


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



const win8Loading = {
    // timeOut: 8000,
    pageStyle: 'win8',
    loadingMsg: 'Windows 8 - Loading ..',
};

const win10Loading = {
    // timeOut: 10000,
    pageStyle: 'win10',
    loadingMsg: 'Win 10 - One moment ..',
};




(async () => {

    const { join } = require('path');
    const { showLoadingDialog } = require('../app');
    const { app, BrowserWindow } = require('electron');

    try {

        await app.whenReady();

        const icon1 = join(__dirname, '../pages/loading/winXp/misc', `icon.ico`);
        const icon2 = join(__dirname, '../pages/loading/win10/misc', `icon.ico`);

        const mainWindow = new BrowserWindow({
            width: 680, height: 580,
            icon: icon1, show: false, center: true,
        });

        mainWindow.loadURL('https://www.google.com');


        mainWindow.webContents.on('did-finish-load', async () => {

            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true);
            mainWindow.setTitle('mainWindowCall');

            //     // parentTitle : if wont to set the dialog as block for the parent ..
            const vistaLoading = {
                parentTitle: 'mainWindowCall',
                pageStyle: 'vista', timeOut: 5000,
                loadingMsg: 'Windows vista - preparing ..',
            };

            await showLoadingDialog(vistaLoading);
        });

        // showLoadingDialog(win10Loading);


        // new BrowserWindow({
        //     width: 350, height: 250,
        //     icon: icon1, show: true, center: true
        // });


        // await new Promise((resolve) => setTimeout(resolve, 2000));


        // await showLoadingDialog(vistaLoading);



    } catch (e) {

        console.error(e);

    };

    // app.on('window-all-closed', () => {


    //     if (process.platform !== 'darwin') {
    //         app.quit();
    //     };
    // });

})();

// const winXpLoad = await showLoadingDialog(winXpLoading);
// await showLoadingDialog(vistaLoading);
// await showLoadingDialog(win8Loading);

// winXpLoad.closeLoadDialog();