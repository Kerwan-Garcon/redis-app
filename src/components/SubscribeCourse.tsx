"use client";
import { BellPlus, CheckIcon, Delete } from "lucide-react";
import { Button } from "./ui/button";
import { CardTitle } from "./ui/card";
import { getCourseById } from "@/actions/courses";
import { getSubscribedCourses, subscribeToCourse, unsubscribeFromCourse } from "@/actions/subscribes";

export default function SubscribeCourse({ course, courseSubscribed }) {

  console.log(course.id);
  const idSubscribed = courseSubscribed.map((course) => course.id);
  console.log(idSubscribed);

  return (
    <>
      {course.title}{" "}
      {idSubscribed.includes(course.id) ? (
        <Button
        variant={"destructive"}
          onClick={(e) => {
            unsubscribeFromCourse(1, parseInt(course.id));
          }}
        >
          <Delete className="mr-2 h-4 w-4" />
          <p>Se désabonner</p>{" "}
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            subscribeToCourse(1, course.id);
          }}
        >
          <BellPlus className="mr-2 h-4 w-4" /> <p>S'abonner</p>{" "}
        </Button>
      )}
    </>
  );
}
