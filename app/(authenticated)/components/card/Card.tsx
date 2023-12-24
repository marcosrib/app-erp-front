type Props = {
   title: string;
   children: React.ReactNode;
}

export default function Card({ children, title }: Props) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 break-inside-avoid">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
              {children}
        </div>
    )
}