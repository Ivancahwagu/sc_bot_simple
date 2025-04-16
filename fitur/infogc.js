import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let db_gc = db.group[m.chat]
    let data_gc = theo.group[m.chat]
    let fitur_gc = Object.keys(db_gc.fitur)
    await m.reply(`╭───「 *📊 INFO GRUP* 」───╮
│ 🏷️ Nama Grup : ${data_gc.subject}
│ 👥 Jumlah Anggota : ${data_gc.participants.length}
│ 🚫 Banned : ${db_gc.banned ? `✅ Ya` : `❌ Tidak`}
│ ⏳ Sewa : ${typeof db_gc.sewa == "number" ? selisih_waktu_now(db_gc.sewa) : `❌ Tidak`}
│ 💎 Premium : ${db_gc.premium ? `✅ Aktif` : `❌ Tidak`}
│⚙️ Fitur Grup :
${fitur_gc.map(a => `│ ▸ ${a} : ${db_gc.fitur[a] ? `✅` : `❌`}`).join(`\n`)}
│ 
│ 👑 *Admin Grup* :
${m.listAdmin.map(a => `│ @${a.replace(/[^0-9]/g, ``)}`).join(`\n`)}
╰──────────────────────╯`, {
        contextInfo: {
            mentionedJid: m.listAdmin
        }
    })
}
theoFitur.group = true
theoFitur.tags = "group"
theoFitur.command = ["infogc", "infogroup"]
export default theoFitur