import { getCourseByTeacher } from "@/actions/courses";
import { getStudentById } from "@/actions/students";
import { getSubscribedCourses } from "@/actions/subscribes";
import { getTeacherById } from "@/actions/teachers";
import Navbar from "@/components/Navbar";
import SubscribeCourse from "@/components/SubscribeCourse";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Profile({ searchParams: { type } }) {
  let courses = [];
  let user = {};
  if (type == "student") {
    user = await getStudentById(1);
    courses = await getSubscribedCourses(1);
  } else {
    user = await getTeacherById(1);
    courses = await getCourseByTeacher(1);
  }

  return (
    <>
      <Navbar type={type} />

      <div className="h-screen w-full flex ">
        <div className="w-10/12">
          <h1>Le profil de : {user?.name} </h1>
          <Separator className="w-full" />
          <div className="flex flex-wrap gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="w-[350px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <CardHeader className="flex justify-between">
                  <CardTitle className="flex justify-between">
                    <SubscribeCourse
                      course={course}
                      courseSubscribed={courses}
                      type={type}
                    />
                  </CardTitle>
                </CardHeader>
                <Link href="/courses/[id]" as={`/courses/${course.id}`}>
                  <CardContent>{course.summary}</CardContent>
                  <CardFooter className="flex justify-between flex-wrap gap-2">
                    <p> Enseignant : {course.teacher?.name}</p>
                    <p>Places disponibles : {course.availableSlots}</p>
                    <p>Niveau : {course.level}</p>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
