import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let premium = Object.keys(db.user).filter(a => db.user[a].premium)

    if (premium.length === 0) return await m.reply("📭 Belum ada user premium yang terdaftar.")


    let isi = premium.map((isi, index) => {
        return `${index + 1}. @${isi.replace(/[^0-9]/g, '')}  •  *${typeof db.user[isi].premium == "number" ? selisih_waktu_now(db.user[isi].premium) : db.user[isi].premium}*`
    }).join('\n')

    await m.reply(`👑 *List Premium User* 👑

${isi}`, {
        contextInfo: {
            mentionedJid: premium
        }
    })
}

theoFitur.tags = "owner"
theoFitur.command = ["listprem"]
theoFitur.owner = true
export default theoFitur
