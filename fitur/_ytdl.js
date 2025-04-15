import { youtube } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (m.quoted) {
        if (!db.user[m.sender]) return
        if (db.user[m.sender].ytdl[m.quoted.id]) {
            let q = [
                '128kbps',
                '144p', '240p',
                '360p', '480p',
                '720p', '1080p'
            ]
            // let kualitas = Object.keys(db.user[m.sender]?.ytdl.filter(a => a.id === m.quoted.id)[0].dl.download)[parseInt(m.text) - 1]
            let kualitas = q[parseInt(m.text) - 1]
            if (kualitas) {
                // return console.log(db.user[m.sender]?.ytdl.filter(a => a.id === m.quoted.id)[0].dl.download)
                await m.react("⏳")
                let res = await youtube(db.user[m.sender]?.ytdl[m.quoted.id].url, kualitas)
                if (res.title.toLowerCase().includes(`playlist`) || res.title.toLowerCase().includes(`kumpulan`) || kualitas == q[4] || kualitas == q[5] || kualitas == q[6]) return await m.reply(`file besar download terdeteksi!!
            
ukuran melampaui batas

link download: ${res.download}`, {
                    contextInfo: {
                        forwardingScore: 1,
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363181509677367@newsletter',
                            serverMessageId: 113,
                            newsletterName: '⫷_____😸 ' + namaBot + ' 😸_____⫸'
                        },
                        externalAdReply: {
                            thumbnailUrl: res.thumbnail,
                            mediaType: 1,
                            title: res.title,
                            body: `${namaBot} Youtube Downloader`,
                            renderLargerThumbnail: true,
                            sourceUrl: res.downloadUrl

                        }
                    }
                })
                res.download = await getBuffer(res.download)
                if (!res.download) return await m.reply(`maaf kak gagal di proses, coba kualitas laen`)
                await theo.sendMedia(m.chat, res.download, res.title, m.quo, {
                    contextInfo: {
                        forwardingScore: 1,
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363181509677367@newsletter',
                            serverMessageId: 113,
                            newsletterName: '⫷_____😸 ' + namaBot + ' 😸_____⫸'
                        },
                        externalAdReply: {
                            thumbnailUrl: res.thumbnail,
                            mediaType: 1,
                            title: res.title,
                            body: `${namaBot} Youtube Downloader`,
                            renderLargerThumbnail: true,
                            sourceUrl: res.downloadUrl

                        }
                    }
                })
            }
        }
    }
}
export default theoFitur