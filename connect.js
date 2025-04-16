import theoBot, { useMultiFileAuthState, jidNormalizedUser, fetchLatestBaileysVersion, delay, Browsers } from "baileys"
import Pino from "pino"
import "./setting.js"
import fs from "fs"
import { int_tanggal_now, tanggal_now } from "./tools/func.js"
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

    if (!db['jadwalSholat']) {
        db['jadwalSholat'] = {
            subuh: { waktu: `04:30`, notif: false },
            dzuhur: { waktu: `12:00`, notif: false },
            ashar: { waktu: `15:00`, notif: false },
            magrib: { waktu: `18:00`, notif: false },
            isya: { waktu: `19:00`, notif: false },
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

    theo.group = {}
    theo.name = {}
    theo.menu = {}
    theo.ev.on(`messages.upsert`, async (messages) => {
        await (await import(`file://${__dirname}/pesan.js?v=${Date.now()}`)).default({ messages, theo })
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
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `╭─── ⬇️ *ADMIN DICOPOT*
│ 👥 Grup: *${isi_gc.subject.split('\n').join(`\n│`)}*
│ 👤 @${member.replace(/[^0-9]/g, '')}
│ ❌ Bukan admin lagi.
╰─────────────`,
                        contextInfo: { mentionedJid: [member] }
                    })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: null })
                }
            }
                break

            case "promote": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `╭─── ⬆️ *NAIK JABATAN*
│ 👥 Grup: *${isi_gc.subject.split('\n').join(`\n│`)}*
│ 👤 @${member.replace(/[^0-9]/g, '')}
│ ✅ Sekarang jadi admin!
╰─────────────`,
                        contextInfo: { mentionedJid: [member] }
                    })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: 'admin' })
                }
            }
                break

            case "remove": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `╭─── 🚪 *ANGGOTA KELUAR*
│ 👥 Grup: *${isi_gc.subject.split('\n').join(`\n│`)}*
│ 👤 @${member.replace(/[^0-9]/g, '')}
│ 👋 Telah meninggalkan grup.
╰─────────────`,
                        contextInfo: { mentionedJid: [member] }
                    })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                }
            }
                break

            case "add": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `╭─── 🎉 *SELAMAT DATANG*
│ 👥 Grup: *${isi_gc.subject.split('\n').join(`\n│`)}*
│ 👤 @${member.replace(/[^0-9]/g, '')}
│ 🌟 Nikmati obrolan di sini!
╰─────────────`,
                        contextInfo: { mentionedJid: [member] }
                    })
                    isi_gc.participants.push({ id: member, admin: null })
                }
            }
                break
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
        const now = tanggal_now()
        const jam = now.getHours().toString().padStart(2, '0')
        const menit = now.getMinutes().toString().padStart(2, '0')
        const waktuNow = `${jam}:${menit}`

        let list_gc = Object.keys(db.group)
        let list_sholat = Object.keys(db.jadwalSholat)
        for (const waktu_sholat of list_sholat) {
            let db_sholat = db.jadwalSholat[waktu_sholat]
            if (!db_sholat.notif && db_sholat.waktu === waktuNow) {
                console.log(`mengingatkan sholat`)
                db_sholat.notif = true
                savedb()
                for (const id_gc of list_gc) {
                    let db_gc = db.group[id_gc]
                    if (!db_gc.banned || db_gc.sewa) {
                        await theo.sendMessage(id_gc, {
                            text: `🕌 *Pengingat Sholat ${waktu_sholat.toUpperCase()}*

⏰ *${waktuNow}* — Saatnya menunaikan ibadah sholat *${waktu_sholat.toUpperCase()}*.

🤲 Bagi yang *Muslim* dan belum sholat, yuk ambil wudhu dan tunaikan kewajibanmu. Jangan biarkan dunia melalaikanmu dari akhirat 🌅

✨ Semoga Allah menerima setiap rakaat dan doa kita, serta memberkahi waktu dan hidup kita. Aamiin.`
                        })

                    }
                }
            }
            let [jamSholat, menitSholat] = db_sholat.waktu.split(':')
            let menitTambahSatu = (parseInt(menitSholat) + 1).toString().padStart(2, '0')
            let waktu_refres_sholat = `${jamSholat}:${menitTambahSatu}`
            if (db_sholat.notif && waktuNow === waktu_refres_sholat) {
                console.log(`Akan reset notif sholat ${waktu_sholat} di: ${waktu_refres_sholat}`)
                db_sholat.notif = false
                savedb()
            }
        }
    }, 1000)

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