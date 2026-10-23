const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function getDataFilePath() {
  const userDataDir = app.getPath('userData');
  return path.join(userDataDir, 'sonrisa_perfecta_db.json');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 880,
    minWidth: 1060,
    minHeight: 700,
    title: 'Sonrisa Perfecta - Gestión Odontológica & Odontograma',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    backgroundColor: '#0f172a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC: Carga de Datos
ipcMain.handle('db:load', async () => {
  try {
    const dbPath = getDataFilePath();
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(raw);
    }
    return null;
  } catch (err) {
    console.error('Error al leer base de datos:', err);
    return null;
  }
});

// IPC: Guardado de Datos Seguro y Persistente (Base de Datos Robusta)
ipcMain.handle('db:save', async (event, data) => {
  try {
    const dbPath = getDataFilePath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Si ya existe la base de datos, crear copia de respaldo previa (.bak)
    if (fs.existsSync(dbPath)) {
      try {
        fs.copyFileSync(dbPath, dbPath + '.bak');
      } catch (e) {
        console.warn('No se pudo crear copia previa .bak:', e);
      }
    }

    // Escritura atómica mediante archivo temporal para prevenir corrupción si se apaga la PC
    const tmpPath = dbPath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpPath, dbPath);

    // Respaldo diario automático en subcarpeta protegida
    try {
      const backupDir = path.join(dir, 'backups_diarios');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      const todayStr = new Date().toISOString().slice(0, 10);
      const dailyBackupPath = path.join(backupDir, `db_${todayStr}.json`);
      fs.copyFileSync(dbPath, dailyBackupPath);
    } catch (e) {
      console.warn('No se pudo crear respaldo diario:', e);
    }

    return { success: true };
  } catch (err) {
    console.error('Error al guardar base de datos:', err);
    return { success: false, error: err.message };
  }
});

// IPC: Abrir enlace externo (WhatsApp, etc.)
ipcMain.handle('shell:openExternal', async (event, url) => {
  if (url && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('mailto:'))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

// IPC: Exportar copia de seguridad JSON
ipcMain.handle('db:exportBackup', async (event, data) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Exportar Respaldo de Datos - Sonrisa Perfecta',
    defaultPath: `Sonrisa_Perfecta_Respaldo_${new Date().toISOString().slice(0, 10)}.json`,
    filters: [{ name: 'JSON Backup', extensions: ['json'] }]
  });

  if (filePath) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return { success: true, filePath };
  }
  return { success: false, cancelled: true };
});

// IPC: Importar copia de seguridad JSON
ipcMain.handle('db:importBackup', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Importar Respaldo de Datos - Sonrisa Perfecta',
    filters: [{ name: 'JSON Backup', extensions: ['json'] }],
    properties: ['openFile']
  });

  if (filePaths && filePaths.length > 0) {
    try {
      const content = fs.readFileSync(filePaths[0], 'utf8');
      const parsed = JSON.parse(content);
      const dbPath = getDataFilePath();
      fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');
      return { success: true, data: parsed };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  return { success: false, cancelled: true };
});

// IPC: Imprimir
ipcMain.handle('app:print', async () => {
  if (mainWindow) {
    mainWindow.webContents.print({ silent: false, printBackground: true });
    return true;
  }
  return false;
});
