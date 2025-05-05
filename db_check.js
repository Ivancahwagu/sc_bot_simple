import { tanggal_now, int_tanggal_now } from './tools/func.js';
import { jadwal_sholat_kota } from './tools/scrape.js';
export default async function ({ theo }) {
    let new_hari = tanggal_now();
    if (!Object.keys(db[`jadwalSholat`]).includes(`hari`) || db[`jadwalSholat`]?.hari !== new_hari.getDay()) {
        db[`jadwalSholat`] = {
            hari: new_hari.getDay(),
            sholat: await jadwal_sholat_kota(`rembang`)

        };
        savedb();
    }
    if (db['jadwalSholat'].sholat) {
        const now = tanggal_now();
        const jam = now.getHours().toString().padStart(2, '0');
        const menit = now.getMinutes().toString().padStart(2, '0');
        const waktuNow = `${jam}:${menit}`;
        let list_gc = Object.keys(db.group);
        let list_sholat = Object.keys(db['jadwalSholat'].sholat);
        for (const waktu_sholat of list_sholat) {
            let db_sholat = db.jadwalSholat.sholat[waktu_sholat];
            if (!db_sholat.notif && db_sholat.waktu === waktuNow) {
                console.log(`Mengingatkan sholat ${waktu_sholat}`);
                db_sholat.notif = true;
                savedb();
                for (const id_gc of list_gc) {
                    let db_gc = db.group[id_gc];
                    if (!db_gc.banned || db_gc.sewa) {
                        let metadata;
                        if (theo.group[id_gc]) {
                            metadata = theo.group[id_gc];
                        } else {
                            metadata = await theo.groupMetadata(id_gc);
                            theo.group[id_gc] = metadata;
                        }
                        if (metadata) {
                            const hariJumat = waktu_sholat.toLowerCase() === 'dzuhur' && db['jadwalSholat'].hari === 5;
                            const pesan = `📢 *Panggilan Ilahi Telah Tiba*

🕌 *Sholat ${waktu_sholat.toUpperCase()}* — ${waktuNow}

${hariJumat ? `📿 *Hari Jumat Mubarak* — Bagi para pria Muslim, inilah waktu mulia untuk menunaikan *Sholat Jumat*. Jangan lewatkan keutamaannya.` : ''}

📌 Saatnya:
- Menghentikan urusan dunia,
- Menyambut panggilan Allah dengan hati yang khusyuk,
- Menyucikan diri dan menguatkan iman.

💡 *Mengapa Sholat Tepat Waktu Penting?*
- Menenangkan jiwa dari hiruk pikuk dunia,
- Menghapus dosa dan menyegarkan ruhani,
- Menguatkan hubunganmu dengan Sang Pencipta.

🤲 Semoga setiap langkah menuju masjid dicatat sebagai amal, dan setiap sujud menjadi penghapus dosa. *Aamiin.*`;
                            await delay(1000);
                            await theo.sendMessage(id_gc, {
                                text: pesan,
                                contextInfo: {
                                    externalAdReply: {
                                        title: "Panggilan Sholat",
                                        body: "Jangan tunda, sholatlah sebelum disholatkan.",
                                        thumbnailUrl: "https://i.ytimg.com/vi/lhXfp3O8y8A/maxresdefault.jpg",
                                        sourceUrl: "https://www.youtube.com/@theo_dev-id"
                                    }
                                }
                            });
                        }
                    }
                }
            }

            if (db_sholat.notif && parseInt(db_sholat.waktu.split(`:`).join("")) < parseInt(waktuNow.split(`:`).join(""))) {
                console.log(`Reset notif sholat ${waktu_sholat} di: ${waktuNow}`);
                db_sholat.notif = false;
                savedb();
            }
        }
    }
    Object.keys(db.user).forEach(async (users) => {
        let user = db.user[users];
        if (user.premium && typeof user.premium === "number" && user.premium !== "permanen" && user.premium < int_tanggal_now()) {
            user.premium = false;
            await theo.sendMessage(users, {
                text: `🔔 *Premium Expired*

Waktu akses premium kamu telah *berakhir* 😔

Jangan sedih! Kamu bisa mengaktifkannya kembali kapan saja untuk menikmati:
✨ Fitur eksklusif
🚀 Tanpa batasan
🎮 Akses penuh ke game dan tools bot

Hubungi owner sekarang untuk memperpanjang masa aktifmu 💼`

            });
            savedb();
        }
        if (user.limit < 5) {
            user.limit += 0.5;
            savedb();
        }
    });
    Object.keys(db.group).forEach(async (groups) => {
        let data_group = db.group[groups];
        if (data_group.sewa && typeof data_group.sewa === "number" && data_group.sewa !== "permanen" && data_group.sewa < int_tanggal_now()) {
            data_group.sewa = false;
            await theo.sendMessage(groups, {
                text: `📢 *Masa Sewa Bot Telah Habis*

Layanan bot untuk grup ini telah *berakhir* 🕓

Untuk tetap menggunakan fitur bot:
🛒 Segera hubungi owner
⚡ Perpanjang sewa & nikmati fitur penuh

🙏 Terima kasih atas dukungannya selama ini.`

            });
        }
    });
    Object.keys(db.game).forEach(async (tipeGame) => {
        switch (tipeGame) {
            case "tebak_bom": {
                Object.keys(db.game[tipeGame]).forEach(async (jid) => {
                    let game = db.game[tipeGame][jid]
                    if (!game) return
                    if (game.status === "playing") {
                        if (game.expired < int_tanggal_now()) {
                            await theo.sendText(jid, `⏰ *Game Berlangsung Terlalu Lama!*
            
🧑‍🤝‍🧑 Pemain yang masih aktif:
${game.player.map(a => `• @${a.split(`@`)[0]}`).join('\n')}

💀 Pemain yang sudah tereliminasi:
${game.eliminasi.length > 0 ? game.eliminasi.map(a => `• @${a.split(`@`)[0]}`).join('\n') : '• Tidak ada'}

🧹 *Game telah otomatis dihentikan karena melebihi batas waktu.*
Silakan mulai ulang game jika masih ingin bermain.`, null, {
                                contextInfo: {
                                    mentionedJid: [...game.eliminasi, ...game.player]
                                }
                            })
                            delete db.game.tebak_bom[jid]
                        }
                    }
                })

            }

                break
            case "ttt": {
                Object.keys(db.game[tipeGame]).forEach(async (jid) => {
                    let game = db.game[tipeGame][jid]
                    if (game.status == "playing") {
                        if (game.expired < int_tanggal_now()) {
                            await theo.sendText(jid, `⚠️ *PENGHAPUSAN DATA GAME*
Masih ada game yang sedang berlangsung sudah lebih dari 5 menit.
${game.player.map(
                                a => `@${a.id.split(`@`)[0]}`
                            ).join(' VS ')}
🔴 Data game anda akan dihapus`, null, {
                                contextInfo: {
                                    mentionedJid: game.player.map(a => a.id)
                                }
                            });
                            delete db.game[tipeGame][jid]
                        }
                    }
                })
            }
                break
            case "pertanyaan": {
                Object.keys(db.game[tipeGame]).forEach(async (jid) => {
                    let game = db.game[tipeGame][jid]
                    if (game.expired < int_tanggal_now()) {
                        await theo.sendText(jid, `⏱️ "*WAKTU HABIS*"
                            
Jawaban: *${game.jawaban}*`, game.pesan_soal)
                        delete db.game[tipeGame][jid]
                    }
                })
            }

        }

    })


    savedb();
}