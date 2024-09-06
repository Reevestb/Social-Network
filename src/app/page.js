import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-[2em] font-semibold text-green-700">Green Grass</h1>
      <Image src="/images/gg.png" alt="Green Grass" height={500} width={500} />
      <p className="text-[14px] text-green-400">
        The Social Network where the grass is always greener
      </p>
    </main>
  );
}
