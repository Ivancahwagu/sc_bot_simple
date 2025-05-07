import os from 'os'

let theoFitur = async function ({ m, theo }) {
    function getUptime() {
        const total = Math.floor(process.uptime())
        const hari = Math.floor(total / 86400)
        const jam = Math.floor((total % 86400) / 3600)
        const menit = Math.floor((total % 3600) / 60)
        const detik = total % 60
        return `${hari} Hari ${jam} Jam ${menit} Menit ${detik} Detik`
    }
    const mem = process.memoryUsage()
    const usedMemMB = (mem.rss / 1024 / 1024).toFixed(2)
    const info = `
╭─〔 🤖 *INFO BOT* 〕
│📦 *Tipe:* ${theo.type}
│🧠 *Nama:* ${theo.user.name}
│💻 *Versi WhatsApp:* ${theo.ws.config.version.join('.')}
│🌐 *Browser:* ${theo.ws.config.browser[1]}
│⚙️ *Platform:* ${os.platform()}
│📊 *CPU:* ${os.cpus()[0].model}
│🧠 *RAM digunakan:* ${usedMemMB} MB
│⏱️ *Aktif selama:* ${getUptime()}
│📡 *Hostname:* ${os.hostname()}
│📍 *NodeJS:* ${process.version}
╰───────────────
`.trim()

    await m.reply(info)
}

theoFitur.command = ['infobot']
theoFitur.tags = "main"
export default theoFitur
