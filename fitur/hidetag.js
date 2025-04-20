let theoFitur = async function ({ m, theo }) {
    let nomor = m.metadata?.participants.map(a => a.id)
    let pesan = m.res ? `📢 *Pesan Broadcast:*\n${m.res}` : `📢 *Tidak ada pesan yang dikirim.*`

    await m.reply(pesan, {
        contextInfo: {
            mentionedJid: nomor
        }
    })
}

theoFitur.tags = "admin"
theoFitur.admin = true
theoFitur.command = ["hidetag"]
export default theoFitur
