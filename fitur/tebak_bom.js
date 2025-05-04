import { int_tanggal_now } from "../tools/func.js";

let theoFitur = async function ({ m, theo }) {
    const kotakxkotak = 10;
    const totalKotak = kotakxkotak * kotakxkotak;
    let game = db.game.tebak_bom[m.chat];

    // Jika game belum dibuat
    if (!game) {
        const kotak = create_kotak(totalKotak);
        const bom = create_bom(kotakxkotak, totalKotak);

        game = {
            kotak,
            bom,
            player: [m.sender],
            eliminasi: [],
            owner: m.sender,
            status: "waiting",
            giliran: 1
        };
        db.game.tebak_bom[m.chat] = game;

        return await m.reply(`🎮 *Game Tebak Bom Telah Dibuat!*

🧠 Uji keberuntungan dan nyali kalian dalam permainan ini!
Untuk ikut bermain, cukup kirim:
➡️ *${m.prefix}${m.command}*

👤 @${m.sender.split(`@`)[0]} menunggu pemain lain untuk bergabung.
⚠️ Minimal 2 pemain dibutuhkan untuk memulai.

Jika sudah siap, kirim:
🚀 *${m.prefix}${m.command} start* untuk memulai permainannya!`, {
            contextInfo: { mentionedJid: [m.sender] }
        });
    }

    // Jika sudah ada game
    const isPlayer = game.player.includes(m.sender);
    const isGameStarted = game.status === "playing";

    if (isPlayer) {
        if (!m.res) {
            if (m.sender === game.owner && game.player.length > 1 && !isGameStarted) {
                return await m.reply(`✅ Kamu sudah bergabung dalam game ini sebagai pembuat game.

👥 Jumlah pemain: ${game.player.length}
🚀 Kamu bisa memulai permainan dengan mengirim:
*${m.prefix}${m.command} start*`);
            }

            return await m.reply(`✅ Kamu sudah bergabung dalam game ini.

👥 Jumlah pemain: ${game.player.length}
${isGameStarted
                    ? `🎮 Permainan sedang berlangsung, selamat bermain!`
                    : `🕐 Menunggu @${game.owner.split(`@`)[0]} untuk memulai permainan.`}`, {
                contextInfo: { mentionedJid: [game.owner] }
            });
        }
        const command = m.res.toLowerCase();
        if (command === "start" && m.sender === game.owner) {
            if (game.player.length < 2) {
                return await m.reply("⚠️ Minimal 2 pemain dibutuhkan untuk memulai permainan.");
            }
            if (isGameStarted) {
                return await m.reply("🚀 Permainan sudah dimulai!");
            }

            const { key: { id } } = await m.reply(`💥 *Game Dimulai! Hati-hati Membuka Kotak, Jangan Sampai Kena Bom!*

📦 Berikut adalah daftar kotak yang tersedia:
${game.kotak.map((v, i) => (i % kotakxkotak === kotakxkotak - 1 ? `${v}\n` : `${v}`)).join("")}

🎲 Giliran @${game.player[game.giliran - 1].split(`@`)[0]}
📩 *Balas pesan ini* dengan nomor kotak yang ingin kamu buka.
⌛ Jika kamu terlalu lama, pemain lain bisa ketik *eliminasi* untuk menyingkirkanmu.`, {
                contextInfo: {
                    mentionedJid: [game.player[game.giliran - 1]]
                }
            });


            game.status = "playing";
            game.id = id;
            game.expired = int_tanggal_now() + 15 * 60 * 1000;
            game.waktu_main = int_tanggal_now() + 60 * 1000;
            return;
        }

        return await m.reply(`⏳ Kamu sudah bergabung...
${isGameStarted ? `🎮 Permainan sedang berlangsung, selamat bermain!` : `🛎️ Tunggu @${game.owner.split(`@`)[0]} untuk memulai.`}`, {
            contextInfo: { mentionedJid: [game.owner] }
        });
    } else {
        if (isGameStarted) {
            return await m.reply(`🚫 *Ups, kamu terlambat!* 🚫

Permainan *sudah berjalan* dan tidak bisa dimasuki sekarang.

🕹️ Tunggu game selanjutnya ya, siapa tahu kamu jadi pemenangnya!`);
        }

        // Tambahkan pemain baru
        game.player.push(m.sender);
        return await m.reply(`🎉 *Berhasil Bergabung dalam Game Tebak Bom!*

👤 Pemain: ${game.player.length}
📦 Kotak: ${totalKotak} | 💣 Bom: ${kotakxkotak}

@${game.owner.split(`@`)[0]}, jumlah pemain sudah cukup untuk memulai.
Ketik *${m.prefix}${m.command} start* untuk memulai permainannya!`, {
            contextInfo: { mentionedJid: [game.owner] }
        });
    }

    // Tools
    function create_bom(jumlah_bom, jumlah_total) {
        const hasil = new Set();
        while (hasil.size < Math.min(jumlah_bom, jumlah_total)) {
            hasil.add(Math.floor(Math.random() * jumlah_total));
        }
        return [...hasil];
    }

    function create_kotak(jumlah) {
        return Array(jumlah).fill("📦");
    }
};

theoFitur.tags = "game";
theoFitur.group = true;
theoFitur.daftar = true;
theoFitur.command = ["tebakbom"];
export default theoFitur;
