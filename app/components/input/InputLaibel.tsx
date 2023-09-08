interface props {
    label: string
}

export function InputLaibel({ label }: props) {
    return (
        <>
          <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
        </>
    )
}