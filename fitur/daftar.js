let theoFitur = async function ({ m, theo }) {
    if (db.user[m.sender]) return await theo.sendMessage(m.chat, { text: `kan dah daftar` }, m.quo)
    db.user[m.sender] = {
        limit: 30,
        premium: false,
        banned: false,
        download: {},
        ytdl: {},
        ai: []
    }
    await theo.sendMessage(m.chat, { text: `berhasil daftar` }, m.quo, namaBot)
}

theoFitur.tags = "main"
theoFitur.command = [`daftar`, `login`]
export default theoFitur