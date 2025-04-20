import { fbdl } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.res.includes(`https`) || !m.res.includes(`face`)) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} https://www.facebook.com/share/v/15wY98RZCc/`
        );
    }

    let hasil = await fbdl(m.res);
    let dl = hasil.media.map(a => ({ url: a.url, type: a.kualitas }));
    let no = 1;
    let { key } = await m.reply(
        `📥 *${namaBot} FACEBOOK DOWNLOADER* \n\n` +
        `${dl.map(a => `${no++}. ${a.type}`).join(`\n`)} \n\n` +
        `⚡ Balas pesan ini dengan nomor yang Anda inginkan.`
    );

    db.user[m.sender].download[key.id] = dl;
};

theoFitur.limit = true;
theoFitur.tags = "downloader";
theoFitur.command = ["facebook", "fb", "fbdl"];

export default theoFitur;