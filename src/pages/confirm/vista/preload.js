
const { ipcRenderer } = require('electron');


document.addEventListener('DOMContentLoaded', () => {


    const closeBtn = document.querySelector('.closeBtn');
    const playAudio = document.querySelector(".playAudio");
    const cancelBtn = document.querySelector('.cancelBtn');
    const continueBtn = document.querySelector('.continueBtn');

    
    const dialogArgStr = process.argv.find(arg => arg.startsWith('--dialogArg='));

    const { windowsId, title, header, body } = JSON.parse(dialogArgStr.split('=')[1]);

    playAudio.src = "./dist/sound.mp3";
    playAudio.play().catch(console.error);


    document.querySelector('.titleText').innerText = title.substring(0, 30);
    document.querySelector('.bodyText').innerText = body.substring(0, 45);
    document.querySelector('.headerText').innerText = header.substring(0, 45);


    closeBtn.addEventListener('click', () => {

        ipcRenderer.invoke(windowsId, { clickOn: 'close' });
    });

    cancelBtn.addEventListener('click', () => {

        ipcRenderer.invoke(windowsId, { clickOn: 'cancel' });
    });

    continueBtn.addEventListener('click', () => {

        ipcRenderer.invoke(windowsId, { clickOn: 'continue' });
    });

});

