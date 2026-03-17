// _sdk/data_sdk.js
window.dataSdk = {
    handler: null,
    storageKey: 'wedding_invitation_wishes',

    init: async function(handler) {
        this.handler = handler;
        
        // Ambil data yang tersimpan di localStorage
        const storedData = localStorage.getItem(this.storageKey);
        const data = storedData ? JSON.parse(storedData) : [];
        
        // Beritahu index.html bahwa ada data (untuk menampilkan list ucapan)
        if (this.handler && this.handler.onDataChanged) {
            this.handler.onDataChanged(data);
        }

        console.log("Data SDK Initialized");
        return { isOk: true };
    },

    create: async function(newData) {
        try {
            // Ambil data lama
            const storedData = localStorage.getItem(this.storageKey);
            let data = storedData ? JSON.parse(storedData) : [];

            // Tambahkan ID unik dan data baru
            const entry = {
                ...newData,
                __backendId: 'wish_' + Date.now(),
                created_at: newData.created_at || new Date().toISOString()
            };

            data.push(entry);

            // Simpan kembali ke localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(data));

            // Update tampilan secara realtime
            if (this.handler && this.handler.onDataChanged) {
                this.handler.onDataChanged(data);
            }

            return { isOk: true };
        } catch (error) {
            console.error("Failed to save data:", error);
            return { isOk: false };
        }
    }
};