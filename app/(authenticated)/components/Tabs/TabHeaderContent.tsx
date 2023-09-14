type Props = {
    label: string,
    onClick?: () => void
}

export function TabHeaderContent({label, onClick}:Props) {
    return (
      <div
        className={`py-2 px-6 cursor-pointer rounded-t-lg text-blue-500 border-t-2 border-r-2 border-l-2 bg-white
                `}
        onClick={onClick}
        >
        {label}
      </div>
    );
  }