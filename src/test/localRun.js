


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


const vinXpLoading = {
    // timeOut: 16000,
    pageStyle: 'winXp',
    loadingMsg: 'Windows XP - Please Wait ..',
};

const vistaLoading = {
    // timeOut: 26000,
    pageStyle: 'vista',
    loadingMsg: 'Windows Vista - Preparing ..',
};

const win8Loading = {
    // timeOut: 36000,
    pageStyle: 'win8',
    loadingMsg: 'Windows 8 - Loading ..',
};

const win10Loading = {
    // timeOut: 46000,
    pageStyle: 'win10',
    loadingMsg: 'Win 10 - One moment ..',
};




(async () => {

    try {


        await app.whenReady();
        await showLoadingDialog(vinXpLoading);
        await showLoadingDialog(vistaLoading);
        await showLoadingDialog(win8Loading);
        await showLoadingDialog(win10Loading);


    } catch (e) {

        console.error(e);

    };

    app.on('window-all-closed', () => {


        if (process.platform !== 'darwin') {
            app.quit();
        };
    });

})();

