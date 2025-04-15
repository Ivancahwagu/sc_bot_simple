let theoFitur = async function ({ m, theo }) {
    if (!m.quoted) await m.reply(`balas pesan yang mau dihapus`)
    await theo.delete(m.chat, m.quoted)
}
theoFitur.admin = true
theoFitur.botAdmin = true
theoFitur.tags = "admin"
theoFitur.command = ["del"]
export default theoFitur