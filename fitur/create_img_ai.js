const theoFitur = async ({ m, theo }) => {
    if (!m.res?.trim()) {
        return m.reply(`❌ *Format salah!*

📌 *Contoh penggunaan:*
${m.prefix}${m.command} anime style, cute girl, in school, reading book`)
    }

    try {
        const aspect_ratio = [
            `1:1`, `16:9`, `9:16`, `2:3`, `3:2`, `4:5`, `5:4`, `21:9`, `9:21`
        ]

        const message = `
🎨 *Permintaan Gambar Terkirim!*
📌 *Prompt:* _${m.res}_

Silakan pilih *rasio gambar* yang diinginkan:
${aspect_ratio.map((val, i) => `${i + 1}. *${val}*`).join('\n')}
`.trim()

        const { key } = await m.reply(message)
        db.user[m.sender].download[key.id] = aspect_ratio.map(a => ({
            aspect_ratio: a,
            prompt: m.res
        }))
    } catch (err) {
        console.error(err)
        m.reply(`❗ Terjadi kesalahan saat memproses gambar. Silakan coba lagi nanti.`)
    }
}

theoFitur.command = ["imageai", "imgai"]
theoFitur.tags = "ai"
theoFitur.limit = true

export default theoFitur
