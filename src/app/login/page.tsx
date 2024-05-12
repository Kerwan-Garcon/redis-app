"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Login() {
  return (
    <>
      <h1 className="text-2xl uppercase font-bold">Choisissez votre profil</h1>
      <div className="flex flex-row gap-4">
        <Link href="/courses?type=teacher" >
          <Button>Professeur</Button>
        </Link>
        <Link href="/courses?type=student">
          <Button>Etudiant</Button>
        </Link>
      </div>
    </>
  );
}
