"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConnexion, setIsConnexion] = useState(true);

  async function actionUser() {

    const user = {
      name: name,
      lastname: lastName,
      email: email,
      password: password,
    };


  }

  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div
        className="h-screen w-7/12 relative"
        style={{ background: "url('/conexion.jpg')" }}
      >
        <div className="h-full w-full flex items-center justify-start mt-10 flex-col shadow-xl">
          <h1 className="text-6xl text-violet-900 font-extrabold">
            REDIS LANE
          </h1>
          <h3 className="text-2xl font-black uppercase text-violet-900">
            N'oubliez pas vos cours
          </h3>
        </div>
      </div>
      <div className="bg-[#F5F5F5] w-5/12 flex justify-center flex-col items-center gap-8">
        <h1 className="uppercase font-extrabold text-3xl text-violet-900">{!isConnexion ? "S'inscrire" : "Connexion"}</h1>
        <form
          action={actionUser}
          className="flex justify-center flex-col items-center gap-5 w-full"
        >
          {!isConnexion ? (
            <div className="flex gap-4 justify-center">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-5/12 text-[#001F3F] border-[#001F3F]"
                type="text"
                placeholder="Nom"
              />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-5/12 text-[#001F3F] border-[#001F3F]"
                type="text"
                placeholder="Prénom"
              />
            </div>
          ) : null}

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-1/2 text-[#001F3F] border-[#001F3F]"
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-1/2 text-[#001F3F] border-[#001F3F]"
            type="password"
            placeholder="Mot de passe"
          />
          <Button className="bg-violet-900" type="submit">
            {isConnexion ? "Se connecter" : "Créer un compte"}
          </Button>
        </form>
        <div className="flex w-full justify-center">
          <Separator
            orientation="horizontal"
            className="w-2/12 bg-violet-900 h-0.5"
          />
          <p className="-mt-3 ml-1 mr-1">ou</p>
          <Separator
            orientation="horizontal"
            className="w-2/12 bg-violet-900 h-0.5"
          />
        </div>

        <Button className="bg-violet-900" onClick={() => setIsConnexion(!isConnexion)}>
          {isConnexion ? "Créer un compte" : "Se connecter"}
        </Button>
      </div>
    </main>
  );
}
