import Formulaire from "@/components/forms/formulaire";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourse, sub } from "@/lib/db";
import { BellPlus, SquarePlus, CheckIcon } from "lucide-react";
import Link from "next/Link";
const courses = [
  {
    id: 1,
    title: "Course 1",
    summary: "This is a summary of course 1",
    teacher: "Teacher 1",
    availableSlots: 13,
    level: "Beginner",
    subscribed: false,
  },
  {
    id: 2,
    title: "Course 2",
    summary: "This is a summary of course 2",
    teacher: "Teacher 2",
    subscribed: true,
    availableSlots: 7,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Course 3",
    summary: "This is a summary of course 3",
    subscribed: true,
    teacher: "Teacher 3",
    availableSlots: 16,
    level: "Advanced",
  },
  // Ajoutez plus de cours si nécessaire
];
export default async function Course() {
  return (
    <div className="flex flex-col flex-wrap w-10/12 items-center justify-center h-screen gap-4 ease-300">
      <Formulaire description={"Créer un cours"} />

      <div className="flex gap-4">
        {courses.map((course) => (
          <Link href="/course/[id]" as={`/course/${course.id}`} key={course.id}>
            <Card className="w-[350px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex justify-between">
                <CardTitle className="flex justify-between">
                  {course.title}{" "}
                  {course.subscribed ? (
                    <Button>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      <p>Abonné</p>{" "}
                    </Button>
                  ) : (
                    <Button>
                      <BellPlus className="mr-2 h-4 w-4" /> <p>S'abonner</p>{" "}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>{course.summary}</CardContent>
              <CardFooter className="flex justify-between flex-wrap gap-2">
                <p> Enseignant : {course.teacher}</p>
                <p>Places disponibles : {course.availableSlots}</p>
                <p>Niveau : {course.level}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
