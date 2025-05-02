let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`⚠️ Format salah!

Contoh penggunaan:
${m.prefix + m.command} Pengumuman`)

    let sukses = 0;
    for (let user of Object.keys(db.user)) {
        try {
            await theo.sendText(user, `Hai @${user.split("@")[0]}

📢 *Pengumuman:*
${m.res}`, m.quo, {
                contextInfo: {
                    mentionedJid: [user]
                }
            });
            sukses++;
            await delay(1000); // kasih delay biar tidak di-detect spam
        } catch (err) {
            console.error(`Gagal kirim ke ${user}:`, err);
        }
    }
    await m.reply(`✅ Broadcast selesai!

Berhasil mengirim ke ${sukses} user.`);
}

theoFitur.tags = "owner";
theoFitur.owner = true;
theoFitur.command = ["bc"];
export default theoFitur;
