import { revalidatePath } from "next/cache";

export default async function Home() {
  const KEY = "key";

  const handleSubmit = async (data: FormData) => {
    "use server";
    const text = data.get("text");

    if (text) {
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
          <li></li>
        </ul>
      </div>
    </main>
  );
}
