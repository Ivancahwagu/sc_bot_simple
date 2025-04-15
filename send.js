import { downloadMediaMessage } from "baileys"
import Pino from 'pino';
import { cekMetadata, toMp3 } from "./tools/file.js";
import PhoneNumber from 'awesome-phonenumber';


export default async function ({ theo }) {
    theo.download = async function (pesan) {
        let buffer = await downloadMediaMessage(pesan, `buffer`, {}, { logger: Pino({ "level": `silent` }), reuploadRequest: theo.updateMediaMessage })
        return buffer
    }
    theo.sendText = async function (jid, text, quoted = {}, more = {}) {
        return theo.sendMessage(jid, { text: text, ...more }, { ...quoted })
    }
    theo.sendMedia = async function (jid, media, text, quoted = {}, more = {}) {
        if (!Buffer.isBuffer(media)) {
            media = await getBuffer(media)
        }
        let data = await cekMetadata(media)
        // console.log(data)
        if (data.mimetype.includes("image")) {
            theo.sedang(jid, 3)
            return theo.sendMessage(jid, { image: data.buffer, caption: text, mimetype: data.mimetype, fileName: Date.now() + "." + data.ext, ...more }, { ...quoted })
        } else
            if (data.mimetype.includes("video")) {
                theo.sedang(jid, 3)
                let bdata = await cekMetadata(data.buffer)
                if (!more.seconds) {
                    more.seconds = bdata.durasi
                }
                if (!more.fileLength) {
                    more.fileLength = bdata.ukuran
                }
                return theo.sendMessage(jid, { video: data.buffer, caption: text, mimetype: "video/mp4", fileName: Date.now() + ".mp4", ...more }, { ...quoted })
            } else
                if (data.mimetype.includes("audio")) {
                    theo.sedang(jid, 4)
                    let res = await toMp3(data.buffer)
                    theo.sendMessage(jid, { audio: res, mimetype: "audio/mpeg", fileName: Date.now() + ".mp3", ...more }, { ...quoted })
                } else {
                    return console.log("mime tidak support")
                }
    }
    theo.sendKontak = async (jid, kontak = [], quo = {}) => {
        let listkontak = []
        for (let number of kontak) {
            number = number.replace(/[^0-9]/g, '')
            let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PhoneNumber("+" + number).getNumber("international")}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber("+" + number).getNumber("international")}
END:VCARD`.trim()
            listkontak.push({ vcard, displayName: PhoneNumber("+" + number).getNumber("international") })
        }
        return await theo.sendMessage(jid, {
            contacts: {
                displayName: `${listkontak.length} kontak`,
                contacts: listkontak,
            }
        }, { ...quo })
    }
    theo.setpp = async function (jid, pp) {
        return await theo.updateProfilePicture(jid, pp)
    }
    theo.updateGc = async function (jid, member, action) {
        return await theo.groupParticipantsUpdate(jid, [member], action)
    }
    theo.setNameGc = async function (jid, text) {
        return await theo.groupUpdateSubject(jid, text)
    }
    theo.setDescGc = async function (jid, text) {
        return await theo.groupUpdateDescription(jid, text)
    }
    theo.setBukaGc = async function (jid, boolean) {
        return await theo.groupSettingUpdate(jid, boolean ? 'not_announcement' : 'announcement')
    }
    theo.setEditGc = async function (jid, text) {
        return await theo.groupSettingUpdate(jid, text === "admin" ? 'locked' : 'unlocked')
    }
    theo.getLinkGc = async function (jid) {
        return `https://chat.whatsapp.com/` + await theo.groupInviteCode(jid)
    }
    theo.setLinkGc = async function (jid) {
        return `https://chat.whatsapp.com/` + await theo.groupRevokeInvite(jid)
    }
    theo.sedang = async function (jid, nomor) {
        let list = ['unavailable', 'available', 'composing', 'recording', 'paused']
        return await theo.sendPresenceUpdate(list[parseInt(nomor - 1)], jid)
    }
    theo.name = async function (nama) {
        return await theo.updateProfileName(nama)
    }
    theo.desc = async function (text) {
        return await theo.updateProfileStatus(text)
    }
    theo.delete = async function (jid, pesan) {
        return await theo.sendMessage(jid, { delete: pesan.key })
    }
    theo.forward = async function (jid, m) {
        return await theo.relayMessage(jid, m.message, { messageId: m.key.id })
    }
    theo.parseMention = async function (text) {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') || [];
    }
    theo.block = async function (nomor) {
        return await theo.updateBlockStatus(nomor, "block")
    }
    theo.unblock = async function (nomor) {
        return await theo.updateBlockStatus(nomor, "unblock")
    }
}