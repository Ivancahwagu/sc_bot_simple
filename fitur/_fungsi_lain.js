import { number_to_international, int_tanggal_now } from "../tools/func.js";

export default async function theoFitur({ m, theo }) {
    if (!db.user[m.sender]) return
    if (db.user[m.sender].afk && !(m.quoted && !m.quoted.bot)) {
        await m.reply(`🟢 @${m.sender.split('@')[0]}, kamu sudah tidak AFK lagi!

📢 Sistem mendeteksi aktivitasmu.`, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        });
        db.user[m.sender].afk = false
    }

    let afkList = Object.keys(db.user)
        .filter(a => db.user[a].afk)
        .filter(b => b.includes(m.quoted?.sender) || m.text.includes(b.split('@')[0]));

    if (afkList.length > 0) {
        let teks = `🚫 *Jangan ganggu mereka yang sedang AFK!*\n\n` +
            afkList.map((a, i) =>
                `*${i + 1}. ${number_to_international(a.split('@')[0])}*\n` +
                `📌 *Alasan:* _${db.user[a].afk}_\n`
            ).join('\n');

        await m.reply(teks.trim());
    }

    if (!m.prefix) {
        if (m.group) {
            //TICTACTOE
            if (db.game.ttt[m.chat]) {
                const ttt_game = db.game.ttt[m.chat];

                function papan(entries) {
                    let board = '';
                    for (let i = 0; i < entries.length; i++) {
                        board += entries[i] + (i % 3 === 2 ? '\n' : ' ');
                    }
                    return board.trim();
                }

                function cekWin(papan, icon) {
                    let win = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [1, 5, 9],
                        [3, 5, 7],
                        [1, 4, 7],
                        [2, 5, 8],
                        [3, 6, 9]
                    ].filter(a => papan[a[0] - 1] == icon && papan[a[1] - 1] == icon && papan[a[2] - 1] == icon)
                    // console.log(win)
                    if (win.length >= 1) {
                        return true
                    } else {
                        return false
                    }
                }

                if (ttt_game.status === "playing") {
                    const player = ttt_game.player.find(p => p.id === m.sender);
                    if (player && m.quoted.id == ttt_game.id && m.text) {
                        if (ttt_game.giliran === m.sender) {
                            const nomor = parseInt(m.text);
                            if (m.text.toLowerCase() == "nyerah") {
                                const lawan = ttt_game.player.find(p => p.id !== m.sender).id;
                                await m.reply(`🎉 *Game Selesai!*

${papan(ttt_game.papan)}

🏆 *Pemenang:* @${lawan.split('@')[0]}
+1 Limit!

😭 *Kalah:* @${m.sender.split('@')[0]}
-1 Limit!`, {
                                    contextInfo: {
                                        mentionedJid: [m.sender, lawan]
                                    }
                                })
                                db.user[m.sender].limit -= 1;
                                db.user[lawan].limit += 1;
                                return delete db.game.ttt[m.chat];
                            }

                            if (isNaN(nomor) || nomor < 1 || nomor > 9) {
                                return await m.reply(`⚠️ *Masukkan angka 1-9 sesuai posisi di papan!*`);
                            }

                            const pilih = ttt_game.papan[nomor - 1];
                            if (pilih === "✖️" || pilih === "⭕") {
                                return await m.reply(`⚠️ *Posisi nomor ${nomor} sudah diambil!*`);
                            }

                            let menang = false;

                            if (ttt_game.giliran === ttt_game.player[0].id) {
                                ttt_game.papan[nomor - 1] = ttt_game.player[0].icon;
                                menang = cekWin(ttt_game.papan, ttt_game.player[0].icon);
                                ttt_game.giliran = ttt_game.player[1].id;
                            } else {
                                ttt_game.papan[nomor - 1] = ttt_game.player[1].icon;
                                menang = cekWin(ttt_game.papan, ttt_game.player[1].icon);
                                ttt_game.giliran = ttt_game.player[0].id;
                            }

                            let papan_kosong = ttt_game.papan.filter(a => a !== ttt_game.player[0].icon && a !== ttt_game.player[1].icon).length;

                            if (menang) {
                                const lawan = ttt_game.player.find(p => p.id !== m.sender).id;
                                await m.reply(`🎉 *Game Selesai!*

${papan(ttt_game.papan)}

🏆 *Pemenang:* @${m.sender.split('@')[0]}
+1 Limit!

😭 *Kalah:* @${lawan.split('@')[0]}
-1 Limit!`, {
                                    contextInfo: {
                                        mentionedJid: [m.sender, lawan]
                                    }
                                });
                                db.user[m.sender].limit += 1;
                                db.user[lawan].limit -= 1;
                                delete db.game.ttt[m.chat];

                            } else if (papan_kosong === 0) {
                                const lawan = ttt_game.player.find(p => p.id !== m.sender).id;
                                await m.reply(`*Game Selesai!*

${papan(ttt_game.papan)}

🤝 *Seri!*
@${m.sender.split('@')[0]} 🤝 @${lawan.split('@')[0]}`, {
                                    contextInfo: {
                                        mentionedJid: [m.sender, lawan]
                                    }
                                });
                                delete db.game.ttt[m.chat];

                            } else {
                                let { key } = await m.reply(`🎮 *Papan Sekarang:*

${papan(ttt_game.papan)}

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
                            }
                        } else {
                            return await m.reply(`⏳ *Sabar! Bukan giliran kamu.*

Giliran @${ttt_game.giliran.split('@')[0]}`, {
                                contextInfo: {
                                    mentionedJid: [ttt_game.giliran]
                                }
                            });
                        }
                    }
                }
            }
            //PERTANYAAN
            if (db.game.pertanyaan[m.chat]) {
                const pertanyaan_gc = db.game.pertanyaan[m.chat];
                if (m.quoted.id == pertanyaan_gc.pesan_soal.key.id) {
                    const jawaban = m.text.toLowerCase();
                    if (jawaban === "nyerah") {
                        await m.reply(`🚪 *Game Berakhir!*\n\nKamu menyerah.\nJawaban: *${pertanyaan_gc.jawaban}*`);
                        delete db.game.pertanyaan[m.chat];
                    } else if (jawaban === "help") {
                        function buatPetunjuk(text) {
                            let hasil = []
                            let pisah = text.split(` `)
                            for (const kata of pisah) {
                                let jumlah_kosong = kata.length - 2
                                let awal = kata.substring(0, 1)
                                let akhir = kata.substring(kata.length - 1, kata.length)
                                let hasil_akhir = ``
                                hasil_akhir += awal
                                for (let i = 0; i < jumlah_kosong; i++) {
                                    hasil_akhir += `_`
                                }
                                hasil_akhir += akhir
                                hasil.push(hasil_akhir)
                            }
                            return hasil.join(` `);
                        }
                        const petunjuk = buatPetunjuk(pertanyaan_gc.jawaban);
                        await m.reply(`💡 *Petunjuk Jawaban:*\n\n${petunjuk}\n\nSemangat yaa!\n\n📢 *Catatan:* Balas pesan *soal*, bukan pesan ini.`);
                    } else if (jawaban === pertanyaan_gc.jawaban) {
                        delete db.game.pertanyaan[m.chat];
                        await m.reply(`🏆 *Game Berakhir!*\n\nSelamat @${m.sender.split('@')[0]}, jawabanmu benar!\n\n🎁 Limit +1`, {
                            contextInfo: { mentionedJid: [m.sender] }
                        });
                        db.user[m.sender].limit += 1;
                    } else {
                        await m.reply(`❌ *Jawaban salah!*\n\nKalau kesulitan, balas pesan soal dengan *help* untuk petunjuk.`, {
                            contextInfo: { mentionedJid: [m.sender] }
                        });
                    }
                }
            }
            //TEBAKBOM
            if (db.game.kotak_rahasia[m.chat]) {
                let game = db.game.kotak_rahasia[m.chat]

                if (game.status === "playing") {
                    let isPemain = game.player.includes(m.sender)
                    let isGiliran = game.player[game.giliran - 1] === m.sender
                    let isEliminasi = game.eliminasi.includes(m.sender)
                    let nomor = parseInt(m.text)

                    // Respon "eliminasi" jika pemain terlalu lama
                    if (isPemain && m.quoted && m.quoted.id === game.id && m.text.toLowerCase() === "eliminasi") {
                        if (game.waktu_main < int_tanggal_now()) {
                            let target = game.player[game.giliran - 1]
                            game.player = game.player.filter(p => p !== target)
                            game.eliminasi.push(target)

                            await m.reply(`⏱️ *Terlalu lama menjawab!*\n\n😵 @${target.split('@')[0]} telah *tereliminasi* dari permainan karena tidak memilih kotak tepat waktu.`, {
                                contextInfo: { mentionedJid: [target] }
                            })

                            // Reset giliran
                            if (game.giliran > game.player.length || game.giliran < 1) game.giliran = 1
                            game.waktu_main = int_tanggal_now() + 60 * 1000

                            // Akhiri jika 1 pemain tersisa
                            if (game.player.length === 1) return await akhiriGame(m, game)

                            return await lanjutkanGiliran(m, game)
                        } else {
                            return await m.reply(`❌ *Belum bisa mengeliminasi!*\n\nSaat ini masih giliran: @${game.player[game.giliran - 1].split('@')[0]}\n⏱️ Tapi waktunya belum habis.\n\nTunggu hingga batas waktu habis sebelum kamu bisa mengeliminasi.`, {
                                contextInfo: { mentionedJid: [game.player[game.giliran - 1]] }
                            })
                        }
                    } else
                        if (isPemain && m.quoted && m.quoted.id === game.id) {
                            // Cek validasi pengirim dan giliran
                            if (isEliminasi) return await m.reply(`☠️ *Kamu sudah tereliminasi dari permainan ini!*`)
                            if (!isPemain) return
                            if (!isGiliran) {
                                return await m.reply(`⏳ *Bukan giliranmu!*\n\n🎲 Sekarang giliran:\n@${game.player[game.giliran - 1].split('@')[0]}`, {
                                    contextInfo: { mentionedJid: [game.player[game.giliran - 1]] }
                                })
                            }

                            // Validasi input nomor
                            if (isNaN(nomor) || nomor < 1 || nomor > game.kotak.length)
                                return await m.reply(`⚠️ *Masukkan angka kotak yang valid (1-${game.kotak.length})!*`)

                            if (game.kotak[nomor - 1] !== "📦")
                                return await m.reply(`❌ *Kotak nomor ${nomor} sudah dibuka sebelumnya!*\n\n🔁 Silakan pilih kotak lain yang masih tertutup.`)

                            let pesan = `🎯 *@${m.sender.split('@')[0]}* dengan penuh keberanian memilih kotak nomor *${nomor}*...\n\n`
                            let isiKotak = "✅ Kotak ini *aman*! Kamu selamat"

                            if (game.bom.includes(nomor)) {
                                game.kotak[nomor - 1] = "💣"
                                game.player = game.player.filter(p => p !== m.sender)
                                game.eliminasi.push(m.sender)
                                isiKotak = "💥 *BOOM!* Kamu membuka kotak yang berisi bom!\n😵 Sayang sekali, kamu *tereliminasi* dari permainan!"
                            } else {
                                game.kotak[nomor - 1] = "✅"
                                game.giliran++
                                if (game.giliran > game.player.length || game.giliran < 1) game.giliran = 1
                                game.waktu_main = int_tanggal_now() + 60 * 1000
                            }


                            // Cek apakah sudah selesai
                            if (game.player.length === 1) return await akhiriGame(m, game)

                            let tampilKotak = game.kotak.map((v, i) => (i % Math.sqrt(game.kotak.length) === Math.sqrt(game.kotak.length) - 1 ? `${v}\n` : `${v}`)).join('')
                            let giliran = game.player[game.giliran - 1]

                            let { key: { id } } = await m.reply(`${pesan}${isiKotak}

${tampilKotak}

🎲 *Giliran Selanjutnya:* @${giliran.split('@')[0]}
💡 *Tips:* Pilih dengan hati-hati... satu kesalahan bisa fatal!
📩 Balas pesan ini dengan nomor kotak yang ingin kamu buka.
⌛ Jika kamu terlalu lama, pemain lain bisa membalas dengan *eliminasi* untuk menyingkirkanmu.`, {
                                contextInfo: { mentionedJid: [m.sender, giliran] }
                            })

                            game.id = id
                        }
                }
            }

            // ⏹️ Fungsi bantu akhiri game
            async function akhiriGame(m, game) {
                let pemenang = game.player[0]
                let kotak = game.kotak
                db.user[pemenang].limit += 15
                game.eliminasi.forEach(player => db.user[player].limit -= 5)
                delete db.game.kotak_rahasia[m.chat]

                return await m.reply(`🏁 *Permainan Telah Usai!*

${kotak.map((v, i) => (i % Math.sqrt(kotak.length) === Math.sqrt(kotak.length) - 1 ? `${v}\n` : `${v}`)).join('')}

👑 *Pemenang Terakhir yang Bertahan:* @${pemenang.split('@')[0]}
🎁 *Hadiah:* +15 Limit

💀 *Yang Gugur:* -5 Limit

🔥 Terima kasih sudah bermain dalam game ini.
Sampai jumpa di ronde berikutnya!`, {
                    contextInfo: { mentionedJid: [pemenang, ...game.eliminasi] }
                })

            }

            // 🔁 Fungsi bantu lanjutkan giliran
            async function lanjutkanGiliran(m, game) {
                let tampilKotak = game.kotak.map((v, i) => (i % Math.sqrt(game.kotak.length) === Math.sqrt(game.kotak.length) - 1 ? `${v}\n` : `${v}`)).join('')
                let giliran = game.player[game.giliran - 1]

                let { key: { id } } = await m.reply(`🎲 *Giliran Baru Dimulai!*

@${giliran.split('@')[0]}, sekarang giliranmu untuk memilih kotak.

${tampilKotak}

📩 Balas pesan ini dengan nomor kotak yang ingin kamu buka.
⌛ Jika kamu terlalu lama, pemain lain bisa membalas dengan *eliminasi* untuk menyingkirkanmu.`, {
                    contextInfo: { mentionedJid: [giliran] }
                })

                game.id = id
            }


        }

    }
}
