import * as fs from 'fs';

const ErrorLog = 'error.log';
const OutputLog = 'output.log';
function cleanupLogs(): void {
  if (fs.existsSync(ErrorLog)) fs.truncateSync(ErrorLog);
  if (fs.existsSync(OutputLog)) fs.truncateSync(OutputLog);
}

/**
 * @deprecated Use Logger
 */
function log(
  msg: string,
  prefix: string = '[+]',
  toStdout: boolean = false
): void {
  if (toStdout) {
    console.log(`${prefix} ${msg}`);
  }
  const d = new Date();
  const timestamp = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (prefix !== '[+]') {
    fs.appendFileSync(ErrorLog, `${timestamp} - ${msg}\n`);
  } else {
    fs.appendFileSync(OutputLog, `${timestamp} - ${msg}\n`);
  }
}

// sort by numerical number
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export { cleanupLogs, log, collator };
