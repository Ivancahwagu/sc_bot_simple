let theoFitur = async function ({ m, theo }) {
    let db_gc = db.group[m.chat]
    let data_gc = theo.group[m.chat]
    let fitur_gc = Object.keys(db_gc.fitur)
    await m.reply(`${data_gc.subject}

total anggota: ${data_gc.participants.length}
banned: ${db_gc.banned ? `✅` : `❌`}
sewa: ${db_gc.sewa ? `✅` : `❌`}
premium: ${db_gc.premium ? `✅` : `❌`}
${fitur_gc.map(a => `${a}: ${db_gc.fitur[a] ? `✅` : `❌`}`).join(`\n`)}
`)
}
theoFitur.group = true
theoFitur.command = ["infogc", "infogroup"]
export default theoFitur