import fs from "fs";
import path from "path";
import { getRandom, int_tanggal_now } from "../tools/func.js";

let theoFitur = async function ({ m, theo }) {
    if (db.game.pertanyaan[m.chat]) {
        await theo.sendText(m.chat, `⚠️ Masih ada soal yang belum dijawab kak!\n\nSilakan jawab dulu soal sebelumnya ya.`, { quoted: db.game.pertanyaan[m.chat].pesan_soal });
    } else {
        let soalPath = path.join(__dirname, "games", "tebakbendera.json");
        let dataSoal = JSON.parse(fs.readFileSync(soalPath, "utf-8"));
        let soal = dataSoal[getRandom(dataSoal.length)];

        let pesan_soal = await theo.sendMedia(m.chat, soal.img,
            `⏱️ Waktu: 1 menit

📌 *Catatan:*
- Jawaban bisa mengandung spasi
- Balas *help* untuk mendapatkan bantuan
- Balas *nyerah* untuk menyerah

Ketik jawabanmu sekarang!`, m.quo);
        db.game.pertanyaan[m.chat] = {
            jawaban: soal.jawaban,
            pesan_soal: pesan_soal,
            expired: int_tanggal_now() + 60 * 1000
        };
    }
};

theoFitur.tags = "game";
theoFitur.daftar = true;
theoFitur.group = true;
theoFitur.command = ["tebakbendera"];

export default theoFitur;
