import fs from "fs"
import path from "path"
import { encjs } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    let tools_path = path.join(__dirname, "tools")
    let tools_file = fs.readdirSync(tools_path)
    for (const files of tools_file) {
        if(!files.incluses(`scrape`)){
        let tools_file_path = path.join(tools_path, files)
        let kode = fs.readFileSync(tools_file_path, "utf-8")
        if (!kode.includes("eval")) {
            let res = await encjs(kode)
            fs.writeFileSync(tools_file_path, res)
            await m.reply(`mengamankan.... ${files}`)
            await delay(2000)
        }}
    }
    await m.reply(`berhasil!`)
}
theoFitur.owner = true
theoFitur.command = ["protectsc"]
theoFitur.tags = "owner"
export default theoFitur