"use client";
import { deleteCourse } from "@/actions/courses";
import Formulaire from "./forms/formulaire";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";

export default function CourseDetail({ type, params, course }) {
  async function actionDelete({ courseId }) {
    await deleteCourse(parseInt(params));
  }

  return (
    <div>
      {type == "teacher" ? (
        <>
          <Formulaire description={"Modifier le cours"} />

          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => actionDelete(params)}
          >
            <Delete className="mr-2 h-4 w-4" />
            <p>Supprimer un cours</p>
          </Button>
        </>
      ) : null}
      {course?.title}
      {course?.content}
    </div>
  );
}
