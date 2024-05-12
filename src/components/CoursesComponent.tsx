"use server";
import Link from "next/link";
import Formulaire from "./forms/formulaire";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubscribeCourse from "./SubscribeCourse";
import { getAllCourses } from "@/actions/courses";
import { Label } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Search from "./Search";
import { getSubscribedCourses } from "@/actions/subscribes";

export default async function CoursesComponent({ courses, isTeacher }) {
  const courseSuscribed = await getSubscribedCourses(1);
  return (
    <div className="flex flex-col flex-wrap w-10/12 mx-auto justify-center h-screen gap-4 ease-300">
      {isTeacher === "teacher" ? (
        <Formulaire description="Ajouter un cours" />
      ) : null}

      <Search courses={courses} isTeacher={isTeacher} courseSubscribed={courseSuscribed} />
    </div>
  );
}
