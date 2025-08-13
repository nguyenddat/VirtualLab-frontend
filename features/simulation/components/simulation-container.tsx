'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSimulationSWR } from '../hooks/use-simulation-swr';
import { PhetCCKDC } from './simulation';
import { SimulationHeader } from './simulation-header';
import { Chatbot } from './chatbot/chatbot';
import ErrorAlert from '@/components/common/error-alert';
import { Loader2 } from 'lucide-react';

export const SimulationContainer = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const searchParams = useSearchParams();
  const experimentId = searchParams.get('experiment_id');
  const lessonName = searchParams.get('lesson'); // Fallback cho backward compatibility
  
  // Convert experimentId to number for API call
  const numericExperimentId = experimentId ? parseInt(experimentId, 10) : null;
  
  const { experimentData, error, isLoading } = useSimulationSWR(numericExperimentId);

  // Log để debug
  console.log('Experiment Data:', experimentData);

  const handleToggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleIframeRef = (ref: HTMLIFrameElement | null) => {
    iframeRef.current = ref;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang tải dữ liệu thí nghiệm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
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
      {/* Header with Navigation */}
      <SimulationHeader
        lessonName={lessonName || `Thí nghiệm ${experimentId || ''}`}
        experimentData={experimentData}
        isChatbotOpen={isChatbotOpen}
        onToggleChatbot={handleToggleChatbot}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {/* Simulation Content */}
        <div className={`h-full transition-all duration-300 ease-in-out ${
          isChatbotOpen ? 'pr-96' : 'pr-0'
        }`}>
          <PhetCCKDC 
            experimentData={experimentData}
            onIframeRef={handleIframeRef}
          />
        </div>

        {/* Chatbot Panel */}
        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={handleCloseChatbot}
          iframeRef={iframeRef}
        />
      </main>
    </div>
  );
};
