import { upload_to_url } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !/image|video|audio|sticker/.test(m.media.type)) {
        return await m.reply(`❌ *Format salah!*
        
Silakan *balas pesan media* yang ingin di-upload.

📌 *Didukung:* Gambar, Audio, Video, dan Sticker.`)
    }

    try {
        let hasil = await upload_to_url(await theo.download(m.media))

        await m.reply(`✅ *Berhasil Upload!*

🆔 File ID: *${hasil.id}*
🔗 URL: ${hasil.result}

Kamu bisa gunakan URL ini untuk dibagikan atau digunakan kembali.`)
    } catch (e) {
        console.error(e)
        await m.reply(`❌ Terjadi kesalahan saat meng-upload media. Coba lagi nanti ya.`)
    }
}

theoFitur.command = ["upload", "tourl"]
theoFitur.tags = "tools"
export default theoFitur
