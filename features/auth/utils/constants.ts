import type { IUser } from "./types";
import { apiHelpers } from "@/lib/configs/api";

export const SAMPLE_USER: IUser = {
  id: "foggo",
  userName: "Foggo",
  email: "foggo@gmail.com",
  emailVerified: true,
  image: apiHelpers.buildAvatarUrl("Chase"),
  role: "admin",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

export const SAMPLE_STUDENT: IUser = {
  id: "student1",
  userName: "student1",
  email: "student1@example.com",
  emailVerified: true,
  image: apiHelpers.buildAvatarUrl("Student"),
  role: "student",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

export const SAMPLE_TEACHER: IUser = {
  id: "teacher1",
  userName: "teacher1",
  email: "teacher1@example.com",
  emailVerified: true,
  image: apiHelpers.buildAvatarUrl("Teacher"),
  role: "teacher",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

export const SAMPLE_ADMIN: IUser = {
  id: "admin1",
  userName: "admin1",
  email: "admin1@example.com",
  emailVerified: true,
  image: apiHelpers.buildAvatarUrl("Admin"),
  role: "admin",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};
