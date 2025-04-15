import { ttdl } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    let no = 1
    if (!m.res.includes(`https`) || !m.res.includes(`tiktok.com`)) return await m.reply(`format salah!

contoh: ${m.prefix}${m.command}  https://vt.tiktok.com/ZSr6GpwTC/`)


    let hasil = await ttdl(m.res)

    let { key } = await m.reply(`${namaBot} TIKTOK DOWNLOADER
        
${hasil.title}

${hasil.link.map(a => `${no++}. ${a.type.trim()}`).join(`\n`)}
*balas pesan ini dengan nomor yang anda inginkan*`)
    db.user[m.sender].download[key.id] = hasil.link
    console.log(hasil)

}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["tiktok", "tt", "ttdl"]
export default theoFitur