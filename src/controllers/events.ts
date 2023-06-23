import { Request, Response } from "express";
import Event from "../db/models/Event";
import { ApiErrorMessages } from "../enums/api-error-messages";
import { IEvent } from "../interfaces/event";
import {
  GenerateErrorResponse,
  GenerateSuccessResponse,
} from "../utils/response-generation";

export const createEvent = async (req: Request, res: Response) => {
  const event = new Event(req.body);

  try {
    const { _id, title }: IEvent = await event.save();
    return res.json(
      GenerateSuccessResponse<Partial<IEvent>>({
        _id,
        title,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(ApiErrorMessages.internalServerError)
      );
  }
};

export const getEvents = (req: Request, res: Response) => {
  return res.json({
    ok: true,
  });
};

export const getEventById = (req: Request, res: Response) => {
  return res.json({
    ok: true,
  });
};

export const updateEvent = (req: Request, res: Response) => {
  return res.json({
    ok: true,
  });
};

export const removeEvent = (req: Request, res: Response) => {
  return res.json({
    ok: true,
  });
};
