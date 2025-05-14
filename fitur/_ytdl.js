import { youtube } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (m.quoted) {
        if (m.prefix) return
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
                    kualitas.endsWith("p")) {

                    return await m.reply(
                        `⚠️ *File video terdeteksi!* \n\n` +
                        `Untuk mencegah overlaod.` +
                        `Gunakan link berikut untuk mengunduh secara manual:\n` +
                        `${res.download}`,
                        {
                            contextInfo: {
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



                await theo.sendMedia(
                    m.chat,
                    res.download,
                    res.title,
                    m.quo,
                    {
                        contextInfo: {
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
                ).catch(async error => {
                    console.log(error)
                    return await m.reply(
                        `❌ Maaf, proses gagal! ` +
                        `Coba ulangi lagi.`
                    );
                })

            }
        }
    }
};
export default theoFitur;