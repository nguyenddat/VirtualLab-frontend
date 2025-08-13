'use client';

import useSWR from 'swr';
import { simulationService, ExperimentData } from '../services/simulation';

export const useSimulationSWR = (experimentId: number | null) => {
  const {
    data: experimentData,
    error,
    isLoading,
    mutate,
  } = useSWR<ExperimentData>(
    experimentId ? `experiment-${experimentId}` : null,
    () => simulationService.getExperimentData(experimentId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    experimentData,
    error,
    isLoading,
    mutate,
  };
};
