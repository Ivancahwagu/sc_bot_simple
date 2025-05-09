import { ai_fast } from "../tools/scrape.js"

let theoFitur = async ({ m, theo }) => {
    if (!m.res) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} pertanyaan`)
    let data = await ai_fast(m.sender, m.name, db.user[m.sender].ai, m.res, namaBot)
    if (data) {
        let tags = data.jawab?.split("@").map(a => a.replace(/[^0-9]/g, "")).filter(a => a.length > 5).map(a => a + "@s.whatsapp.net")
        console.log(tags)
        db.user[m.sender].ai = data.payload
        await m.reply(data.jawab, {
            contextInfo: {
                mentionedJid: tags
            }
        })
    }
}
theoFitur.limit = true
theoFitur.tags = "ai"
theoFitur.command = ["aifast"]
export default theoFitur