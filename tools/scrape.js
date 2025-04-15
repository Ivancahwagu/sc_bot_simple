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
