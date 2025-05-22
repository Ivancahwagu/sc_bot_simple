import fetch from "node-fetch"

export default async function ({ theo, group_update }) {
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
    let db_gc = db.group[group_update.id].fitur.detect
    for (const member of group_update.participants) {
        const memberId = member.replace(/[^0-9]/g, '')
        const authorId = group_update.author?.replace(/[^0-9]/g, '')
        const pelaku = group_update.author && group_update.author !== member
            ? `📌 *Yang melakukan tindakan ini:* @${authorId}`
            : ''

        const ppUrl = `${webApi}/api/welcome?pp=${encodeURIComponent(await theo.getPP(member))}`
        let text, subtitle, thumbnailText
        switch (group_update.action) {
            case "demote":
                text = `❏ *ADMIN DICABUT* ❏
📌 Grup: *${isi_gc.subject}*
👤 @${memberId}
${pelaku ? `⚙️ Oleh: @${authorId}` : ''}

📍 Sekarang kamu kembali jadi member biasa.
Tetap semangat & aktif ya! 🙌`
                thumbnailText = "yang sabar yaaa"
                isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                isi_gc.participants.push({ id: member, admin: null })
                break

            case "promote":
                text = `❏ *ADMIN BARU!* ❏
📌 Grup: *${isi_gc.subject}*
🧑‍💼 @${memberId}
${pelaku ? `⚙️ Oleh: @${authorId}` : ''}

✨ Selamat! Kini kamu resmi menjadi admin.
Tunjukkan kepemimpinan terbaikmu 💼`
                thumbnailText = "selamat yaaa"
                isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                isi_gc.participants.push({ id: member, admin: 'admin' })
                break

            case "remove":
                text = `❏ *ANGGOTA KELUAR* ❏
📌 Grup: *${isi_gc.subject}*
👋 @${memberId}
${pelaku ? `❌ Dikeluarkan oleh: @${authorId}` : ''}

🚪 Terima kasih telah menjadi bagian dari grup ini.`
                thumbnailText = "selamat tinggal"
                isi_gc.participants = isi_gc.participants.filter(a => a.id !== member)
                break

            case "add":
                text = `❏ *ANGGOTA BARU* ❏

👥 Grup: *${isi_gc.subject}*
👤 @${memberId}
${pelaku ? '\n' + pelaku : ''}

🌟 Semoga betah dan aktif di sini ya! Jangan malu buat nyapa 😊`
                thumbnailText = "selamat datang"
                isi_gc.participants.push({ id: member, admin: null })
                break

            default:
                continue
        }

        if (db_gc && text && thumbnailText) {
            const thumbnailUrl = (await (await fetch(`${ppUrl}&text=${encodeURIComponent(thumbnailText)}`)).json()).result
            await theo.sendMessage(group_update.id, {
                text,
                contextInfo: {
                    mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])],
                    externalAdReply: {
                        title: `Bot aktif 24 jam`,
                        body: namaBot,
                        thumbnailUrl,
                        renderLargerThumbnail: true,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            })
        }
    }

}