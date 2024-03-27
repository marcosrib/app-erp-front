import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';
import clsx from 'clsx';

type Props = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  sizeScreen?: string;
  closeModal: () => void;
};

export function ModalRoot({
  isOpen,
  title,
  sizeScreen = 'max-w-2xl',
  closeModal,
  children,
}: Props) {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed  top-0 right-0 bottom-0 left-0  z-40  overflow-y-auto bg-gray-500 bg-opacity-30 flex justify-center items-center `}
        >
          <div
            className={clsx(
              'bg-white',
              'mt-20',
              'rounded-2xl',
              'w-full',
              'shadow-lg',
              sizeScreen
            )}
          >
            <div className="flex justify-between items-start p-5 rounded-t border-b">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
                onClick={closeModal}
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
