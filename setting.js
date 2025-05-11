import path from "path";
import fs from "fs";
import url from "url";
import fetch from "node-fetch";
import { tanggal_now } from "./tools/func.js";
import { jadwal_sholat_kota } from "./tools/scrape.js";

// Global constants
global.__dirname = path.dirname(url.fileURLToPath(import.meta.url));
global.namaBot = "TheoBot V3";

global.owner = [
    "6285876830674",
    "6285809011357",
    // "201027441522"
]//ISI DENGAN NOMOR OWNER
    .map(a => a.replace(/\D/g, ""));

global.ownerPrefix = true;
global.apikeys = "ojj4yupad25";
global.nomorBot = "201027441522" //ISI DENGAN NOMOR BOTMU
    .replace(/\D/g, "");

global.sesiPath = path.join(__dirname, "SESSION");
global.dataPath = path.join(__dirname, "data.json");
global.sampahPath = path.join(__dirname, "sampah");
global.surahPath = path.join(__dirname, "surah");

global.kota = "rembang";

// Web & Sosmed
global.webApi = "https://party-mc.fun"; // jangan di ubah
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

// Jadwal sholat
let tanggal = tanggal_now();
if (!db.jadwalSholat || db.jadwalSholat.hari !== tanggal.getDay()) {
    db.jadwalSholat = {
        hari: tanggal.getDay(),
        sholat: await jadwal_sholat_kota(global.kota),
    };
}

/* EFFECT AUDIO FFMPEG */
global.effects = {
    // Efek asli (atau dengan nama lebih simpel)
    bass: "equalizer=f=50:width_type=h:width=100:g=10",
    tupai: "asetrate=44100*1.6,atempo=1/1.6",
    slow: "atempo=0.7",
    fast: "atempo=1.2",
    instrument: "pan=stereo|c0=FL|c1=FL",
    echo: "aecho=0.8:0.9:1000:0.3",
    reverse: "areverse",
    nightcore: "asetrate=44100*1.25,atempo=1.1,equalizer=f=1200:width_type=h:width=200:g=3",
    robot: "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=1024:overlap=0.75",
    vaporwave: "asetrate=44100*0.8,atempo=1.0,aecho=0.8:0.8:40:0.4",
    "8d": "apulsator=hz=0.12,pan=stereo|c0=c0*cos(2*PI*t*0.1)+c1*sin(2*PI*t*0.1)|c1=c1*cos(2*PI*t*0.1)-c0*sin(2*PI*t*0.1)",
    explode: "volume=3.0,acrusher=1:1:8:0:log,bass=g=20",
    underwater: "lowpass=f=500,highpass=f=200,volume=0.7,equalizer=f=300:width_type=h:width=200:g=-15",
    radio: "highpass=f=300,lowpass=f=3000,volume=0.9,equalizer=f=1000:width_type=h:width=2000:g=5",
    cave: "aecho=0.8:0.9:1500:0.4:1200:0.3",
    flanger: "flanger=delay=5:depth=4:regen=50:width=70:speed=1:shape=triangular",
    phaser: "aphaser=type=t:speed=0.5:decay=0.4",
    tremolo: "tremolo=f=7:d=0.6",
    vibrato: "vibrato=f=6:d=0.4",
    distortion: "acrusher=bits=8:mix=0.7:mode=log",
    telephone: "highpass=f=300,lowpass=f=3400,equalizer=f=1000:width_type=q:width=1:g=10",

    // Pitch Shift
    pitch_up: "asetrate=44100*1.2,aresample=44100",
    pitch_down: "asetrate=44100*0.8,aresample=44100",
    high_pitch: "asetrate=44100*1.4,aresample=44100,atempo=0.8", // Sebelumnya high_pitched
    deep: "asetrate=44100*0.9,aresample=44100,atempo=1.1,bass=g=5", // Sebelumnya deep_voice
    pitch_very_high: "asetrate=44100*1.8,aresample=44100,atempo=0.6", // Sebelumnya very_high_pitched
    pitch_very_deep: "asetrate=44100*0.6,aresample=44100,atempo=1.8", // Sebelumnya very_deep_voice
    chipmunk_extreme: "asetrate=44100*3.0,aresample=44100,atempo=0.3", // Tetap

    // Kombinasi dan Efek Lain
    ghost: "aecho=0.8:0.9:1000:0.3,areverse,aecho=0.6:0.7:1500:0.2,areverse",
    stadium: "aecho=0.8:0.9:800:0.3:600:0.2",
    megaphone: "highpass=f=400,lowpass=f=2500,volume=1.2,acrusher=bits=16:mix=0.3",
    whisper: "volume=0.5,highpass=f=100,lowpass=f=5000,equalizer=f=3000:width_type=h:width=1000:g=5",
    chorus: "chorus=0.5:0.9:50|60|40:0.4:0.3:0.25",
    delay: "adelay=500|500", // Sebelumnya delay_simple
    reverb: "reverb=room_size=0.7:damping=0.6:wet_gain=0.5", // Sebelumnya reverb_basic
    compressor: "acompressor=ratio=4:threshold=-18dB:attack=20ms:release=100ms:makeup=3dB",
    gate: "agate=threshold=-40dB:range=15dB:attack=5ms:hold=50ms:release=200ms",
    widen: "stereowiden=i=3", // Sebelumnya stereo_widen
    overdrive: "ove.r.drive=gain=10:color=0.5",
    fuzz: "afuzz=gain=15",
    muffled: "lowpass=f=800",
    tinny: "highpass=f=2500",
    distortion_heavy: "distorsion=l=25", // Sebelumnya distorsion_heavy
    gargle: "bandpass=f=400:width=300,tremolo=f=8:d=0.8",
    underwater_alt: "lowpass=f=550,highpass=f=180,volume=0.65,equalizer=f=350:width_type=h:width=250:g=-12", // Tetap
    echo_long: "aecho=0.8:0.7:1500:0.4:2000:0.3", // Tetap
    arena: "aecho=0.7:0.8:900:0.3:700:0.2",
    canyon: "aecho=0.8:0.9:3000:0.5:3500:0.4:4000:0.3",
    demonic: "asetrate=44100*0.7,aresample=44100,atempo=1.3,acrusher=bits=10:mix=0.6,aecho=0.6:0.7:900:0.4",
    walkie_talkie: "highpass=f=350,lowpass=f=2800,acrusher=bits=14:mix=0.4,volume=1.05", // Tetap
    lofi: "asetrate=22050,aresample=44100,acrusher=bits=12:mix=0.4,equalizer=f=80:width_type=h:width=80:g=6,equalizer=f=12000:width_type=h:width=1500:g=-8",
    haunted: "asetrate=44100*0.9,aresample=44100,aecho=0.7:0.8:1200:0.3:1400:0.2,reverb=room_size=0.7:wet_gain=0.6",
    alien: "asetrate=44100*1.4,aresample=44100,aphaser=type=n:speed=1.2:decay=0.6,acrusher=bits=16:mix=0.25",
    darth_vader: "asetrate=44100*0.8,aresample=44100,atempo=1.2,acrusher=bits=8:mix=0.7", // Tetap
    tunnel: "aecho=0.8:0.9:600:0.4:500:0.3",
    megaphone_alt: "highpass=f=350,lowpass=f=2200,volume=1.3,acrusher=bits=14:mix=0.4", // Tetap
    bass_heavy: "equalizer=f=60:width_type=h:width=120:g=12", // Sebelumnya bass_boost_more
    treble_boost: "equalizer=f=8000:width_type=h:width=2000:g=10",
    mid_cut: "equalizer=f=1000:width_type=h:width=500:g=-10",
    phone_old: "highpass=f=400,lowpass=f=2800,volume=0.9,equalizer=f=1000:width_type=q:width=2:g=8", // Sebelumnya phone_call_old
    sci_fi: "aphaser=type=t:speed=1:decay=0.5,aecho=0.7:0.8:400:0.3",
    underwater_bubble: "lowpass=f=400,highpass=f=100,volume=0.5,aecho=0.6:0.7:300:0.2,aecho=0.5:0.6:500:0.2", // Tetap
    robot2: "asetrate=44100*1.05,aresample=44100,afftfilt=real='re*cos(2*PI*t*100)':imag='im*sin(2*PI*t*100)'", // Sebelumnya robot_alt
    duck: "asetrate=44100*1.1,aresample=44100,equalizer=f=600:width_type=h:width=300:g=10,atempo=0.9",
    reverb_deep: "reverb=room_size=1:damping=0.8:wet_gain=0.7:dry_gain=0.3", // Sebelumnya deep_reverb
    flanger_deep: "flanger=delay=10:depth=8:regen=70:width=80:speed=0.5:shape=sinusoidal",
    phaser_sweep: "aphaser=type=t:speed=1.5:decay=0.6:fb=0.7:wet=1:dry=0",
    tremolo_fast: "tremolo=f=12:d=0.7",
    vibrato_deep: "vibrato=f=5:d=0.6",
    autowah: "bandpass=f=1000:width=800,lowpass=f=2000,highpass=f=500,volume=1.1",
    vocal_reduce: "pan=stereo|c0=c0-c1|c1=c0-c1" // Sebelumnya vocal_reducer_pan
};