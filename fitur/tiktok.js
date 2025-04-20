import { ttdl } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    let no = 1

    if (!m.res.includes(`https`) || !m.res.includes(`tiktok.com`)) {
        return await m.reply(`❌ *Format link salah!*

Contoh penggunaan:
${m.prefix}${m.command} https://vt.tiktok.com/ZSr6GpwTC/`)
    }

    try {
        let hasil = await ttdl(m.res)
        let { title, link } = hasil

        let { key } = await m.reply(`📥 *${namaBot} TIKTOK DOWNLOADER*

🎬 Judul: *${title.trim()}*

Pilih jenis media yang ingin kamu unduh:
${link.map(a => `${no++}. ${a.type.trim()}`).join('\n')}

📌 *Balas pesan ini dengan nomor yang kamu pilih untuk mulai download.*`)

        db.user[m.sender].download[key.id] = link
        console.log(hasil)

    } catch (e) {
        console.error(e)
        await m.reply(`❌ Gagal mengunduh video TikTok. Pastikan link valid dan coba lagi nanti.`)
    }
}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["tiktok", "tt", "ttdl"]
export default theoFitur
