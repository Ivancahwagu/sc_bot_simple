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

    let image = fs.readFileSync(path.join(__dirname, "img", "top.jpg"));
    let { width, height } = await readImage(image);
    let pp_size = width / 5;

    const posisi = [
        { x: 0, y: 280, align: "center" }, // posisi juara 1
        { x: 70, y: 360, align: "left" },  // posisi juara 2
        { x: 70, y: 400, align: "right" }  // posisi juara 3
    ];

    const teks = [
        { x: 0, y: 0, offsetX: 280, offsetY: 0, align: "center" },   // nama juara 1
        { x: 30, y: 480, offsetX: 360, offsetY: 0, align: "center" },// nama juara 2
        { x: 480, y: 30, offsetX: 400, offsetY: 0, align: "center" } // nama juara 3
    ];

    for (let i = 0; i < top_banyak.length; i++) {
        try {
            let pp = await theo.getPP(top_banyak[i]);
            let bulat = await roundedImg(await imgRezize(pp, 150, 150), 100);
            image = await timpaImg(image, bulat, null, null, posisi[i].x, posisi[i].y, posisi[i].align, "top");

            image = await textImageAdvanced(
                image,
                number_to_international(top_banyak[i]),
                null,
                null,
                './font/s_font5.fnt',
                teks[i].align,
                "top",
                teks[i].x,
                teks[i].y,
                teks[i].offsetX,
                teks[i].offsetY
            );
        } catch (e) {
            console.error(`Gagal menampilkan user ke-${i + 1}:`, e.message);
            continue;
        }
    }

    await theo.sendMedia(m.chat, image, `TOP LIMIT USER TERBANYAK`, m.quo);
};

theoFitur.command = ["lb", "leaderboard", "top"];
theoFitur.tags = "main";
export default theoFitur;
