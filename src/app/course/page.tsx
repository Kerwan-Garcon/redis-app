import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourse } from "@/lib/db";
import { BellPlus, SquarePlus } from "lucide-react";
import Link from "next/Link";

export default async function Course({ id }) {
  const courses = await getCourse(id);
  return (
    <div className="flex flex-wrap w-10/12">
      <Button>
        <SquarePlus className="mr-2 h-4 w-4" /> Créer un cours
      </Button>
      {courses.map((course) => {
        <Link href="/course/[id]" as={`/course/${course.id}`}>
          <Card key={course.id} className="w-[350px]">
            <CardHeader className="flex justify-between">
              <CardTitle>
                {course.title}{" "}
                <Button>
                  <BellPlus className="mr-2 h-4 w-4" /> S'abonner
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>{course.summary}</CardContent>
            <CardFooter className="flex justify-between">
              <p>{course.teacher}</p>
              <p>{course.availableSlots}</p>
              <p>{course.level}</p>
            </CardFooter>
          </Card>
        </Link>;
      })}
    </div>
  );
}
