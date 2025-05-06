export default async function ({ theo, group_update }) {
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
                detect: false,
                antibot: false
            },
            banned: true,
            premium: false,
            sewa: false
        }
    }
    let isi_gc = theo.group[group_update.id]
    let db_gc = db.group[group_update.id].fitur.detect
    let pp = await theo.profilePictureUrl(group_update.id, 'image').catch(e => `https://i.pinimg.com/736x/c5/d7/46/c5d7462a672e07ee74f81ef1a5ee518a.jpg`)
    switch (group_update.action) {
        case "demote": {
            for (const member of group_update.participants) {
                const pelaku = group_update.author && group_update.author !== member ? `📌 *Yang melakukan tindakan ini:* @${group_update.author.replace(/[^0-9]/g, '')}` : ''
                if (db_gc) await theo.sendMessage(group_update.id, {
                    text: `┏━〔 *ADMIN DICABUT* 〕━┓
┃ 📌 Grup: *${isi_gc.subject}*
┃ 👤 @${member.replace(/[^0-9]/g, '')}
${pelaku ? `┃ ⚙️ Oleh: @${group_update.author.replace(/[^0-9]/g, '')}` : ''}
┗━━━━━━━━━━━━━━━━━━━┛

📍 Sekarang kamu kembali jadi member biasa.
Tetap semangat & aktif ya! 🙌`,
                    contextInfo: {
                        mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])],
                        externalAdReply: {
                            title: `Bot aktif 24 jam`,
                            body: namaBot,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://www.youtube.com/@theo_dev-id',
                            showAdAttribution: true
                        }
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
                    text: `┏━〔 *ADMIN BARU!* 〕━┓
┃ 📌 Grup: *${isi_gc.subject}*
┃ 🧑‍💼 @${member.replace(/[^0-9]/g, '')}
${pelaku ? `┃ ⚙️ Oleh: @${group_update.author.replace(/[^0-9]/g, '')}` : ''}
┗━━━━━━━━━━━━━━━━━━━┛

✨ Selamat! Kini kamu resmi menjadi admin.
Tunjukkan kepemimpinan terbaikmu 💼`,
                    contextInfo: {
                        mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])],
                        externalAdReply: {
                            title: `Bot aktif 24 jam`,
                            body: namaBot,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://www.youtube.com/@theo_dev-id',
                            showAdAttribution: true
                        }
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
                    text: `┏━〔 *ANGGOTA KELUAR* 〕━┓
┃ 📌 Grup: *${isi_gc.subject}*
┃ 👋 @${member.replace(/[^0-9]/g, '')}
${pelaku ? `┃ ❌ Dikeluarkan oleh: @${group_update.author.replace(/[^0-9]/g, '')}` : ''}
┗━━━━━━━━━━━━━━━━━━━┛

🚪 Terima kasih telah menjadi bagian dari grup ini.`,
                    contextInfo: {
                        mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])],
                        externalAdReply: {
                            title: `Bot aktif 24 jam`,
                            body: namaBot,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://www.youtube.com/@theo_dev-id',
                            showAdAttribution: true
                        }
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
                        externalAdReply: {
                            title: `Bot aktif 24 jam`,
                            body: namaBot,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://www.youtube.com/@theo_dev-id',
                            showAdAttribution: true
                        },
                        mentionedJid: [member, ...(group_update.author && group_update.author !== member ? [group_update.author] : [])]
                    }
                })

                isi_gc.participants.push({ id: member, admin: null })
            }
            break
        }
    }

}