import { ReactNode } from 'react';

import {
  EditableContextArgs,
  EditableFieldContext,
} from './EditableFieldContext';

export default function EditableFieldProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: EditableContextArgs;
}) {
  return (
    <EditableFieldContext.Provider value={value}>
      {children}
    </EditableFieldContext.Provider>
  );
}
