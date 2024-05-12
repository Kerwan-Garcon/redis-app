"use client";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { use, useEffect, useState } from "react";
import { deleteCourse, searchCourses } from "@/actions/courses";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubscribeCourse from "./SubscribeCourse";
import Link from "next/link";
import { Delete } from "lucide-react";
import { unsubscribeFromCourse } from "@/actions/subscribes";

export default function Search({ courses, isTeacher, courseSubscribed }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(courses);
  const handleSearch = async () => {
    const newResults = await searchCourses(search);
    console.log(newResults);
    setSearchResults(newResults);
  };

  useEffect(() => {
    setSearchResults(courses);
  }, [courses]);

  return (
    <>
      <h1 className="text-2xl uppercase font-bold">Recherche de cours </h1>
      <form className="flex gap-4" action={handleSearch}>
        <Input
          placeholder="Recherche"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>Search</Button>
      </form>
      <div className="flex w-full flex-wrap gap-4 justify-center">
        {searchResults.map((course) => (
          <Card
            key={course.id}
            className="w-[350px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="flex justify-between">
              <CardTitle className="flex justify-between">
                {isTeacher == "student" ? (
                  <SubscribeCourse
                    course={course}
                    courseSubscribed={courseSubscribed}
                    type={isTeacher}
                  />
                ) : (
                  <>
                    {course.title}
                    <Button
                      variant={"destructive"}
                      onClick={(e) => {
                        deleteCourse(parseInt(course.id));
                      }}
                    >
                      <Delete className="mr-2 h-4 w-4" />
                      <p>Supprimer</p>{" "}
                    </Button>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <Link href={`/courses/${course.id}?type=${isTeacher}`}>
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
    </>
  );
}
