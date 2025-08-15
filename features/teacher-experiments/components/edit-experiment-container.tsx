'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useSimulationSWR } from '@/features/simulation/hooks/use-simulation-swr';
import { PhetCCKDC } from '@/features/simulation/components/simulation';
import { EditExperimentHeader } from './edit-experiment-header';
import { EditExperimentPanel } from './edit-experiment-panel';
import ErrorAlert from '@/components/common/error-alert';
import { Loader2 } from 'lucide-react';

export const EditExperimentContainer = () => {
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const params = useParams();
  const experimentId = params.id as string;
  
  // Convert experimentId to number for API call
  const numericExperimentId = experimentId ? parseInt(experimentId, 10) : null;
  
  const { experimentData, error, isLoading } = useSimulationSWR(numericExperimentId);

  const handleToggleEditPanel = () => {
    setIsEditPanelOpen(!isEditPanelOpen);
  };

  const handleCloseEditPanel = () => {
    setIsEditPanelOpen(false);
  };

  const handleIframeRef = (ref: HTMLIFrameElement | null) => {
    iframeRef.current = ref;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang tải dữ liệu thí nghiệm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-6 overflow-hidden">
        <ErrorAlert
          title="Lỗi tải dữ liệu thí nghiệm"
          description="Không thể tải dữ liệu dụng cụ của thí nghiệm. Vui lòng thử lại sau."
          variant="destructive"
          showCloseButton={true}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Header with Navigation - Fixed height */}
      <EditExperimentHeader
        experimentId={experimentId}
        experimentData={experimentData}
        isEditPanelOpen={isEditPanelOpen}
        onToggleEditPanel={handleToggleEditPanel}
      />

      {/* Main Content - Fill remaining height without scroll */}
      <div className="flex-1 overflow-hidden relative">
        {/* Simulation Content - Fill remaining space */}
        <div className={`h-full transition-all duration-300 ease-in-out ${
          isEditPanelOpen ? 'pr-96' : 'pr-0'
        }`}>
          <PhetCCKDC 
            experimentData={experimentData}
            onIframeRef={handleIframeRef}
          />
        </div>

        {/* Edit Panel */}
        <EditExperimentPanel 
          isOpen={isEditPanelOpen} 
          onClose={handleCloseEditPanel}
          experimentData={experimentData}
          experimentId={experimentId}
          iframeRef={iframeRef}
        />
      </div>
    </div>
  );
};
