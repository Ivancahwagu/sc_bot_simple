import { ttconvert } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!db.user[m.sender]) return
    if (m.quoted) {
        if (db.user[m.sender].download[m.quoted.id]) {
            let no = parseInt(m.text)
            if (isNaN(m.text)) return await m.reply(`balas dengan nomor yang anda inginkan`)
            if (no < 0) return await m.reply(`nomor anda terlalu kecil minimal 1`)
            if (no > db.user[m.sender].download[m.quoted.id].length) return await m.reply(`nomor anda terlalu besar maksimal ${db.user[m.sender].download[m.quoted.id].length}`)
            await m.react(`⏳`)
            let data = db.user[m.sender].download[m.quoted.id][no - 1]

            data.type?.toLowerCase().includes(`hd`) ? await m.reply(`kalo hd
                    
maaf🙏, untuk menghindari bot overload

link untuk download hd: ${data.url}`) : await theo.sendMedia(m.chat, data.url, ``, m.quo)

        }
    }
}
export default theoFitur