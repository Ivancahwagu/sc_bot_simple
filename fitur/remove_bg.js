import { remove_bg } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !m.media?.type?.includes('image')) {
        return await m.reply(
            `❌ *Oops! Anda harus mengirim atau membalas gambar terlebih dahulu.* \n\n` +
            `Gunakan perintah: ${m.prefix}${m.command}`
        );
    }

    let buffer = await theo.download(m.media);
    let hasil = await remove_bg(buffer);

    await theo.sendMedia(
        m.chat,
        hasil,
        `✨ *Background gambar berhasil dihapus oleh ${namaBot}!*`,
        m.quo
    );
};

theoFitur.limit = true;
theoFitur.command = ["removebg", "rmbg"];
theoFitur.tags = "image";

export default theoFitur;