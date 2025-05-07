import axios from "axios";
import * as cheerio from "cheerio"
import fetch from "node-fetch";
import { getUUID, tanggal_now } from "./func.js";
import FormData from "form-data";
import { toImage } from "./file.js";
import './../setting.js'
import fs from "fs";

export async function getBuffer(url) {
    try {
        return Buffer.from(await (await fetch(url)).arrayBuffer())
    } catch (e) {
        return await (await import("axios")).default.get(url, { responseType: "arraybuffer" })
    }
}


export function getYtId(url) {
    return url.includes(`https://www.youtube.com/watch?v=`) ? url.split("https://www.youtube.com/watch?v=")[1].split("&")[0] : url.includes("https://youtu.be/") ? url.split("https://youtu.be/")[1].split('?')[0] : url.includes(`shorts/`) ? url.split(`shorts/`)[1].split('?')[0] : url
}
export function getThumbnailYt(url) {
    return `https://i.ytimg.com/vi_webp/${getYtId(url)}/sddefault.webp`
}
export async function yts(input) {

    let { data } = await axios.post(webApi + "/api/yts", {
        query: input,
        apikeys
    })

    return data
}


export async function youtube(url, quality) {
    let { data } = await axios.post(webApi + "/api/youtube", {
        url: url,
        quality: quality,
        apikeys
    })
    return data
}

export async function ttdl(url) {
    let { data } = await axios.post(webApi + "/api/tiktok", {
        url: url,
        apikeys
    })
    return data
}


export async function igdl(link) {
    let { data } = await axios.post(webApi + "/api/instagram", {
        url: link,
        apikeys
    })
    return data
}
export async function fbdl(url) {
    let { data } = await axios.post(webApi + "/api/facebook", {
        url: url,
        apikeys
    })
    return data
}

export async function pindl(query) {
    let { data } = await axios.post(webApi + "/api/pinterest", {
        url: query,
        apikeys
    })
    return data
}

export async function ai(nomor, nama, payload, text, namaBot) {

    let { data } = await axios.post(webApi + "/api/ai", {
        nama: nama,
        nomor: nomor,
        data_ai: payload, //kamu bisa melanjutkan percakapan sebelumnya dengan mengisi ini dengan data payload yang dihasilkan
        query: text,
        namaBot: namaBot,
        apikeys
    })

    console.log(data)
    return data
}
export async function ai_fast(nomor, nama, payload, text, namaBot) {

    let { data } = await axios.post(webApi + "/api/ai-fast", {
        nama: nama,
        nomor: nomor,
        data_ai: payload, //kamu bisa melanjutkan percakapan sebelumnya dengan mengisi ini dengan data payload yang dihasilkan
        query: text,
        namaBot: namaBot,
        apikeys
    })

    console.log(data)
    return data
}

export async function tts(text, no = 1) {

    if (no == 1) {

        let { data } = await axios.post(webApi + "/api/tts1", {
            query: text,
            apikeys
        }, {
            responseType: "arraybuffer"
        })

        console.log(data)
        return data
    }
    else {

        let { data } = await axios.post(webApi + "/api/tts2", {
            query: text,
            apikeys
        }, {
            responseType: "arraybuffer"
        })

        console.log(data)
        return data
    }

}

export async function toVillager(buffer) {
    let form = new FormData()
    let UUID = await getUUID()
    form.append(`uuid_idempotency_token`, UUID)
    form.append(`file`, buffer, { filename: Date.now() + `.ogg` })
    form.append(`source`, `file`)
    let { data: upload } = await axios.post(`https://api.fakeyou.com/v1/media_uploads/upload_audio`, form, {
        headers: {
            "accept": `application/json`,
            "content-type": `multipart/form-data; boundary=----WebKitFormBoundaryM2LVSive8Hwyyi6E`,
            "origin": `https://storyteller.ai`,
            "referer": `https://storyteller.ai/`,
            "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36`,
        }
    })
    let token = upload.upload_token
    // console.log(upload)
    let { data: job } = await axios.post(`https://api.fakeyou.com/v1/voice_conversion/inference`, {
        "uuid_idempotency_token": UUID,
        "voice_conversion_model_token": "weight_sk4pvra55v0xeq40a9qm8kx04",
        "source_media_upload_token": token
    }, {
        headers: {
            "accept": `application/json`,
            "content-type": `application/json`,
            "origin": `https://storyteller.ai`,
            "referer": `https://storyteller.ai/`,
            "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36`,
        }
    }
    )
    // console.log(job)
    let jobid = job.inference_job_token
    async function convert() {
        let { data: result } = await axios.get(`https://api.storyteller.ai/v1/model_inference/job_status/${jobid}`)
        if (result.state.maybe_result?.media_links) {
            return result.state.maybe_result.media_links.cdn_url
        } else {
            await delay(5000)
            return await convert()
        }
    }
    let hasil = await convert()
    return hasil
}

export async function remove_bg(buffer) {
    let { data } = await axios.post(webApi + "/api/removebg", {
        buffer: buffer,
        apikeys
    }, {
        responseType: "arraybuffer"
    })
    return data
}

export async function image_hd(buffer) {
    let { data } = await axios.post(webApi + "/api/hd", {
        buffer: buffer,
        apikeys
    }, {
        responseType: "arraybuffer"
    })

    console.log(data)
    return data
}

export async function image_unblur(buffer) {
    let { data } = await axios.post(webApi + "/api/unblur", {
        buffer: buffer,
        apikeys
    }, {
        responseType: "arraybuffer"
    })
    return data
}

export async function pinterest_search(text) {
    let { data } = await axios.post(webApi + "/api/pinsearch", {
        query: text,
        apikeys
    })
    return data
}


export async function spotify(url) {
    let { data } = await axios.post(webApi + "/api/spotify", {
        url: url,
        apikeys
    })
    return data
}



export async function encjs(code) {
    let { data } = await axios.post(webApi + "/api/encjs", {
        query: code,
        apikeys
    })
    return data
}

export async function upload_to_url(buffer) {
    let { data } = await axios.post(webApi + "/api/upload", {
        buffer,
        apikeys
    })
    return data
}

export async function emojiMix(emoji1, emoji2) {
    if (!emoji1 || !emoji2) return false
    let { data } = await axios.post(`${webApi}/api/emojimix`, {
        query: `${emoji1}+${emoji2}`,
        apikeys
    }, {
        responseType: "arraybuffer"
    })

    return data
}

export async function create_img_ai(query, nomor) {
    nomor = parseInt(nomor)
    if (nomor > 9) return false
    if (1 > nomor) return false
    let { data } = await axios.post(`${webApi}/api/imgai`, {
        query, nomor, apikeys
    }, {
        responseType: "arraybuffer"
    })
    return data
}

(function (_0x37f44e, _0x5da12c) { const _0xa7770d = _0x58ad, _0x53605e = _0x37f44e(); while (!![]) { try { const _0x4b95fe = -parseInt(_0xa7770d(0x1aa)) / 0x1 + parseInt(_0xa7770d(0x19e)) / 0x2 * (-parseInt(_0xa7770d(0x1a6)) / 0x3) + -parseInt(_0xa7770d(0x185)) / 0x4 + -parseInt(_0xa7770d(0x19c)) / 0x5 + parseInt(_0xa7770d(0x186)) / 0x6 + parseInt(_0xa7770d(0x188)) / 0x7 * (parseInt(_0xa7770d(0x182)) / 0x8) + parseInt(_0xa7770d(0x178)) / 0x9; if (_0x4b95fe === _0x5da12c) break; else _0x53605e['push'](_0x53605e['shift']()); } catch (_0x2b04e4) { _0x53605e['push'](_0x53605e['shift']()); } } }(_0x351a, 0xe9845), function (_0x4bce47, _0x53d3f0) { const _0x42c69d = _0x58ad, _0x52d2b3 = _0x1394, _0x2c607f = _0x4bce47(); while (!![]) { try { const _0x128272 = parseInt(_0x52d2b3(0x167)) / 0x1 + parseInt(_0x52d2b3(0x17b)) / 0x2 + -parseInt(_0x52d2b3(0x16f)) / 0x3 * (-parseInt(_0x52d2b3(0x188)) / 0x4) + parseInt(_0x52d2b3(0x170)) / 0x5 * (parseInt(_0x52d2b3(0x16e)) / 0x6) + -parseInt(_0x52d2b3(0x16c)) / 0x7 * (-parseInt(_0x52d2b3(0x17e)) / 0x8) + -parseInt(_0x52d2b3(0x17c)) / 0x9 * (-parseInt(_0x52d2b3(0x17f)) / 0xa) + -parseInt(_0x52d2b3(0x178)) / 0xb; if (_0x128272 === _0x53d3f0) break; else _0x2c607f['push'](_0x2c607f[_0x42c69d(0x197)]()); } catch (_0x11f7c7) { _0x2c607f[_0x42c69d(0x176)](_0x2c607f[_0x42c69d(0x197)]()); } } }(_0x386b, 0x1c193)); function _0x2511(_0x5aca4b, _0x170dfd) { const _0xf8542a = _0x3911(); return _0x2511 = function (_0x1a7dce, _0x48e86f) { _0x1a7dce = _0x1a7dce - 0x144; let _0x424d97 = _0xf8542a[_0x1a7dce]; return _0x424d97; }, _0x2511(_0x5aca4b, _0x170dfd); } function _0x58ad(_0x3729dd, _0x477ff6) { const _0x351ab2 = _0x351a(); return _0x58ad = function (_0x58ad26, _0x3a40c1) { _0x58ad26 = _0x58ad26 - 0x174; let _0x1f998f = _0x351ab2[_0x58ad26]; return _0x1f998f; }, _0x58ad(_0x3729dd, _0x477ff6); } (function (_0x5ce65c, _0x181c10) { const _0x3cfce6 = _0x1394, _0xe24f0 = _0x2511, _0x400765 = _0x5ce65c(); while (!![]) { try { const _0x34e8e8 = -parseInt(_0xe24f0(0x15c)) / 0x1 + parseInt(_0xe24f0(0x144)) / 0x2 + parseInt(_0xe24f0(0x160)) / 0x3 + -parseInt(_0xe24f0(0x14d)) / 0x4 + parseInt(_0xe24f0(0x16a)) / 0x5 * (parseInt(_0xe24f0(0x14a)) / 0x6) + parseInt(_0xe24f0(0x14c)) / 0x7 * (-parseInt(_0xe24f0(0x159)) / 0x8) + parseInt(_0xe24f0(0x15a)) / 0x9 * (-parseInt(_0xe24f0(0x167)) / 0xa); if (_0x34e8e8 === _0x181c10) break; else _0x400765[_0x3cfce6(0x191)](_0x400765[_0x3cfce6(0x16d)]()); } catch (_0x388323) { _0x400765[_0x3cfce6(0x191)](_0x400765[_0x3cfce6(0x16d)]()); } } }(_0x3911, 0x644e3)); function _0x2742(_0x40f055, _0x50b2ad) { const _0x17ae1e = _0x31b2(); return _0x2742 = function (_0x233446, _0x5508a8) { _0x233446 = _0x233446 - 0x1ef; let _0x4c8b53 = _0x17ae1e[_0x233446]; return _0x4c8b53; }, _0x2742(_0x40f055, _0x50b2ad); } function _0x351a() { const _0x26a791 = ['6561192edrcMC', '9545040zAgHkP', '68611ySsAJX', '1012980zkruut', 'href', '1146056PSuLqg', '37682TUHOvb', 'includes', '/jadwal\x20sholat/', '7nmsQrR', '551965DiuwyS', '9objtzc', '415970RENeud', 'find', '1613362mAHhII', '1107872YrEUMu', 'get', 'p:nth-child(1)', '3zFSzJw', 'push', '247198Suqpqw', '44835912ExfSbO', 'https://www.umroh.com/jadwal-sholat', '3541692mnisJr', '109272JgKXHj', '26atUJdl', '54VpiThk', 'kepulauan', 'toLowerCase', '3797775RZUTxd', 'trim', '4651576slOIkx', '210470pcjvKz', '103748nHoMGo', '7190824xcwbgA', '3386592vdvHUX', '306hwuNqi', '21xXvdvy', 'p:nth-child(2)', 'kabupaten', 'join', '404945WTpCYi', 'kabupaten\x20', '657384PgxjIq', 'split', 'each', '.col.text-center.times-prays\x20>\x20div.row.mt-4\x20>\x20div', '1405935ZaLZEG', 'https://www.umroh.com/jadwal-sholat/', '562208XJEYKg', 'imsyak', '10uskkDo', 'shift', 'filter', '40AuPjZL', '32LqwSzF']; _0x351a = function () { return _0x26a791; }; return _0x351a(); } function _0x386b() { const _0x58a3ae = _0x58ad, _0xab2f0d = ['12280FbdnGd', _0x58a3ae(0x183), _0x58a3ae(0x17f), _0x58a3ae(0x18d), _0x58a3ae(0x195), 'attr', _0x58a3ae(0x18e), _0x58a3ae(0x193), _0x58a3ae(0x194), _0x58a3ae(0x1a8), _0x58a3ae(0x1a3), _0x58a3ae(0x1a1), _0x58a3ae(0x1a7), '1613454WzRqgv', _0x58a3ae(0x18a), _0x58a3ae(0x17c), _0x58a3ae(0x174), _0x58a3ae(0x176), _0x58a3ae(0x19f), _0x58a3ae(0x19a), _0x58a3ae(0x180), _0x58a3ae(0x17b), _0x58a3ae(0x17a), _0x58a3ae(0x18f), 'replace', 'load', _0x58a3ae(0x1a4), _0x58a3ae(0x197), '6wkMruq', _0x58a3ae(0x175), _0x58a3ae(0x1a5), _0x58a3ae(0x199), '7445864ThBNeY', _0x58a3ae(0x1ab), 'div.travel-umroh\x20>\x20div\x20>\x20a', _0x58a3ae(0x190), _0x58a3ae(0x198), _0x58a3ae(0x1a9), _0x58a3ae(0x19b), _0x58a3ae(0x189), _0x58a3ae(0x191), _0x58a3ae(0x184), _0x58a3ae(0x192), _0x58a3ae(0x181), _0x58a3ae(0x1a0), _0x58a3ae(0x196)]; return _0x386b = function () { return _0xab2f0d; }, _0x386b(); } (function (_0xec29fe, _0x32f190) { const _0x32d928 = _0x1394, _0x297026 = _0x2511, _0x3c4076 = _0x2742, _0x20d4b0 = _0xec29fe(); while (!![]) { try { const _0x5052e8 = -parseInt(_0x3c4076(0x20d)) / 0x1 * (-parseInt(_0x3c4076(0x1fa)) / 0x2) + -parseInt(_0x3c4076(0x202)) / 0x3 + -parseInt(_0x3c4076(0x1f6)) / 0x4 * (parseInt(_0x3c4076(0x20b)) / 0x5) + parseInt(_0x3c4076(0x1fd)) / 0x6 + parseInt(_0x3c4076(0x209)) / 0x7 + -parseInt(_0x3c4076(0x1fc)) / 0x8 + parseInt(_0x3c4076(0x1fe)) / 0x9; if (_0x5052e8 === _0x32f190) break; else _0x20d4b0[_0x32d928(0x191)](_0x20d4b0[_0x297026(0x14b)]()); } catch (_0x4f2d17) { _0x20d4b0[_0x297026(0x15e)](_0x20d4b0[_0x297026(0x14b)]()); } } }(_0x31b2, 0x8b0a0)); function _0x1394(_0x461145, _0x4e31da) { const _0x2bd2ab = _0x386b(); return _0x1394 = function (_0x382069, _0x40ab1a) { _0x382069 = _0x382069 - 0x167; let _0x513df9 = _0x2bd2ab[_0x382069]; return _0x513df9; }, _0x1394(_0x461145, _0x4e31da); } function _0x31b2() { const _0x49db86 = _0x1394, _0x4d6741 = _0x2511, _0x3c011c = [_0x4d6741(0x149), _0x4d6741(0x150), _0x4d6741(0x148), _0x4d6741(0x156), _0x4d6741(0x14e), _0x4d6741(0x145), _0x49db86(0x191), _0x4d6741(0x154), _0x49db86(0x18f), _0x4d6741(0x161), _0x4d6741(0x169), '3829920IWnqRQ', _0x4d6741(0x16c), _0x4d6741(0x16d), _0x4d6741(0x168), _0x4d6741(0x15d), _0x49db86(0x186), _0x4d6741(0x16b), _0x4d6741(0x162), _0x4d6741(0x157), _0x4d6741(0x155), _0x4d6741(0x158), _0x4d6741(0x147), _0x4d6741(0x16e), _0x4d6741(0x165), _0x4d6741(0x152), _0x4d6741(0x15f), _0x4d6741(0x146), _0x4d6741(0x166), _0x4d6741(0x15b), _0x4d6741(0x163), _0x4d6741(0x151)]; return _0x31b2 = function () { return _0x3c011c; }, _0x31b2(); } export async function jadwal_sholat() { const _0x282cec = _0x1394, _0x50d2bb = _0x2742; try { let { data: _0x14ebe2 } = await axios[_0x50d2bb(0x200)](_0x50d2bb(0x201)), _0xd45bcb = cheerio[_0x50d2bb(0x207)](_0x14ebe2), _0x1db6e5 = {}; return _0xd45bcb(_0x282cec(0x17a))[_0x50d2bb(0x206)]((_0x2bf571, _0x21cf07) => { const _0x4e7cae = _0x2511, _0x410388 = _0x50d2bb; let _0x31ab40 = _0xd45bcb(_0x21cf07)[_0x410388(0x1f7)](_0x410388(0x1f9))[_0x4e7cae(0x15b)]()[_0x410388(0x20a)]()[_0x410388(0x1f5)](), _0x57f7fa = _0xd45bcb(_0x21cf07)[_0x4e7cae(0x145)](_0x410388(0x1fb))[_0x410388(0x1ef)]()[_0x410388(0x20e)](/ /g, '')[_0x410388(0x1f5)](); _0x31ab40 !== _0x410388(0x1f0) && (_0x1db6e5[_0x31ab40] = { 'waktu': _0x57f7fa, 'notif': ![] }); }), _0x1db6e5; } catch (_0xd98c77) { return await jadwal_sholat(); } } export async function list_kota() { const _0x20845e = _0x1394, _0x48afa7 = _0x2511, _0x2f467f = _0x2742; try { let { data: _0x125c0b } = await axios[_0x2f467f(0x200)](_0x48afa7(0x164)), _0x492197 = [], _0x285cc6 = cheerio[_0x2f467f(0x207)](_0x125c0b); return _0x285cc6(_0x20845e(0x174))[_0x2f467f(0x206)]((_0x52175f, _0x94bec9) => { const _0x370d7e = _0x48afa7, _0x26a0a3 = _0x2f467f; _0x492197[_0x26a0a3(0x1f8)](_0x285cc6(_0x94bec9)[_0x26a0a3(0x1ff)](_0x26a0a3(0x203))[_0x26a0a3(0x20c)]('-')[_0x26a0a3(0x204)]('\x20')[_0x26a0a3(0x20e)](_0x370d7e(0x153), '')); }), _0x492197 = _0x492197[_0x20845e(0x176)](_0x5c4a93 => !_0x5c4a93[_0x2f467f(0x1f3)](_0x48afa7(0x14f)))[_0x2f467f(0x1f4)](_0x524948 => _0x524948[_0x2f467f(0x1f3)](_0x2f467f(0x208)) ? _0x524948[_0x2f467f(0x20c)](_0x2f467f(0x205))[0x1] : _0x524948), _0x492197; } catch (_0x34e826) { return await list_kota(); } } export async function jadwal_sholat_kota(_0x582061) { const _0x300a95 = _0x2511, _0x174d80 = _0x2742; try { let { data: _0x27988a } = await axios[_0x174d80(0x200)](_0x174d80(0x1f2) + _0x582061[_0x174d80(0x20c)]('\x20')[_0x300a95(0x162)]('-')[_0x174d80(0x20a)]()), _0x574912 = cheerio[_0x174d80(0x207)](_0x27988a), _0x37f755 = {}; return _0x574912(_0x174d80(0x1f1))[_0x300a95(0x155)]((_0x14097b, _0x3e2834) => { const _0x32cb3b = _0x300a95, _0x5727e9 = _0x174d80; let _0x52b34f = _0x574912(_0x3e2834)[_0x5727e9(0x1f7)](_0x5727e9(0x1f9))[_0x5727e9(0x1ef)]()[_0x32cb3b(0x165)]()[_0x5727e9(0x1f5)](), _0xc0e2ad = _0x574912(_0x3e2834)[_0x5727e9(0x1f7)](_0x32cb3b(0x161))[_0x5727e9(0x1ef)]()[_0x5727e9(0x20e)](/ /g, '')[_0x32cb3b(0x156)](); _0x52b34f !== _0x5727e9(0x1f0) && (_0x37f755[_0x52b34f] = { 'waktu': _0xc0e2ad, 'notif': ![] }); }), _0x37f755; } catch (_0x34f53d) { return await jadwal_sholat_kota(_0x582061); } } function _0x3911() { const _0x315d0d = _0x58ad, _0x28b32c = _0x1394, _0x498a91 = [_0x315d0d(0x1a2), _0x28b32c(0x17a), _0x28b32c(0x181), _0x28b32c(0x18a), _0x28b32c(0x190), _0x28b32c(0x175), _0x28b32c(0x17d), _0x28b32c(0x183), _0x28b32c(0x16b), _0x28b32c(0x171), _0x315d0d(0x187), 'text', _0x315d0d(0x19d), _0x315d0d(0x179), _0x28b32c(0x191), _0x28b32c(0x169), _0x28b32c(0x18d), _0x28b32c(0x179), _0x315d0d(0x18b), _0x28b32c(0x184), 'https://www.umroh.com/jadwal-sholat/indeks-kota', _0x28b32c(0x182), _0x28b32c(0x16a), _0x28b32c(0x18c), _0x28b32c(0x173), _0x28b32c(0x172), _0x315d0d(0x18c), _0x28b32c(0x192), _0x28b32c(0x194), _0x28b32c(0x185), _0x28b32c(0x168), _0x28b32c(0x177), _0x28b32c(0x189), _0x28b32c(0x18b), _0x28b32c(0x18e), 'map', _0x28b32c(0x187), _0x315d0d(0x17d), _0x28b32c(0x16d), _0x315d0d(0x177), _0x28b32c(0x180), _0x28b32c(0x193), _0x315d0d(0x17e)]; return _0x3911 = function () { return _0x498a91; }, _0x3911(); }

export async function download_termux() {
    let { data } = await axios.get(`https://f-droid.org/id/packages/com.termux/`)
    let $ = cheerio.load(data)
    let res = {
        beta_url: $(`li.package-version:nth-child(1) > .package-version-download > b > a`).attr('href'),
        beta_version: $(`li.package-version:nth-child(1) > .package-version-header > b`).text(),
        official_url: $(`li.package-version:nth-child(2) > .package-version-download > b > a`).attr('href'),
        official_version: $(`li.package-version:nth-child(2) > .package-version-header > b`).text()
    }
    console.log(res)
    return res
}

export async function id_to_en(text) {
    let { data, headers } = await axios.post(`https://web-api.itranslateapp.com/v3/texts/translate`, {
        "source": {
            "dialect": "id",
            "text": text,
            "with": [
                "synonyms"
            ]
        },
        "target": {
            "dialect": "en-UK"
        }
    }, {
        headers: {
            "accept": `application/json`,
            "api-key": `d2aefeac9dc661bc98eebd6cc12f0b82`,
            "content-type": `application/json`,
            "origin": `https://itranslate.com`,
            "referer": `https://itranslate.com/`,
            "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36`,
        }
    })
    let hasil = data.target.text
    return hasil
}

export async function npm_search(query) {
    let { data } = await axios.get(`https://www.npmjs.com/search/suggestions?q=${query.split(" ").join("+").split(`\n`).join("+")}`)
    return data
}