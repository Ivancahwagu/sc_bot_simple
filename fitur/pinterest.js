import { pindl } from "../tools/scrape.js"

let theoFitur = async ({ m, theo }) => {
    if (!m.res.includes("pin") || !m.res.includes("https://")) {
        return m.reply(`📌 *Format salah!*

Contoh penggunaan:
${m.prefix}${m.command} https://pin.it/S7ATWEmOd`)
    }

    let data = await pindl(m.res)
    if (data) {
        let no = 1
        let pilihan = data.link.map(a => ({
            url: a.url,
            type: a.kualitas
        }))

        let listFormat = pilihan.map(a => `${no++}. ${a.type.trim()}`).join('\n')

        let { key } = await m.reply(`📥 *Pinterest Downloader*

🖼️ Judul: ${data.title}

🔢 Pilih kualitas yang kamu inginkan:
${listFormat}

💬 Balas pesan ini dengan nomor pilihanmu untuk mendownload.`)

        db.user[m.sender].download[key.id] = pilihan
    } else {
        m.reply(`❌ Gagal mengambil data dari URL tersebut. Pastikan link Pinterest-nya benar dan publik.`)
    }
}

theoFitur.limit = true
theoFitur.tags = "downloader"
theoFitur.command = ["pinterest", "pin"]
export default theoFitur
