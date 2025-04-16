let theoFitur = async function ({ m, theo }) {
    let nomor = m.metadata?.participants.map(a => a.id)
    await m.reply(`${m.res ? "pesan: " + m.res : `kosong`}`, {
        contextInfo: {
            mentionedJid: nomor
        }
    })
}
theoFitur.tags = "admin"
theoFitur.admin = true
theoFitur.command = ["hidetag"]
export default theoFitur