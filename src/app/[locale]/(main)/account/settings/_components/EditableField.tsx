'use client';
import { ComponentProps, ReactNode, useState } from 'react';

import { EditIcon } from 'lucide-react';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomInputWithIcon from '@/components/shared/form/CustomInputWithIcon';
import { Modal } from '@/components/shared/Modal';

import EditableFieldProvider from '@/contexts/EditableFieldProvider';

type EditableFieldProps = ComponentProps<typeof CustomInput> & {
  editForm: ReactNode;
  formTitle: string;
};

export default function EditableField({
  editForm,
  formTitle,
  ...restProps
}: EditableFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <EditableFieldProvider value={{ isOpen, setIsOpen }}>
      <Modal
        isOpen={isOpen}
        toggle={setIsOpen}
        onClose={() => setIsOpen(false)}
        className='!rounded-3xl bg-white px-3 py-4 md:px-6 md:py-4 lg:w-8/12 xl:max-w-2xl [&>button>svg]:text-grayish-900 [&>button]:top-8 [&>button]:max-md:top-4'
        header={
          <h4 className='text-2xl font-medium text-grayish-900 md:py-2 xl:text-[2rem] xl:leading-10'>
            {formTitle}
          </h4>
        }
        headerClassName='xl:pb-6 pb-3 border-b border-grayish-50 ltr:text-start rtl:text-end'
      >
        {editForm}
      </Modal>

      <CustomInputWithIcon
        {...restProps}
        icon={
          <button
            type='button'
            className=''
            onClick={() => setIsOpen(true)}
          >
            <EditIcon className='size-5 text-grayish-900' />
          </button>
        }
        iconAlign={'inline-end'}
        disabled
      />
    </EditableFieldProvider>
  );
}
