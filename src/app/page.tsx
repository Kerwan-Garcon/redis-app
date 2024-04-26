import { add, get } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const KEY = "key";
  const result = await get(KEY);

  const handleSubmit = async (data: FormData) => {
    "use server";
    const text = data.get("text");

    if (text) {
      await add(KEY, text.toString());

      revalidatePath("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit}>
        <input name="text" type="text" />
        <button>Redis</button>
      </form>
      <div>
        <p>Result</p>
        <ul>
          <li>{result}</li>
        </ul>
      </div>
    </main>
  );
}
