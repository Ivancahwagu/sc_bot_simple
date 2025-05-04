import { textImageAdvanced } from "../tools/image.js";
import PhoneNumber from "awesome-phonenumber";
import fs from 'fs';
import { getUptime } from './../tools/func.js';

let theoFitur = async function ({ m, theo }) {
    const waktu = new Date();
    const userData = db.user[m.sender];
    const nomorUser = PhoneNumber(`+` + m.sender.split(`@`)[0]).getNumber(`international`);
    const statusUser = m.owner ? `Owner` : userData?.premium ? `Premium` : `Free User`;

    let image = await textImageAdvanced(
        fs.readFileSync(__dirname + `/img/menu.jpg`),
        `${namaBot}`, 934, 538,
        `./font/menu.fnt`, `center`, `top`, 50, 50, 70, 50
    );

    image = await textImageAdvanced(
        image,
        userData
            ? `Nama: ${m.name}
Status: ${statusUser}
Nomor: ${nomorUser}
Limit: ${userData.limit}`
            : `Anda belum terdaftar di bot ini.`,
        null, null,
        `./font/menu2.fnt`, `left`, `top`, 260, 260, 150, 50
    );

    image = await textImageAdvanced(image, `${waktu.getDate()}/${waktu.getMonth() + 1}/${waktu.getFullYear()}`, null, null, `./font/menu2.fnt`, `left`, `top`, 20, 20, 20, 20);
    image = await textImageAdvanced(image, `Created by Ivan`, null, null, `./font/menu2.fnt`, `right`, `bottom`, 20, 20, 20, 20);

    const tags = [...new Set(menu.filter(tag => tag.tags).map(tag => tag.tags))];

    const deskripsi = `🌟 *Selamat datang di ${namaBot}!*  

╭─❖ 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭
│🤖 Nama Bot: *${namaBot}*
│📜 Total Fitur: *${fs.readdirSync(__dirname + `/fitur`).filter(a => !a.startsWith(`_`)).length}*
│📱 Total User: *${Object.keys(db.user).length}*
│🌐 Web Api: *${webApi}*
│🎮 Server MC:
│   ├ IP   : 147.139.179.157
│   ├ Port : 19132
│   ├ URL  : ${webApi}/mc
│   └ Platform: *BEDROCK ONLY*
╰─────────────
📽️ chanel yt: *${youtube_chanel}*
📷 instagram: *${instagram}*
🐈‍⬛ github: *${github}*

🕐 *Runtime:*  
${getUptime()}

📢 *JASA PEMBUATAN WEBSITE, BOT, API*  
🌐 https://www.dins.my.id  
✅ Amanah, Terpercaya  
💰 Harga Terjangkau  
🙋 Admin Ramah

👥 Mau gabung ke grup ${namaBot}?  
🔗 ${link_gc}`;

    switch (m.command.toLowerCase()) {
        case "menu":
        case "help":
            var { key } = await theo.sendMedia(m.chat, image, `${deskripsi}

📌 *Petunjuk:*
💠 = Fitur memakai limit  
💎 = Fitur khusus Premium

📑 *List Menu:*
${tags.map((item, i) => ` ${i + 1}. *${item}*`).join(`\n`)}

📝 *Balas pesan ini* dengan angka atau nama menu yang ingin kamu buka.

📂 Lihat semua fitur:
➤ *${m.prefix}allmenu*`, m.quo, {
                contextInfo: {
                    externalAdReply: {
                        thumbnail: fs.readFileSync(__dirname + `/img/thumb.png`),
                        showAdAttribution: true,
                        mediaType: 1,
                        title: namaBot,
                        renderLargerThumbnail: true,
                        sourceUrl: `https://chat.whatsapp.com/HB5oAs0zKnbAdM9XBzZEop`,
                        thumbnailUrl: `https://chat.whatsapp.com/HB5oAs0zKnbAdM9XBzZEop`,
                    }
                }
            });

            theo.menu[m.sender] = {
                [key.id]: { prefix: m.prefix, tags }
            };
            break;

        case "allmenu":
            await theo.sendMedia(m.chat, image, `${deskripsi}

📌 *Keterangan:*
💠 = Memakai limit  
💎 = Khusus pengguna premium  

╭───🎉 *DAFTAR MENU* ───╮
${tags.map(tag => `
╭─❏ *${tag.toUpperCase()}*
${menu
                    .filter(item => item.tags === tag)
                    .map(c => `│ ⤷ ${m.prefix}${c.command} ${c.limit ? '💠' : c.premium ? '💎' : ''}`)
                    .join('\n')}
╰───────────────╯`).join('\n\n')}
_Terima kasih telah menggunakan ${namaBot}!_`, m.quo, {
                contextInfo: {
                    externalAdReply: {
                        thumbnail: fs.readFileSync(__dirname + `/img/thumb.png`),
                        showAdAttribution: true,
                        mediaType: 1,
                        title: namaBot,
                        renderLargerThumbnail: true,
                        sourceUrl: `https://chat.whatsapp.com/HB5oAs0zKnbAdM9XBzZEop`,
                        thumbnailUrl: `https://chat.whatsapp.com/HB5oAs0zKnbAdM9XBzZEop`,
                    }
                }
            });
            break;

    }
};

theoFitur.tags = "main";
theoFitur.command = ["menu", "help", "allmenu"];
export default theoFitur;
