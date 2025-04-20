let theoFitur = async ({ m, theo }) => {
    let colors = [
        "ff26c4dc", "ff792138", "ff8b6990", "fff0b330", "ffae8774",
        "ff5696ff", "ffff7b6b", "ff57c9ff", "ff243640", "ffb6b327",
        "ffc69fcc", "ff54c265", "ff6e257e", "ffc1a03f", "ff90a841",
        "ff7acba5", "ff8294ca", "ffa62c71", "ffff8a8c", "ff7e90a3", "ff74676a"
    ]

    await m.reply(`📤 Mengunggah ke *Status WhatsApp*...`)

    let pesan
    if (m.media) {
        let mediaData = await theo.download(m.media)
        pesan = await theo.sendMedia("status@broadcast", mediaData, m.res, {
            statusJidList: Object.keys(db.user),
        }, {
            ptt: true,
            contextInfo: {
                forwardingScore: 1,
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363181509677367@newsletter',
                    serverMessageId: 113,
                    newsletterName: 'SANSBOT'
                }
            }
        })
    } else {
        pesan = await theo.sendMessage("status@broadcast", {
            text: m.res
        }, {
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            textArgb: colors[Math.floor(Math.random() * colors.length)],
            font: Math.floor(Math.random() * 9),
            statusJidList: Object.keys(db.user),
        })
    }

    console.log(pesan)
    await m.reply(`✅ *Status berhasil diunggah!*`)
}

theoFitur.tags = "owner"
theoFitur.owner = true
theoFitur.command = ["upsw", "uploadstatus"]
export default theoFitur
