import { pinterest_search } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`📌 *Format salah!*

Contoh penggunaan:
${m.prefix}${m.command} aesthetic wallpaper`)

    let hasil = await pinterest_search(m.res)
    if (!hasil || hasil.length === 0) return await m.reply(`❌ Tidak ditemukan hasil untuk *${m.res}*.`)

    let no = 1
    let listHasil = hasil.map(a =>
        `${no++}. ${a.title ? a.title.split(`\n`).join(' ') : `Hasil pencarian ke-${no - 1}`}`
    ).join(`\n`)

    let { key } = await m.reply(`🔍 *Hasil Pencarian Pinterest untuk:* _${m.res}_

${listHasil}

📥 *Balas pesan ini dengan nomor yang ingin kamu unduh gambarnya.*`)

    db.user[m.sender].download[key.id] = hasil
}

theoFitur.tags = "internet"
theoFitur.limit = true
theoFitur.command = ["pinsearch"]
export default theoFitur
