


document.addEventListener('DOMContentLoaded', () => {

    const dialogArgStr = process.argv.find(arg => arg.startsWith('--dialogArg='));
    
    const { loadingMsg } = JSON.parse(dialogArgStr.split('=')[1]);

    document.querySelector('.statusLive').innerText = loadingMsg?.substring(0, 30) || 'please wait ...';
    
    document.querySelector('.playAudio').src = `./misc/sound.mp3`;
    document.querySelector('.playAudio').play().catch(console.error);

    
});

