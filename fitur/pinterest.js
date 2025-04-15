import { pindl } from "../tools/scrape.js"

let theoFitur = async ({ m, theo }) => {

    if (!m.res.includes("pin") || !m.res.includes("https://")) return m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} https://pin.it/S7ATWEmOd`)
    let data = await pindl(m.res)
    if (data) {
        let no = 1
        let dl = []
        for (const i of data.link) {
            dl.push({
                url: i.url,
                type: i.kualitas
            })
        }
        let { key } = await m.reply(`
${data.title}
${dl.map(a => `${no++}. ${a.type.trim()}`).join('\n')}

pilih salah satu nomor dan balas pesan ini dnegan nomor yang kamu inginkan`)
        db.user[m.sender].download[key.id] = dl
    }
}

theoFitur.limit = true
theoFitur.tags = "downloader"
theoFitur.command = ["pinterest", "pin"]
export default theoFitur