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
    return url.includes(`https://www.youtube.com/watch?v=`) ? url.split("https://www.youtube.com/watch?v=")[1].split("&")[0] : url.includes("https://youtu.be/") ? url.split("https://youtu.be/")[1].split('?')[0] : url
}
export async function yts(input) {

    let { data } = await axios.post(webApi + "/api/yts", {
        query: input,
        apikeys: apikeys
    })

    return data
}


export async function youtube(url, quality) {
    let { data } = await axios.post(webApi + "/api/youtube", {
        url: url,
        quality: quality,
        apikeys: apikeys
    })
    return data
}

export async function ttdl(url) {
    let { data } = await axios.post(webApi + "/api/tiktok", {
        url: url,
        apikeys: apikeys
    })
    return data
}


export async function igdl(link) {
    let { data } = await axios.post(webApi + "/api/instagram", {
        url: link,
        apikeys: apikeys
    })
    return data
}
export async function fbdl(url) {
    let { data } = await axios.post(webApi + "/api/facebook", {
        url: url,
        apikeys: apikeys
    })
    return data
}

export async function pindl(query) {
    let { data } = await axios.post(webApi + "/api/pinterest", {
        url: query,
        apikeys: apikeys
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
        apikeys: apikeys
    })

    console.log(data)
    return data
}

export async function tts(text, no = 1) {

    if (no == 1) {

        let { data } = await axios.post(webApi + "/api/tts1", {
            query: text,
            apikeys: apikeys
        }, {
            responseType: "arraybuffer"
        })

        console.log(data)
        return data
    }
    else {

        let { data } = await axios.post(webApi + "/api/tts2", {
            query: text,
            apikeys: apikeys
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
        apikeys: apikeys
    }, {
        responseType: "arraybuffer"
    })
    return data
}

export async function image_hd(buffer) {
    let { data } = await axios.post(webApi + "/api/hd", {
        buffer: buffer,
        apikeys: apikeys
    }, {
        responseType: "arraybuffer"
    })

    console.log(data)
    return data
}

export async function image_unblur(buffer) {
    let { data } = await axios.post(webApi + "/api/unblur", {
        buffer: buffer,
        apikeys: apikeys
    }, {
        responseType: "arraybuffer"
    })
    return data
}

export async function pinterest_search(text) {
    let { data } = await axios.post(webApi + "/api/pinsearch", {
        query: text,
        apikeys: apikeys
    })
    return data
}


export async function spotify(url) {
    let { data } = await axios.post(webApi + "/api/spotify", {
        url: url,
        apikeys: apikeys
    })
    return data
}



export async function encjs(code) {
    let { data } = await axios.post(webApi + "/api/encjs", {
        query: code,
        apikeys: apikeys
    })
    return data
}

export async function upload_to_url(buffer) {
    let { data } = await axios.post(webApi + "/api/upload", {
        buffer,
        apikeys: apikeys
    })
    return data
}

(function (_0x5a4aea, _0x5c4826) { const _0x135848 = _0x2d5a, _0x13d1d5 = _0x5a4aea(); while (!![]) { try { const _0x101d2e = -parseInt(_0x135848(0x190)) / 0x1 + -parseInt(_0x135848(0x18d)) / 0x2 + parseInt(_0x135848(0x16a)) / 0x3 + -parseInt(_0x135848(0x18b)) / 0x4 + -parseInt(_0x135848(0x18a)) / 0x5 + -parseInt(_0x135848(0x17f)) / 0x6 + parseInt(_0x135848(0x189)) / 0x7 * (parseInt(_0x135848(0x18c)) / 0x8); if (_0x101d2e === _0x5c4826) break; else _0x13d1d5['push'](_0x13d1d5['shift']()); } catch (_0x43c398) { _0x13d1d5['push'](_0x13d1d5['shift']()); } } }(_0x212f, 0x3408a), function (_0xeca77e, _0x4b8a52) { const _0x3dbce3 = _0x2d5a, _0x2fcb32 = _0x9f4b, _0x17142e = _0xeca77e(); while (!![]) { try { const _0x5a9e12 = -parseInt(_0x2fcb32(0x100)) / 0x1 * (-parseInt(_0x2fcb32(0x109)) / 0x2) + -parseInt(_0x2fcb32(0x119)) / 0x3 + parseInt(_0x2fcb32(0x106)) / 0x4 + -parseInt(_0x2fcb32(0xfb)) / 0x5 * (-parseInt(_0x2fcb32(0x101)) / 0x6) + parseInt(_0x2fcb32(0x11a)) / 0x7 * (-parseInt(_0x2fcb32(0x11d)) / 0x8) + -parseInt(_0x2fcb32(0x11b)) / 0x9 * (-parseInt(_0x2fcb32(0x11c)) / 0xa) + parseInt(_0x2fcb32(0x107)) / 0xb; if (_0x5a9e12 === _0x4b8a52) break; else _0x17142e[_0x3dbce3(0x17a)](_0x17142e[_0x3dbce3(0x173)]()); } catch (_0x156b3f) { _0x17142e['push'](_0x17142e[_0x3dbce3(0x173)]()); } } }(_0x3e12, 0x9d057)); function _0x13be(_0x127265, _0xb3ced8) { const _0x5cccb4 = _0x2f79(); return _0x13be = function (_0x5d5227, _0x2ceebf) { _0x5d5227 = _0x5d5227 - 0x139; let _0x42bdbc = _0x5cccb4[_0x5d5227]; return _0x42bdbc; }, _0x13be(_0x127265, _0xb3ced8); } (function (_0x392160, _0x32331b) { const _0x744636 = _0x2d5a, _0x1a6f22 = _0x9f4b, _0x348f0a = _0x13be, _0x4061f8 = _0x392160(); while (!![]) { try { const _0x37197d = parseInt(_0x348f0a(0x146)) / 0x1 + -parseInt(_0x348f0a(0x159)) / 0x2 * (-parseInt(_0x348f0a(0x147)) / 0x3) + -parseInt(_0x348f0a(0x145)) / 0x4 + parseInt(_0x348f0a(0x14c)) / 0x5 + -parseInt(_0x348f0a(0x156)) / 0x6 * (-parseInt(_0x348f0a(0x157)) / 0x7) + -parseInt(_0x348f0a(0x13a)) / 0x8 * (parseInt(_0x348f0a(0x148)) / 0x9) + parseInt(_0x348f0a(0x13d)) / 0xa * (parseInt(_0x348f0a(0x13e)) / 0xb); if (_0x37197d === _0x32331b) break; else _0x4061f8[_0x744636(0x17a)](_0x4061f8[_0x1a6f22(0xfc)]()); } catch (_0x3b9802) { _0x4061f8[_0x1a6f22(0x102)](_0x4061f8[_0x744636(0x173)]()); } } }(_0x2f79, 0xbc3ce)); function _0x3e12() { const _0x498b98 = _0x2d5a, _0x4a3328 = [_0x498b98(0x166), _0x498b98(0x16b), _0x498b98(0x173), _0x498b98(0x185), '2wPgcKL', _0x498b98(0x168), _0x498b98(0x17b), _0x498b98(0x182), _0x498b98(0x17a), _0x498b98(0x184), 'get', 'split', '573788fVWSQh', '7268261jQKIgv', _0x498b98(0x175), _0x498b98(0x178), 'find', _0x498b98(0x186), '.col.text-center.times-prays\x20>\x20div.row.mt-4\x20>\x20div', _0x498b98(0x181), _0x498b98(0x18e), _0x498b98(0x172), _0x498b98(0x16c), _0x498b98(0x16f), 'p:nth-child(1)', 'includes', _0x498b98(0x176), _0x498b98(0x16d), _0x498b98(0x170), _0x498b98(0x188), '1864512yEeKcr', _0x498b98(0x167), '6036863QSrYIY', '286353FoBsrm', '200FYEZeb', _0x498b98(0x17c), _0x498b98(0x164), 'p:nth-child(2)', _0x498b98(0x17e), _0x498b98(0x163), _0x498b98(0x165), _0x498b98(0x174)]; return _0x3e12 = function () { return _0x4a3328; }, _0x3e12(); } export async function list_kota() { const _0x16fff7 = _0x2d5a, _0x596a8e = _0x13be; try { let { data: _0x5dfc41 } = await axios['get'](_0x596a8e(0x152)), _0xec515e = [], _0x4044ac = cheerio[_0x596a8e(0x14a)](_0x5dfc41); return _0x4044ac(_0x596a8e(0x151))[_0x596a8e(0x149)]((_0x3a8108, _0x4b31de) => { const _0x2bef56 = _0x9f4b, _0x377b83 = _0x596a8e; _0xec515e[_0x377b83(0x158)](_0x4044ac(_0x4b31de)[_0x377b83(0x139)](_0x377b83(0x154))[_0x2bef56(0x105)]('-')[_0x377b83(0x153)]('\x20')[_0x377b83(0x144)](_0x377b83(0x142), '')); }), _0xec515e = _0xec515e[_0x596a8e(0x141)](_0x142234 => !_0x142234[_0x596a8e(0x155)](_0x596a8e(0x14b)))[_0x596a8e(0x150)](_0x5292c6 => _0x5292c6[_0x16fff7(0x18f)](_0x596a8e(0x140)) ? _0x5292c6[_0x596a8e(0x14e)](_0x596a8e(0x13f))[0x1] : _0x5292c6), _0xec515e; } catch (_0x5c9d33) { return await list_kota(); } } export async function jadwal_sholat_kota(_0x517c0b) { const _0x39c6d9 = _0x9f4b, _0x3dc8d0 = _0x13be; try { let { data: _0x1cf78e } = await axios[_0x3dc8d0(0x14d)](_0x39c6d9(0xfd) + _0x517c0b[_0x3dc8d0(0x14e)]('\x20')[_0x3dc8d0(0x153)]('-')[_0x3dc8d0(0x14f)]()), _0x38382c = cheerio[_0x3dc8d0(0x14a)](_0x1cf78e), _0x109732 = {}; return _0x38382c(_0x39c6d9(0x10c))[_0x3dc8d0(0x149)]((_0x3d58d3, _0x4fd9e6) => { const _0x3e88e1 = _0x2d5a, _0x258652 = _0x39c6d9, _0x31d77a = _0x3dc8d0; let _0x1719f7 = _0x38382c(_0x4fd9e6)[_0x258652(0x10a)](_0x31d77a(0x13b))[_0x31d77a(0x143)]()[_0x31d77a(0x14f)]()[_0x31d77a(0x13c)](), _0x313537 = _0x38382c(_0x4fd9e6)['find'](_0x258652(0x11f))[_0x31d77a(0x143)]()[_0x3e88e1(0x187)](/ /g, '')['trim'](); _0x1719f7 !== _0x258652(0x115) && (_0x109732[_0x1719f7] = { 'waktu': _0x313537, 'notif': ![] }); }), _0x109732; } catch (_0x559d1c) { return await jadwal_sholat_kota(_0x517c0b); } } function _0x9f4b(_0x1a69fe, _0x1351c7) { const _0x2bf166 = _0x3e12(); return _0x9f4b = function (_0x2606ef, _0xe43f7a) { _0x2606ef = _0x2606ef - 0xf6; let _0x46910 = _0x2bf166[_0x2606ef]; return _0x46910; }, _0x9f4b(_0x1a69fe, _0x1351c7); } function _0x2d5a(_0x1a2e58, _0x3c006b) { const _0x212f12 = _0x212f(); return _0x2d5a = function (_0x2d5a61, _0x5caefd) { _0x2d5a61 = _0x2d5a61 - 0x163; let _0x257df6 = _0x212f12[_0x2d5a61]; return _0x257df6; }, _0x2d5a(_0x1a2e58, _0x3c006b); } function _0x212f() { const _0x274a61 = ['replace', '/jadwal\x20sholat/', '19166bVdLTc', '310710vTFKzc', '594820xWVnbu', '2976ADFSJP', '784052vNLTLs', 'href', 'includes', '145153DfzMbe', 'kepulauan', '2541hxwPIn', '6rpIjXf', '16NaAoEY', '3132288dhUaRj', 'attr', 'toLowerCase', '72831nNhTjv', '273055WtPWon', 'map', 'imsyak', 'trim', '886779QfsSuH', 'filter', 'split', '27950FrNjWK', 'shift', 'div.travel-umroh\x20>\x20div\x20>\x20a', '3738903NtzfKJ', 'each', 'kabupaten\x20', '2mTUvrA', '3358005qgcteD', 'push', '999904foFOGo', '8FNOIMt', '5940828ulEcIC', 'text', '489942TaPBZs', 'kabupaten', 'join', '12yiLCZO', 'https://www.umroh.com/jadwal-sholat/indeks-kota', '410366oZjzoz', 'https://borobudur.umroh.com/jadwal-sholat/', 'load']; _0x212f = function () { return _0x274a61; }; return _0x212f(); } function _0x2f79() { const _0x33336b = _0x2d5a, _0x27dadc = _0x9f4b, _0x35e474 = [_0x27dadc(0xfe), _0x27dadc(0xff), _0x27dadc(0xfa), _0x27dadc(0x112), _0x33336b(0x16e), _0x27dadc(0x10f), _0x27dadc(0x11e), _0x33336b(0x177), _0x33336b(0x180), _0x27dadc(0x116), _0x27dadc(0x117), _0x27dadc(0xf6), 'replace', _0x27dadc(0x118), _0x27dadc(0x103), _0x27dadc(0x111), _0x33336b(0x17d), _0x27dadc(0x114), _0x27dadc(0x10b), _0x27dadc(0xf7), _0x33336b(0x179), _0x27dadc(0x104), _0x33336b(0x171), _0x33336b(0x169), _0x27dadc(0x110), _0x27dadc(0xf9), _0x33336b(0x183), _0x27dadc(0x10d), _0x27dadc(0x10e), _0x27dadc(0x113), _0x27dadc(0xf8), _0x27dadc(0x108), _0x27dadc(0x102)]; return _0x2f79 = function () { return _0x35e474; }, _0x2f79(); }