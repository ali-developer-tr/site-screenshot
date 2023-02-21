const {app, BrowserWindow, ipcMain, dialog} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
    //win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

const getScreenShot = async (url) => {
    dialog.showSaveDialog().then(async result => {
        if (!result.canceled) {
            await import('capture-website').then(async (p) => {
                await p.default.file(url, result.filePath + '.jpeg', {
                    width: 1920,
                    height: 1080,
                    type: 'jpeg',
                    quality: 1,
                    fullPage: true,
                    removeElements: [
                        '.gotopwa',
                        '#imber-top-parent'
                    ],
                    launchOptions: {
                        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                    }
                }).then((res) => {
                    //dialog.showMessageBox({message: 'تصویر با موفقیت ثبت گردید'})
                    console.log(res)
                }).catch(err => {
                    //dialog.showMessageBox({message: 'خطا در ثبت تصویر'})
                    console.log(err)
                });
            })

            let langs = ['en', 'ru', 'tr'];
            let main_url = 'https://sakhtbazar.com/fa'
            let replace_url = "https://constrader.com/"

            langs.map(async (lang) => {
                let u = url.replace(main_url,replace_url + lang)

                await import('capture-website').then(async (p) => {
                    await p.default.file(u, result.filePath + '-' + lang + '.jpeg', {
                        width: 1920,
                        height: 1080,
                        type: 'jpeg',
                        quality: 1,
                        fullPage: true,
                        removeElements: [
                            '.gotopwa',
                            '#imber-top-parent'
                        ],
                        launchOptions: {
                            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                        }
                    }).then((res) => {
                        //dialog.showMessageBox({message: 'تصویر با موفقیت ثبت گردید'})
                        console.log(res)
                    }).catch(err => {
                        //dialog.showMessageBox({message: 'خطا در ثبت تصویر'})
                        console.log(err)
                    });
                })
            })

        }
    }).catch(err => {
        console.log(err)
        dialog.showMessageBox({message: 'خطا در ثبت تصویر'})
    })
}

ipcMain.on('asynchronous-message', (event, url) => {
    getScreenShot(url).then(() => {
        event.sender.send('asynchronous-reply', {status: true});
    })
});