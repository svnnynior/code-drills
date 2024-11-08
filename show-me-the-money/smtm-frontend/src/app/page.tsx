import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">💰 Show Me The Money 💰</h1>
      <span className="text-lg mt-4">An application that shows your data from Xero.</span>
      <Link href="/balance-sheet">
        <button className="border border-white text-white px-4 py-2 rounded-md mt-4 hover:bg-white hover:text-black">
          View Balance Sheet
        </button>
      </Link>
    </div>
  );
}
