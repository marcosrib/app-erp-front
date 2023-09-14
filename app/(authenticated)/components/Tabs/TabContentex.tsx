type Props = {
  label: string
}
export default function TabContent({ label }:Props) {
    return (
        <p> TabContent {label}</p>
    )
}