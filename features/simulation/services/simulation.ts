import { API_ENDPOINTS, apiHelpers } from '@/lib/configs/api';

export interface ExperimentDevice {
  name: string;
  type: string;
  properties: Record<string, any>;
  start_vertex: {
    x: number;
    y: number;
  };
  end_vertex: {
    x: number;
    y: number;
  };
}

export interface ExperimentConnection {
  [0]: string; // device1.vertex_type
  [1]: string; // device2.vertex_type
}

export interface ExperimentData {
  devices: ExperimentDevice[];
  connections: ExperimentConnection[];
}

export const simulationService = {
  // Lấy dữ liệu dụng cụ của thí nghiệm theo experiment_id
  async getExperimentData(experimentId: number): Promise<ExperimentData> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.SIMULATION.EXPERIMENT_DATA(experimentId)));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching experiment data:', error);
      throw error;
    }
  },
};
