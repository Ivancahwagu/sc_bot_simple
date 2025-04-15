let theoFitur = async function ({ m, theo }) {
    let nomor = m.metadata?.participants.map(a => a.id)
    await m.reply(`${m.res ? "pesan: " + m.res : ``}
    
tag all member group
${nomor.map(a => `@${a.split("@")[0]}`).join('\n')}`, {
        contextInfo: {
            mentionedJid: nomor
        }
    })
}
theoFitur.tags = "admin"
theoFitur.admin = true
theoFitur.command = ["tagall"]
export default theoFitur