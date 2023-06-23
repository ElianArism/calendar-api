import { Request, Response } from "express";
import Event from "../db/models/Event";
import {
  ApiErrorMessages,
  EventErrorMessages,
} from "../enums/api-error-messages";
import { ApiResponse } from "../interfaces/api-response";
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
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("user", "username");
    return res.json(GenerateSuccessResponse<IEvent[]>(events));
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const result = await validateIfEventExistsAndUserPermissions(
      req.params.id,
      req._id
    );

    if (!result.ok) {
      return res
        .status(404)
        .json(
          GenerateErrorResponse(
            result.error?.message as ApiErrorMessages
          )
        );
    }
    return res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const result = await validateIfEventExistsAndUserPermissions(
      req.params.id,
      req._id
    );

    if (!result.ok) {
      return res
        .status(404)
        .json(
          GenerateErrorResponse(
            result.error?.message as ApiErrorMessages
          )
        );
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, user: req._id },
      { new: true }
    );

    return res.json(
      GenerateSuccessResponse<Partial<IEvent>>({
        _id: req._id,
        title: updatedEvent?.title,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    const result = await validateIfEventExistsAndUserPermissions(
      req.params.id,
      req._id
    );

    if (!result.ok) {
      return res
        .status(404)
        .json(
          GenerateErrorResponse(
            result.error?.message as ApiErrorMessages
          )
        );
    }

    await Event.findByIdAndDelete(req.params.id);

    return res.json(
      GenerateSuccessResponse<Partial<IEvent>>({
        _id: req.params.id,
        title: result.data?.title,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

const validateIfEventExistsAndUserPermissions = async (
  id: string,
  userId: string
): Promise<ApiResponse<IEvent>> => {
  const event: IEvent | null = await Event.findById(id);

  if (!event)
    return GenerateErrorResponse(EventErrorMessages.eventNotFound);
  else if (event.user.toString() !== userId)
    return GenerateErrorResponse(ApiErrorMessages.userUnauthorized);

  return GenerateSuccessResponse<IEvent>(event);
};
