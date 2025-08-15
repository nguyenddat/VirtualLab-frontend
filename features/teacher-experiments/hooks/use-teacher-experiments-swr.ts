import useSWR, { mutate } from 'swr';
import { teacherExperimentsServices, UpdateExperimentRequest, CreateExperimentDeviceRequest } from '../services/teacher-experiments';

export const useTeacherExperimentsSWR = () => {
  const updateBasicInfo = async (
    userId: number,
    params: UpdateExperimentRequest
  ) => {
    try {
      const response = await teacherExperimentsServices.updateBasicInfo(userId, params);
      return response;
    } catch (error) {
      console.error('Error updating basic info:', error);
      throw error;
    }
  };

  const updateDevices = async (
    userId: number,
    params: CreateExperimentDeviceRequest
  ) => {
    try {
      const response = await teacherExperimentsServices.updateDevices(userId, params);
      return response;
    } catch (error) {
      console.error('Error updating devices:', error);
      throw error;
    }
  };

  return {
    updateBasicInfo,
    updateDevices,
  };
};
