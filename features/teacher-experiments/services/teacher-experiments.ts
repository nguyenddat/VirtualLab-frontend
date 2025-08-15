import { BACKEND_API } from "@/lib/configs/environment";
import { fetcher } from "@/lib/utils/fetcher";

const TEACHER_EXPERIMENTS_ENDPOINTS = {
  UPDATE_BASIC_INFO: `${BACKEND_API}/api/experiment/user`,
  UPDATE_DEVICES: `${BACKEND_API}/api/experiment/user`,
};

// Types for API requests
export interface UpdateExperimentRequest {
  experiment_id: number;
  name: string;
  description: string;
  status: string;
  public_status: string;
}

export interface Device {
  name: string;
  type: string;
  properties: Record<string, any>;
  start: [number, number];
  end: [number, number];
}

export interface CreateExperimentDeviceRequest {
  experiment_id: number;
  devices: Device[];
  connections: [string, string][];
}

// API response types
export interface UpdateBasicInfoResponse {
  message: string;
}

export interface UpdateDevicesResponse {
  message: string;
}

export const teacherExperimentsServices = {
  updateBasicInfo: async (
    userId: number,
    params: UpdateExperimentRequest
  ): Promise<UpdateBasicInfoResponse> => {
    const response = await fetcher<UpdateBasicInfoResponse>([
      `${TEACHER_EXPERIMENTS_ENDPOINTS.UPDATE_BASIC_INFO}/${userId}/basic`,
      { method: "PUT", data: params },
    ]);
    return response;
  },

  updateDevices: async (
    userId: number,
    params: CreateExperimentDeviceRequest
  ): Promise<UpdateDevicesResponse> => {
    const response = await fetcher<UpdateDevicesResponse>([
      `${TEACHER_EXPERIMENTS_ENDPOINTS.UPDATE_DEVICES}/${userId}/device`,
      { method: "PUT", data: params },
    ]);
    return response;
  },
};
