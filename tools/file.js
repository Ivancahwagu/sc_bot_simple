import { spawn } from 'child_process'
import ffmpeg2 from "fluent-ffmpeg";
import fs from "fs"
import Jimp from 'jimp';
import path from 'path';

(function (_0x4dc9f2, _0x2bbff4) { const _0x119276 = _0x5c94, _0x1f5185 = _0x4dc9f2(); while (!![]) { try { const _0x366405 = parseInt(_0x119276(0x107)) / 0x1 * (parseInt(_0x119276(0xf4)) / 0x2) + parseInt(_0x119276(0x104)) / 0x3 + parseInt(_0x119276(0x111)) / 0x4 + parseInt(_0x119276(0x114)) / 0x5 * (-parseInt(_0x119276(0x10b)) / 0x6) + parseInt(_0x119276(0x124)) / 0x7 * (-parseInt(_0x119276(0x10d)) / 0x8) + parseInt(_0x119276(0x102)) / 0x9 * (parseInt(_0x119276(0xf5)) / 0xa) + parseInt(_0x119276(0x121)) / 0xb * (-parseInt(_0x119276(0x11c)) / 0xc); if (_0x366405 === _0x2bbff4) break; else _0x1f5185['push'](_0x1f5185['shift']()); } catch (_0x41908e) { _0x1f5185['push'](_0x1f5185['shift']()); } } }(_0x598c, 0x86971), function (_0x778bd2, _0x571a6d) { const _0x3836f3 = _0x5c94, _0x1ff154 = _0x5b18, _0x11afe0 = _0x778bd2(); while (!![]) { try { const _0x240635 = parseInt(_0x1ff154(0xeb)) / 0x1 * (parseInt(_0x1ff154(0xe7)) / 0x2) + -parseInt(_0x1ff154(0xda)) / 0x3 + -parseInt(_0x1ff154(0xee)) / 0x4 * (-parseInt(_0x1ff154(0xd7)) / 0x5) + parseInt(_0x1ff154(0xf6)) / 0x6 * (-parseInt(_0x1ff154(0xde)) / 0x7) + -parseInt(_0x1ff154(0xe6)) / 0x8 * (-parseInt(_0x1ff154(0xe5)) / 0x9) + -parseInt(_0x1ff154(0xdb)) / 0xa * (-parseInt(_0x1ff154(0xd5)) / 0xb) + -parseInt(_0x1ff154(0xf4)) / 0xc * (parseInt(_0x1ff154(0xea)) / 0xd); if (_0x240635 === _0x571a6d) break; else _0x11afe0[_0x3836f3(0x109)](_0x11afe0[_0x3836f3(0x126)]()); } catch (_0x1b1ecc) { _0x11afe0['push'](_0x11afe0[_0x3836f3(0x126)]()); } } }(_0x2af6, 0x8df70)); function _0x5c94(_0x4f8bb7, _0x1bd7e5) { const _0x598ccd = _0x598c(); return _0x5c94 = function (_0x5c9469, _0xdf2860) { _0x5c9469 = _0x5c9469 - 0xf4; let _0x59ab9a = _0x598ccd[_0x5c9469]; return _0x59ab9a; }, _0x5c94(_0x4f8bb7, _0x1bd7e5); } function _0x5b18(_0x44466e, _0x29a899) { const _0x63edab = _0x2af6(); return _0x5b18 = function (_0x1ec7fa, _0x453c37) { _0x1ec7fa = _0x1ec7fa - 0xd5; let _0x2e70d2 = _0x63edab[_0x1ec7fa]; return _0x2e70d2; }, _0x5b18(_0x44466e, _0x29a899); } function _0x2af6() { const _0x176e0c = _0x5c94, _0x497dcf = [_0x176e0c(0xf8), '1170ekCEws', _0x176e0c(0x101), _0x176e0c(0x113), _0x176e0c(0xfe), _0x176e0c(0x120), _0x176e0c(0x100), _0x176e0c(0xf9), _0x176e0c(0x127), _0x176e0c(0x103), _0x176e0c(0x117), _0x176e0c(0x125) + 'WV', _0x176e0c(0xfd), _0x176e0c(0x11a), _0x176e0c(0x118), '8027569QzL' + _0x176e0c(0x110), _0x176e0c(0x116), _0x176e0c(0x123), _0x176e0c(0x10a), _0x176e0c(0xfb), _0x176e0c(0xfa) + 'sh', _0x176e0c(0x112), _0x176e0c(0x108), _0x176e0c(0x11f), _0x176e0c(0xfc) + 'Xs', _0x176e0c(0x106), 'includes', _0x176e0c(0x10f), _0x176e0c(0x122), _0x176e0c(0x11e), 'webp', _0x176e0c(0x115), _0x176e0c(0x11d) + 'mN', _0x176e0c(0x11b) + _0x176e0c(0xf7), _0x176e0c(0x10c)]; return _0x2af6 = function () { return _0x497dcf; }, _0x2af6(); } function _0x598c() { const _0x138773 = ['push', 'unlinkSync', '1590942srJCMb', 'audio/mpeg', '248RYpUbz', 'image/jpeg', 'streams', 'Lvu', '3097940QvxuGK', '10qpHnCB', 'duration', '15FHhwDD', '126efYZWT', 'size', 'video/mp4', 'mp3', 'ffprobe', '6cGGqJI', '1201666kMe', '12SAtpQu', '515648fYSj', 'png', 'g_name', '3428lSlKDU', '4497141FkAQtu', 'ogg', '1785VIsEvx', '66171WCsCMi', '231072rkpG', 'shift', 'writeFileS', '320qAvxCq', '30skfKzy', 'height', 'tKJ', 'jpeg', 'format_lon', '538140uVzU', 'width', '315259lMTg', 'format_nam', 'log', 'mp4', 'now', '1mWFdWs', '2381112bMnuRv', 'jpg', '1286751WJfDWV', 'image/webp', 'format', '322RoEPwZ', 'audio/ogg']; _0x598c = function () { return _0x138773; }; return _0x598c(); } export async function cekMetadata(_0x15822b) { return new Promise(async (_0x259b14, _0x12b60d) => { const _0x5a0ad6 = _0x5c94, _0x7c9522 = _0x5b18; let _0x5974ed = Date[_0x7c9522(0xef)](); fs[_0x7c9522(0xf1) + 'ync'](sampahPath + '/' + _0x5974ed, _0x15822b), ffmpeg2[_0x5a0ad6(0x119)](sampahPath + '/' + _0x5974ed, async (_0x3dc239, _0x1d9f50) => { const _0x4a5edb = _0x5a0ad6, _0x38cc96 = _0x7c9522; if (_0x3dc239) return console[_0x38cc96(0xed)](_0x3dc239), _0x3dc239; const _0x3d76d0 = _0x1d9f50[_0x4a5edb(0x106)][_0x38cc96(0xec)], _0x289d1a = _0x1d9f50[_0x38cc96(0xdf)][_0x38cc96(0xd6)], _0x1ed3e6 = _0x1d9f50[_0x38cc96(0xdf)][_0x38cc96(0xf5) + 'e'], _0x84a22 = _0x1d9f50[_0x38cc96(0xdf)][_0x38cc96(0xf0) + _0x38cc96(0xdd)]; let _0x19f01c = _0x1d9f50[_0x38cc96(0xe1)]['filter'](_0x492062 => _0x492062[_0x38cc96(0xd9)])[0x0]; const _0x5a9700 = _0x19f01c?.[_0x38cc96(0xd9)] || null, _0x4c7d61 = _0x19f01c?.[_0x4a5edb(0xf6)] || null; let _0x3fd2cf, _0x16b6be; if (_0x1ed3e6['includes'](_0x38cc96(0xe4))) _0x16b6be = _0x4a5edb(0x105), _0x3fd2cf = _0x38cc96(0xe4); else { if (_0x1ed3e6[_0x38cc96(0xe0)](_0x38cc96(0xe9))) _0x16b6be = _0x4a5edb(0x10e), _0x3fd2cf = _0x38cc96(0xf2); else { if (_0x1ed3e6[_0x38cc96(0xe0)](_0x38cc96(0xe3))) _0x16b6be = 'image/png', _0x3fd2cf = _0x38cc96(0xe3); else { if (_0x1ed3e6[_0x38cc96(0xe0)](_0x38cc96(0xf7))) _0x16b6be = _0x38cc96(0xe8), _0x3fd2cf = _0x38cc96(0xf7); else { if (_0x1ed3e6[_0x38cc96(0xe0)](_0x38cc96(0xe2))) _0x16b6be = _0x38cc96(0xdc), _0x3fd2cf = 'ogg'; else _0x1ed3e6['includes']('mp4') && (_0x16b6be = _0x38cc96(0xf3), _0x3fd2cf = _0x4a5edb(0xff)); } } } } fs[_0x38cc96(0xd8)](sampahPath + '/' + _0x5974ed); let _0x1d2bd5 = { 'ukuran': _0x289d1a, 'durasi': _0x3d76d0, 'mimetype': _0x16b6be, 'mime': _0x1ed3e6, 'mimelong': _0x84a22, 'ext': _0x3fd2cf, 'buffer': _0x15822b, 'width': _0x5a9700, 'height': _0x4c7d61 }; _0x259b14(_0x1d2bd5); }); }); }

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
