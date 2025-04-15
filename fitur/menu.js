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
    await theo.sendMedia(m.chat, image, `> *Hai, saya ${namaBot}. Saya adalah bot whatsapp yang dikembangkan oleh alfin.*

Join my minecraft server
IP  : 147.139.179.157
Port: 19132
Link: https://chat.whatsapp.com/JU1lMB5VZVpDto40OUlhLt

*BEDROCK ONLY*

(L): Fitur ini memakai limit
(P): FItur ini khusus user premium
*List menu:*


${tags.map(a => `╔═══════════════════╗
║       *${a.toUpperCase()}*      
╠═══════════════════╣
${menu.filter(b => b.tags == a).map(c => `║ ${m.prefix}${c.command} ${c.limit ? `(L)` : c.premium ? `(P)` : ``}`).join(`\n`)}
╚═══════════════════╝`).join(`\n\n`)}

*terimakasih sudah memakai ${namaBot}*`, m.quo)
}

theoFitur.tags = "main"
theoFitur.command = [`menu`, `help`]
export default theoFitur