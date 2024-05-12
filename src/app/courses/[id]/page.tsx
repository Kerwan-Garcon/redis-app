"use server";
import { getCourseById } from "@/actions/courses";
import CourseDetail from "@/components/CourseDetail";
import Navbar from "@/components/Navbar";
export default async function CourseDetails({
  params,
  searchParams: { type },
}) {
  const course = await getCourseById(params.id);
  return (
  <>
    <Navbar type={type} />
    <CourseDetail type={type} params={params.id} course={course} />
  </>
  );
}
