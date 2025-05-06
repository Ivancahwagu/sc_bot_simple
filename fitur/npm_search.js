import { npm_search } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`❌ *Format salah!*

Contoh penggunaan:
${m.prefix + m.command} baileys`)

    let hasil = await npm_search(m.res)

    if (!hasil.length) return await m.reply(`🔍 Tidak ditemukan hasil untuk *${m.res}*.`)

    let teks = `📦 *Hasil pencarian untuk:* _${m.res}_\n\n` +
        hasil.map((v, i) => {
            return `*${i + 1}. ${v.name}* (v${v.version})\n` +
                (v.description ? `📄 _${v.description}_\n` : '') +
                Object.entries(v.links || {}).map(([key, val]) => `🔗 *${key[0].toUpperCase() + key.slice(1)}*: ${val}`).join('\n')
        }).join('\n\n')

    await m.reply(teks.trim())
}

theoFitur.tags = "internet"
theoFitur.command = ["npmsearch"]
export default theoFitur
