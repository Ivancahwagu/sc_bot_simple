import { yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} kembali pulang`)
    let hasil = await yts(m.res)
    await m.reply(`${hasil.map(a => (`
title:  ${a.title}
durasi: ${a.durasi}
link:   ${a.link}    
`)).join(`\n`)}`)
}
theoFitur.tags = "internet"
theoFitur.command = ["youtubesearch", "yts"]
export default theoFitur