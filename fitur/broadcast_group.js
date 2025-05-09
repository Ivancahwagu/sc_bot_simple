let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`❗ *Format Salah!*

Gunakan perintah ini untuk mengirim pengumuman ke semua grup:

📌 *Contoh:*
\`${m.prefix + m.command} Pengumuman penting dari owner bot!\``)

    let sukses = 0
    let list_group = Object.keys(db.group).filter(a => db.group[a].sewa || !db.group[a].banned)

    for (const id_gc of list_group) {
        let info_gc
        try {
            info_gc = theo.group[id_gc] || await theo.groupMetadata(id_gc)
            if (info_gc) {
                theo.group[id_gc] = info_gc

                await theo.sendText(id_gc, `📣 *PENGUMUMAN BOT*

Halo anggota grup *${info_gc.subject}*! 👋

${m.res}

━━━━━━━━━━━━━━━
_📤 Pesan dikirim oleh owner bot._
`, m.quo)
                sukses++
                await delay(1000)
            }
        } catch (err) {
            console.error(`❌ Gagal kirim ke ${id_gc}:`, err)
        }
    }

    await m.reply(`✅ *Broadcast Selesai!*

Berhasil mengirim pesan ke *${sukses}* grup.`)
}

theoFitur.command = ["bcgc"]
theoFitur.tags = "owner"
theoFitur.owner = true
export default theoFitur