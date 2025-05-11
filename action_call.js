export default async function name({ call, theo }) {
    if (call.status === "offer") {
        if (!db.config.anticall) return
        await theo.sendText(
            call.chatId,
            `📞 Halo @${call.chatId.split("@")[0]}, kami mendeteksi adanya panggilan masuk.

Mohon maaf, bot ini **tidak dapat menerima panggilan suara maupun video**.

📴 Panggilan Anda telah **ditolak secara otomatis oleh sistem**.

Jika ada keperluan, silakan hubungi lewat pesan teks saja ya 😊

🙏 Terima kasih atas pengertiannya.`,
            null,
            { contextInfo: { mentionedJid: [call.chatId] } }
        );

        await theo.reject(call.id, call.from);
    }
}