import Image from 'next/image';
import Link from 'next/link';
export default function NotFound() {
  return (
    <html>
      <body>
        <main>
          <section
            style={{ backgroundImage: "url('/images/world-2.png')" }}
            className='bg-primary-700 bg-center bg-no-repeat'
          >
            <div className='container relative mx-auto flex min-h-dvh flex-col items-center justify-center overflow-clip py-6 text-center lg:py-16'>
              <Image
                src='/svgs/notfound.svg'
                alt='Astronaut on 404 message'
                width={568}
                height={568}
                className='w-[568px] object-cover'
              />
              <p className='mb-4 text-3xl font-bold tracking-tight text-grayish-50 md:text-5xl ltr:font-Unna'>
                It Look Like Some Thing Went Wrong
              </p>
              <p className='mb-4 text-lg font-light text-grayish-100'>
                Oops! The page you&apos;re looking for doesn&apos;t exist. It
                may have been moved, deleted, or the URL might be incorrect.
              </p>
              <Link
                href='/en'
                className='my-4 inline-flex rounded-full bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-primary-500 hover:bg-secondary-400'
              >
                Back to home page
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
