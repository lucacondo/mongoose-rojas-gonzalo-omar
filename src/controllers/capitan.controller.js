import mongoose from "mongoose";
import { CaptainModel } from "../models/capitan.model.js";
import { UserModel } from "../models/user.model.js";
import { TeamModel } from "../models/team.model.js";

export const createCaptain = async (req, res) => {
  try {
    const { team, users } = req.body;

    if (!users || !team) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(team) ||
      !mongoose.Types.ObjectId.isValid(users)
    ) {
      return res.status(400).json({
        msg: "Los IDs proporcionados no son válidos",
      });
    }

    const userExists = await UserModel.findById(users);

    if (!userExists) {
      return res.status(404).json({
        msg: "El usuario no existe",
      });
    }

    const teamExists = await TeamModel.findById(team);

    if (!teamExists) {
      return res.status(404).json({
        msg: "El equipo no existe",
      });
    }

    const userAlreadyCaptain = await CaptainModel.findOne({ users });

    if (userAlreadyCaptain) {
      return res.status(400).json({
        msg: "Este usuario ya es capitán de otro equipo",
      });
    }

    const teamAlreadyHasCaptain = await CaptainModel.findOne({ team });

    if (teamAlreadyHasCaptain) {
      return res.status(400).json({
        msg: "Este equipo ya tiene un capitán",
      });
    }

    const newCaptain = await CaptainModel.create({
      team,
      users,
    });

    await newCaptain.populate("team");
    await newCaptain.populate("users");

    return res.status(201).json({
      msg: "Capitán creado exitosamente",
      data: newCaptain,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno en el servidor",
      error: error.message,
    });
  }
};

export const getAllCapitans = async (req, res) => {
  try {
    const capitans = await CaptainModel.find()
      .populate("team")
      .populate("users");

    return res.status(200).json({
      msg: "Todos los capitanes encontrados existosamente",
      data: capitans,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const getCapitanById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "El ID proporcionado no es válido",
      });
    }

    const capitan = await CaptainModel.findById(id)
      .populate("team")
      .populate("users");

    if (!capitan) {
      return res.status(404).json({ msg: "Capitan no encontrado" });
    }

    return res
      .status(200)
      .json({ msg: "Capitan encontrado exitosamente", data: capitan });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno en el servidor", error });
  }
};

export const updateCaptain = async (req, res) => {
  try {
    const { id } = req.params;
    const { team, users } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "El ID proporcionado no es válido",
      });
    }

    if (users) {
      if (!mongoose.Types.ObjectId.isValid(users)) {
        return res.status(400).json({
          msg: "El ID del usuario no es válido",
        });
      }

      const userExists = await UserModel.findById(users);

      if (!userExists) {
        return res.status(404).json({
          msg: "El usuario no existe",
        });
      }
    }

    if (team) {
      if (!mongoose.Types.ObjectId.isValid(team)) {
        return res.status(400).json({
          msg: "El ID del equipo no es válido",
        });
      }

      const teamExists = await TeamModel.findById(team);

      if (!teamExists) {
        return res.status(404).json({
          msg: "El equipo no existe",
        });
      }
    }

    const captain = await CaptainModel.findByIdAndUpdate(
      id,
      {
        team,
        users,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!captain) {
      return res.status(404).json({
        msg: "No se ha encontrado el capitán",
      });
    }

    return res.status(200).json({
      msg: "Capitán actualizado exitosamente",
      data: captain,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno en el servidor",
      error: error.message,
    });
  }
};

export const deleteCaptain = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "El ID proporcionado no es válido",
      });
    }

    const captain = await CaptainModel.findByIdAndDelete(id);

    if (!captain) {
      return res.status(404).json({
        msg: "No se ha encontrado el capitán",
      });
    }

    return res.status(200).json({
      msg: "Capitán eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno en el servidor",
      error: error.message,
    });
  }
};
