import { Router, Request, Response } from "express";
import { User } from "../models/user";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();
let users: User[] = [];

// CRIAR USUARIO
router.post("/user", (req: Request, res: Response) => {
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
    });
    res.json({ message: "Usuario cadastrado com sucesso!" });
  }

  createUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send("ouve um erro");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

//LISTAR USUARIOS
router.get("/users", (req: Request, res: Response) => {
  async function listUsers() {
    const users = await prisma.user.findMany();
    res.send(users);
  }

  listUsers()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send("Houve um erro");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

//LISTAR USUARIO ESPECIFICO
router.get("/user/:id", (req: Request, res: Response) => {
  const formatedId = parseInt(req.params.id);
  async function listUser() {
    const user = await prisma.user.findMany({
      where: {
        id: formatedId,
      },
    });
    res.send(user);
  }

  listUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send("Houve um erro");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

//EDITAR USUARIO
router.put("/user/:id", (req: Request, res: Response) => {
  const formatedId = parseInt(req.params.id);

  async function editUser() {
    await prisma.user.update({
      where: { id: formatedId },
      data: {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
    });
    res.json({ message: "Usuario editado com sucesso!" });
  }

  editUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send("Houve um erro");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

// DELETAR USUARIO
router.delete("/user/:id", (req: Request, res: Response) => {
  const formatedId = parseInt(req.params.id);

  async function deleteUser() {
    await prisma.user.delete({
      where: {
        id: formatedId,
      },
    });
    res.send({ message: "Usuario removido com sucesso!" });
  }

  deleteUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send("Houve um erro");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

export default router;
