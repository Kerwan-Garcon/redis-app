
import { deleteStudent, getStudents } from "@/actions/students";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Login from "./login/page";
export default async function Home() {
  const KEY = "key";

  const handleSubmit = async (data: FormData) => {
    "use server";

    const courses = await deleteStudent(1);
    console.log(courses);

    revalidatePath("/");
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-4 pt-36">
      <Login />
      {/* <form action={handleSubmit}>
        <input name="text" type="text" />
        <button>Redis</button>  
      </form>
      <div>
        <p>Result</p>
        <ul>
          <li></li>
        </ul>
      </div> */}
    </main>
  );
}
