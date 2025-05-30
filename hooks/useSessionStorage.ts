'use client';

import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { isClient } from '@/utility';

type Storage = object | number | string;

////////////////////////////////////////////////////////////////////////////////////////////////////

function getStorageValue<T extends Storage>(key: string, defaultValue?: T) {
  let result: Storage | undefined;

  if (isClient()) {
    // note, use Buffer.from(data, 'base64') instead of atob for server-side code
    // also, do an extra trim since session storage is user editable in the browser
    const stored = window.atob((window.sessionStorage.getItem(key) ?? '').trim());

    try {
      // this works with arrays too since they are technically an object
      if (typeof defaultValue === 'object')
        result = JSON.parse(stored);
      else if (typeof defaultValue === 'number')
        result = parseFloat(stored); // radix always 10
      else
        result = stored;
    } catch {
      result = undefined;
    }
  }

  return (result || defaultValue) as T;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function setStorageValue<T extends Storage>(key: string, value: T) {
  if (isClient()) {
    let x: string;

    // note, use data.toString('base64') instead of btoa for server-side code
    // this works with arrays too since they are technically an object
    if (typeof value === 'object')
      x = JSON.stringify(value);
    else
      x = (value ?? '').toString().trim();

    window.sessionStorage.setItem(key, window.btoa(x));
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const useSessionStorage = <T extends Storage>(key: string, defaultValue?: T) => {
  const k = key.trim();

  const [value, setValue] = useState<Storage>(() => getStorageValue(k, defaultValue));
  useEffect(() => setStorageValue(k, value), [k, value]);

  return [value, setValue] as [T, Dispatch<SetStateAction<Storage>>];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
