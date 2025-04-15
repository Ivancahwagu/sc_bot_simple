let theoFitur = async function ({ m, theo }) {
    m.command.toLowerCase() == "on" ? db.group[m.chat].notif.detect = true : db.group[m.chat].notif.detect = false
    await m.reply(`${m.command.toLowerCase() == "on" ? `Berhasil mengaktifkan notif di group ini` : `Berhasil mematikan fitur notif di group ini`}`)
}

theoFitur.tags = "admin"
theoFitur.admin = true
theoFitur.command = ["on", "off"]
export default theoFitur