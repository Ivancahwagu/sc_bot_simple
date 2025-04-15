let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} @tag`)
    let nomor = m.res.replace(/[^0-9]/g, '')
    let mention = nomor + '@s.whatsapp.net'
    let [on_wa] = await theo.onWhatsApp(mention)
    if (!on_wa.exists) return await m.reply(`nomor tidak tersedia di whatsapp`)
    await m.reply(`@${nomor}`, {
        contextInfo: {
            mentionedJid: [mention]
        }
    })
}
theoFitur.command = ["tag"]
theoFitur.tags = "main"
export default theoFitur