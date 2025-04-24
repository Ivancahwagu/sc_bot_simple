let theoFitur = async function ({ m, theo }) {
    function getUptime() {
        const total = Math.floor(process.uptime())
        const hari = Math.floor(total / 86400)
        const jam = Math.floor((total % 86400) / 3600)
        const menit = Math.floor((total % 3600) / 60)
        const detik = total % 60
        return `${hari} hari ${jam} jam ${menit} menit ${detik} detik`
    }

    let info = `
╭───[ 🤖 *INFO BOT* ]
│📦 *Tipe:* ${theo.type}
│💻 *Versi:* ${theo.ws.config.version}
│🌐 *Browser:* ${theo.ws.config.browser}
│👤 *Nama:* ${theo.user.name}
╰───────────────

⏱️ *Bot aktif selama:*
${getUptime()}
`.trim()

    await m.reply(info)
}

theoFitur.command = ['infobot']
theoFitur.tags = "main"
export default theoFitur
