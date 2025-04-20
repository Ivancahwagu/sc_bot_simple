let theoFitur = async ({ m, theo }) => {
    await m.reply(`🚀 *Mengambil data peserta yang ingin bergabung ke grup...*`);
    let request = await theo.groupRequestParticipantsList(m.chat);
    if (request.length === 0) {
        return await m.reply(`🤷‍♂️ *Tidak ada orang yang meminta bergabung ke grup ini.*`);
    }
    for (const member of request) {
        console.log(`📋 Permintaan diterima:`, request);
        await delay(1000);
        await theo.groupRequestParticipantsUpdate(
            m.chat,
            [member.jid],
            "approve"
        );
    }
    await m.reply(`✅ *Selesai! Semua permintaan peserta telah disetujui.*`);
};
theoFitur.admin = true;
theoFitur.botAdmin = true;
theoFitur.tags = "admin";
theoFitur.command = ["acc"];
export default theoFitur;