import { int_tanggal_now } from "../tools/func.js";

let theoFitur = async function ({ m }) {
    const id = m.chat;
    if (!db.game.ttt[id]) {
        db.game.ttt[id] = {
            papan: [`1️⃣`, '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
            status: 'waiting',
            player: [{ id: m.sender, icon: '⭕' }],
            giliran: m.sender
        };
        await m.reply(`🎮 *TicTacToe Game Dibuat!*

Menunggu lawan untuk bergabung...

Ketik *${m.prefix + m.command}* untuk bergabung ke game ini!`);
    } else {
        let ttt_game = db.game.ttt[id];

        if (ttt_game.player.find(p => p.id === m.sender)) {
            let lawan = ttt_game.player.find(a => a.id !== m.sender);
            if (ttt_game.status === 'waiting') {
                return await m.reply(`⏳ *Tunggu yaa...*
Belum ada lawan yang bergabung.`);
            }
            if (ttt_game.status === 'playing') {
                return await m.reply(`🎮 *Kamu sedang bermain melawan* @${lawan.id?.split('@')[0]}`, {
                    contextInfo: {
                        mentionedJid: [lawan.id]
                    }
                });
            }
        } else if (ttt_game.player.length === 2) {
            if (int_tanggal_now() < ttt_game.expired) {
                return await m.reply(`⚡ *Antre dulu ya kak...*
Masih ada game yang sedang berlangsung.

${ttt_game.player.map(
                    a => `@${a.id.split(`@`)[0]}`
                ).join(' VS ')}`, {
                    contextInfo: {
                        mentionedJid: ttt_game.player.map(a => a.id)
                    }
                });
            }
        }

        if (ttt_game.status === 'waiting') {
            ttt_game.status = 'playing';
            ttt_game.player.push({ id: m.sender, icon: '✖️' });
            let { key } = await m.reply(`🎯 *Game Dimulai!*
                
${formatPapan(ttt_game.papan)}
                
@${ttt_game.player[0].id.split(`@`)[0]}: ${ttt_game.player[0].icon}
@${ttt_game.player[1].id.split(`@`)[0]}: ${ttt_game.player[1].icon}

🔄 *Giliran:* @${ttt_game.giliran.split('@')[0]}

📨 Balas pesan ini dengan *nomor* yang kamu pilih untuk melanjutkan permainan
⚠️ Balas *nyerah* untuk menyerah`, {
                contextInfo: {
                    mentionedJid: ttt_game.player.map(a => a.id)
                }
            });
            ttt_game.id = key.id
            ttt_game.expired = int_tanggal_now() + 5 * 60 * 1000
        }
    }
};

function formatPapan(papan) {
    return papan.map((v, i) => (i % 3 === 2 ? v + '\n' : v + ' ')).join('').trim();
}

theoFitur.tags = "game";
theoFitur.daftar = true;
theoFitur.group = true;
theoFitur.command = ["tictactoe", "ttt"];

export default theoFitur;
