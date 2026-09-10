const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxPath = 'C:\\Users\\Sencer\\Desktop\\ıngılızce kitap\\c2-ingilizce-dilbilgisi-rehberi-ve-sinav.docx';

mammoth.extractRawText({ path: docxPath })
  .then(result => {
    console.log('Çıkarılan metin:');
    console.log(result.value);
    
    // Dosyaya kaydet
    fs.writeFileSync('extracted_text.txt', result.value);
    console.log('Metin extracted_text.txt dosyasına kaydedildi');
  })
  .catch(err => {
    console.error('Hata:', err);
  });