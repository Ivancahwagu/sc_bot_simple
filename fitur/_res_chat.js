import { jidNormalizedUser } from "baileys"

export default async function theoFitur({ m, theo }) {
    if (!m.group) {
        if (!m.prefix) {
            let search = Object.values(db.chat).filter(a => a.si_a == m.sender || a.si_b == m.sender)
            if (search.length == 1) {
                console.log(`forward`)
                let nomor = Object.values(search[0]).filter(a => a !== m.sender && typeof a == "string")[0]
                if (m.quoted) {
                    if (m.quoted.sender !== m.sender) {
                        m.message[m.type].contextInfo.participant = nomor
                    } else {
                        m.message[m.type].contextInfo.participant = jidNormalizedUser(theo.user.id)
                    }
                }
                // console.log(m)
                await theo.forward(nomor, m, {
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363181509677367@newsletter',
                            serverMessageId: null,
                            newsletterName: '📨 Dari Chat Rahasia'
                        }
                    }
                })
            }
        } else {
            if (m.command) {
                let command = m.command.toLowerCase()
                switch (command) {
                    case "akhiri": {
                        let sesi = Object.entries(db.chat).find(([_, a]) => a.si_a === m.sender || a.si_b === m.sender);
                        if (!sesi) return await m.reply(`❌ *Kamu tidak sedang dalam chat rahasia.*`);

                        let [id, { si_a, si_b }] = sesi;
                        let partner = m.sender === si_a ? si_b : si_a;

                        delete db.chat[id];
                        await m.reply(`✅ *Chat rahasia berhasil diakhiri.*`);
                        await theo.sendText(partner, `📴 *Chat rahasia telah diakhiri oleh lawan bicaramu.*`)
                    }
                        break;
                }
            }
        }
    }
}