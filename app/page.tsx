import { LiaUserLockSolid } from "react-icons/lia";

export default async function Page() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="rounded-xl shadow-2xl p-5 flex justify-center flex-col items-center outline-1 outline-taupe-900/50">
        <LiaUserLockSolid className="text-taupe-800 size-20" />
        <h1 className="p-5 text-center font-semibold">ID tamu tidak valid</h1>
      </div>
    </main>
  );
}
