import { ApiError } from "../api";
import { CONSTANTS_MAP } from "../constants";

export const getApiError = (error: ApiError) => {
  const { defaultError } = CONSTANTS_MAP.shared.config;
  return error?.message || defaultError;
};

export const formatDate = (date: string) => {
  const dateToFormat = new Date(date);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const comparableDate = new Date(dateToFormat);
  comparableDate.setHours(0, 0, 0, 0);

  if (comparableDate.getTime() === today.getTime()) {
    return `Сегодня, ${dateToFormat.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (comparableDate.getTime() === yesterday.getTime()) {
    return `Вчера, ${dateToFormat.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return `${dateToFormat.toLocaleDateString("ru", {
      month: "long",
      day: "2-digit",
    })}, ${dateToFormat.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
};
