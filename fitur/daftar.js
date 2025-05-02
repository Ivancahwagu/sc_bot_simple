let theoFitur = async function ({ m, theo }) {
    if (db.user[m.sender]) {
        return await theo.sendMessage(m.chat, {
            text: `✅ *Kamu sudah terdaftar!*\n\nSelamat datang kembali, user setia ${namaBot}!`,
        }, m.quo)
    }

    db.user[m.sender] = {
        limit: 30,
        premium: false,
        banned: false,
        download: {},
        ytdl: {},
        ai: [],
        afk: false
    }

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
theoFitur.command = [`daftar`, `login`]
export default theoFitur
