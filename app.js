require('crash-reporter').start();

var Menu    = require('menu')
var MenuBar = require('menubar');
var ipc     = require('electron').ipcMain;
var as      = require('applescript');

var menuBar = MenuBar({
  dir: __dirname + '/app',
  width: 400,
  height: 400,
  icon: __dirname + '/app/icon.png',
  preloadWindow: true,
  showDockIcon: true
});

var menu_template = [
  {
    label: 'frkout',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      },
      {
        label: 'Quit App',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function () { menuBar.window.toggleDevTools() }
      }
    ]
  }
]

menuBar.on('ready', function ready () {
  var menu = Menu.buildFromTemplate(menu_template)
  Menu.setApplicationMenu(menu)
});

ipc.on('appleScript', function(event, arg) {
  as.execString(arg, function(err, rtn) {
    if (err) {
      console.log('ASERR: ' + err);
      event.sender.send('appleScriptError', err);
    }

    if (rtn) {
      console.log('ASRTN: ' + rtn);
      event.sender.send('appleScriptSuccess', rtn);
    }
  });
});
