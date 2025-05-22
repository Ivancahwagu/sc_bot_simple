import { shortlink } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res || !m.res.includes(`://`)) {
        return await m.reply(`❌ *Format salah!*
        
pastikan url valid`)
    }

    try {
        let hasil = await shortlink(m.res)

        await m.reply(`✅ *Berhasil Upload!*

🔗 URL: ${hasil.result}

Kamu bisa gunakan URL ini untuk dibagikan atau digunakan kembali.`)
    } catch (e) {
        console.error(e)
        await m.reply(`❌ Terjadi kesalahan saat memproses.`)
    }
}

theoFitur.command = ["shortlink", "shorturl"]
theoFitur.tags = "tools"
export default theoFitur
