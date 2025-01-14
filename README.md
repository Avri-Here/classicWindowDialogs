# Windows Dialogs Collection 

## About the Library :

This library provides a set of **dialogs styled to emulate old-school Windows versions**, like :

- **Windows 8**
- **Windows 10**
- **Windows XP**
- **Windows Vista**

The dialogs mimic the visual style, layout, and sound effects of legacy Windows dialog boxes :

- **Loading dialogs**
- **Confirmation dialogs**

## Features

- **Authentic Appearance**: Dialogs that closely resemble the legacy Windows designs .
- **Integrated Sounds**: Sound effects to enhance the user experience .


## Usage

### Vista Dialog Example : 


```javascript

const { showConfirmDialog } = require('electron-classic-window-dialog');

const confirmDialog = {
    pageStyle: 'vista',
    title: 'Information',
    message: 'This is an information dialog .',
    detail: 'It has a message and a detail section .'
};


try {

    const confirmDialogRes = await showConfirmDialog(confirmDialog);
    console.info(confirmDialogRes); // cancel, continue, close ..

} catch (e) {

    console.error(e);

};


```
![Info Dialog Image](https://github.com/Avri-Here/classicWindowDialogs/blob/main/demos/vistaDialog.png)



### Loading Dialog Example : 


```javascript

const { showLoadingDialog } = require('electron-classic-window-dialog');

const vinXpLoading = {
    pageStyle: 'winXp',
    loadingMsg: 'Windows XP on it ..',
};

const vistaLoading = {
    timeOut: 6000,
    pageStyle: 'vista',
    loadingMsg: 'Windows vista on it ..',
};

const win8Loading = {
    timeOut: 8000,
    pageStyle: 'win8',
    loadingMsg: 'Windows 8 on it ..',
};

const win10Loading = {
    timeOut: 10000,
    pageStyle: 'win10',
    loadingMsg: 'Windows 10 on it ..',
};


try {

    const winXpLoad = await showLoadingDialog(vinXpLoading);
    showLoadingDialog(vistaLoading);
    showLoadingDialog(win8Loading);
    showLoadingDialog(win10Loading);
    
    winXpLoad.closeLoadDialog();


} catch (e) {

    console.error(e);

};


```
![Info Dialog Image](https://github.com/Avri-Here/classicWindowDialogs/blob/main/demos/loadDialogs.gif)


## Links

- [GitHub ](https://github.com/Avri-Here/classicWindowDialogs)
- [NPM ](https://www.npmjs.com/package/windows-dialogs)

