import { getYtId, yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (m.res) {
        let search = await yts(m.res)
        search = search.filter(a => a.link)
        if (!search.length) return m.reply(`❌ Tidak ditemukan hasil untuk *${m.res}*`)

        let video = search[0]
        let thumbnail = `https://i.ytimg.com/vi/${getYtId(video.link)}/0.jpg`
        let quality = [
            '128kbps (Audio)',
            '144p (Video)', '240p (Video)',
            '360p (Video)', '480p (Video)',
            '720p (Video)', '1080p (Video)'
        ]

        let text = `╭───❖  *Play YouTube* ❖───╮
│ 🎬 *Judul:* ${video.title}
│ ⏱️ *Durasi:* ${video.durasi}
│ 👀 *Rilis:* ${video.rilis}
│ 🔗 *Link:* ${video.link}
│
│ 📥 *Pilih Kualitas:* 
${quality.map((q, i) => `│ ${i + 1}. ${q}`).join('\n')}
╰────────────────────╯

🔁 *Balas pesan ini dengan nomor kualitas yang ingin kamu unduh*`

        let { key } = await theo.sendText(m.chat, text, m.quo, {
            contextInfo: {
                externalAdReply: {
                    thumbnailUrl: thumbnail,
                    mediaType: 1,
                    title: video.title,
                    body: `YouTube Downloader - ${namaBot}`,
                    renderLargerThumbnail: true,
                    sourceUrl: video.link
                }
            }
        })

        db.user[m.sender].ytdl[key.id] = {
            url: video.link
        }
    } else {
        await m.reply(`❌ *Kata kunci belum diberikan!*

Contoh:
*${m.prefix}${m.command} die with a smile*`)
    }
}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["play"]
export default theoFitur
