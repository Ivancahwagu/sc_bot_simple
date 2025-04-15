let theoFitur = async function ({ m, theo }) {
    if (m.quoted) {
        if (db.user[m.quoted.sender]) {
            db.user[m.quoted.sender].banned = true
        }

    } else {
        if (m.group) db.group[m.chat].banned = true
        if (db.user[m.chat]) {
            db.user[m.chat].banned = true
        }
    }
    await m.reply(`berhasil banned chat disini`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["bnc", "banchat"]
export default theoFitur