import { pinterest_search } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} kucing meme`)
    let hasil = await pinterest_search(m.res)
    let no = 1
    let { key } = await m.reply(`${hasil.map(a => `${no++}. ${a.title ? a.title.split(`\n`).join(' ') : `hasil pencarian ${no - 1}`}`).join(`\n`)}

balas pesan ini dengan nomor yang anda inginkan`)
    db.user[m.sender].download[key.id] = hasil
}
theoFitur.tags = "internet"
theoFitur.limit = true
theoFitur.command = ["pinsearch"]
export default theoFitur