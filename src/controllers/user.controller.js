import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, age, password } = req.body;

    if (!username || !email || !age || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        msg: "Los campos username, email y password deben ser de tipo string",
      });
    }

    if (typeof age !== "number" || age < 0 || age > 120) {
      return res
        .status(400)
        .json({ msg: "La edad debe ser un número válido entre 0 y 120." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ msg: "Debe proporcionar un email válido." });
    }

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({ msg: "Los campos no deben ser vacíos" });
    }

    const newUser = await UserModel.create(req.body);

    return res
      .status(201)
      .json({ msg: "Usuario creado exitosamente", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      return res.status(404).json({
        msg: "No se ha encontrado el usuario",
      });
    }

    return res
      .status(200)
      .json({ msg: "Usuarios encontrados exitosamente", data: users });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const users = await UserSchema.findById(id);

    if (!users) {
      return res.status(404).json({ msg: "No se ha encontrado el usuario" });
    }

    return res
      .status(200)
      .json({ msg: "Usuario encontrado exitosamente", data: users });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, age, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const updateUsers = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        age,
        password,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updateUsers) {
      return res.status(404).json({
        msg: "No se ha encontrado el usuario",
      });
    }

    return res
      .status(200)
      .json({ msg: "Usuario actulizado exitosamente", data: updateUsers });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const deleteUser = await UserModel.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({
        msg: "No se ha encontrado el usuario",
      });
    }

    return res.status(200).json({ msg: "Usuario eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};
