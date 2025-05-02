import { igdl } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    let no = 1;

    if (!m.res.includes(`https`) || !m.res.includes(`insta`)) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} https://www.instagram.com/reel/DHKaSQOTWls/?igsh=c3FtNndhMmgyODls`
        );
    }

    let hasil = await igdl(m.res);
    if (hasil.length == 0) return await m.reply(`❌ *Media tidak ditemukan*`)
    let no_dl = 1;

    hasil = hasil.map(a => ({ url: a.url, type: `File ${no_dl++}` }));

    if (hasil.length === 1) {
        return await theo.sendMedia(
            m.chat,
            hasil[0].url,
            `✨ *Berhasil mengunduh media Instagram!*
        
🌐 title: ${hasil[0].title}`,
            m.quo
        );
    }

    let { key } = await m.reply(
        `📥 *${namaBot} INSTAGRAM DOWNLOADER* \n` +
        `🌐 title: ${hasil[0].title}\n\n` +
        `${hasil.map(a => `${no++}. ${a.type}`).join('\n')} \n\n` +
        `⚡ Balas pesan ini dengan nomor media yang Anda inginkan.`
    );

    db.user[m.sender].download[key.id] = hasil;
};

theoFitur.limit = true;
theoFitur.tags = "downloader";
theoFitur.command = ["instagram", "ig", "igdl"];

export default theoFitur;