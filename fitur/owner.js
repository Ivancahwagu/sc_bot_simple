import { jidNormalizedUser } from "baileys"

let theoFitur = async function ({ m, theo }) {
    const kontak = owner.map(a => ({
        number: a,
        name:
            jidNormalizedUser(theo.user.id).split('@')[0] === a ? `🤖 ${namaBot}` : owner.includes(a) ? '👤 OWNER' : '📞 My Friend',
        label: 'Creator Bot',
        url: `https://wa.me/${a}`,  // Link untuk memulai chat
    }));

    await theo.sendKontak(m.chat, kontak, m.quo)
}

theoFitur.tags = "main"
theoFitur.command = ["owner"]
export default theoFitur
