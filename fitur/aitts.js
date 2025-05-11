import { ai, tts } from "../tools/scrape.js"
import { audio_effect } from './../tools/file.js';

let theoFitur = async ({ m, theo }) => {
    if (!m.res) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} pertanyaan`)
    let data = await ai(m.sender, m.name, db.user[m.sender].ai, m.res, namaBot)
    if (data) {
        let tags = data.jawab?.split("@").map(a => a.replace(/[^0-9]/g, "")).filter(a => a.length > 5).map(a => a + "@s.whatsapp.net")
        console.log(tags)
        db.user[m.sender].ai = data.payload
        let hasil = await audio_effect(await audio_effect(await tts(data.jawab, 1), global.effects["tupai"]), global.effects['fast'])
        await theo.sendMedia(m.chat, hasil, ``, m.quo, { ptt: true })
    }
}
theoFitur.limit = true
theoFitur.tags = "ai"
theoFitur.command = ["aitts1"]
export default theoFitur