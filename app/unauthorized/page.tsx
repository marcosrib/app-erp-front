export default function Unauthorized() {
return (
<div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center">
        <h1 className="text-9xl font-bold dark:text-white">401</h1>
        <p className="text-2xl font-bold dark:text-white">
            Unauthorized
        </p>
    </div>
</div>
)
}