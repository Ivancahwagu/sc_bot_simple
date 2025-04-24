let theoFitur = async function ({ m, theo }) {

    if (!m.res) return await m.reply(`📥 *Masukkan nomor tujuan!*
                
contoh: ${m.prefix}${m.command} +62 858-9999-0029`);
    let nomor = m.res.replace(/[^0-9]/g, '');
    if (isNaN(nomor) || nomor.startsWith(`0`)) return await m.reply(`🚫 *Nomor tidak valid!*
        
pakai awalan +62 atau sesuai kode negara nomor tujuan`);
    nomor = nomor + '@s.whatsapp.net';
    if (nomor === m.sender) return await m.reply(`🙃 *Tidak bisa mengirim chat ke diri sendiri!*`);
    let [on_wa] = await theo.onWhatsApp(nomor);
    if (!on_wa.exists) return await m.reply(`⚠️ *Nomor tidak terdaftar di WhatsApp!*`);
    let kamu_terhubung = Object.values(db.chat).find(a => a.si_a === m.sender || a.si_b === m.sender);
    if (kamu_terhubung) {
        let partner = kamu_terhubung.si_a === m.sender ? kamu_terhubung.si_b : kamu_terhubung.si_a;
        return await m.reply(`📡 *Kamu masih terhubung dengan @${partner.split('@')[0]}*\n\nGunakan *${m.prefix}akhiri* untuk mengakhiri chat rahasia.`, {
            contextInfo: { mentionedJid: [partner] }
        });
    }
    let dia_terhubung = Object.values(db.chat).find(a => a.si_a === nomor || a.si_b === nomor);
    if (dia_terhubung) {
        return await m.reply(`🚫 *Kamu tidak bisa menghubungi @${nomor.split('@')[0]} karena sedang dalam obrolan rahasia dengan orang lain.*`, {
            contextInfo: { mentionedJid: [nomor] }
        });
    }
    let id = Object.keys(db.chat).length + 1;
    db.chat[id] = { si_a: m.sender, si_b: nomor };
    await m.reply(`✅ *Berhasil terhubung secara rahasia dengan @${nomor.split('@')[0]}*\n\n💬 Semua pesan akan bersifat anonim dan langsung diteruskan.\n\n🔚 Ketik *${m.prefix}akhiri* untuk mengakhiri chat.`, {
        contextInfo: { mentionedJid: [nomor] }
    });
    await theo.sendText(nomor, `❗*Pesan ini dikirim oleh bot*\n\n📩 *Seseorang telah menghubungimu secara rahasia!*\n\n🔐 Kamu sekarang terhubung dengan pengguna anonim.\nGunakan *${m.prefix}akhiri* jika ingin mengakhiri chat.`)
}

theoFitur.private = true;
theoFitur.tags = "fun";
theoFitur.command = ["chatrahasia"];
export default theoFitur;
