import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";

export async function register(req, res, next) {
  try {
    const email = req.body.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const password = await bcrypt.hash(req.body.password, 12);
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email,
        password,
        role: "ADMIN"
      }
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const email = req.body.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}
