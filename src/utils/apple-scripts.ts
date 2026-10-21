import { execFile } from 'child_process';
import { promisify } from 'util';
import { extractQRCodeFromImage } from '.';
import fs from 'fs/promises';
const execFileAsync = promisify(execFile);

async function getDisplayCount() {
  const { stdout } = await execFileAsync('/usr/sbin/system_profiler', ['SPDisplaysDataType']);
  const count = stdout.split(/\r?\n/).filter((line) => line.includes('Resolution:')).length || 1;
  return count;
}

export async function scanMacOsQRCodeAcrossDisplays(path: string): Promise<string | undefined> {
  let scannedData: string | undefined;
  const displayCount = await getDisplayCount();
  for (let i = 0; i < displayCount; i++) {
    await execFileAsync('/usr/sbin/screencapture', ['-xD', String(i + 1), path]);
    scannedData = await extractQRCodeFromImage(path);
    if (scannedData) break;
  }

  try {
    await fs.unlink(path);
  } catch (cleanUpError) {
    console.warn(`Could not delete temporary file ${path}:`, cleanUpError);
  }

  return scannedData;
}

export async function selectMacOsQRCodeRegion(path: string): Promise<string | undefined> {
  await execFileAsync('/usr/sbin/screencapture', ['-xi', path]);
  const selectedData = await extractQRCodeFromImage(path);

  try {
    await fs.unlink(path);
  } catch (cleanUpError) {
    console.warn(`Could not delete temporary file ${path}:`, cleanUpError);
  }
  return selectedData;
}
