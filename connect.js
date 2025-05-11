import theoBot, { useMultiFileAuthState, jidNormalizedUser, fetchLatestBaileysVersion, delay, Browsers } from "baileys"
import Pino from "pino"
import "./setting.js"
import fs from "fs"
import { random_huruf_besar_nomor } from "./tools/func.js"
import { list_kota } from "./tools/scrape.js"
import path from "path"
console.log(`\n📂  Menjalankan bot di direktori: ${__dirname}`)
console.log(`🚀  Mengaktifkan *${namaBot}*...`)
console.log(`🧠  Menjalankan sistem bot...\n`)

export async function theoRun() {
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
        browser: Browsers.windows('Firefox'),
        auth: state,
        printQRInTerminal: false,
        logger: Pino({ level: 'silent' }),
        syncFullHistory: true,
        generateHighQualityLinkPreview: true,
        shouldSyncHistoryMessage: function (isi) {
            console.log(`memuat chat: \x1b[32m${isi.progress}%`)
        },
        // patchMessageBeforeSending: (message) => {
        //     const requiresPatch = !!(
        //         message.buttonsMessage
        //         || message.templateMessage
        //         || message.listMessage
        //     );
        //     if (requiresPatch) {
        //         message = {
        //             viewOnceMessage: {
        //                 message: {
        //                     messageContextInfo: {
        //                         deviceListMetadataVersion: 2,
        //                         deviceListMetadata: {},
        //                     },
        //                     ...message,
        //                 },
        //             },
        //         };
        //     }

        //     return message;
        // },
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


    async function pairing_request() {
        if (!theo.authState.creds.registered) {
            console.log(`📲  Meminta kode pairing WhatsApp...`)
            await delay(3000)
            let kode = await theo.requestPairingCode(nomorBot)
            console.log(`🔑 Kode pairing Anda: \x1b[32m${kode.match(/.{1,4}/g).join('-')}\x1b[0m\n`)
        } else {
            console.log(`✅ Sudah terhubung ke WhatsApp ${theo.user.name}, tidak perlu pairing ulang.`)
        }
    }

    await pairing_request()

    setInterval(async () => {
        if (!theo.authState.creds.registered) {
            await pairing_request()
        }
    }, 60000) // 60 detik = 60000 ms


    theo.ev.on('connection.update', async (koneksi) => {
        if (koneksi.connection === "connecting") {
            await delay(300)
            console.log(`🔌  Menghubungkan ke WhatsApp...`)
        }

        if (koneksi.connection === "open") {
            await delay(300)
            console.log(`✅ Berhasil terhubung ke WhatsApp!`)
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

    theo.ev.on('creds.update', saveCreds)
}
await theoRun()