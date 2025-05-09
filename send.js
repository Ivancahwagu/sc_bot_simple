import { downloadMediaMessage, generateWAMessageFromContent, jidNormalizedUser, prepareWAMessageMedia } from "baileys"
import Pino from 'pino';
import { cekMetadata, toMp3 } from "./tools/file.js";
import PhoneNumber from 'awesome-phonenumber';

export default async function ({ theo }) {
    theo.download = async function (pesan) {
        let buffer = await downloadMediaMessage(pesan, `buffer`, {}, { logger: Pino({ "level": `silent` }), reuploadRequest: theo.updateMediaMessage })
        return buffer
    }
    theo.sendText = async function (jid, text, quoted = {}, more = {}) {
        return await theo.sendMessage(jid, { text: text, ...more }, { ...quoted })
    }
    theo.sendMedia = async function (jid, media, text = '', quoted = {}, more = {}) {
        if (!Buffer.isBuffer(media)) media = await getBuffer(media)

        const data = await cekMetadata(media)
        const type = data.mimetype.split('/')[0]
        const filename = `${Date.now()}.${data.ext}`
        const baseOptions = { mimetype: data.mimetype, fileName: filename, ...more }
        theo.sedang(jid, type === 'audio' ? 4 : 3)
        const content = {
            image: { image: data.buffer, caption: text, ...baseOptions },
            video: { video: data.buffer, caption: text, ...baseOptions },
            audio: { audio: data.buffer, ...baseOptions }
        }
        if (!content[type]) return await theo.sendMessage(jid, { text: text, ...more }, { ...quoted })
        return theo.sendMessage(jid, content[type], { ...quoted })
    }

    theo.sendKontak = async (jid, kontak = [], quoted = {}) => {
        let listkontak = []
        for (let item of kontak) {
            let number = typeof item === 'string' ? item : item.number
            let nama = typeof item === 'object' && item.name ? item.name : PhoneNumber("+" + number).getNumber("international")
            let label = typeof item === 'object' && item.label ? item.label : "WhatsApp"
            number = number.replace(/[^0-9]/g, '')
            let international = PhoneNumber("+" + number).getNumber("international")
            let url = `https://wa.me/${number}`
            let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${nama};;;
FN:${nama}
ORG:${label}
TEL;type=CELL;type=VOICE;waid=${number}:${international}
URL:${url}
END:VCARD`.trim()
            listkontak.push({ vcard, displayName: nama })
        }
        return await theo.sendMessage(jid, {
            contacts: {
                displayName: `${listkontak.length} kontak`,
                contacts: listkontak,
            }
        }, { ...quoted })
    }

    // theo.sendButton = async function (jid, button, media, header, footer, text, quoted, more) {
    // if (Buffer.isBuffer(media)) {
    // const { mimetype, buffer } = await cekMetadata(media);
    // theo.sedang(jid, mimetype.includes("audio") ? 4 : 3);

    // if (mimetype.includes("image")) {
    // media = {
    // header: proto.Message.InteractiveMessage.Header.create({
    // hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: media }, { upload: theo.waUploadToServer }))
    // }),
    // };
    // } else if (mimetype.includes("video")) {
    // media = {
    // header: proto.Message.InteractiveMessage.Header.create({
    // hasMediaAttachment: true, ...(await prepareWAMessageMedia({ video: media }, { upload: theo.waUploadToServer }))
    // }),
    // };
    // } else if (mimetype.includes("audio")) {
    // let res = await toMp3(buffer);
    // media = {
    // header: proto.Message.InteractiveMessage.Header.create({
    // hasMediaAttachment: true, ...(await prepareWAMessageMedia({ audio: res }, { upload: theo.waUploadToServer }))
    // })
    // };
    // }
    // } else {
    // media = {};
    // }
    // let button_value = []
    // button.forEach(async a => {
    // if (a.name == "url") {
    // button_value.push({ name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: a.text, url: a.url, merchant_url: `https://www.google.com` }) })
    // } else if (a.name == "reply") {
    // button_value.push({ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: a.text, title: a.title, id: a.id }) })
    // }
    // else if (a.name == "select") {
    // button_value.push({ name: "single_select", buttonParamsJson: JSON.stringify({ title: a.title, sections: a.sections.map(a => ({ title: a.title, highlight_label: a.label, rows: a.rows })) }) })
    // }
    // else if (a.name == "copy") {
    // button_value.push({
    // name: "cta_copy",
    // buttonParamsJson: JSON.stringify({
    // display_text: a.text,
    // id: nomor_random(9),
    // copy_code: a.copy
    // })
    // })
    // }
    // })
    // console.log(button_value)

    // const message = generateWAMessageFromContent(jid, {
    // viewOnceMessage: {
    // message: {
    // "messageContextInfo": {
    // "deviceListMetadata": {},
    // "deviceListMetadataVersion": 2
    // },
    // interactiveMessage: proto.Message.InteractiveMessage.create({
    // ...more, body: proto.Message.InteractiveMessage.Body.create({
    // text: text
    // }),
    // footer: proto.Message.InteractiveMessage.Footer.create({
    // text: footer
    // }),
    // nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    // buttons: [{
    // "name": "cta_url",
    // "buttonParamsJson": `{\"display_text\":\"Login Server Panel\",\"url\":\"https://party-mc.fun\",\"merchant_url\":\"https://www.google.com\"}`
    // },
    // {
    // "name": "cta_copy",
    // "buttonParamsJson": `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"oke\"}`
    // },
    // {
    // "name": "cta_copy",
    // "buttonParamsJson": `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"asu\"}`
    // }]
    // })
    // })
    // }
    // }
    // }, { userJid: jidNormalizedUser(theo.user.id), ...quoted })
    // console.log(message)

    // return await theo.relayMessage(message.key.remoteJid, message.message, {
    // messageId: message.key.id
    // });
    // }

    theo.deleteChat = async function (jid, message) {
        return await theo.chatModify({
            delete: true,
            lastMessages: [
                {
                    key: message.key,
                    messageTimestamp: message.messageTimestamp
                }
            ]
        },
            jid
        )

    }
    theo.setpp = async function (jid, pp) {
        return await theo.updateProfilePicture(jid, pp)
    }
    theo.infoLinkGc = async function (link = "") {
        let code = link.split(`https://chat.whatsapp.com/`)[1].match(/.{0,22}/)[0]
        return await theo.groupGetInviteInfo(code)
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
    theo.forward = async function (jid, m, more = {}) {
        return await theo.relayMessage(jid, m.message, { messageId: m.key.id, ...more })
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