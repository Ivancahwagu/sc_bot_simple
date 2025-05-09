import { ai } from "../tools/scrape.js";

let theoFitur = async ({ m, theo }) => {
    if (!m.res && m.command.toLowerCase() === "bot") {
        return await m.reply(`🤖 *Apalah... Bot bot bot...*

Jika nomor ini terlihat *lama online*, berarti bot sedang aktif ya pe'a~`);
    }

    if (!m.res) {
        return await m.reply(`⚠️ *Format salah!*

Kirim pertanyaan seperti:
${m.prefix}${m.command} Siapa pencipta alam semesta?`);
    }

    let data = await ai(m.sender, m.name, db.user[m.sender].ai, m.res, namaBot);

    if (data) {
        let tags = data.jawab?.match(/@\d{5,}/g)?.map(jid => jid.replace("@", "") + "@s.whatsapp.net") || [];

        db.user[m.sender].ai = data.payload;

        await m.reply(data.jawab, {
            contextInfo: {
                mentionedJid: tags
            }
        });
    } else {
        await m.reply("❌ Maaf, tidak dapat menjawab pertanyaanmu.");
    }
};

theoFitur.limit = true;
theoFitur.tags = "ai";
theoFitur.command = ["ai", "openai", "chatgpt", "bot"];
export default theoFitur;
