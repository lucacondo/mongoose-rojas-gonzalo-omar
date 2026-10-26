import mongoose from "mongoose";
import { TeamModel } from "../models/team.model.js";

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Todos los campos son requeridos" });
    }

    const newTeam = await TeamModel.create(req.body);

    return res
      .status(201)
      .json({ msg: "Team creado exitosamente", data: newTeam });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const team = await TeamModel.find();

    return res
      .status(200)
      .json({ msg: "Todos los teams encontrados exitosamente" });
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

    const team = await TeamModel.findById(id);

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
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El ID proporcionado no es válido." });
    }

    const team = await TeamModel.findByIdAndUpdate(
      id,
      { name },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

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
