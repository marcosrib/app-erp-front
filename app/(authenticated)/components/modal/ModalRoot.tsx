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
          className="bg-gray-500 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex"
          role="dialog"
        >
          <div
            className={clsx(
              'relative',
              'px-4',
              'w-full',
              sizeScreen,
              'max-w-2xl',
              'h-full md:h-auto'
            )}
          >
            <div className="relative bg-white rounded-2xl shadow-lg">
              <div className="flex justify-between items-start p-5 rounded-t border-b">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button
                  type="button"
                  className="text-gray-400 
                   bg-transparent hover:bg-gray-200 
                   hover:text-gray-900 rounded-2xl text-sm
                   p-1.5 ml-auto inline-flex items-center"
                  onClick={closeModal}
                >
                  <MdClose size={20} />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
