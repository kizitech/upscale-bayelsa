import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
    <section className="bg-zinc-50 ">
      <main className="flex px-4 items-center w-full relative overflow-hidden justify-center">
        <Image src="/plug.png" height={2000} width={2000} alt="404" className="w-[80vw] h-[80vh] max-[770px]:hidden absolute top-[20vh] -right-[10vw] z-10 object-contain" />
        <section className="flex flex-col items-center md:items-start lg:px-30 px-10 max-md:px-4 text-center md:text-left justify-center max-md:py-10 md:min-h-[70vh] bg-white rounded-3xl mt-30 mb-10 max-w-7xl w-full gap-6">
          <h1 className="text-5xl font-extrabold text-black md:text-[8rem]">
            404.
          </h1>
          <h3 className="text-4xl max-md:text-2xl font-semibold">
            Page{" "}
            <span className="bg-[#A3E635] text-green-950 rounded px-3 py-1 ">
              not found.
            </span>
          </h3>
          <p className="text-sm text-black/60 md:text-base">
            The page you are looking for does not exist. <br />
            It might have been moved or deleted.
          </p>

          <Link
            href="/"
            className="px-6 py-3 text-white bg-green-950 rounded-lg mt-4"
          >
            Go back to Home
          </Link>
        </section>
      </main>
    </section>
    </>
  );
}
