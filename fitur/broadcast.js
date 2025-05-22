let theoFitur = async function ({ m, theo }) {
    if (!m.res) {
        return await m.reply(`❗ *Format Salah!*

Gunakan perintah ini untuk broadcast ke seluruh pengguna bot.

📌 *Contoh:*
\`${m.prefix + m.command} Bot maintenance jam 7 malam\``);
    }

    let sukses = 0;
    for (let user of Object.keys(db.user)) {
        try {
            await theo.sendText(user, `🔔 *PENGUMUMAN BOT*

Hai *@${user.split("@")[0]}*, ada informasi penting dari owner! 📢

━━━━━━━━━━━━━━━
${m.res}
━━━━━━━━━━━━━━━

🙏 Terima kasih atas perhatianmu!`, m.quo, {
                contextInfo: {
                    mentionedJid: [user]
                }
            });
            sukses++;
            await delay(5000); // hindari spam detection
        } catch (err) {
            console.error(`❌ Gagal kirim ke ${user}:`, err);
        }
    }

    await m.reply(`✅ *Broadcast Selesai!*

Berhasil mengirim pesan ke *${sukses}* pengguna.`);
}

theoFitur.tags = "owner";
theoFitur.owner = true;
theoFitur.command = ["bc"];
export default theoFitur;
