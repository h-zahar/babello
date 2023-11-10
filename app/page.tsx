import Image from "next/image";
import Link from "next/link";
import DemoGif from "@/images/landing/demo.gif";

export default function Home() {
  return (
    <main>
      <div className="relative isolate pt-14 dark:gray-900">
        <div
          className="absolute inset-x-0 top-64 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[-10deg] -translate-x-1/4 md:-translate-x-3/4 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(0 0, 51% 49%, 100% 1%, 100% 100%, 51% 49%, 0 100%)",
            }}
          ></div>
        </div>
        <div className="py-12 sm:py20 lg:pb-40">
          <div className="mx-auto max-w-7xl text-center px-5">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Chat with anyone
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-gray-300">
              You speak your language, they speak theirs.{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                Let AI handle the translation
              </span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/chat"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
              >
                Vew pricing <span>{"->"}</span>
              </Link>
            </div>
          </div>

          <div className="mt-16 flow-root sm:mt-24 select-none">
            <div className="mx-10 rounded-xl bg-gray-900/5 px-5 ring-inset ring-gray-900/10 md:mx-24 lg:rounded-2xl md:px-24">
              <Image
                unoptimized
                src={DemoGif}
                alt="Snapshot"
                width={2432}
                height={1442}
                draggable={false}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-15rem)] md:top-[calc(100%-22rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] rotate-[-10deg] -translate-x-1/4 md:-translate-x-3/4 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(0 0, 51% 49%, 100% 1%, 100% 100%, 51% 49%, 0 100%)",
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}
