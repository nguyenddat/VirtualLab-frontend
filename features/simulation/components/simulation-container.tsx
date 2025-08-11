'use client';

import { useState, useRef } from 'react';
import { SimulationHeader } from './simulation-header';
import { Chatbot } from './chatbot';
import { PhetCCKDC } from './simulation';

interface SimulationContainerProps {
	lessonTitle: string;
	children?: React.ReactNode;
}

export const SimulationContainer = ({ lessonTitle, children }: SimulationContainerProps) => {
	const [isChatbotOpen, setIsChatbotOpen] = useState(true);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleToggleChatbot = () => {
		setIsChatbotOpen(!isChatbotOpen);
	};

	const handleCloseChatbot = () => {
		setIsChatbotOpen(false);
	};

	const handleIframeRef = (ref: HTMLIFrameElement | null) => {
		iframeRef.current = ref;
	};

	return (
		<div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
			{/* Header with Navigation */}
			<SimulationHeader
				lessonTitle={lessonTitle}
				isChatbotOpen={isChatbotOpen}
				onToggleChatbot={handleToggleChatbot}
			/>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden relative">
				{/* Simulation Content */}
				<div className={`h-full transition-all duration-300 ease-in-out ${
					isChatbotOpen ? 'pr-96' : 'pr-0'
				}`}>
					<PhetCCKDC ref={iframeRef} onIframeRef={handleIframeRef} />
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
