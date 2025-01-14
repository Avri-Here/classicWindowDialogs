


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



const { app } = require('electron');
const { showLoadingDialog } = require('../app');
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
    // timeOut: 10000,
    pageStyle: 'win10',
    loadingMsg: 'Win 10 - One moment ..',
};




(async () => {

    try {

        await app.whenReady();

        const winXpLoad = await showLoadingDialog(winXpLoading);
        await showLoadingDialog(vistaLoading);
        await showLoadingDialog(win8Loading);
        await showLoadingDialog(win10Loading);

        // winXpLoad.closeLoadDialog();


    } catch (e) {

        console.error(e);

    };

    app.on('window-all-closed', () => {


        if (process.platform !== 'darwin') {
            app.quit();
        };
    });

})();

