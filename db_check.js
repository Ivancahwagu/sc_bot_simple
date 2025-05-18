import { tanggal_now, int_tanggal_now } from './tools/func.js';
import { jadwal_sholat_kota } from './tools/scrape.js';
export default async function ({ theo }) {
    let new_hari = tanggal_now();
    if (!Object.keys(db[`jadwalSholat`]).includes(`hari`) || db[`jadwalSholat`]?.hari !== new_hari.getDay()) {
        db[`jadwalSholat`] = {
            hari: new_hari.getDay(),
            sholat: await jadwal_sholat_kota(global.kota)

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
            let sholat = db['jadwalSholat'].sholat[waktu_sholat]
            if (sholat.waktu === waktuNow) {
                if (!sholat.notif) {
                    db['jadwalSholat'].sholat[waktu_sholat].notif = true
                    Object.keys(db.user).forEach(async (users) => {
                        let user = db.user[users];
                        if (user.limit < 20) {
                            user.limit += 4;
                        }
                    })
                    savedb()
                    for (const id_group of list_gc) {
                        try {
                            let metadata;
                            if (theo.group[id_group]) {
                                metadata = theo.group[id_group];
                            } else {
                                metadata = await theo.groupMetadata(id_group);
                                theo.group[id_group] = metadata;
                            }
                            if (metadata) {
                                if (db.group[id_group].sewa || !db.group[id_group].banned) {
                                    console.log(`ingatkan notif sholat ${waktu_sholat} di: ${waktuNow}`);
                                    const hariJumat = waktu_sholat.toLowerCase() === 'dzuhur' && db['jadwalSholat'].hari === 5;
                                    const pesan = `🔔 *Pengingat Sholat*

Pesan ini ditujukan untuk member grup 
*${theo.group[id_group].subject}* 
yang beragama *Islam*.
🕌 *Waktunya Sholat ${waktu_sholat.toUpperCase()}* — ${waktuNow}
${hariJumat ? `📿 Bagi para pria Muslim, inilah waktu mulia untuk menunaikan *Sholat Jumat*. Jangan lewatkan keutamaannya.\n` : ''}⏳ Tinggalkan sejenak aktivitasmu, mari tunaikan kewajiban ini.
📿 *Sholatlah sebelum engkau disholatkan.*
🤲 Semoga Allah menerima ibadahmu hari ini. *Aamiin.*`;
                                    await delay(1000);
                                    await theo.sendText(id_group, pesan, null, {
                                        contextInfo: {
                                            externalAdReply: {
                                                title: "Panggilan Sholat",
                                                body: "Jangan tunda, sholatlah sebelum disholatkan.",
                                                thumbnailUrl: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/69/2024/03/13/IMG_20240313_202025-4271336681.jpg",
                                                sourceUrl: "https://www.youtube.com/@theo_dev-id"
                                            }
                                        }
                                    });
                                }
                            }
                        } catch (e) {
                            console.log(`error di ${id_group}`)
                        }
                    }
                }
            } else {
                if (sholat.notif && parseInt(sholat.waktu.split(`:`).join("")) < parseInt(waktuNow.split(`:`).join(""))) {
                    console.log(`Reset notif sholat ${waktu_sholat} di: ${waktuNow}`);
                    db['jadwalSholat'].sholat[waktu_sholat].notif = false;
                    savedb();
                }
            }
        }
    }
    Object.keys(db.user).forEach(async (users) => {
        let user = db.user[users];
        user.limit = parseInt(user.limit)
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
    let Ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
    if (Ram > maxUseRam) {
        for (const i of global.owner) {
            theo.sendText(i + "@s.whatsapp.net", `Ram sudah terpkaai lebih dari ${maxUseRam}MB
                
Memulai ulang bot otomatis`)
            await delay(1000)
        }
        process.send("restart")
    }
}