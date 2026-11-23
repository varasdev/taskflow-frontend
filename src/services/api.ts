import axios from "axios";

const API_BASE_URL = __DEV__ 
  ? "http://10.0.2.2:3000/api"  // Android Emulator
  : "http://localhost:3000/api"; // Expo Web / iOS Simulator

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: TaskFormData): Promise<Task> => {
    const response = await api.post<Task>("/tasks", data);
    return response.data;
  },

  update: async (id: string, data: Partial<TaskFormData> & { completed?: boolean }): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
