import { spotify } from "../tools/scrape.js";

let theoFitur = async ({ m, theo }) => {
    if (!m.res.includes("spotify")) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} link track Spotify`
        );
    }

    let hasil = await spotify(m.res);

    await theo.sendMedia(
        m.chat,
        hasil.link,
        null,
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
                    thumbnailUrl: hasil.thumbnail,
                    mediaType: 1,
                    title: hasil.title,
                    body: hasil.artist,
                    renderLargerThumbnail: true,
                    sourceUrl: m.res
                }
            }
        }
    );
};

theoFitur.limit = true;
theoFitur.tags = "downloader";
theoFitur.command = ["spotify", "sp"];

export default theoFitur;