type Stream = 'log' | 'error' | 'debug';

interface ErrorWithCode extends Error {
  code?: number
}

const dateOpts = { timeStyle: 'medium', dateStyle: 'short' };
// eslint-disable-next-line
// @ts-ignore
const timestamp = (): string => new Date().toLocaleString('en', dateOpts);


const logWithTimestamp = (stream: Stream, message: string): void => {
  console[stream](`[${timestamp()}] ${message}`);
};

export default {
  log: (message: string): void => logWithTimestamp('log', message),
  debug: (message: string): void => logWithTimestamp('debug', message),
  error: (err: ErrorWithCode): void => logWithTimestamp('error', `${err.code || ''} ${err.name}: ${err.message}`)
};

