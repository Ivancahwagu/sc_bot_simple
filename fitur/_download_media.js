import { create_img_ai, id_to_en, shortlink } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (!db.user[m.sender]) return;
    if (m.prefix) return
    if (m.quoted) {
        if (db.user[m.sender].download[m.quoted.id]) {
            let no = parseInt(m.text);
            if (isNaN(m.text))
                return await m.reply(`❗ Harap balas dengan *nomor yang valid*.`);
            if (no < 1)
                return await m.reply(`⚠️ Nomor terlalu kecil. Minimal: *1*.`);
            if (no > db.user[m.sender].download[m.quoted.id].length)
                return await m.reply(`⚠️ Nomor terlalu besar. Maksimal: *${db.user[m.sender].download[m.quoted.id].length}*.`);

            await m.react(`⏳`);
            let data = db.user[m.sender].download[m.quoted.id][no - 1];
            if (data.aspect_ratio) {
                let hasil = await create_img_ai(await id_to_en(data.prompt), no)
                await theo.sendMedia(m.chat, hasil, `✅ Gambar berhasil dibuat berdasarkan deskripsi:\n\n📝 "${data.prompt}"`, m.quo)
            } else {


                if (data.type?.toLowerCase().includes(`hd`)) {
                    let shortUrl;
                    try {
                        const { result } = await shortlink(data.url);
                        shortUrl = result;
                    } catch (e) {
                        shortUrl = res.download;
                    }
                    await m.reply(`⚡ *Kualitas HD terdeteksi!* \n🙏 Maaf, untuk menghindari overload bot, gunakan link berikut untuk mengunduh:\n${shortUrl}`)
                } else {
                    await theo.sendMedia(m.chat, data.url, `📩 Media berhasil dikirim!`, m.quo);
                }
            }
        }
    }
};
export default theoFitur;