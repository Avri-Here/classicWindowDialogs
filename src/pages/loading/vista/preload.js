



document.addEventListener('DOMContentLoaded', () => {

    const dialogArgStr = process.argv.find(arg => arg.startsWith('--dialogArg='));
    
    const { loadingMsg } = JSON.parse(dialogArgStr.split('=')[1]);

    document.querySelector('.statusLive').innerText = loadingMsg?.substring(0, 35) || 'please wait ...';
    
    document.querySelector('.playAudio').src = `./misc/sound.mp3`;
    document.querySelector('.playAudio').play().catch(console.error);

    
});


























    // const progressBar = document.getElementById('progressBar');

    // setInterval(() => {

    //     let currentValue = progressBar.value;


    //     if (currentValue < 100) {

    //         progressBar.value = currentValue + 12;
    //     } else {
    //         progressBar.value = 0; 
    //     }

    // }, 400);