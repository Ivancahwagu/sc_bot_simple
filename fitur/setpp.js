import { jidNormalizedUser } from "baileys";

let theoFitur = async function ({ m, theo }) {
    if (!/image/.test(m.media?.type)) {
        return await m.reply(
            `❌ *Oops! Anda harus mengirim atau membalas gambar terlebih dahulu.*`
        );
    }
    let pp = await theo.download(m.media);
    await theo.setpp(jidNormalizedUser(theo.user.id), pp);

    await m.reply(
        `✅ *Foto profil berhasil diperbarui!*`
    );
};

theoFitur.tags = "owner";
theoFitur.owner = true;
theoFitur.command = ["setpp"];

export default theoFitur;