import fetch from "node-fetch";

let theoFitur = async function ({ m, theo }) {

    try {
        let res = await (await fetch(`${webApi}/user/cek?apikey=${global.apikey}`)).json()

        if (res.failed) {
            return await m.reply(`❌ API key tidak ditemukan atau tidak valid.`);
        }
        res = res.data;
        await m.reply(`🔐 *Info API Key Kamu:*

📊 Limit: ${res.limit}
💎 Premium: ${res.premium ? "✔️ Aktif" : "❌ Tidak Aktif"}`);
    } catch (err) {
        await m.reply(`❌ Terjadi kesalahan saat memeriksa API key.`);
    }
};

theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["cekapi"];
export default theoFitur;
