import fs from "fs";
import path from "path";

export default async function theoFitur({ m, theo }) {
    if (m.quoted) {
        if (!theo.use_surah[m.sender]) return;
        if (!theo.use_surah[m.sender][m.quoted.id]) return;

        let no = parseInt(m.text);
        if (isNaN(no)) return await m.reply(`❗ *Harap balas dengan nomor yang valid!*`);
        if (no < 1) return await m.reply(`⚠️ *Nomor terlalu kecil.* Minimal: *1*`);
        if (no > theo.list_surah.length)
            return await m.reply(`⚠️ *Nomor terlalu besar.* Maksimal: *${theo.list_surah.length}*`);

        let surah = theo.list_surah[no - 1];
        let hasil = await JSON.parse(fs.readFileSync(path.join(surahPath, surah.page), "utf-8"))
        let surah_path = path.join(global.sampahPath, `${surah.surah}.html`);

        let html_content = `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Surah ${surah.surah}</title>
    <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Scheherazade&family=Lateef&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f4f8f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        header {
            text-align: center;
            padding: 20px 0;
            background: #2c3e50;
            color: white;
            border-radius: 10px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
        }
        .bismillah {
            font-size: 28px;
            font-family: 'Amiri', 'Scheherazade', 'Lateef', serif;
            color: #007BFF; /* Warna biru untuk menarik perhatian */
            margin-top: 10px;
        }
        .ayat {
            background: #ffffff;
            margin: 20px 0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        .arab {
            font-size: 34px;
            text-align: right;
            direction: rtl;
            color: #1f2d3d;
            font-weight: normal;
            font-family: 'Amiri', 'Scheherazade', 'Lateef', serif;
            line-height: 2.8; /* Meningkatkan jarak antar baris */
            unicode-bidi: embed;
        }
        .latin {
            margin-top: 10px;
            font-size: 16px;
            color: #666;
        }
        .arti {
            margin-top: 5px;
            font-size: 16px;
            color: #2d8659;
            font-style: italic;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #999;
        }
    </style>
</head>
<body>
    <header>
        <h1>📖 Surah ${surah.surah}</h1>
        <p class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <p>Jumlah Ayat: ${hasil.length}</p>
    </header>

    ${hasil.map((a, i) => `
        <div class="ayat">
            <div class="arab">${a.arab}</div>
            <div class="latin">${a.latin}</div>
            <div class="arti">Artinya: ${a.arti}</div>
        </div>
    `).join("\n")}

    <footer>
        Dibuat otomatis oleh ${global.namaBot} · semoga bermanfaat 🌙
    </footer>
</body>
</html>
        `;

        fs.writeFileSync(surah_path, html_content);

        await theo.sendMessage(
            m.chat,
            {
                document: fs.readFileSync(surah_path),
                fileName: `${surah.surah}.html`,
                mimetype: "text/html",
            },
            m.quo
        );

        fs.unlinkSync(surah_path);
    }
}
