import { useContext } from 'react';

import { SessionContext } from '../contexts/SessionContext';

export default function useSession() {
  const session = useContext(SessionContext);

  return session;
}
