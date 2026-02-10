// Capacitor helpers for native PDF saving on Android
// Falls back to browser download when not running in Capacitor

window.CapacitorHelpers = {
  isNative: function() {
    return window.Capacitor && window.Capacitor.isNativePlatform();
  },

  savePDF: async function(pdfBase64, fileName) {
    if (!this.isNative()) {
      // Browser fallback: not used here, handled in renderer
      return { success: false, native: false };
    }

    try {
      const { Filesystem, Directory } = window.Capacitor.Plugins.Filesystem || {};
      const { Share } = window.Capacitor.Plugins.Share || {};

      if (!Filesystem) {
        return { success: false, error: 'Filesystem plugin not available' };
      }

      // Write the PDF file to the device
      const result = await Filesystem.writeFile({
        path: fileName,
        data: pdfBase64,
        directory: 'DOCUMENTS',
        recursive: true
      });

      // Try to share the file so the user can open/save it
      if (Share) {
        try {
          await Share.share({
            title: 'Resultados del Test del Amor Triangular',
            text: 'Resultados del test de Sternberg',
            url: result.uri,
            dialogTitle: 'Compartir resultados'
          });
        } catch (shareErr) {
          // User cancelled share - file is still saved
        }
      }

      return { success: true, path: result.uri };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
