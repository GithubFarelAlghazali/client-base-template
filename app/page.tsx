import { LiaUserLockSolid } from "react-icons/lia";

export default async function Page() {
  return (
    <main className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <LiaUserLockSolid className="text-taupe-800 size-20" />
      <h1 className="p-5 rounded-xl text-center bg-taupe-900 text-white shadow-xl">
        ID tamu tidak valid
      </h1>
    </main>
  );
}
