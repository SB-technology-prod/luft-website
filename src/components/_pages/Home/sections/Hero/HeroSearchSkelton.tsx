const HeroSearchSkelton = () => {
    return (
        <div className='mx-auto w-full space-y-6'>
            <div className='flex items-center gap-2'>
                <div className='h-10 w-32 animate-pulse rounded-full bg-grayish-200' />
                <div className='h-10 w-32 animate-pulse rounded-full bg-grayish-200' />
            </div>
            <div className='hidden h-16 items-center rounded-full bg-white p-2 ps-6 shadow-[0_2px_16px_rgba(0,0,0,0.08)] md:flex'>
                <div className='flex min-w-0 flex-1 items-center gap-4'>
                    <div className='h-10 w-full animate-pulse rounded-full bg-grayish-200' />
                    <div className='h-10 w-px shrink-0 bg-grayish-50' />
                    <div className='h-10 w-full animate-pulse rounded-full bg-grayish-200' />
                    <div className='h-10 w-px shrink-0 bg-grayish-50' />
                    <div className='h-10 w-full animate-pulse rounded-full bg-grayish-200' />
                </div>
                <div className='ml-2 h-12 w-12 animate-pulse rounded-full bg-grayish-200' />
            </div>
        </div>
    )
}

export default HeroSearchSkelton