import { toImage } from './../tools/file.js';

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !/sticker/.test(m.media.type)) {
        return await m.reply(
            `❌ *Oops! Anda harus membalas stiker terlebih dahulu.* \n\n` +
            `Gunakan perintah: ${m.prefix}${m.command}`
        );
    }

    let buffer = await theo.download(m.media);
    let image = await toImage(buffer);

    await theo.sendMedia(
        m.chat,
        image,
        `✨ *Konversi stiker ke gambar berhasil!*`,
        m.quo
    );
};

theoFitur.tags = "convert";
theoFitur.command = ["toimg"];

export default theoFitur;