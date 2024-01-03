import { FaList } from 'react-icons/fa';

type Props = {
    title: string;
    children: React.ReactNode;
}

export default function SlashActions({title, children }: Props) {
    return (
        <section className="block justify-between items-center p-4 my-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-200 sm:flex">
            <div className="flex items-center divide-x divide-gray-100">
                <div className="pr-3">
                <FaList size={20} className='text-gray-500' />     
                </div>
                <p className="flex pl-4 space-x-2 text-gray-500">{title}</p>
            </div>
            <div className="hidden pl-0 space-x-2 divide-x divide-gray-100 sm:flex sm:px-2">
                <div className="pl-2">
                 {children}
                </div>
            </div>
        </section>
    )
}