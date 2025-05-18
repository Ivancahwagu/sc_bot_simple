import fs from "fs";
import path from "path";
import { number_to_international } from "../tools/func.js";
import { imgRezize, readImage, roundedImg, textImageAdvanced, timpaImg } from "../tools/image.js";

let theoFitur = async function ({ m, theo }) {
    let list_user = Object.keys(db.user);
    list_user = m.group ? list_user.filter(a => m.metadata.participants.map(b => b.id).includes(a)) : list_user;

    let top_banyak = list_user
        .sort((a, b) => db.user[b].limit - db.user[a].limit)
        .slice(0, 3);
    console.log(top_banyak)

    let image = fs.readFileSync(path.join(__dirname, "img", "top.png"));
    try {
        if (top_banyak[0]) {
            let pp1 = await theo.getPP(top_banyak[0]);
            image = await timpaImg(image, await roundedImg(await imgRezize(pp1, 227, 227), 99, 3), null, null, 0, 396, "center", "top");
            image = await textImageAdvanced(image, number_to_international(top_banyak[0]), null, null, `${__dirname}/font/s_font5.fnt`, "center", "center", 50, 50, 500, 50);
            image = await textImageAdvanced(image, db.user[top_banyak[0]].limit.toString(), null, null, `${__dirname}/font/b_font3.fnt`, "center", "center", 50, 50, 650, 50);
        }

        if (top_banyak[1]) {
            let pp2 = await theo.getPP(top_banyak[1]);
            image = await timpaImg(image, await roundedImg(await imgRezize(pp2, 217, 217), 99, 3), null, null, 87, 654, "left", "top");
            image = await textImageAdvanced(image, number_to_international(top_banyak[1]), null, null, `${__dirname}/font/s_font5.fnt`, "center", "center", 50, 670, 900, 50);
            image = await textImageAdvanced(image, db.user[top_banyak[1]].limit.toString(), null, null, `${__dirname}/font/b_font3.fnt`, "center", "center", 50, 670, 1050, 50);
        }

        if (top_banyak[2]) {
            let pp3 = await theo.getPP(top_banyak[2]);
            image = await timpaImg(image, await roundedImg(await imgRezize(pp3, 217, 217), 99, 3), null, null, 87, 660, "right", "top");
            image = await textImageAdvanced(image, number_to_international(top_banyak[2]), null, null, `${__dirname}/font/s_font5.fnt`, "center", "center", 670, 50, 900, 50);
            image = await textImageAdvanced(image, db.user[top_banyak[2]].limit.toString(), null, null, `${__dirname}/font/b_font3.fnt`, "center", "center", 670, 50, 1050, 50);
        }
        await theo.sendMedia(m.chat, image, `TOP LIMIT USER TERBANYAK`, m.quo);
    } catch (e) {
        await m.reply("Gagal membuat leaderboard:" + e.message);
    }

};

theoFitur.command = ["lb", "leaderboard", "top"];
theoFitur.tags = "main";
export default theoFitur;
