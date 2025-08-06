import Papa from "papaparse";

// Функція для парсингу CSV за допомогою бібліотеки PapaParse
export const parseCSV = (file, callback) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => callback(results.data), // Результат у вигляді масиву об’єктів
  });
};