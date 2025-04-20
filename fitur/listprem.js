import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let premium = Object.entries(db['user'])
        .filter(([_, data]) => data.premium)
        .map(([id, data]) => {
            let info = {}
            if (typeof data.premium === "number") {
                info.premium = selisih_waktu_now(data.premium)
            } else {
                info.premium = data.premium // misalnya "permanen"
            }
            return [id, info]
        })

    if (premium.length === 0) return await m.reply("📭 Belum ada user premium yang terdaftar.")

    let no = 1
    let isi = premium.map(([id, info]) => {
        return `${no++}. @${id.replace(/[^0-9]/g, '')}  •  ${info.premium}`
    }).join('\n')

    await m.reply(`👑 *List Premium User* 👑

${isi}`, {
        contextInfo: {
            mentionedJid: premium.map(([id]) => id)
        }
    })
}

theoFitur.tags = "owner"
theoFitur.command = ["listprem"]
theoFitur.owner = true
export default theoFitur
