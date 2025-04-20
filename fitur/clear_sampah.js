import fs from 'fs';
import path from 'path';

let theoFitur = async function ({ m, theo }) {
    let sampah = fs.readdirSync(sampahPath);
    
    await m.reply(
        `🗑️ *File sampah terdeteksi:* \n\n` + 
        `${sampah.join(`\n`)}`
    );
    
    sampah.forEach(file => {
        fs.unlinkSync(path.join(sampahPath, file));
    });
    
    await m.reply(`✅ *Sampah berhasil dibersihkan! 🎉*`);
};

theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["csampah", "bersihkan"];

export default theoFitur;