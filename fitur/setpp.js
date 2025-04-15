import { jidNormalizedUser } from "baileys"

let theoFitur = async function ({ m, theo }) {
    if (!/image/.test(m.media?.type)) return await m.reply(`kirim gambar/balas gambar`)
    let pp = await theo.download(m.media)
    await theo.setpp(jidNormalizedUser(theo.user.id), pp)
    await m.reply(`berhasil ${m.command}`)
}
theoFitur.tags = "owner"
theoFitur.owner = true
theoFitur.command = ["setpp"]
export default theoFitur