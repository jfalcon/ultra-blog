import { isClient } from './helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * An isomorphic routine to decode from base64 into plain text.
 * @returns {string} The decoded plain text.
 */
export const fromBase64 = (message: string) => {
  if (isClient()) {
    return window.atob(message.trim());
  } else {
    const buffer = Buffer.from(message.trim(), 'base64');
    return buffer.toString('utf8');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * An isomorphic routine to encode from plain text into base64.
 * @returns {string} The encoded plain text.
 */
export const toBase64 = (message: string) => {
  if (isClient()) {
    return window.btoa(message.trim());
  } else {
    const buffer = Buffer.from(message.trim(), 'utf8');
    return buffer.toString('base64');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
