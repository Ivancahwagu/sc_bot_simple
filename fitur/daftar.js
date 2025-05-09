let theoFitur = async function ({ m, theo }) {
    if (db.user[m.sender]) {
        return await theo.sendMessage(m.chat, {
            text: `✅ *Kamu sudah terdaftar!*\n\nSelamat datang kembali, user setia ${namaBot}!`,
        }, m.quo)
    }

    db.user[m.sender] = global.struktur_db.user

    await theo.sendMessage(m.chat, {
        text: `🎉 *Pendaftaran Berhasil!*

Selamat datang di *${namaBot}*!
Kamu telah mendapatkan:
• 🪙 *Limit:* 30
• 💎 *Status:* User Biasa
• 🔓 Akses fitur bot

Ketik *.menu* untuk melihat semua fitur yang tersedia!
    `
    }, m.quo)
}

theoFitur.tags = "main"
theoFitur.command = [`daftar`, `login`, `reg`, `register`]
export default theoFitur
