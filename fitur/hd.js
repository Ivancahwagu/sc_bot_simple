import { image_hd } from "../tools/scrape.js";
import Jimp from 'jimp';

let theoFitur = async function ({ m, theo }) {
    if (!m.media?.type.includes('image')) {
        return await m.reply(
            `❌ *Oops! Anda harus mengirim atau membalas gambar terlebih dahulu.* \n\n` +
            `Gunakan perintah: ${m.prefix}${m.command}`
        );
    }

    let buffer = await theo.download(m.media);
    let size = {
        width: (await Jimp.read(buffer)).bitmap.width,
        height: (await Jimp.read(buffer)).bitmap.height
    };

    if (size.width > 2000 || size.height > 2000) {
        return await m.reply(
            `⚠️ *Ukuran gambar terlalu besar!* \n` +
            `Pastikan panjang atau lebar gambar tidak lebih dari 2000 piksel.`
        );
    }

    let hasil = await image_hd(buffer);
    await theo.sendMedia(
        m.chat,
        hasil,
        `✨ *Gambar Anda telah diperjelas oleh ${namaBot}.*`,
        m.quo
    );
};

theoFitur.limit = true;
theoFitur.command = ["hd"];
theoFitur.tags = "image";

export default theoFitur;