export default function Loading() {
    return (
        <div className="flex items-center justify-center mt-4" data-testid="loading">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-[5px] border-solid border-purple-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="absolute w-px h-px p-0 m-px overflow-hidden border-0 whitespace-nowrap "
                >Loading...</span>
            </div>
        </div>
    );
}
