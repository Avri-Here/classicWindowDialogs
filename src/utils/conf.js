

process.env.REJECT_UNAUTHORIZED = '0';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;


const isDevMode = process.env.dialogTest;

if (isDevMode) require('electron-reload')(require('path').join(__dirname, '../..'));








