const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPathV5 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v5.xlsx';
const excelPathV4 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v4.xlsx';
const excelPathV6 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v6.xlsx';
const excelPathV7 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v7.xlsx';
const excelPathV8 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v8.xlsx';
const excelPathV9 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v9.xlsx';
const excelPathV10 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v10.xlsx';
const excelPathV11 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v11.xlsx';
const excelPathV12 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v12.xlsx';
const excelPathV13 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v13.xlsx';
const excelPathV14 = 'C:\\Users\\Sencer\\Downloads\\Oxford_Vocabulary_Workbook_v14.xlsx';
const outputPath = path.join(__dirname, '../src/data/flashcardsFromExcel.js');

try {
  // Verileri birleştirecek fonksiyon
  function processExcelFile(filePath, fileName) {
    console.log(`\n=== ${fileName} ===`);
    const workbook = XLSX.readFile(filePath);
    console.log('Tüm sekmeler:', workbook.SheetNames);
    
    // Oxford Core Vocab sekmesini oku
    const sheetName = 'Oxford Core Vocab';
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Toplam satır: ${data.length}`);
    console.log('İlk 3 satır:', JSON.stringify(data.slice(0, 3), null, 2));
    
    return data;
  }
  
  // Tüm dosyaları oku
  const dataV5 = processExcelFile(excelPathV5, 'Oxford_Vocabulary_Workbook_v5.xlsx');
  const dataV4 = processExcelFile(excelPathV4, 'Oxford_Vocabulary_Workbook_v4.xlsx');
  const dataV6 = processExcelFile(excelPathV6, 'Oxford_Vocabulary_Workbook_v6.xlsx');
  const dataV7 = processExcelFile(excelPathV7, 'Oxford_Vocabulary_Workbook_v7.xlsx');
  const dataV8 = processExcelFile(excelPathV8, 'Oxford_Vocabulary_Workbook_v8.xlsx');
  const dataV9 = processExcelFile(excelPathV9, 'Oxford_Vocabulary_Workbook_v9.xlsx');
  const dataV10 = processExcelFile(excelPathV10, 'Oxford_Vocabulary_Workbook_v10.xlsx');
  const dataV11 = processExcelFile(excelPathV11, 'Oxford_Vocabulary_Workbook_v11.xlsx');
  const dataV12 = processExcelFile(excelPathV12, 'Oxford_Vocabulary_Workbook_v12.xlsx');
  const dataV13 = processExcelFile(excelPathV13, 'Oxford_Vocabulary_Workbook_v13.xlsx');
  const dataV14 = processExcelFile(excelPathV14, 'Oxford_Vocabulary_Workbook_v14.xlsx');
  
  // Verileri birleştir
  const allData = [...dataV5, ...dataV4, ...dataV6, ...dataV7, ...dataV8, ...dataV9, ...dataV10, ...dataV11, ...dataV12, ...dataV13, ...dataV14];
  
  // Verileri Flashcards formatına dönüştür
  const flashcardsByLevel = {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: []
  };
  
  let idCounter = 1;
  
  // Tüm verileri işle (v5 + v4 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14)
  allData.forEach((row, index) => {
    let word, level, type, meaning, example;
    
    // v6 yapısı: Named columns
    if (row["Kelime"] && row["Level"]) {
      word = row["Kelime"];
      level = row["Level"];
      type = row["Tür (Part of Speech)"];
      meaning = row["Türkçe Anlamı"];
      example = row["İngilizce Örnek Cümle"];
    }
    // v8 yapısı: __EMPTY_1 = Kelime, __EMPTY_2 = CEFR Seviyesi
    else if (row["__EMPTY_1"] && row["__EMPTY_2"] && 
             row["__EMPTY_1"] !== 'Kelime' && 
             row["__EMPTY_1"] !== 'OXFORD CORE VOCABULARY LIST' &&
             row["__EMPTY_1"] !== 'A1-C1 Seviyelerinde A - J Kelimeleri, Türleri, Anlamları ve Örnek Cümleleri' &&
             row["__EMPTY_2"] !== 'CEFR Seviyesi') {
      word = row["__EMPTY_1"];
      level = row["__EMPTY_2"];
      type = row["__EMPTY_3"];
      meaning = row["__EMPTY_4"];
      example = row["__EMPTY_5"];
    }
    // v14 yapısı: "A'dan Z'ye Sınıflandırılmış Oxford Core Kelimeleri" başlığı, __EMPTY = Kelime, __EMPTY_1 = Tür
    else if (row["A'dan Z'ye Sınıflandırılmış Oxford Core Kelimeleri"] && row["__EMPTY"] && 
             row["A'dan Z'ye Sınıflandırılmış Oxford Core Kelimeleri"] !== 'Seviye' &&
             row["__EMPTY"] !== 'Kelime (Word)' &&
             row["A'dan Z'ye Sınıflandırılmış Oxford Core Kelimeleri"] !== 'A\'dan Z\'ye Sınıflandırılmış Oxford Core Kelimeleri') {
      word = row["__EMPTY"];
      level = row["A'dan Z'ye Sınıflandırılmış Oxford Core Kelimeleri"];
      type = row["__EMPTY_1"];
      meaning = row["__EMPTY_2"];
      example = row["__EMPTY_3"];
    }
    // v7 yapısı: __EMPTY = Seviye, __EMPTY_1 = Tür
    else if (row["OXFORD CORE VOCABULARY (LETTERS A - F)"] && row["__EMPTY"]) {
      word = row["OXFORD CORE VOCABULARY (LETTERS A - F)"];
      level = row["__EMPTY"];
      type = row["__EMPTY_1"];
      meaning = row["__EMPTY_2"];
      example = row["__EMPTY_3"];
    }
    // v5 yapısı: __EMPTY_1 = CEFR Level, __EMPTY_2 = Word Type
    else if (row["__EMPTY"] && row["__EMPTY_1"] && (row["__EMPTY_1"].toUpperCase() === 'A1' || row["__EMPTY_1"].toUpperCase() === 'A2' || row["__EMPTY_1"].toUpperCase() === 'B1' || row["__EMPTY_1"].toUpperCase() === 'B2' || row["__EMPTY_1"].toUpperCase() === 'C1' || row["__EMPTY_1"].toUpperCase() === 'C2')) {
      word = row["__EMPTY"];
      level = row["__EMPTY_1"];
      type = row["__EMPTY_2"];
      meaning = row["__EMPTY_3"];
      example = row["__EMPTY_4"];
    }
    // v4 yapısı: __EMPTY_1 = Tür (POS), __EMPTY_2 = CEFR Seviye
    else if (row["__EMPTY"] && row["__EMPTY_2"]) {
      word = row["__EMPTY"];
      level = row["__EMPTY_2"];
      type = row["__EMPTY_1"];
      meaning = row["__EMPTY_3"];
      example = row["__EMPTY_4"];
    }
    
    // Başlık satırlarını atla
    if (!word || !level || 
        word === 'Vocabulary' || 
        word === 'Kelime (Word)' || 
        word === 'OXFORD CORE VOCABULARY - A, B & C' ||
        word === 'OXFORD CORE VOCABULARY (LETTERS A - F)' ||
        word === 'OXFORD CORE VOCABULARY LIST' ||
        word === 'A1-C1 Seviyelerinde A - J Kelimeleri, Türleri, Anlamları ve Örnek Cümleleri' ||
        word === 'CEFR Graded Core Vocabulary List with Meanings and Example Sentences' ||
        word === 'Kelime' ||
        level === 'Seviye (CEFR)' ||
        level === 'CEFR Seviyesi' ||
        level === 'CEFR Seviyesi') {
      return;
    }
    
    if (word && meaning && level) {
      const normalizedLevel = level.toUpperCase().trim();
      if (flashcardsByLevel[normalizedLevel]) {
        flashcardsByLevel[normalizedLevel].push({
          id: idCounter++,
          word: word.toString(),
          meaning: meaning.toString(),
          type: type ? type.toString() : '',
          example: example ? example.toString() : `${word} example sentence.`
        });
      }
    }
  });
  
  // Her seviyedeki kelime sayısı
  Object.keys(flashcardsByLevel).forEach(level => {
    console.log(`${level}: ${flashcardsByLevel[level].length} kelime`);
  });
  
  // JavaScript dosyası olarak kaydet
  const jsContent = `// Excel dosyasından otomatik oluşturulmuş kelime kartları
export const flashcardsFromExcel = ${JSON.stringify(flashcardsByLevel, null, 2)};`;
  
  fs.writeFileSync(outputPath, jsContent);
  console.log('Flashcards dosyası oluşturuldu:', outputPath);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Detay:', error);
}
