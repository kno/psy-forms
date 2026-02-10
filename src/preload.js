const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  savePDF: (pdfData, fileName) => ipcRenderer.invoke('save-pdf', pdfData, fileName)
});
