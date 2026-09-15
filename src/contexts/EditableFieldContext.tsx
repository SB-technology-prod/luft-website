import { createContext } from 'react';

import { SetState } from '@/types';

export type EditableContextArgs = {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
};

export const EditableFieldContext = createContext<EditableContextArgs>({
  isOpen: false,
  setIsOpen: () => {},
});
