"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import { createCourse } from "@/actions/courses";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function Formulaire({ description }) {
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [level, setLevel] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  async function submitForm() {
    const course = {
      title: title,
      teacher: teacher,
      level: level,
      availableSlots: availableSlots,
      summary: summary,
      content: content,
    };

    await createCourse(course);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {" "}
          <SquarePlus className="mr-2 h-4 w-4" /> {description}{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{description}</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour {description}
          </DialogDescription>
        </DialogHeader>
        <form action={submitForm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titre" className="text-right">
                Titre
              </Label>
              <Input
                id="titre"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resumé
              </Label>
              <Textarea
                id="resume"
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contenu" className="text-right">
                Contenu du cours
              </Label>
              <Textarea
                id="contenu"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="places" className="text-right">
                Places disponibles
              </Label>
              <Input
                id="places"
                onChange={(e) => setAvailableSlots(e.target.value)}
                value={availableSlots}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
