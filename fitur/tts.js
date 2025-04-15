import { tts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
        
cara pakai: ${m.prefix}${m.command} halo, saya ${namaBot}`)
    let hasil = await tts(m.res, 1)
    await theo.sendMedia(m.chat, hasil, ``, m.quo, { ptt: true })
}
theoFitur.tags = "tools"
theoFitur.limit = true
theoFitur.command = ["tts1"]
export default theoFitur