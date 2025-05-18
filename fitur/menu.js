import { imgRezize, readImage, roundedImg, textImageAdvanced, timpaImg } from "../tools/image.js";
import PhoneNumber from "awesome-phonenumber";
import os from "os"
import fs from 'fs';
import { getUptime, tanggal_now } from './../tools/func.js';
import path from "path";

let theoFitur = async function ({ m, theo }) {
    let menu = global.menu
    const waktu = tanggal_now();
    const userData = db.user[m.sender];
    const nomorUser = PhoneNumber(`+` + m.sender.split(`@`)[0]).getNumber(`international`);
    const statusUser = m.owner ? `DEVELOPER BOT` : userData?.premium ? `PREMIUM USER` : userData ? `FREE USER` : `BELUM DAFTAR`;
    let pp = await getBuffer(await theo.getPP(m.sender).catch(e => fs.readFileSync(path.join(__dirname, "img", "pp.jpg"))))
    let image = fs.readFileSync(path.join(__dirname, "img", "menu.png"));
    let { width, height } = await readImage(image)
    let totalFitur = fs.readdirSync(__dirname + `/fitur`).filter(a => !a.startsWith(`_`)).length
    image = await timpaImg(image, await roundedImg(await imgRezize(pp, 286, 286), 99, 3), null, null, 0, 60, "center", "top")
    image = await textImageAdvanced(image, nomorUser, null, null, path.join(__dirname, 'font', 'b_font1.fnt'), "center", "top", 50, 50, 380, 50)
    image = await textImageAdvanced(image, statusUser ? statusUser : "BELUM DAFTAR", null, null, path.join(__dirname, 'font', 'b_font2.fnt'), "center", "top", 50, 50, 500, 50)
    image = await textImageAdvanced(image, `Terima kasih sudah menggunakan bot ini. Saya jadi bersemangat untuk terus membuatnya lebih baik`, null, null, path.join(__dirname, `font`, `s_font1.fnt`), "center", "top", 300, 300, 600, 50)
    image = await textImageAdvanced(image, userData ? userData.limit.toString() : `0`, null, null, path.join(__dirname, 'font', 'b_font3.fnt'), "center", "top", (width / 2) + 20, 150, 860, 50)
    image = await textImageAdvanced(image, totalFitur.toString(), null, null, path.join(__dirname, 'font', 'b_font3.fnt'), "center", "top", 150, (width / 2) + 20, 860, 50)


    const tags = [...new Set(menu.filter(tag => tag.tags).map(tag => tag.tags))];
    const deskripsi = `🌟 *Selamat datang di ${namaBot}!*  

╭─❖ 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭
│🌐 Web Api: *${webApi}*
│🎮 Server MC:
│   ├ IP   : https://${webApi}/join-minecraft-server
│   ├ Port : 19132
│   └ Platform: *BEDROCK ONLY*
╰─────────────
📽️ chanel yt: *${youtube_chanel}*
📷 instagram: *${instagram}*
🐈‍⬛ github: *${github}*

📢 *JASA PEMBUATAN WEBSITE, BOT, API*  
🌐 https://www.dins.my.id  
✅ Amanah, Terpercaya  
💰 Harga Terjangkau  
🙋 Admin Ramah

👥 Mau gabung ke grup ${namaBot}?  
🔗 ${link_gc}

📌 *Keterangan:*
🪙 = Memakai limit  
🔑 = Khusus pengguna premium
⚙️ = Khusus admin
👑 = Khusus owner`;

    switch (m.command.toLowerCase()) {
        case "menu":
        case "help":
            var { key } = await theo.sendMedia(m.chat, image, `${deskripsi}

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

╭───🎉 *DAFTAR MENU* ───╮
${tags.map(tag => `
╭─❏ *${typeof tag === "string" ? tag.toUpperCase() : `MORE`}*
${menu
                    .filter(item => item.tags === tag)
                    .map(c => `│ ⤷ ${m.prefix}${c.command} ${c.limit ? '🪙' : c.premium ? '🔑' : c.admin ? '⚙️' : c.owner ? '👑' : ''}`)
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
