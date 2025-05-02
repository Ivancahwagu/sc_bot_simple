import { spotify } from "../tools/scrape.js";

let theoFitur = async ({ m, theo }) => {
    if (!/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/.test(m.res)) {
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
                    serverMessageId: null,
                    newsletterName: '⫷_____😸 ' + namaBot + ' 😸_____⫸'
                },
                externalAdReply: {
                    thumbnail: await getBuffer(hasil.thumbnail),
                    thumbnailUrl: hasil.link,
                    mediaType: 1,
                    title: hasil.title,
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