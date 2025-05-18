import fs from "fs"
import path from "path";

let theoFitur = async function ({ m, theo }) {
    await theo.sendMessage(m.chat, { document: fs.readFileSync(path.join(__dirname, "data.json")), mimetype: global.doc.json, fileName: `data.json` }, m.quo)
    await theo.sendMessage(m.chat, { document: fs.readFileSync(path.join(sesiPath, "creds.json")), mimetype: global.doc.json, fileName: `creds.json` }, m.quo)
};

theoFitur.owner = true;
theoFitur.command = ["getdb", "backup"];
theoFitur.tags = "owner";

export default theoFitur;