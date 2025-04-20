let theoFitur = async function ({ m, theo }) {
    if (!/image/.test(m.media?.type)) {
        return await m.reply(
            `❌ *Oops! Anda harus mengirim atau membalas gambar terlebih dahulu.*`
        );
    }

    let pp = await theo.download(m.media);
    await theo.setpp(m.chat, pp);

    await m.reply(
        `✅ *Berhasil memperbarui foto profil grup!*`
    );
};

theoFitur.tags = "admin";
theoFitur.admin = true;
theoFitur.botAdmin = true;
theoFitur.command = ["setppgc"];

export default theoFitur;