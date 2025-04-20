import theoBot, { useMultiFileAuthState, jidNormalizedUser, fetchLatestBaileysVersion, delay, Browsers } from "baileys"
import Pino from "pino"
import "./setting.js"
import fs from "fs"
import { int_tanggal_now, tanggal_now } from "./tools/func.js"
import { jadwal_sholat, list_kota } from "./tools/scrape.js"
import path from "path"
console.log(`\n📂  Menjalankan bot di direktori: ${__dirname}`)
console.log(`🚀  Mengaktifkan *${namaBot}*...`)
console.log(`🧠  Menjalankan sistem bot...\n`)

export async function theoRun() {
    console.log(`\n📊  ════ INFORMASI BOT ════
📱 Nomor bot   : ${nomorBot}
👤 Nomor owner : ${owner.join(', ')}
`)

    if (!db[`user`]) {
        await delay(300)
        console.log(`⚠️  Database user belum ditemukan`)
        await delay(300)
        console.log(`📦  Membuat database user...`)
        db[`user`] = {}
        await delay(300)
        console.log(`✅  Database user berhasil dibuat`)
    }

    if (!db[`group`]) {
        await delay(300)
        console.log(`⚠️  Database group belum ditemukan`)
        await delay(300)
        console.log(`📦  Membuat database group...`)
        db[`group`] = {}
        await delay(300)
        console.log(`✅  Database group berhasil dibuat`)
    }

    let tanggal = tanggal_now()
    if (!db['jadwalSholat']) {
        db[`jadwalSholat`] = {
            hari: tanggal.getDay(),
            sholat: await jadwal_sholat()
        }
    }
    if (!Object.keys(db[`jadwalSholat`]).includes(`hari`) || db[`jadwalSholat`]?.hari !== tanggal.getDay()) {
        db[`jadwalSholat`] = {
            hari: tanggal.getDay(),
            sholat: await jadwal_sholat()
        }
    }
    savedb()
    await delay(300)
    console.log(`💾  Database berhasil dimuat dari file\n`)

    const { version, isLatest } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(sesiPath)

    console.log(`📦  Versi Baileys: ${version}
🔍Versi terbaru: ${isLatest ? '✅ Iya' : '❌ Tidak'}\n`)

    const theo = await theoBot.default({
        markOnlineOnConnect: false,
        version,
        browser: Browsers.ubuntu('Chrome'),
        auth: state,
        printQRInTerminal: false,
        logger: Pino({ level: 'silent' })
    })

    theo.group = {}
    theo.name = {}
    theo.menu = {}
    theo.use_surah = {}
    theo.list_surah = [
        {
            "surah": "Al-Fatihah",
            "page": "al-fatihah"
        },
        {
            "surah": "Al-Baqarah",
            "page": "al-baqarah"
        },
        {
            "surah": "Ali 'Imran",
            "page": "ali-imran"
        },
        {
            "surah": "An-Nisa'",
            "page": "an-nisa"
        },
        {
            "surah": "Al-Ma'idah",
            "page": "al-maidah"
        },
        {
            "surah": "Al-An'am",
            "page": "al-anam"
        },
        {
            "surah": "Al-A'raf",
            "page": "al-araf"
        },
        {
            "surah": "Al-Anfal",
            "page": "al-anfal"
        },
        {
            "surah": "At-Taubah",
            "page": "at-taubah"
        },
        {
            "surah": "Yunus",
            "page": "yunus"
        },
        {
            "surah": "Hud",
            "page": "hud"
        },
        {
            "surah": "Yusuf",
            "page": "yusuf"
        },
        {
            "surah": "Ar-Ra'd",
            "page": "ar-rad"
        },
        {
            "surah": "Ibrahim",
            "page": "ibrahim"
        },
        {
            "surah": "Al-Hijr",
            "page": "al-hijr"
        },
        {
            "surah": "An-Nahl",
            "page": "an-nahl"
        },
        {
            "surah": "Al-Isra'",
            "page": "al-isra"
        },
        {
            "surah": "Al-Kahf",
            "page": "al-kahf"
        },
        {
            "surah": "Maryam",
            "page": "maryam"
        },
        {
            "surah": "Thaha",
            "page": "thaha"
        },
        {
            "surah": "Al-Anbiya'",
            "page": "al-anbiya"
        },
        {
            "surah": "Al-Hajj",
            "page": "al-hajj"
        },
        {
            "surah": "Al-Mu'minun",
            "page": "al-muminun"
        },
        {
            "surah": "An-Nur",
            "page": "an-nur"
        },
        {
            "surah": "Al-Furqan",
            "page": "al-furqan"
        },
        {
            "surah": "Asy-Syu'ara'",
            "page": "asy-syuara"
        },
        {
            "surah": "An-Naml",
            "page": "an-naml"
        },
        {
            "surah": "Al-Qashash",
            "page": "al-qashash"
        },
        {
            "surah": "Al-'Ankabut",
            "page": "al-ankabut"
        },
        {
            "surah": "Ar-Rum",
            "page": "ar-rum"
        },
        {
            "surah": "Luqman",
            "page": "luqman"
        },
        {
            "surah": "As-Sajdah",
            "page": "as-sajdah"
        },
        {
            "surah": "Al-Ahzab",
            "page": "al-ahzab"
        },
        {
            "surah": "Saba'",
            "page": "saba"
        },
        {
            "surah": "Fathir",
            "page": "fathir"
        },
        {
            "surah": "Yasin",
            "page": "yasin"
        },
        {
            "surah": "Ash-Shaffat",
            "page": "ash-shaffat"
        },
        {
            "surah": "Shad",
            "page": "shad"
        },
        {
            "surah": "Az-Zumar",
            "page": "az-zumar"
        },
        {
            "surah": "Ghafir",
            "page": "ghafir"
        },
        {
            "surah": "Fushshilat",
            "page": "fushshilat"
        },
        {
            "surah": "Asy-Syura",
            "page": "asy-syura"
        },
        {
            "surah": "Az-Zukhruf",
            "page": "az-zukhruf"
        },
        {
            "surah": "Ad-Dukhan",
            "page": "ad-dukhan"
        },
        {
            "surah": "Al-Jatsiyah",
            "page": "al-jatsiyah"
        },
        {
            "surah": "Al-Ahqaf",
            "page": "al-ahqaf"
        },
        {
            "surah": "Muhammad",
            "page": "muhammad"
        },
        {
            "surah": "Al-Fath",
            "page": "al-fath"
        },
        {
            "surah": "Al-Hujurat",
            "page": "al-hujurat"
        },
        {
            "surah": "Qaf",
            "page": "qaf"
        },
        {
            "surah": "Adz-Dzariyat",
            "page": "adz-dzariyat"
        },
        {
            "surah": "At-Thur",
            "page": "at-thur"
        },
        {
            "surah": "An-Najm",
            "page": "an-najm"
        },
        {
            "surah": "Al-Qamar",
            "page": "al-qamar"
        },
        {
            "surah": "Ar-Rahman",
            "page": "ar-rahman"
        },
        {
            "surah": "Al-Waqi'ah",
            "page": "al-waqiah"
        },
        {
            "surah": "Al-Hadid",
            "page": "al-hadid"
        },
        {
            "surah": "Al-Mujadilah",
            "page": "al-mujadilah"
        },
        {
            "surah": "Al-Hasyr",
            "page": "al-hasyr"
        },
        {
            "surah": "Al-Mumtahanah",
            "page": "al-mumtahanah"
        },
        {
            "surah": "Ash-Shaff",
            "page": "ash-shaff"
        },
        {
            "surah": "Al-Jumu'ah",
            "page": "al-jumuah"
        },
        {
            "surah": "Al-Munafiqun",
            "page": "al-munafiqun"
        },
        {
            "surah": "At-Taghabun",
            "page": "at-taghabun"
        },
        {
            "surah": "At-Thalaq",
            "page": "at-thalaq"
        },
        {
            "surah": "At-Tahrim",
            "page": "at-tahrim"
        },
        {
            "surah": "Al-Mulk",
            "page": "al-mulk"
        },
        {
            "surah": "Al-Qalam",
            "page": "al-qalam"
        },
        {
            "surah": "Al-Haqqah",
            "page": "al-haqqah"
        },
        {
            "surah": "Al-Ma'arij",
            "page": "al-maarij"
        },
        {
            "surah": "Nuh",
            "page": "nuh"
        },
        {
            "surah": "Al-Jinn",
            "page": "al-jinn"
        },
        {
            "surah": "Al-Muzzammil",
            "page": "al-muzzammil"
        },
        {
            "surah": "Al-Muddatstsir",
            "page": "al-muddatstsir"
        },
        {
            "surah": "Al-Qiyamah",
            "page": "al-qiyamah"
        },
        {
            "surah": "Al-Insan",
            "page": "al-insan"
        },
        {
            "surah": "Al-Mursalat",
            "page": "al-mursalat"
        },
        {
            "surah": "An-Naba'",
            "page": "an-naba"
        },
        {
            "surah": "An-Nazi'at",
            "page": "an-naziat"
        },
        {
            "surah": "'Abasa",
            "page": "abasa"
        },
        {
            "surah": "At-Takwir",
            "page": "at-takwir"
        },
        {
            "surah": "Al-Infithar",
            "page": "al-infithar"
        },
        {
            "surah": "Al-Muthaffifin",
            "page": "al-muthaffifin"
        },
        {
            "surah": "Al-Insyiqaq",
            "page": "al-insyiqaq"
        },
        {
            "surah": "Al-Buruj",
            "page": "al-buruj"
        },
        {
            "surah": "At-Thariq",
            "page": "at-thariq"
        },
        {
            "surah": "Al-A'la",
            "page": "al-ala"
        },
        {
            "surah": "Al-Ghasyiyah",
            "page": "al-ghasyiyah"
        },
        {
            "surah": "Al-Fajr",
            "page": "al-fajr"
        },
        {
            "surah": "Al-Balad",
            "page": "al-balad"
        },
        {
            "surah": "Asy-Syams",
            "page": "asy-syams"
        },
        {
            "surah": "Al-Lail",
            "page": "al-lail"
        },
        {
            "surah": "Adh-Dhuha",
            "page": "adh-dhuha"
        },
        {
            "surah": "Al-Insyirah",
            "page": "al-insyirah"
        },
        {
            "surah": "At-Tin",
            "page": "at-tin"
        },
        {
            "surah": "Al-'Alaq",
            "page": "al-alaq"
        },
        {
            "surah": "Al-Qadr",
            "page": "al-qadr"
        },
        {
            "surah": "Al-Bayyinah",
            "page": "al-bayyinah"
        },
        {
            "surah": "Az-Zalzalah",
            "page": "az-zalzalah"
        },
        {
            "surah": "Al-'Adiyat",
            "page": "al-adiyat"
        },
        {
            "surah": "Al-Qari'ah",
            "page": "al-qariah"
        },
        {
            "surah": "At-Takatsur",
            "page": "at-takatsur"
        },
        {
            "surah": "Al-'Ashr",
            "page": "al-ashr"
        },
        {
            "surah": "Al-Humazah",
            "page": "al-humazah"
        },
        {
            "surah": "Al-Fil",
            "page": "al-fil"
        },
        {
            "surah": "Quraisy",
            "page": "quraisy"
        },
        {
            "surah": "Al-Ma'un",
            "page": "al-maun"
        },
        {
            "surah": "Al-Kautsar",
            "page": "al-kautsar"
        },
        {
            "surah": "Al-Kafirun",
            "page": "al-kafirun"
        },
        {
            "surah": "An-Nashr",
            "page": "an-nashr"
        },
        {
            "surah": "Al-Lahab",
            "page": "al-lahab"
        },
        {
            "surah": "Al-Ikhlash",
            "page": "al-ikhlash"
        },
        {
            "surah": "Al-Falaq",
            "page": "al-falaq"
        },
        {
            "surah": "An-Nas",
            "page": "an-nas"
        }
    ]
    theo.list_kota = await list_kota()
    theo.ev.on(`messages.upsert`, async (messages) => {
        await (await import(`file://${__dirname}/pesan.js?v=${Date.now()}`)).default({ messages, theo })
    })


    if (!theo.authState.creds.registered) {
        console.log(`📲  Meminta kode pairing WhatsApp...`)
        await delay(3000)
        let kode = await theo.requestPairingCode(nomorBot)
        console.log(`🔑  Kode pairing Anda: ${kode.match(/.{1,4}/g).join('-')}\n`)
    }

    theo.ev.on('connection.update', async (koneksi) => {
        if (koneksi.connection === "connecting") {
            await delay(300)
            console.log(`🔌  Menghubungkan ke WhatsApp...`)
        }

        if (koneksi.connection === "open") {
            await delay(300)
            console.log(`✅  Berhasil terhubung ke WhatsApp!`)
        }

        if (koneksi.connection === "close") {
            await delay(300)
            console.log(`❌  Koneksi terputus dari WhatsApp`)
            await delay(300)
            console.log(`🔄  Mencoba menghubungkan ulang...`)
            return await theoRun()
        }
    })
    theo.ev.on('group-participants.update', async (group_update) => {
        let metadata
        if (theo.group[group_update.id]) {
            metadata = theo.group[group_update.id]
        } else {
            metadata = await theo.groupMetadata(group_update.id)
            theo.group[group_update.id] = metadata
        }
        if (!db.group[group_update.id]) {
            db.group[group_update.id] = {
                fitur: {
                    antilink: false,
                    antiluar: false,
                    detect: false
                },
                banned: true,
                premium: false,
                sewa: false
            }
        }
        let isi_gc = theo.group[group_update.id]
        let db_gc = db.group[group_update.id].fitur.detect
        switch (group_update.action) {
            case "demote": {
                for (const member of group_update.participants) {
                    const pelaku = group_update.author && group_update.author !== member ? `📌 *Yang melakukan tindakan ini:* @${group_update.author.replace(/[^0-9]/g, '')}` : ''
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `⬇️ *ADMIN DICOPOT*
        
👥 Grup: *${isi_gc.subject}*
👤 @${member.replace(/[^0-9]/g, '')}
${pelaku ? '\n' + pelaku : ''}

❌ Sekarang bukan admin lagi. Tetap semangat jadi member yang solid! 💪`,
                        contextInfo: {
                            mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])]
                        }
                    })

                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: null })
                }
                break
            }

            case "promote": {
                for (const member of group_update.participants) {
                    const pelaku = group_update.author && group_update.author !== member ? `📌 *Yang menaikkan jabatan:* @${group_update.author.replace(/[^0-9]/g, '')}` : ''
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `⬆️ *NAIK JABATAN!*
        
👥 Grup: *${isi_gc.subject}*
👤 @${member.replace(/[^0-9]/g, '')}
${pelaku ? '\n' + pelaku : ''}

✅ Selamat! Kini kamu adalah bagian dari tim admin. 🚀`,
                        contextInfo: {
                            mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])]
                        }
                    })

                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: 'admin' })
                }
                break
            }

            case "remove": {
                for (const member of group_update.participants) {
                    const pelaku = group_update.author && group_update.author !== member ? `📌 *Dikeluarkan oleh:* @${group_update.author.replace(/[^0-9]/g, '')}` : ''
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `🚪 *ANGGOTA TELAH KELUAR*

👥 Grup: *${isi_gc.subject}*
👤 @${member.replace(/[^0-9]/g, '')}
${pelaku ? '\n' + pelaku : ''}

👋 Semoga sukses di luar sana!`,
                        contextInfo: {
                            mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])]
                        }
                    })

                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                }
                break
            }

            case "add": {
                for (const member of group_update.participants) {
                    const pelaku = group_update.author && group_update.author !== member ? `📌 *Ditambahkan oleh:* @${group_update.author.replace(/[^0-9]/g, '')}` : ''
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `🎉 *SELAMAT DATANG!*

👥 Grup: *${isi_gc.subject}*
👤 @${member.replace(/[^0-9]/g, '')}
${pelaku ? '\n' + pelaku : ''}

🌟 Semoga betah dan aktif di sini ya! Jangan malu buat nyapa 😊`,
                        contextInfo: {
                            mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])]
                        }
                    })

                    isi_gc.participants.push({ id: member, admin: null })
                }
                break
            }
        }



    })
    theo.ev.on('groups.update', async ([group_update]) => {
        let metadata
        if (theo.group[group_update.id]) {
            metadata = theo.group[group_update.id]
        } else {
            metadata = await theo.groupMetadata(group_update.id)
            theo.group[group_update.id] = metadata
        }
        if (!db.group[group_update.id]) {
            db.group[group_update.id] = {
                fitur: {
                    antilink: false,
                    antiluar: false,
                    detect: false
                },
                banned: true,
                premium: false,
                sewa: false
            }
        }
        let isi_gc = theo.group[group_update.id]
        if (group_update.subject) isi_gc.subject = group_update.subject
        if (group_update.desc) isi_gc.desc = group_update.subject
    })

    //Pengingat sholat
    setInterval(async () => {
        let new_hari = tanggal_now()
        if (!Object.keys(db[`jadwalSholat`]).includes(`hari`) || db[`jadwalSholat`]?.hari !== new_hari.getDay()) {
            db[`jadwalSholat`] = {
                hari: new_hari.getDay(),
                sholat: await jadwal_sholat()
            }
            savedb()
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
                            let metadata
                            if (theo.group[id_gc]) {
                                metadata = theo.group[id_gc]
                            } else {
                                metadata = await theo.groupMetadata(id_gc)
                                theo.group[id_gc] = metadata
                            }
                            if (metadata) {
                                const hariJumat = waktu_sholat.toLowerCase() === 'dzuhur' && db['jadwalSholat'].hari === 5;

                                const pesan = `🕌 *Waktunya Sholat ${waktu_sholat.toUpperCase()}*${hariJumat ? '\nLaki-laki, jangan lupa sholat Jumat ya!' : ''}
                            
⏰ *${waktuNow}* — Saatnya berhenti sejenak dari dunia. Allah memanggilmu. 🤍

🛁 Ambil wudhu. 🌿 Tenangkan hati. Berdiri menghadap-Nya dengan penuh kesadaran.

✨ *Sholat tepat waktu* itu:
- 🌟 Menenangkan jiwa,
- 📖 Menguatkan iman,
- 🛡️ Menjaga hati dari lalai.

🤲 Semoga setiap sujudmu hari ini menjadi penyejuk jiwa dan pembuka keberkahan. Aamiin.`

                                await delay(1000)
                                await theo.sendMessage(id_gc, { text: pesan });
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
    }, 5000);

    setInterval(() => {
        Object.keys(db.user).forEach(async (users) => {
            let user = db.user[users]
            if (user.premium && typeof user.premium === "number" && user.premium !== "permanen" && user.premium < int_tanggal_now()) {
                user.premium = false
                await theo.sendMessage(users, {
                    text: `📢 * Notifikasi Premium *\n\nMasa aktif premium kamu telah * berakhir * 😔\n\nJangan khawatir! Kamu masih bisa daftar ulang kapan saja untuk menikmati fitur eksklusif kembali 🌟`
                })
            }
        })

        Object.keys(db.group).forEach(async (groups) => {
            let data_group = db.group[groups]
            if (data_group.sewa && typeof data_group.sewa === "number" && data_group.sewa !== "permanen" && data_group.sewa < int_tanggal_now()) {
                data_group.sewa = false
                await theo.sendMessage(groups, {
                    text: `📢 * Notifikasi Sewa Grup *\n\nMasa sewa bot di grup ini telah * berakhir * 😔\n\nSilakan hubungi owner untuk memperpanjang layanan.Terima kasih atas penggunaannya! 🙏`
                })
            }
        })
    }, 30000)

    theo.ev.on('creds.update', saveCreds)
}
await theoRun()