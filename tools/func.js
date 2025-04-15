export function getRandom(jumlah) {
    return Math.floor(Math.random() * parseInt(jumlah))
}
export function nomor_random(jumlah) {
    let random = "1234567890"
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_besar_kecil(jumlah) {
    let random = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_besar_kecil_nomor(jumlah) {
    let random = `1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_kecil_nomor(jumlah) {
    let random = `1234567890abcdefghijklmnopqrstuvwxyz`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_besar_nomor(jumlah) {
    let random = `1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_kecil(jumlah) {
    let random = `abcdefghijklmnopqrstuvwxyz`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}
export function random_huruf_besar(jumlah) {
    let random = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let text = ''
    for (let i = 0; i < jumlah; i++) {
        text += random[getRandom(random.length)]
    }
    return text
}

export function getUUID() {
    let UUID = `${(random_huruf_besar_kecil_nomor(8)).toLowerCase()}-${(random_huruf_besar_kecil_nomor(4)).toLowerCase()}-${(random_huruf_besar_kecil_nomor(4)).toLowerCase()}-${(random_huruf_besar_kecil_nomor(4)).toLowerCase()}-${(random_huruf_besar_kecil_nomor(12)).toLowerCase()}`
    return UUID
}

export function tanggal_now(waktu) {
    let date = waktu ? new Date(waktu) : new Date(); // waktu input atau waktu sekarang
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000); // konversi ke UTC
    const jakartaOffset = 7 * 60 * 60000; // UTC+7
    return new Date(utcTime + jakartaOffset); // waktu Jakarta
}
export function int_tanggal_now(waktu) {
    let date = waktu ? new Date(waktu) : new Date(); // waktu input atau waktu sekarang
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000); // konversi ke UTC
    const jakartaOffset = 7 * 60 * 60000; // UTC+7
    return utcTime + jakartaOffset
}

export function selisih_waktu_now(targetTimestamp) {
    const sekarang = int_tanggal_now()
    const selisihMs = targetTimestamp - sekarang;

    if (selisihMs <= 0) {
        return "Waktu sudah lewat.";
    }

    const totalMenit = Math.floor(selisihMs / (1000 * 60));
    const hari = Math.floor(totalMenit / (60 * 24));
    const jam = Math.floor((totalMenit % (60 * 24)) / 60);
    const menit = totalMenit % 60;

    return `${hari} hari, ${jam} jam, dan ${menit} menit`;
}