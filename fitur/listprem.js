import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let premium = Object.entries(db['user'])
        .filter(([_, data]) => data.premium)
        .map(([_, data]) => {
            let data_premium = {}

            if (typeof data.premium === "number") {

                data_premium.premium = selisih_waktu_now(data.premium)
                return [_, data_premium]
            } else {

                data_premium.premium = data.premium;
                return [_, data_premium]
            }
        });

    let no = 1
    await m.reply(`list premium user:
${premium.map(a => `${no++}. @${a[0].replace(/[^0-9]/g, ``)} ${a[1].premium}`).join(`\n`)}`, {
        contextInfo: {
            mentionedJid: premium.map(a => a[0])
        }
    })
}
theoFitur.tags = "owner"
theoFitur.command = ["listprem"]
theoFitur.owner = true
export default theoFitur