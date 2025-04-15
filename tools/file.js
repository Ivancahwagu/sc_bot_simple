import { spawn } from 'child_process'
import ffmpeg2 from "fluent-ffmpeg";
import fs from "fs"
import Jimp from 'jimp';
import path from 'path';

export async function cekMetadata(buffer) {
    return new Promise(async (resolve, reject) => {
        let file = Date.now()
        fs.writeFileSync(sampahPath + `/` + file, buffer)
        ffmpeg2.ffprobe(sampahPath + `/` + file, async (err, metadata) => {
            if (err) {
                console.log(err);
                return err
            }
            const durasi = metadata.format.duration;
            const ukuran = metadata.format.size;
            const mime = metadata.format.format_name;
            const mimelong = metadata.format.format_long_name;
            let data_size = metadata.streams.filter(a => a.width)[0]
            const width = data_size?.width || null
            const height = data_size?.height || null
            let ext
            let mimetype
            if (mime.includes("webp")) {
                mimetype = "image/webp"
                ext = "webp"
            }
            else
                if (mime.includes("jpeg")) {
                    mimetype = 'image/jpeg'
                    ext = "jpg"
                }
                else
                    if (mime.includes("png")) {
                        mimetype = 'image/png'
                        ext = "png"
                    }
                    else
                        if (mime.includes("mp3")) {
                            mimetype = 'audio/mpeg'
                            ext = "mp3"
                        }
                        else
                            if (mime.includes("ogg")) {
                                mimetype = "audio/ogg"
                                ext = "ogg"
                            }
                            else
                                if (mime.includes("mp4")) {
                                    mimetype = "video/mp4"
                                    ext = "mp4"
                                }
            //             console.log(`
            // durasi  : ${durasi} detik 
            // ukuran  : ${ukuran}
            // mime    : ${mime}
            // mimelong: ${mimelong}
            // mimetype: ${mimetype}
            // ext: ${ext}
            // `)
            fs.unlinkSync(sampahPath + `/` + file)
            let res = {
                ukuran,
                durasi,
                mimetype,
                mime,
                mimelong,
                ext,
                buffer,
                width,
                height
            }
            resolve(res)
        });
    });
}


export function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        try {
            let tmp = path.join(sampahPath, Date.now() + ext)
            let out = tmp + '.' + ext2
            fs.writeFileSync(tmp, buffer)
            spawn('ffmpeg', [
                '-y',
                '-i', tmp,
                ...args,
                out
            ])
                .on('error', reject)
                .on('close', async (code) => {
                    try {
                        fs.unlinkSync(tmp)
                        if (code !== 0) return reject(code)
                        resolve(fs.readFileSync(out))
                        fs.unlinkSync(out)
                    } catch (e) {
                        reject(e)
                    }
                })
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
export function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
    ], ext, 'ogg')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
export function toAudio(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
        '-compression_level', '10'
    ], ext, 'opus')
}

export function toMp3(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libmp3lame',
        '-b:a', '128k'
    ], ext, 'mp3');
}

export function toOgg(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libvorbis',
        '-b:a', '128k'
    ], ext, 'ogg');
}


/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
export function toVideo(buffer) {
    return ffmpeg(buffer, [
        '-c:v', 'libx264', // Menggunakan codec H.264
        '-vf', 'scale=320:320', // Mengatur skala video ke 320x320
        '-pix_fmt', 'yuv420p', // Format pixel yang umum digunakan untuk MP4
        '-r', '30', // Mengatur frame rate menjadi 30fps
    ], 'webp', 'mp4');
}

export function toWebp(buffer, ext) {
    // Sesuaikan nilai kualitas jika perlu

    return ffmpeg(buffer, [
        '-vcodec', 'libwebp',
        '-vf',
        // eslint-disable-next-line no-useless-escape
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=000000 [p]; [b][p] paletteuse",
        '-loop', '0',
        '-ss', '00:00:00',
        '-t', '00:00:05',
        '-preset', 'default',
        '-an',
        '-vsync', '0'
    ], ext, 'webp');
}

export function toImage_kotak(buffer) {
    return ffmpeg(buffer, [
        '-vf', 'scale=320:320',
    ], 'webp', 'png');
}

export async function toImage(buffer) {
    let data_buffer = await cekMetadata(buffer)
    return ffmpeg(data_buffer.buffer, [
        '-vf', `scale=${data_buffer.width}:${data_buffer.height}`,
    ], 'webp', 'png');
}
