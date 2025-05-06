let theoFitur = async function ({ theo, m }) {
    if (!m.quoted || !m.quoted.message[m.quoted.type]?.viewOnce)
        return await m.reply('❌ Balas *pesan sekali lihat* untuk membuka media.');

    let media = m.quoted
    delete media.message[media.type]['viewOnce']

    try {
        let hasil = await theo.download(media)
        await theo.sendMedia(m.chat, hasil, '✅ Berhasil membuka dan mengirim ulang media sekali lihat.', m.quo)
    } catch (err) {
        console.error(err)
        await m.reply('⚠️ Gagal membuka media. Coba lagi atau pastikan medianya masih tersedia.')
    }
}

theoFitur.premium = true
theoFitur.command = ["rvo"]
theoFitur.tags = "premium"
export default theoFitur
