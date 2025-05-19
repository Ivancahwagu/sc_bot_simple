import theoBot, { useMultiFileAuthState, jidNormalizedUser, fetchLatestBaileysVersion, delay, Browsers } from "baileys"
import Pino from "pino"
import "./setting.js"
import fs, { cpSync } from "fs"
import QRCode from "qrcode"
import { random_huruf_besar_nomor } from "./tools/func.js"
import { list_kota } from "./tools/scrape.js"
import path from "path"
console.log(`\n📂  Menjalankan bot di direktori: ${__dirname}`)
console.log(`🚀  Mengaktifkan *${namaBot}*...`)
console.log(`🧠  Menjalankan sistem bot...\n`)

export async function theoRun() {
    try {
        console.log(`\n📊  ════ INFORMASI BOT ════
📱 Nomor bot   : ${nomorBot}
👤 Nomor owner : ${owner.join(', ')}
`)

        savedb()
        await delay(300)
        console.log(`💾  Database berhasil dimuat dari file\n`)

        const { version, isLatest } = await fetchLatestBaileysVersion()
        const { state, saveCreds } = await useMultiFileAuthState(sesiPath)
        if (!isLatest) return process.send("restart")
        console.log(`📦  Versi Baileys: ${version}
🔍Versi terbaru: ${isLatest ? '✅ Iya' : '❌ Tidak'}\n`)

        const theo = await theoBot.default({
            markOnlineOnConnect: false,
            version,
            auth: state,
            printQRInTerminal: !global.pairingCode,
            logger: Pino({ level: 'silent' }),
            browser: Browsers.windows('Chrome'),
            // markOnlineOnConnect: false,
            generateHighQualityLinkPreview: true,
            shouldSyncHistoryMessage: function (isi) {
                console.log(`memuat chat: \x1b[32m${isi.progress}%`)
            }
        })
        theo.createId = function () {
            return `THEO-${random_huruf_besar_nomor(17)}`;
        };
        theo.sendMessage2 = theo.sendMessage;
        theo.sendMessage = async function (jid, isi, bebas = {}) {
            const messageId = bebas.messageId || theo.createId();
            isi.contextInfo ??= {};
            isi.contextInfo.forwardingScore ??= 1;
            isi.contextInfo.isForwarded ??= true;
            isi.contextInfo.forwardedNewsletterMessageInfo ??= {};
            isi.contextInfo.forwardedNewsletterMessageInfo.newsletterJid ??= '120363181509677367@newsletter';
            isi.contextInfo.forwardedNewsletterMessageInfo.serverMessageId ??= null;
            isi.contextInfo.forwardedNewsletterMessageInfo.newsletterName ??= `💻 ${namaBot} by theo_dev`;
            return await theo.sendMessage2(jid, isi, { messageId, ...bebas });
        };


        await (await import(`file://${__dirname}/send.js?v=${Date.now()}`)).default({ theo });
        theo.group = {}
        theo.name = {}
        theo.menu = {}
        theo.use_surah = {}
        theo.list_surah = global.surah
        theo.list_kota = global.list_kota
        theo.ev.on(`messages.upsert`, async (messages) => {
            await (await import(`file://${__dirname}/pesan.js?v=${Date.now()}`)).default({ messages, theo })
        })

        async function pairing_request() {
            if (!theo.authState.creds.registered) {
                console.log(`📲  Meminta kode pairing WhatsApp...`)
                await delay(3000)
                let kode = await theo.requestPairingCode(nomorBot)
                console.log(`🔑 Kode pairing Anda: \x1b[32m${kode.match(/.{1,4}/g).join('-')}\x1b[0m\n`)
            } else {
                console.log(`✅ Sudah terhubung ke WhatsApp ${theo.user?.name}, tidak perlu pairing ulang.`)
            }
        }
        if (global.pairingCode && !theo.authState.creds.registered) {
            await pairing_request()
        }
        theo.ev.on('connection.update', async (koneksi) => {
            if (koneksi.qr && !global.pairingCode) {
                fs.writeFileSync(global.qr, await QRCode.toBuffer(koneksi.qr, {
                    color: {
                        dark: `${global.color.merahTua}`,
                        light: `#FFF`
                    }
                }))
                console.log(`qr untuk login berhasil dibuat di ${global.qr}`)
            }
            if (koneksi.connection === "connecting") {
                await delay(300)
                console.log(`🔌  Menghubungkan ke WhatsApp...`)
            }

            if (koneksi.connection === "open") {
                await delay(300)
                if (fs.existsSync(global.qr)) {
                    fs.unlinkSync(global.qr)
                }
                console.log(`✅ Berhasil terhubung ke WhatsApp!`)
            }

            if (koneksi.connection === "close") {
                await delay(300)
                console.log(`❌  Koneksi terputus dari WhatsApp`)
                console.log(koneksi.lastDisconnect.error.output)
                await delay(300)
                console.log(`🔄  Mencoba menghubungkan ulang...`)
                switch (koneksi.lastDisconnect.error.output.payload.error) {
                    case "Unauthorized": case "Service Unavailable":
                        if (fs.existsSync(sesiPath)) {
                            fs.rmdirSync(sesiPath, { recursive: true, force: true })
                        }
                }
                return await theoRun()
            }
        })

        theo.ev.on('creds.update', saveCreds)

        theo.ev.on('group-participants.update', async (group_update) => {
            await (await import(`file://${__dirname}/detect.js?v=${Date.now()}`)).default({ theo, group_update }).catch(e => console.log(e))
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
                db.group[group_update.id] = global.struktur_db.group
            }
            let isi_gc = theo.group[group_update.id]
            let action = Object.keys(group_update).filter(a => a !== `id` && a !== `author`)
            for (const update_value of action) {
                console.log(update_value)
                isi_gc[update_value] = group_update[update_value]
            }
        })

        theo.ev.on('call', async ([call]) => {
            await (await import(`file://${__dirname}/action_call.js?v=${Date.now()}`)).default({ call, theo }).catch(e => console.log(e))
        })

        if (theo.authState.creds.registered) {
            setInterval(async () => {
                await (await import(`file://${__dirname}/db_check.js?v=${Date.now()}`)).default({ theo }).catch(e => console.log(e))
            }, 5000)

        }

    } catch (e) {
        console.log(e.error)
        console.log(`error`)
        theoRun()
    }
}
await theoRun()