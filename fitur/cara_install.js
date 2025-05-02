let theoFitur = async function ({ m, theo }) {
    await m.reply(`📦 *TUTORIAL INSTALL SCRIPT BOT DI TERMUX*
📌 *Note:*
- Pastikan file ZIP script bot sudah diekstrak ke Termux.
- Script ini berjalan di Node.js. versi 18 keatas
- Jika error, kirim SS ke owner bot atau cek ulang langkah-langkahnya. Semangat ya kak 💪

Bot by: ${namaBot}`);

    let { key } = await m.reply(`salin ini dan tempel di termux`)
    await delay(1000)
    await m.reply(`pkg update -y && pkg upgrade -y
pkg install nodejs -y
pkg install ffmpeg -y
pkg install unzip -y
pkg install git -y
termux-setup-storage
mkdir bot
cd bot
git clone https://github.com/Ivancahwagu/sc_bot_simple
cd sc_bot_simple
nano setting.js
npm i
npm start`, { edit: key })

};
theoFitur.command = ["carainstall"];
theoFitur.tags = "main";
export default theoFitur;
