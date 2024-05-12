"use client";
import { deleteCourse } from "@/actions/courses";
import Formulaire from "./forms/formulaire";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseDetail({ type, params, course }) {
  const router = useRouter();
  async function actionDelete({ courseId }) {
    await deleteCourse(parseInt(params));
    router.push(`/courses?type=${type}`);
  }

  return (
    <div className="flex flex-col w-full gap-4 justify-center ">
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
      <div className="flex flex-col items-center justify-center w-full ">
        <p className="text-2xl uppercase font-bold">{course?.title}</p>
        <p>{course?.content}</p>
      </div>
    </div>
  );
}
