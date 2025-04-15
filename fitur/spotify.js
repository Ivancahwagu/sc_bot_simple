import { spotify } from "../tools/scrape.js"
let theoFitur = async ({ m, theo }) => {
    if (!m.res.includes("spotify")) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} link track spotify`)
    let hasil = await spotify(m.res)
    await theo.sendMedia(m.chat, hasil.link, null, m.quo, {
        contextInfo: {
            forwardingScore: 1,
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363181509677367@newsletter',
                serverMessageId: 113,
                newsletterName: '⫷_____😸 SANSBOT 😸_____⫸'
            },
            externalAdReply: {
                thumbnailUrl: hasil.thumbnail,
                mediaType: 1,
                title: hasil.title,
                body: hasil.artist,
                renderLargerThumbnail: true,
                sourceUrl: m.res

            }
        }
    })
}

theoFitur.limit = true
theoFitur.tags = "downloader"
theoFitur.command = ["spotify", "sp"]
export default theoFitur