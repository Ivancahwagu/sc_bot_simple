const theoFitur = async ({ m, theo }) => {
    let nomor = m.res.replace(/\D/g, '')
    if (!m.res || isNaN(parseInt(nomor))) {
        return m.reply(`❌ *Format salah!*\n\n📌 Contoh: ${m.prefix}${m.command} @tag`);
    }

    nomor = nomor + '@s.whatsapp.net';


    const user = db.user[nomor];
    if (!user) return m.reply(`🚫 User belum terdaftar.`);
    if (!user.premium) return m.reply(`⚠️ User ini bukan pengguna premium.`);

    user.premium = false;

    await m.reply(`✅ Berhasil menghapus status premium dari @${nomor.split('@')[0]}`, {
        contextInfo: { mentionedJid: [nomor] }
    });

    await theo.sendText(
        nomor,
        `👋 Hai @${nomor.split('@')[0]}, status premium kamu telah dihapus oleh admin.`,
        m.quo,
        {
            contextInfo: { mentionedJid: [nomor] }
        }
    );
};

theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["delprem"];

export default theoFitur;
