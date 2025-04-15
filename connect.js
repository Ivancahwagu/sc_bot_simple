import theoBot, { useMultiFileAuthState, jidNormalizedUser, fetchLatestBaileysVersion, delay, Browsers } from "baileys"
import Pino from "pino"
import "./setting.js"
import fs from "fs"
import { int_tanggal_now } from "./tools/func.js"

console.log(`bot dijalankan di ${__dirname}`)
console.log(`mengaktifkan ${namaBot}...`)
console.log(`menjalankan sistem bot...`)
export async function theoRun() {
    console.log(`       
        INFORMASI
Nomor bot   : ${nomorBot}
Nomor owner : ${owner.join(`, `)}
`)
    if (!db[`user`]) {
        await delay(300)
        console.log(`database untuk user belum ada!`)
        await delay(300)
        console.log(`membuat database untuk user`)
        db[`user`] = {}
        await delay(300)
        console.log(`berhasil membuat database untuk user`)
    }
    if (!db[`group`]) {
        await delay(300)
        console.log(`database untuk group belum ada!`)
        await delay(300)
        console.log(`membuat database untuk group`)
        db[`group`] = {}
        await delay(300)
        console.log(`berhasil membuat database untuk group`)
    }
    savedb()
    await delay(300)
    console.log(`database yang disimpan berhasil dimuat!`)

    const { version, isLatest } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(sesiPath)

    console.log(`versi: ${version}
terbaru: ${isLatest ? `iya` : `tidak`}`)
    const theo = await theoBot.default({
        markOnlineOnConnect: false,
        version, browser: Browsers.ubuntu(`Chrome`),
        auth: state, printQRInTerminal: false,
        logger: Pino({ "level": "silent" })
    })
    if (!theo.authState.creds.registered) {
        console.log(`meminta kode untuk masuk ke whatsapp...`)
        await delay(3000)
        let kode = await theo.requestPairingCode(nomorBot)
        console.log(`kode anda: ${kode.match(/.{1,4}/g).join(`-`)}`)
    }
    theo.ev.on('connection.update', async (koneksi) => {
        if (koneksi.connection == "connecting") {
            await delay(300)
            console.log(`menghubungkan ke whatsapp...`)
        }
        if (koneksi.connection == "open") {
            await delay(300)
            console.log(`berhasil terhubung ke whatsapp...`)
        }
        if (koneksi.connection == "close") {
            await delay(300)
            console.log(`gagal terhubung ke whatsapp`)
            return await theoRun()
        }
    })
    theo.group = {}
    theo.name = {}
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
                    if (db_gc) await theo.sendMessage(group_update.id, { text: `@${member.replace(/[^0-9]/g, '')} sekarang bukan admin lagi`, contextInfo: { mentionedJid: [member] } })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: null })
                }
            }
                break
            case "promote": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, { text: `@${member.replace(/[^0-9]/g, '')} telah menjadi admin di grup ini`, contextInfo: { mentionedJid: [member] } })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                    isi_gc.participants.push({ id: member, admin: 'admin' })
                }
            }
                break
            case "remove": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, { text: `@${member.replace(/[^0-9]/g, '')} keluar grup`, contextInfo: { mentionedJid: [member] } })
                    isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                }
            }
                break
            case "add": {
                for (const member of group_update.participants) {
                    if (db_gc) await theo.sendMessage(group_update.id, {
                        text: `@${member.replace(/[^0-9]/g, '')} telah masuk grup ini
                    
selamat datang👋`, contextInfo: { mentionedJid: [member] }
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
    setInterval(() => {
        Object.keys(db.user).forEach(async (users, index) => {
            let prem = db.user[users]
            if (prem.premium && typeof prem.premium === "number" && prem.premium !== "permanen" && prem.premium < int_tanggal_now()) {
                prem.premium = false
                await theo.sendMessage(users, {
                    text: `notif!!!
                    
masa premium anda sudah habis😔`})
            }

        })
        Object.keys(db.group).forEach(async (groups, index) => {
            let data_group = db.group[groups]
            if (data_group.sewa && typeof data_group.sewa === "number" && data_group.sewa !== "permanen" && data_group.sewa < int_tanggal_now()) {
                data_group.sewa = false
                await theo.sendMessage(groups, {
                    text: `notif!!!
   
masa sewa group ini sudah habis😔`})
            }
        }
        )
    }, 30000);
    theo.ev.on('creds.update', saveCreds)
}
await theoRun()