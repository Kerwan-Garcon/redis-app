import { createCourse, getAllCourses } from "@/actions/courses";
import { deleteStudent, getStudents } from "@/actions/students";
import { getAllTeachers } from "@/actions/teachers";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const KEY = "key";

  const handleSubmit = async (data: FormData) => {
    "use server";

     const courses = await deleteStudent(1);
     console.log(courses)

      revalidatePath("/");
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
