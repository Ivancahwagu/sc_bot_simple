import { gantiBg } from '../tools/image.js';

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !m.media?.type.includes('image')) {
        return await m.reply(
            `🖼️ *Gambar Diperlukan!*\n\n` +
            `Silakan *kirim* atau *balas* gambar terlebih dahulu.\n\n` +
            `Contoh penggunaan:\n${m.prefix}${m.command} merah`
        );
    }

    if (!m.res) {
        return await m.reply(
            `🎨 *Warna Belum Ditentukan!*\n\n` +
            `Masukkan nama warna untuk mengganti latar belakang.\n` +
            `Contoh: ${m.prefix}${m.command} biru`
        );
    }

    if (!global.color[m.res]) {
        return await m.reply(
            `🚫 *Warna "${m.res}" tidak tersedia!*\n\n` +
            `Silakan pilih warna dari daftar yang tersedia.\n` +
            `Contoh: ${Object.keys(global.color).slice(0, 10).join(', ')}...`
        );
    }

    let buffer = await theo.download(m.media);

    let hasil;
    try {
        hasil = await gantiBg(buffer, global.color[m.res]);
    } catch (err) {
        console.error(err);
        return await m.reply(`❌ Gagal memproses gambar. Coba lagi nanti.`);
    }

    await theo.sendMedia(
        m.chat,
        hasil,
        `✅ *Latar gambar berhasil diganti menjadi warna ${m.res}.*\n` +
        `✨ Diproses dengan keajaiban teknologi oleh *${namaBot}*!`,
        m.quo
    );
};

theoFitur.limit = true;
theoFitur.command = ["gantibg"];
theoFitur.tags = "image";

export default theoFitur;
