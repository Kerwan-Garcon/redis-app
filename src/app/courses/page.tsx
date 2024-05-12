import { getAllCourses } from "@/actions/courses";
import { subscribeToCourse } from "@/actions/subscribes";
import CoursesComponent from "@/components/CoursesComponent";
import Navbar from "@/components/Navbar";
import SubscribeCourse from "@/components/SubscribeCourse";

export default async function Course({ searchParams }) {
  const courses = await getAllCourses();

  return (
    <>
      <Navbar type={searchParams.type || "student"} />
      <CoursesComponent
        courses={courses}
        isTeacher={searchParams.type || "student"}
      />
      ;
    </>
  );
}
