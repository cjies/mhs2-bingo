import { promises as fs } from 'fs';
import neatCsv, { Row as CsvRow } from 'neat-csv';
import { join } from 'path';

const parseCSV = async (path: string): Promise<CsvRow[]> => {
  const basePath =
    process.env.NODE_ENV === 'production'
      ? join(process.cwd(), '.next/server/chunks')
      : process.cwd();
  const csvFilePath = join(basePath, path);

  const fileBuffer = await fs.readFile(csvFilePath, 'utf-8');
  const rows = await neatCsv(fileBuffer);

  return rows;
};

export default parseCSV;
