import { download_termux } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    let termux = await download_termux()
    await m.reply(`📲 *Download Termux APK*

🚧 *BETA VERSION*
Versi: ${termux.beta_version}
Unduh: ${termux.beta_url}

✅ *OFFICIAL VERSION*
Versi: ${termux.official_version}
Unduh: ${termux.official_url}

Gunakan versi *official* untuk kestabilan, dan *beta* untuk fitur terbaru.`)

}

theoFitur.tags = "tools"
theoFitur.command = ["termux"]
export default theoFitur