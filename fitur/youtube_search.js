import { yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`❌ Format salah!

📌 Contoh: *${m.prefix}${m.command} kembali pulang*`)

    let hasil = await yts(m.res)
    if (!hasil.length) return await m.reply(`❌ Tidak ditemukan hasil untuk *${m.res}*`)

    let teks = `🔎 *Hasil Pencarian YouTube:*\n\n` +
        hasil.slice(0, 10).map((a, i) => `*${i + 1}. ${a.title}*
⏱️ Durasi: ${a.durasi}
🔗 Link: ${a.link}`).join(`\n\n`)

    await m.reply(teks)
}

theoFitur.tags = "internet"
theoFitur.command = ["youtubesearch", "yts"]
export default theoFitur
