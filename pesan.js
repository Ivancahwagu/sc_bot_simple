import { jidNormalizedUser } from "baileys";
import { random_huruf_kecil_nomor, tanggal_now } from "./tools/func.js";
import fs from "fs";
export default async function ({ messages, theo }) {
    global.struktur_db = (await import(`file://${__dirname}/struktur_database.js?v=${Date.now()}`)).default()
    try {
        if (!messages.messages || messages.messages.length === 0) {
            throw new Error("Pesan kosong atau tidak valid!");
        }

        let m = messages.messages[0];
        if (!m.message) return
        m.message[`ephemeralMessage`] ? m.message = m.message[`ephemeralMessage`].message : m.message
        m.name = m.pushName;
        m.chat = m.key?.remoteJid ?? "unknown";
        m.fromMe = m.key.fromMe
        m.sender = m.fromMe ? jidNormalizedUser(theo.user.id) : m.key?.participant ?? m.key?.remoteJid;
        m.pushName ? theo.name[m.sender] = m.pushName : null
        m.id = m.key?.id ?? "unknown";
        m.group = m.chat.endsWith("@g.us");

        if (m.group) {
            try {
                let metadata
                if (!theo.group[m.chat]) {
                    metadata = await theo.groupMetadata(m.chat);
                    theo.group[m.chat] = metadata
                } else {
                    metadata = theo.group[m.chat]
                }
                m.metadata = metadata
                m.listAdmin = m.metadata?.participants.filter(a => a.admin === "admin" || a.admin === "superadmin").map(a => a.id)
                m.admin = m.listAdmin.includes(m.sender)
                m.botAdmin = m.listAdmin.includes(jidNormalizedUser(theo.user.id))
                if (!db.group[m.chat]) {
                    db.group[m.chat] = global.struktur_db.group
                }
            } catch {
                m.metadata = null;
                m.admin = false;
                m.listAdmin = null
                m.botAdmin = false
            }
        }

        m.owner = owner.includes(m.sender.split("@")[0]);
        m.bot = m.id.startsWith('BAE5') || m.id.startsWith('HSK') || m.id.startsWith('THEO') || (m.id.startsWith("3EB0") && !m.name);
        m.type = m.message?.conversation ? "conversation" : Object.keys(m.message ?? {}).find(a => a.endsWith("Message") && !a.startsWith("senderKey") && !a.startsWith("protocol")) ?? null;
        m.expiration = m.message[m.type]?.contextInfo?.expiration ?? 0;
        m.text = typeof m.message[m.type] == "string" ? m.message[m.type] : m.message[m.type]?.text || m.message[m.type]?.caption || false
        if (m.text) {
            m.prefix = prefix.includes(m.text?.charAt(0)) ? m.text.charAt(0) : false
            m.command = m.prefix ? m.text.slice(1).trim().split(/ +|\n/)[0] : m.text?.trim().split(/ +|\n/)[0];
            m.args = m.prefix ? m.text.slice(1).trim().split(/ +/).slice(1) : m.text?.trim().split(/ +/).slice(1)
            m.res = m.args.join(" ")
        }
        m.quoted = {};
        if (m.message?.[m.type]?.contextInfo?.quotedMessage) {
            m.quoted.key = {
                id: m.message[m.type].contextInfo.stanzaId ?? "unknown",
                remoteJid: m.message[m.type].contextInfo.remoteJid || m.chat,
                fromMe: m.message[m.type].contextInfo.participant === jidNormalizedUser(theo.user.id),
                participant: m.group ? m.message[m.type].contextInfo.participant : undefined
            };
            m.quoted.id = m.quoted.key.id
            m.quoted.fromMe = m.quoted.key.fromMe
            m.quoted.message = m.message[m.type].contextInfo.quotedMessage;
            m.quoted.message[`ephemeralMessage`] ? m.quoted.message = m.quoted.message[`ephemeralMessage`].message : m.quoted.message
            m.quoted.chat = m.quoted.key.remoteJid;
            m.quoted.sender = m.quoted.fromMe ? jidNormalizedUser(theo.user.id) : m.quoted.key.participant ?? m.quoted.key.remoteJid;
            m.quoted.name = theo.name[m.quoted.sender] ? theo.name[m.quoted.sender] : null
            m.quoted.owner = owner.some(o => m.quoted.sender.replace(/\D/g, "") === o);
            m.quoted.bot = m.quoted.id.startsWith('BAE5') || m.quoted.id.startsWith('HSK') || m.quoted.id.startsWith('THEO') || (m.quoted.id.startsWith("3EB0") && !m.quoted.name);
            m.quoted.type = m.quoted.message?.conversation ? "conversation" : Object.keys(m.quoted.message ?? {}).find(a => a.endsWith("Message") && !a.startsWith("senderKey") && !a.startsWith("protocol")) ?? null;
            m.quoted.expiration = m.quoted.msg?.contextInfo?.expiration ?? 0;
            m.quoted.text = typeof m.quoted.message[m.quoted.type] == "string" ? m.quoted.message[m.quoted.type] : m.quoted.message[m.quoted.type]?.text || m.quoted.message[m.quoted.type]?.caption || false
            if (m.quoted.text) {
                m.quoted.prefix = prefix.includes(m.quoted.text?.charAt(0)) ? m.quoted.text.charAt(0) : false
                m.quoted.command = m.quoted.prefix ? m.quoted.text.slice(1).trim().split(/ +|\n/)[0] : m.quoted.text?.trim().split(/ +|\n/)[0];
                m.quoted.args = m.quoted.prefix ? m.quoted.text.slice(1).trim().split(/ +/).slice(1) : m.quoted.text?.trim().split(/ +/).slice(1)
                m.quoted.res = m.quoted.args.join(" ")
            }
        } else {
            m.quoted = false
        }

        m.quo = { quoted: m, ephemeralExpiration: m.expiration };
        m.media = /sticker|image|video|audio|document/.test(m.quoted.type) ? m.quoted : /sticker|image|video|audio|document/.test(m.type) ? m : false;
        m.reply = async function (text, options = {}) {
            theo.sedang(m.chat, 3);
            return typeof text === "string"
                ? await theo.sendMessage(m.chat, { text, ...options }, m.quo)
                : await theo.sendMessage(m.chat, { ...text, ...options }, m.quo);
        };

        m.read = async function () {
            return await theo.readMessages([m.key]);
        };

        m.react = async function (isi) {
            return await theo.sendMessage(m.chat, {
                react: { text: isi, key: m.key }
            });
        };

        console.log(`
\x1b[1;36m╔════════════════════════════════════════════════╗
║               \x1b[1;32m📩 PESAN MASUK 📩\x1b[1;36m               
╠════════════════════════════════════════════════╣
║               ${tanggal_now().getDate()}-${tanggal_now().getMonth() + 1}-${tanggal_now().getFullYear()} ${tanggal_now().getHours().toString().padStart(2, '0')}.${tanggal_now().getMinutes().toString().padStart(2, '0')}.${tanggal_now().getSeconds().toString().padStart(2, '0')}                
╠════════════════════════════════════════════════╝
║ \x1b[1;33mNama    \x1b[0m: \x1b[1;32m${m.bot ? theo.user.name : m.name}\x1b[0m
║ \x1b[1;33mSender  \x1b[0m: \x1b[1;34m${m.sender}\x1b[0m   
║ \x1b[1;33mchat    \x1b[0m: \x1b[1;34m${m.chat}\x1b[0m   
║ \x1b[1;33mID      \x1b[0m: \x1b[1;34m${m.id}\x1b[0m
║ \x1b[1;33mGroup   \x1b[0m: \x1b[1;35m${m.group ? theo.group[m.chat] ? theo.group[m.chat].subject : `` : ``}\x1b[0m
║ \x1b[1;33mBot     \x1b[0m: \x1b[1;31m${m.bot}\x1b[0m
║ \x1b[1;33mOwner   \x1b[0m: \x1b[1;36m${m.owner}\x1b[0m
║ \x1b[1;33mAdmin   \x1b[0m: ${m.admin ? "\x1b[1;32m✅" : "\x1b[1;31m❌"}\x1b[0m
║ \x1b[1;33mType    \x1b[0m: \x1b[1;30m${m.type}\x1b[0m
║ \x1b[1;33mCommand \x1b[0m: \x1b[1;32m${m.command || "Tidak ada"}\x1b[0m
║ \x1b[1;33mPrefix  \x1b[0m: \x1b[1;30m${m.prefix ? m.prefix : `❌`}\x1b[0m
╠════════════════════════════════════════════════╗
║ \x1b[1;33mPesan:\x1b[0m 
║ \x1b[1;37m${m.text ? m.text.split(`\n`).join(`\n║ `) : "📭 (Pesan kosong)"}\x1b[0m
╚════════════════════════════════════════════════╝
 `);
        await (await import(`file://${__dirname}/respon.js?v=${Date.now()}`)).default({ m, theo });
        if (m.command?.toLowerCase() !== "restart") return savedb();
    } catch (e) {
        console.error("❌ Error:", e.message);
        console.error(`${e.stack}`)
        console.warn(messages.messages?.[0]?.message ?? "Tidak ada pesan.");
    }
}
