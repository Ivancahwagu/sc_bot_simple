import { getYtId, yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (m.res) {

        if (!m.res.includes(`https`) || !m.res.includes(`youtu`)) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} https://youtu.be/tGv7CUutzqU?si=9ErzbmivlTj4y4NQ`)

        let quality = [
            '128kbps',
            '144p', '240p',
            '360p', '480p',
            '720p', '1080p'
        ]
        let no = 1
        let thumbnail = `https://i.ytimg.com/vi/${getYtId(m.res)}/0.jpg`
        let text = `${quality.map(a => `${no++}. ${a}`).join(`\n`)}


`
        text += `silahkan balas pesan ini dengan nomor kualitas yang anda inginkan`
        let { key } = await theo.sendText(m.chat, text, m.quo, {
            contextInfo: {
                externalAdReply: {
                    thumbnailUrl: thumbnail,
                    mediaType: 1,
                    title: `Downloader Youtube`,
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
        await theo.sendText(m.chat, `contoh: *${m.prefix}${m.command} die with a smile*`)
    }
}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["youtube", "yt", "ytdl"]
export default theoFitur