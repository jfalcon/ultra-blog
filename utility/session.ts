'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/app/constants';
import { fromBase64 } from './encode';
import type { SessionInfo } from '@/types';

////////////////////////////////////////////////////////////////////////////////////////////////////

const emptySession: SessionInfo = {
  user: {
    createdAt: new Date(0), // unix epoch
    email: '',
    emailVerified: false,
    id: '',
    image: null,
    name: '',
    updatedAt: new Date(0), // unix epoch
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A server-side routine to extract and parse the session info cookie.
 * @returns {Promise<SessionInfo>} A promise of a SessionInfo object.
 */
export const getSessionInfo = async (): Promise<SessionInfo> => {
  // only do a shallow comparison for the demo
  function isValid(o: object): o is SessionInfo {
    return 'user' in o;
  }

  let session: SessionInfo = emptySession;

  // in a production app we would validate this cookie
  const cookieStore = await cookies();

  if (cookieStore.has(SESSION_COOKIE_NAME)) {
    try {
      const cookie = cookieStore.get(SESSION_COOKIE_NAME);

      session = JSON.parse(fromBase64(cookie?.value ?? '')) as SessionInfo;
      return isValid(session) ? session : emptySession;
    } catch {
      session = emptySession;
    }
  }

  return session;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
