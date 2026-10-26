import mongoose from "mongoose";
import { TeamModel } from "../models/team.model.js";

export const createTeam = async (req, res) => {
  try {
    const { name, users, category } = req.body;

    if (!name || !users || !category) {
      return res.status(400).json({ msg: "Todos los campos son requeridos" });
    }

    const newTeam = await TeamModel.create(req.body);

    await newTeam.populate("users");

    return res
      .status(201)
      .json({ msg: "Team creado exitosamente", data: newTeam });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const team = await TeamModel.find().populate("users");

    return res
      .status(200)
      .json({ msg: "Todos los teams encontrados exitosamente", data: team });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const team = await TeamModel.findById(id).populate("users");

    if (!team) {
      return res.status(404).json({ msg: "No se ha encontrado el equipo" });
    }

    return res
      .status(200)
      .json({ msg: "Team encontrado exitosamente", data: team });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, users, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const team = await TeamModel.findByIdAndUpdate(
      id,
      { name, users, category },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).populate("users");

    if (!team) {
      return res.status(404).json({ msg: "No se ha encontrado el equipo" });
    }
    return res
      .status(200)
      .json({ msg: "Team actualizado exitosamente", data: team });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const team = await TeamModel.findByIdAndDelete(id);

    if (!team) {
      return res.status(404).json({ msg: "No se ha encontrado el equipo" });
    }

    return res
      .status(200)
      .json({ msg: "Team eliminado exitosamente", data: team });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};
