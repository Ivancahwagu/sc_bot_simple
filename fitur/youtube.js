import { getYtId, yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (m.res) {

        if (!m.res.includes(`https`) || !m.res.includes(`youtu`)) return await m.reply(`❌ *Link tidak valid!*

Contoh penggunaan:
${m.prefix}${m.command} https://youtu.be/tGv7CUutzqU?si=9ErzbmivlTj4y4NQ`)

        let quality = [
            '128kbps (Audio)',
            '144p (Video)',
            '240p (Video)',
            '360p (Video)',
            '480p (Video)',
            '720p (Video)',
            '1080p (Video)'
        ]
        let thumbnail = `https://i.ytimg.com/vi/${getYtId(m.res)}/0.jpg`
        let text = `╭─❖ *Youtube Downloader* ❖─╮
│ 🎬 *Link:* ${m.res}
│ 📥 *Pilih Kualitas:*
${quality.map((q, i) => `│ ${i + 1}. ${q}`).join('\n')}
╰───────────────────╯

🔁 *Balas pesan ini dengan nomor kualitas yang kamu inginkan*`

        let { key } = await theo.sendText(m.chat, text, m.quo, {
            contextInfo: {
                externalAdReply: {
                    thumbnailUrl: thumbnail,
                    mediaType: 1,
                    title: `YouTube Downloader`,
                    body: namaBot,
                    renderLargerThumbnail: true,
                    sourceUrl: m.res
                }
            }
        })

        db.user[m.sender].ytdl[key.id] = {
            url: m.res
        }

    } else {
        await m.reply(`❌ *Link tidak ditemukan!*

Contoh penggunaan:
*${m.prefix}${m.command} https://you.tube/your-video-url*`)
    }
}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["youtube", "yt", "ytdl"]
export default theoFitur
