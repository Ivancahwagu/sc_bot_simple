import { toVillager } from "../tools/scrape.js"
import { toMp3 } from './../tools/file.js';

let theoFitur = async function ({ m, theo }) {
    if (!m.media?.type.includes(`audio`)) return await m.reply(`balas pesan audio untuk mengubah ke suara villager`)
    let sound = await toMp3(await getBuffer(await toVillager(await theo.download(m.media))))
    await theo.sendMedia(m.chat, sound, ``, m.quo)
}
theoFitur.limit = true
theoFitur.tags = "tools"
theoFitur.command = ["tovillager"]
export default theoFitur