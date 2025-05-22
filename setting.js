import path from "path";
import fs from "fs";
import url from "url";
import fetch from "node-fetch";
import { tanggal_now } from "./tools/func.js";
import { jadwal_sholat_kota } from "./tools/scrape.js";

// Global constants
global.__dirname = path.dirname(url.fileURLToPath(import.meta.url));
//
await import(`file://${__dirname}/data_lain.js?v=${Date.now()}`)
global.namaBot = "TheoBot V4";
global.maxUseRam = 1000 //MB
global.pairingCode = true //pairing code
global.qr = path.join(__dirname, "QR_LOGIN.jpg")
global.owner = [
    "6285876830674",
    "6285809011357",
    "201027441522"
].map(a => a.replace(/\D/g, ""));

global.ownerPrefix = true;
global.apikey = "apikey kamu";
global.nomorBot = "+62 888-8888-8888".replace(/\D/g, "");

global.sesiPath = path.join(__dirname, "SESSION");
global.dataPath = path.join(__dirname, "data.json");
global.sampahPath = path.join(__dirname, "sampah");
global.surahPath = path.join(__dirname, "surah");

global.kota = "rembang";

// Web & Sosmed
global.webApi = "https://berapi.my.id"; // jangan di ubah
global.youtube_chanel = "https://www.youtube.com/channel/UCNLkbDNckYj1GpJ-7x5fnMQ";
global.instagram = "https://www.instagram.com/ivantheo159/";
global.github = "https://github.com/Ivancahwagu";
global.link_gc = "https://chat.whatsapp.com/HB5oAs0zKnbAdM9XBzZEop";

// Payment
global.payment = {
    dana: ["085876830674"],
    shopee: ["085876830674"],
    pulsa: ["085876830674", "085809011357"],
    bank: [{ name: "Jago", no_rek: "102562261745" }],
};

// Prefix
global.prefix = [".", "!", "/", "?"];

// Ensure folders and files
if (!fs.existsSync(surahPath)) fs.mkdirSync(surahPath);
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "{}");
if (!fs.existsSync(sampahPath)) fs.mkdirSync(sampahPath);

// Load database
global.db = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Save DB
global.savedb = async () => fs.writeFileSync(dataPath, JSON.stringify(db, null, 2));

// Delay utility
global.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Buffer fetcher
global.getBuffer = async function (url) {
    if (Buffer.isBuffer(url)) return url
    try {
        return Buffer.from(await (await fetch(url)).arrayBuffer());
    } catch {
        const axios = (await import("axios")).default;
        return axios.get(url, { responseType: "arraybuffer" });
    }
};


// Struktur DB (modular import)
global.struktur_db = (await import(`file://${__dirname}/struktur_database.js?v=${Date.now()}`)).default();

// Inisialisasi struktur database
if (!db.user) {
    await delay(300);
    console.log("⚠️  Database user belum ditemukan");
    await delay(300);
    console.log("📦  Membuat database user...");
    db.user = {};
    await delay(300);
    console.log("✅  Database user berhasil dibuat");
}
if (!db.config) {
    db.config = global.struktur_db.config
}

if (!db.group) {
    await delay(300);
    console.log("⚠️  Database group belum ditemukan");
    await delay(300);
    console.log("📦  Membuat database group...");
    db.group = {};
    await delay(300);
    console.log("✅  Database group berhasil dibuat");
}

if (!db.game) {
    await delay(300);
    console.log("⚠️  Database game belum ditemukan");
    await delay(300);
    console.log("📦  Membuat database game...");
    db.game = {};
    await delay(300);
    console.log("✅  Database game berhasil dibuat");
}

db.game.ttt ??= {};
db.game.pertanyaan ??= {};
db.game.family100 ??= {};
db.game.tebak_bom ??= {};

if (!db.chat) {
    await delay(300);
    console.log("⚠️  Database chat belum ditemukan");
    await delay(300);
    console.log("📦  Membuat database chat...");
    db.chat = {};
    await delay(300);
    console.log("✅  Database chat berhasil dibuat");
}
savedb()
// Jadwal sholat
let tanggal = tanggal_now();
if (!db.jadwalSholat || db.jadwalSholat.hari !== tanggal.getDay()) {
    db.jadwalSholat = {
        hari: tanggal.getDay(),
        sholat: await jadwal_sholat_kota(global.kota),
    };
}

global.doc = {
    js: `application/javascript`,
    json: `application/json`
}