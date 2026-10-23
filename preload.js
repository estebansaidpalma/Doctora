const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadData: () => ipcRenderer.invoke('db:load'),
  saveData: (data) => ipcRenderer.invoke('db:save', data),
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  exportBackup: (data) => ipcRenderer.invoke('db:exportBackup', data),
  importBackup: () => ipcRenderer.invoke('db:importBackup'),
  print: () => ipcRenderer.invoke('app:print')
});
