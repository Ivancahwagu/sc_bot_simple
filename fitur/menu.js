import { textImageAdvanced } from "../tools/image.js"
import PhoneNumber from "awesome-phonenumber";
import fs from 'fs';

let theoFitur = async function ({ m, theo }) {
    // console.log(menu)
    let image = await textImageAdvanced(fs.readFileSync(__dirname + `/img/menu.jpg`), `${namaBot}`, 934, 538, `./font/menu.fnt`, `center`, `top`, 50, 50, 70, 50)
    image = await textImageAdvanced(image, db.user[m.sender] ? `nama: ${m.name}
status: ${m.owner ? `owner` : db.user[m.sender]?.premium ? `premium` : `free user`}
nomor: ${PhoneNumber(`+` + m.sender.split(`@`)[0]).getNumber(`international`)}
limit: ${db.user[m.sender].limit}` : `anda belum daftar di bot ini`, null, null, `./font/menu2.fnt`, `left`, `top`, 260, 260, 150, 50)
    let waktu = new Date(Date.now())
    image = await textImageAdvanced(image, `${waktu.getDate()}/${waktu.getMonth() + 1}/${waktu.getFullYear()}`, null, null, `./font/menu2.fnt`, `left`, `top`, 20, 20, 20, 20)
    image = await textImageAdvanced(image, `Created by Ivan`, null, null, `./font/menu2.fnt`, `right`, `bottom`, 20, 20, 20, 20)
    let tags = []
    for (const tag of menu) {
        if (tag.tags) {
            if (!tags.includes(tag.tags)) {
                tags.push(tag.tags)
            }
        }
    }
    switch (m.command.toLowerCase()) {
        case "menu": case "help": {
            let { key } = await theo.sendMedia(m.chat, image, `*👋 Hai, saya ${namaBot}*

Saya adalah bot WhatsApp yang dikembangkan oleh Ivan.

╭───❖ 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭
│🤖 Nama Bot: *${namaBot}*
│📱 Total User: *${Object.keys(db.user).length}*
│🎮 Server MC:
│   ├ IP   : 147.139.179.157
│   ├ Port : 19132
│   └ Website : store.berapi.my.id
│📦 Platform: *BEDROCK ONLY*
╰─────────────

📌 *Keterangan fitur:*  
💠 (L) = Memakai limit  
💎 (P) = Khusus pengguna premium 

*📑 List Menu:*
${tags.map((item, index) => ` ${index + 1}. *${item}*`).join(`\n`)}

➤ Balas pesan ini dengan nomor menu yang ingin kamu akses.

ingin semua menu?

ketik: *.allmenu*

_Terima kasih telah menggunakan ${namaBot}!_`, m.quo)


            theo.menu[m.sender] = {}
            theo.menu[m.sender][key.id] = { prefix: m.prefix, tags }
        }
            break
        case "allmenu": {
            await theo.sendMedia(m.chat, image, `🌟 *Selamat datang di ${namaBot}!*  
Saya adalah bot WhatsApp yang dikembangkan oleh Ivan 

╭───❖ 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭
│🤖 Nama Bot: *${namaBot}*
│📱 Total User: *${Object.keys(db.user).length}*
│🎮 Server MC:
│   ├ IP   : 147.139.179.157
│   ├ Port : 19132
│   └ Website : store.berapi.my.id
│📦 Platform: *BEDROCK ONLY*
╰─────────────

📌 *Keterangan fitur:*  
💠 (L) = Memakai limit  
💎 (P) = Khusus pengguna premium  

╭━━━━ *DAFTAR MENU* ━━━━╮
${tags.map(tag => `
╔═──────── ⋆⋅☆⋅⋆ ────────═╗
  📂 *${tag.toUpperCase()}*
╟──────────────────────╢
${menu.filter(item => item.tags == tag).map(c => `┃ ⤷ *${m.prefix}${c.command}* ${c.limit ? '💠' : c.premium ? '💎' : ''}`).join('\n')}
╚═────────────────────═╝`).join(`\n`)}

🙏 *Terima kasih telah menggunakan ${namaBot}!*`, m.quo)

        }
    }

}

theoFitur.tags = "main"
theoFitur.command = [`menu`, `help`, "allmenu"]
export default theoFitur