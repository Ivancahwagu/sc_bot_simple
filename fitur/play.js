import { getYtId, yts } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (m.res) {
        let search = await yts(m.res)
        search = search.filter(a => a.link)

        let quality = [
            '128kbps',
            '144p', '240p',
            '360p', '480p',
            '720p', '1080p'
        ]
        let no = 1
        let thumbnail = `https://i.ytimg.com/vi/${getYtId(search[0].link)}/0.jpg`
        let text = `${search[0].title}

${quality.map(a => `${no++}. ${a}`).join(`\n`)}


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
                    sourceUrl: search[0].link

                }
            }
        })
        db.user[m.sender].ytdl[key.id] = {
            url: search[0].link
        }
    } else {
        await theo.sendText(m.chat, `contoh: *${m.prefix}${m.command} die with a smile*`)
    }
}

theoFitur.tags = "downloader"
theoFitur.limit = true
theoFitur.command = ["play"]
export default theoFitur