import fs from "fs";
import path from "path";
import { getRandom } from "../tools/func.js";

let theoFitur = async function ({ m, theo }) {
    if (db.game.pertanyaan[m.chat]) {
        await theo.sendText(m.chat, `⚠️ Masih ada soal yang belum dijawab kak!\n\nSilakan jawab dulu soal sebelumnya ya.`, { quoted: db.game.pertanyaan[m.chat].pesan_soal });
    } else {
        let soalPath = path.join(__dirname, "games", "tebakkata.json");
        let dataSoal = JSON.parse(fs.readFileSync(soalPath, "utf-8"));
        let soal = dataSoal[getRandom(dataSoal.length)];

        let pesan_soal = await m.reply(
            `🎯 *Tebak Kata!*

${soal.pertanyaan}

📌 *Catatan:*
- Jawaban bisa mengandung spasi
- Balas *help* untuk mendapatkan bantuan
- Balas *nyerah* untuk menyerah

Ketik jawabanmu sekarang!`
        );

        db.game.pertanyaan[m.chat] = {
            pertanyaan: soal.pertanyaan,
            jawaban: soal.jawaban,
            pesan_soal: pesan_soal,
        };
    }
};

theoFitur.tags = "game";
theoFitur.daftar = true;
theoFitur.group = true;
theoFitur.command = ["tebakkata"];

export default theoFitur;
