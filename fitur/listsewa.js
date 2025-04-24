import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let sewa = Object.keys(db.group).filter(a => db.group[a].sewa)

    if (sewa.length === 0) return await m.reply("📭 Belum ada sewa group yang terdaftar.")


    let isi = sewa.map((isi, index) => {
        return `${index + 1}. ${theo.group[isi] ? theo.group[isi].subject : isi}  •  *${typeof db.group[isi].sewa == "number" ? selisih_waktu_now(db.group[isi].sewa) : db.group[isi].sewa}*`
    }).join('\n')

    await m.reply(`⏱️ *List Group Sewa* ⏱️

${isi}`)
}

theoFitur.tags = "owner"
theoFitur.command = ["listsewa"]
theoFitur.owner = true
export default theoFitur
