import { jadwal_sholat_kota, list_kota } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`❌ *Format salah!*

Gunakan format:
${m.prefix}${m.command} <nama kota>

Contoh:
${m.prefix}${m.command} rembang`);

    try {
        let nama_kota = m.res.toLowerCase();
        if (!theo.list_kota.includes(nama_kota)) return await m.reply(`⚠️ *Kota tidak ditemukan!*

Pastikan penulisan nama kota benar.

📍 *Contoh kota yang tersedia:*
${theo.list_kota.join(`\n`)}`);
        let jadwal = await jadwal_sholat_kota(nama_kota);

        let teks = `🕌 *JADWAL SHOLAT - ${m.res.toUpperCase()}*\n\n` +
            Object.entries(jadwal).map(([sholat, data]) => `• ${sholat.charAt(0).toUpperCase() + sholat.slice(1)}: *${data.waktu}*`).join("\n");

        await m.reply(teks);

    } catch (e) {
        await m.reply(`⚠️ *Kota tidak ditemukan!*

Pastikan penulisan nama kota benar.

📍 *Contoh kota yang tersedia:*
${theo.list_kota.join(`\n`)}`);
    }
};

theoFitur.command = ["jadwalsholat"];
theoFitur.tags = "islami";
export default theoFitur;
