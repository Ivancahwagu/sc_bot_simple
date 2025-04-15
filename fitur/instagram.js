import { igdl } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    let no = 1
    if (!m.res.includes(`https`) || !m.res.includes(`insta`)) return await m.reply(`format salah!

contoh: ${m.prefix}${m.command} https://www.instagram.com/reel/DHKaSQOTWls/?igsh=c3FtNndhMmgyODls`)
    let hasil = await igdl(m.res)
    let no_dl = 1
    hasil = hasil.map(a => ({ url: a.url, type: `File ${no_dl++}` }))
    if (hasil.length === 1) return await theo.sendMedia(m.chat, hasil[0].url, ``, m.quo)
    let { key } = await m.reply(`${namaBot} INSTAGRAM DOWNLOADER

${hasil.map(a => `${no++}. ${a.type}`).join('\n')}

balas pesan ini dengan nomor yang anda inginkan`)
    db.user[m.sender].download[key.id] = hasil
}
theoFitur.limit = true
theoFitur.tags = "downloader"
theoFitur.command = ["instagram", "ig", "igdl"]
export default theoFitur