


// // mainWindow.once('ready-to-show', () => {

// // const activeWindows = await getActiveWinFromApp();

// // console.log(activeWindows.getBackgroundColor());

// // activeWindows.setSkipTaskbar(true);

// // mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`), {
// //     query: { id: windowsId }, // Pass the ID here
// // });

// // const promptUrl = url.format({
// //     protocol: 'file',
// //     slashes: true,
// //     pathname: join(__dirname, `pages/loading/${pageStyle}/index.html`),
// //     hash: windowsId,
// // });


// // const windowId = mainWindow.webContents.id;

// // console.log(`Window ID: ${windowId}`);

// // mainWindow.setFullScreen(true);

// // if (mainWindow) {
// // mainWindow.setIcon(originalIconPath);
// // }

// // }, fadeOutInterval);


// // const dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

// // const overlayIcon = nativeImage.createFromDataURL(dataURL);
// // const activeWindows = BrowserWindow.getAllWindows();
// // const otherWindows = BrowserWindow.getAllWindows().filter(win => win.);
// // const otherWindows = BrowserWindow.getFocusedWindow().map(win => win);


// // otherWindows.forEach(win => {


// // console.log(JSON.stringify(win , null, 4));

// // });
// // otherWindows.forEach(win => {

// //     win.setSkipTaskbar(true);
// //     mainWindow.setParentWindow(null);

// // });

// // mainWindow.on('close', () => {

// //     const otherWindows = BrowserWindow.getAllWindows().filter(win => win !== mainWindow);

// //     otherWindows.forEach(win => {

// //         win.setSkipTaskbar(false);

// //     });
// // });

// // console.log(otherWindows);

// // visibleWin.setSkipTaskbar(true);

// // if (getVisibleWin) {
// //     mainWindow.setIcon(icon); // Temporarily change the mainWindow icon
// // }

// // const parentWindow = activeWindows[1];
// // const parentWindow2 = activeWindows[2];
// // const icon3 = parentWindow.getMediaSourceId();
// // const icon4 = parentWindow2.getMediaSourceId();

// // console.log(icon3 + ' ' + icon4);
// // const sources = await desktopCapturer.getSources({ types: ['window'] });
// // const targetSource = sources.find(source => source.id === icon3 || source.id === icon4);
// // console.log('Found source:', sources);
// // console.log('Icon thumbnail available:', targetSource.thumbnail.toDataURL());
// // mainWindow.setIcon(icon); // Temporarily change the mainWindow icon




// const showLoadingDialog4 = (dialogOptions = {}) => {

//     // const lastWindow = await getActiveWinFromApp(uniqueWinId);
//     const lastWindow = BrowserWindow.getFocusedWindow();
//     const uniqueWinId = `${Date.now()}-${Math.random()}`;

//     const width = 440, height = 230;
//     const pageStyle = dialogOptions.pageStyle || 'vista';
//     const loadingMsg = dialogOptions.loadingMsg || 'Please wait ..';

//     const preload = join(__dirname, `pages/loading/${pageStyle}/preload.js`);
//     const icon = join(__dirname, `pages/loading/${pageStyle}/misc/icon.ico`);

//     const demoObj = { electronWin: new BrowserWindow() };

//     return new Promise(async (resolve) => {



//         const mainWindow = new BrowserWindow({

//             roundedCorners: true, show: false,
//             center: true, icon, title: pageStyle,
//             resizable: false, maximizable: false,
//             frame: false, hasShadow: true, width, height,
//             parent: lastWindow.electronWin, modal: Boolean(lastWindow.electronWin),
//             alwaysOnTop: true, skipTaskbar: false,
//             webPreferences: {
//                 sandbox: false, nodeIntegration: true, preload,
//                 additionalArguments: ["--dialogArg= " + JSON.stringify({ loadingMsg })]
//             }
//         });

//         mainWindow.setProgressBar(2);
//         mainWindow.uniqueWinId = uniqueWinId;
//         mainWindow.loadFile(join(__dirname, `pages/loading/${pageStyle}/index.html`));


//         mainWindow.webContents.on('did-finish-load', async () => {

//             // process.env.dialogTest && mainWindow.webContents.openDevTools({ mode: 'undocked' });

//             if (lastWindow.electronWin && !lastWindow.electronWin.isDestroyed()) {

//                 const { activeFrom, electronWin } = lastWindow || demoObj;

//                 console.log(`Active Window Title : ${activeFrom.title}`);
//                 console.log(`Executable Path : ${activeFrom.owner.path}`);

//                 const pathIco = extractIconFromExe(activeFrom.owner.path);
//                 const icoHere = nativeImage.createFromPath(pathIco);

//                 electronWin.setIcon(icon);
//                 electronWin.setProgressBar(3);
//                 electronWin.setOverlayIcon(icoHere || null, '...');
//             };

//             mainWindow.show();
//             mainWindow.focus();


//             if (dialogOptions.timeOut) {

//                 setTimeout(() => closeLoadingDialog(), dialogOptions.timeOut);
//             };

//             resolve({ closeLoadingDialog });

//         });

//         mainWindow.on('closed', () => {

//             mainWindow?.removeAllListeners();
//             ipcMain?.removeHandler(pageStyle);

//         });


//     });


// };


// const { getPointWindow } = require('hmc-win32');

// const { BrowserWindow } = require('electron');
// const { getWindowClassName,getPointWindowMain, getWindowRect, getShortcutLink, getAllWindows, getMainWindow, getWindowProcess, getProcessWindow } = require('hmc-win32');
// const { getForegroundWindow, getWindowTitle } = require('hmc-win32');
// const { GlobalKeyboardListener } = require('node-global-key-listener');
// const { extract } = require('file-icon-extractor'), path = require('path');

// const { execSync } = require('child_process');
// const fs = require('fs');

// const saveIconAsImage = (iconData, outputPath) => {
//     try {
//         // Convert icon data to a buffer
//         const iconBuffer = Buffer.from(iconData, 'utf-8');

//         // Save buffer as an image file (e.g., PNG)
//         fs.writeFileSync(outputPath, iconBuffer);
//         console.log(`Icon saved to ${outputPath}`);
//     } catch (error) {
//         console.error('Error saving icon:', error);
//     }
// };




// const getIconForApp = async (pidWin) => {
//     try {
//         // Fetch all tray windows
//         const trayList = getAllWindows();

//         // Iterate through each tray item and process its details
//         for (const tray of trayList) {
//             try {
//                 // Get window ID from tray title
//                 const id = getPointWindowMain(tray.handle);

//                 if (!id) {
//                     console.warn(`No window found for title: ${tray.title}`);
//                     continue;
//                 }

//                 // Get the file path of the process associated with the window
//                 // const processPath = getProcessidFilePath(id);
//                 const processPath = getShortcutLink(id);
//                 console.log(`Tray Title : ${tray.title}, ${JSON.stringify(processPath, null, 2)}`);
//                 console.log(`n`);
//                 // Example usage
//                 const iconData = processPath.path;
//                 saveIconsForTray(iconData, `${tray.title}.ico`);

//                 // Additional logic for fetching or displaying icons can be added here
//             } catch (trayError) {
//                 console.error(`Error processing tray item: ${tray.title}`, trayError);
//             }
//         }

//         // Optionally check if the explorer process exists
//         const { hasProcess } = require('hmc-win32');
//         const processExists = hasProcess('explorer.exe');
//         console.log('Explorer Process Exists:', processExists);
//     } catch (error) {
//         console.error('Error fetching tray list:', error);
//     }
// };

// const extractIcon = (exePath, iconIndex, outputPath) => {
//     try {
//         // Use Resource Hacker or similar tool to extract the icon
//         const resourceHackerPath = '.\\resourceHack.exe';
//         const command = `"${resourceHackerPath}" -open "${exePath}" -save "${outputPath}" -action extract -mask ICONGROUP,${iconIndex}`;
//         execSync(command);

//         console.log(`Icon saved to ${outputPath}`);
//     } catch (error) {
//         console.error('Error extracting icon:', error);
//     }
// };

// const saveIconsForTray = (exePath) => {
//     try {
//         const iconIndex = 0; // Adjust based on your use case
//         const outputPath = path.join(__dirname, `icon-${Date.now()}.ico`);
//         extractIcon(exePath, iconIndex, outputPath);
//     } catch (error) {
//         console.error('Error fetching process or icon:', error);
//     }
// };

// getIconForApp()


// const { getAllWindows, getShortcutLink } = require('hmc-win32');
// const { execSync } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// // Function to save the icon as an image
// const saveIconAsImage = (iconData, outputPath) => {
//     try {
//         const iconBuffer = Buffer.from(iconData, 'utf-8');
//         fs.writeFileSync(outputPath, iconBuffer);
//         console.log(`Icon saved to ${outputPath}`);
//     } catch (error) {
//         console.error('Error saving icon:', error.message);
//     }
// };

// // Function to extract icon using Resource Hacker
// const extractIcon = (exePath, iconIndex, outputPath) => {
//     try {
//         const resourceHackerPath = path.resolve(__dirname, 'resourceHack.exe');
//         if (!fs.existsSync(resourceHackerPath)) {
//             throw new Error('Resource Hacker executable not found.');
//         }

//         const command = `"${resourceHackerPath}" -open "${exePath}" -save "${outputPath}" -action extract -mask ICONGROUP,${iconIndex}`;
//         execSync(command);
//         console.log(`Icon saved to ${outputPath}`);
//     } catch (error) {
//         console.error('Error extracting icon:', error.message);
//     }
// };

// // Function to save icons for tray windows
// const saveIconsForTray = (exePath) => {
//     if (!exePath || !fs.existsSync(exePath)) {
//         console.error('Executable path is invalid or does not exist:', exePath);
//         return;
//     }

//     const iconIndex = 0; // Adjust as needed
//     const outputPath = path.join(__dirname, `icon-${Date.now()}.ico`);
//     extractIcon(exePath, iconIndex, outputPath);
// };

// // Main function to get icons for tray windows
// const getIconForApp = async () => {
//     try {
//         const trayList = getAllWindows();
//         if (!trayList || trayList.length === 0) {
//             console.warn('No tray windows found.');
//             return;
//         }

//         for (const tray of trayList) {
//             try {
//                 const processPath = getShortcutLink(tray.handle);
//                 if (!processPath || !processPath.path) {
//                     console.warn(`No shortcut found for tray item: ${tray.title}`);
//                     continue;
//                 }

//                 console.log(`Processing tray title: ${tray.title}`);
//                 saveIconsForTray(processPath.path);
//             } catch (trayError) {
//                 console.error(`Error processing tray item: ${tray.title}`, trayError.message);
//             }
//         }

//         console.log('Tray icon processing completed.');
//     } catch (error) {
//         console.error('Error fetching tray list:', error.message);
//     }
// };

// // Run the function
// getIconForApp();





// const { BrowserWindow } = require('electron');
// const { getPointWindow, getWindowClassName } = require('hmc-win32');
// const { getForegroundWindow, getWindowTitle } = require('hmc-win32');
// const { GlobalKeyboardListener } = require('node-global-key-listener');
// const { extract } = require('file-icon-extractor'), path = require('path');



// const getActiveWinFromApp = async () => {

//     const { openWindows } = await import('get-windows');


//     // how that call to dialog windows ..
//     const allOpenWindows = await openWindows();

//     // is it the same as BrowserWindow ..
//     const electronWin = allOpenWindows.find(win => win.title.includes('Electron'));

//     if (!electronWin) {

//         console.log('No active window detected via BrowserWindow getAllWindows !! ');
//         return { activeFrom };
//     };

//     if (electronWin.title !== activeFrom.title) {

//         console.log(`Mismatch Id's !! `);
//         console.log(`get-windows Id : ${activeFrom.title}`);
//         console.log(`BrowserWindow Id : ${electronWin.title}`);

//         return { activeFrom };
//     };

//     return { electronWin, activeFrom };
// };


// const extractIconFromExe = (appPath) => {

//     const basename = path.basename(appPath, path.extname(appPath));
//     const tempDestPath = require('os').homedir();
//     extract(appPath, tempDestPath);
//     // clipboard.writeImage(path.join(tempDestPath, `${basename}.png`));

//     return path.join(tempDestPath, `${basename}.png`);

// };


// const getForegroundWin = async () => {

//     await new Promise(resolve => setTimeout(resolve, 100));
//     const activeWindowHandle = getForegroundWindow();
//     const title = getWindowTitle(activeWindowHandle);
//     console.log("Active Window Title :", title);
//     return title;
// };

// const addEventListener = () => {

//     let rightClickCount = 0;
//     const keyListener = new GlobalKeyboardListener();

//     const resetCounter = () => setTimeout(() => { rightClickCount = 0 }, 1000);

//     keyListener.addListener(async e => {

//         if (e.name === 'MOUSE LEFT' && e.state === "DOWN") {

//             const isMyApp = await getForegroundWin();

//             rightClickCount++;
//             if (rightClickCount === 2) {
//                 console.log("Detected two right-clicks on Desktop !!");
//                 rightClickCount = 0;

//                 // if (mainWindow.isVisible()) {
//                 // await runPowerShellFile('toggleDesktopIcons.ps1');
//                 // setValue('desktopIconsDisplay', 'on');
//                 // mainWindow.hide();
//                 // } else {
//                 // await runPowerShellFile('toggleDesktopIcons.ps1');
//                 // setValue('desktopIconsDisplay', 'off');
//                 // mainWindow.show();
//                 // }
//             } else {
//                 resetCounter();
//             }
//         }
//     });
// }



// const getWindowUnderCursor = () => {

//     try {

//         const hwnd = getPointWindow();
//         if (!hwnd) {
//             console.warn('No window found under the cursor ..');
//             return;
//         }

//         const title = getWindowTitle(hwnd);
//         const className = getWindowClassName(hwnd);
//         console.log(`Window Title : ${title}`);
//         console.log(`Window Handle : ${hwnd}`);
//         console.log(`Window Class Name : ${className}`);
//         return { title, hwnd, className };
//     } catch (error) {

//         console.error('Failed to get the window under cursor:', error);
//     }
// }


// module.exports = { extractIconFromExe, getActiveWinFromApp, getWindowUnderCursor };






// const { BrowserWindow } = require('electron');
// const { getWindowClassName, getWindowRect, getShortcutLink, getAllWindows, getMainWindow, getWindowProcess, getProcessWindow } = require('hmc-win32');
// const { getForegroundWindow, getWindowTitle } = require('hmc-win32');
// const { GlobalKeyboardListener } = require('node-global-key-listener');
// const { extract } = require('file-icon-extractor'), path = require('path');

// const fs = require('fs');

// const saveIconAsImage = (iconData, outputPath) => {
//     try {
//         // Convert icon data to a buffer
//         const iconBuffer = Buffer.from(iconData, 'utf-8');

//         // Save buffer as an image file (e.g., PNG)
//         fs.writeFileSync(outputPath, iconBuffer);
//         console.log(`Icon saved to ${outputPath}`);
//     } catch (error) {
//         console.error('Error saving icon:', error);
//     }
// };



// const { getPointWindow } = require('hmc-win32');

// const getIconForApp = async (pidWin) => {
//     try {
//         // Fetch all tray windows
//         const trayList = getAllWindows();

//         // Iterate through each tray item and process its details
//         for (const tray of trayList) {
//             try {
//                 // Get window ID from tray title
//                 const id = getPointWindow(tray.title);

//                 if (!id) {
//                     console.warn(`No window found for title: ${tray.title}`);
//                     continue;
//                 }

//                 // Get the file path of the process associated with the window
//                 // const processPath = getProcessidFilePath(id);
//                 const processPath = getShortcutLink(id);
//                 console.log(`Tray Title : ${tray.title}, ${JSON.stringify(processPath, null, 2)}`);
//                 console.log(`n`);
//                 // Example usage
//                 const iconData = processPath.path;
//                 saveIconAsImage(iconData,  `${tray.title}.ico`);

//                 // Additional logic for fetching or displaying icons can be added here
//             } catch (trayError) {
//                 console.error(`Error processing tray item: ${tray.title}`, trayError);
//             }
//         }

//         // Optionally check if the explorer process exists
//         const { hasProcess } = require('hmc-win32');
//         const processExists = hasProcess('explorer.exe');
//         console.log('Explorer Process Exists:', processExists);
//     } catch (error) {
//         console.error('Error fetching tray list:', error);
//     }
// };

// Example usage
// getIconForApp();



// const getActiveWinFromApp = async () => {

//     const { openWindows } = await import('get-windows');


//     // how that call to dialog windows ..
//     const allOpenWindows = await openWindows();

//     // is it the same as BrowserWindow ..
//     const electronWin = allOpenWindows.find(win => win.title.includes('Electron'));

//     if (!electronWin) {

//         console.log('No active window detected via BrowserWindow getAllWindows !! ');
//         return { activeFrom };
//     };

//     if (electronWin.title !== activeFrom.title) {

//         console.log(`Mismatch Id's !! `);
//         console.log(`get-windows Id : ${activeFrom.title}`);
//         console.log(`BrowserWindow Id : ${electronWin.title}`);

//         return { activeFrom };
//     };

//     return { electronWin, activeFrom };
// };


// const extractFromExe = (appPath) => {

//     const tempDestPath = require('os').homedir();
//     const basename = path.basename(appPath, path.extname(appPath));
//     extract(appPath, tempDestPath);
//     return path.join(tempDestPath, `${basename}.png`);

// };


// module.exports = { extractFromExe, getActiveWinFromApp };
















// const addEventListener = () => {

//     let rightClickCount = 0;
//     const keyListener = new GlobalKeyboardListener();

//     const resetCounter = () => setTimeout(() => { rightClickCount = 0 }, 1000);

//     keyListener.addListener(async e => {

//         if (e.name === 'MOUSE LEFT' && e.state === "DOWN") {

//             const isMyApp = await getForegroundWin();

//             rightClickCount++;
//             if (rightClickCount === 2) {
//                 console.log("Detected two right-clicks on Desktop !!");
//                 rightClickCount = 0;

//                 // if (mainWindow.isVisible()) {
//                 // await runPowerShellFile('toggleDesktopIcons.ps1');
//                 // setValue('desktopIconsDisplay', 'on');
//                 // mainWindow.hide();
//                 // } else {
//                 // await runPowerShellFile('toggleDesktopIcons.ps1');
//                 // setValue('desktopIconsDisplay', 'off');
//                 // mainWindow.show();
//                 // }
//             } else {
//                 resetCounter();
//             }
//         }
//     });
// }



// const getWindowUnderCursor = () => {

//     try {

//         const hwnd = getPointWindow();
//         if (!hwnd) {
//             console.warn('No window found under the cursor ..');
//             return;
//         }

//         const title = getWindowTitle(hwnd);
//         const className = getWindowClassName(hwnd);
//         console.log(`Window Title : ${title}`);
//         console.log(`Window Handle : ${hwnd}`);
//         console.log(`Window Class Name : ${className}`);
//         return { title, hwnd, className };
//     } catch (error) {

//         console.error('Failed to get the window under cursor:', error);
//     }
// }


// "get-windows": "^9.2.0",
// "hmc-win32": "^1.4.92",
// "node-global-key-listener": "^0.3.0"



// app.commandLine.appendSwitch('enable-logging');

// const demoObj = { electronWin: new BrowserWindow };

// app.on('browser-window-focus', (_, window) => {

//     // const isDialogAlreadyOpen = BrowserWindow.getAllWindows.some(win => win.title === 'Confirm Dialog');

//     // process.env.lastFocusedWindow = window.title;
//     console.log('Focused Window : ' + window.title);

// });

// app.on('browser-window-created', (event, window) => {

//     console.log('A new BrowserWindow was created !');



//     window.webContents.openDevTools();
// });

// app.on('browser-window-created', (event, window) => {

//     console.log('A new BrowserWindow was created !');

//     // Log details about the window
//     console.log('URL loaded in the window :', window.webContents.getURL());
//     console.log('Window ID:', window.id);

//     window.webContents.openDevTools();

//     // Listen for webContents events for more details
//     window.webContents.on('did-start-navigation', (event, url) => {

//         console.log('Navigation started to :', url);
//         console.log('Navigation started from :', event.url);
//     });
// });

// app.on('window-all-closed', () => {

//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });