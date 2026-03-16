import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'C:/Projetos/blklnk-deploy/blklnk.premium/public';

const imagesToCompress = [
  'assets/ph7/capa.png',
  'assets/ph7/hero.jpg',
  'assets/works/branding.jpg',
  'assets/works/software.jpg',
  'assets/works/trafego.jpg'
];

async function compressImages() {
  for (const relPath of imagesToCompress) {
    try {
      const fullPath = path.join(PUBLIC_DIR, relPath);
      const ext = path.extname(fullPath);
      const webpPath = fullPath.replace(ext, '.webp');

      if (!fs.existsSync(fullPath)) {
        console.warn(`[!] Arquivo não encontrado: ${fullPath}`);
        continue;
      }

      const info = await sharp(fullPath)
        .webp({ quality: 60 })
        .toFile(webpPath);
      
      console.log(`[+] Comprimido: ${path.basename(webpPath)} - Tamanho original: ${(fs.statSync(fullPath).size / 1024 / 1024).toFixed(2)}MB -> Novo: ${(info.size / 1024 / 1024).toFixed(2)}MB`);
      
      // Remove original file
      fs.unlinkSync(fullPath);
      console.log(`[-] Removido original: ${path.basename(fullPath)}`);
    } catch (e) {
      console.error(`Erro processando ${relPath}:`, e);
    }
  }
}

compressImages();
