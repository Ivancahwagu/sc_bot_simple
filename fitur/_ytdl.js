import { youtube } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (m.quoted) {
        if (!db.user[m.sender]) return;

        if (db.user[m.sender].ytdl[m.quoted.id]) {
            let q = [
                '128kbps',
                '144p', '240p',
                '360p', '480p',
                '720p', '1080p'
            ];

            // Pilih kualitas berdasarkan input pengguna
            let kualitas = q[parseInt(m.text) - 1];

            if (kualitas) {
                await m.react("⏳"); // Animasi reaksi "Memproses"

                let res = await youtube(db.user[m.sender]?.ytdl[m.quoted.id].url, kualitas);

                if (res.title.toLowerCase().includes(`playlist`) ||
                    res.title.toLowerCase().includes(`kumpulan`) ||
                    kualitas === q[4] || kualitas === q[5] || kualitas === q[6]) {

                    return await m.reply(
                        `⚠️ *File besar terdeteksi!* \n\n` +
                        `Ukuran melampaui batas maksimal pengunduhan. ` +
                        `Gunakan link berikut untuk mengunduh secara manual:\n` +
                        `${res.download}`,
                        {
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
                        }
                    );
                }

                res.download = await getBuffer(res.download);

                if (!res.download) {
                    return await m.reply(
                        `❌ Maaf, proses gagal! ` +
                        `Coba pilih kualitas lain dan ulangi lagi.`
                    );
                }

                await theo.sendMedia(
                    m.chat,
                    res.download,
                    res.title,
                    m.quo,
                    {
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
                    }
                );
            }
        }
    }
};
export default theoFitur;