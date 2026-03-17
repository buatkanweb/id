// _sdk/element_sdk.js
window.elementSdk = {
    config: {},
    options: {},

    init: function(options) {
        this.options = options;
        // Menggunakan konfigurasi default dari index.html
        this.config = JSON.parse(JSON.stringify(options.defaultConfig || {}));
        
        // Menjalankan callback perubahan konfigurasi pertama kali
        if (options.onConfigChange) {
            options.onConfigChange(this.config);
        }
        
        console.log("Element SDK Initialized");
    },

    // Fungsi untuk memperbarui konfigurasi (biasanya dipanggil oleh editor)
    setConfig: function(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (this.options.onConfigChange) {
            this.options.onConfigChange(this.config);
        }
    }
};