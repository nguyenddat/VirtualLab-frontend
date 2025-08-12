'use client';

import { Button } from '@/components/ui/button';
import { Scroller } from '@/components/ui/scroller';
import { MessageCircle, X } from 'lucide-react';
import { ChatbotProps } from './types';
import { useChatStream } from './hooks/use-chat-stream';
import { ChatMessage } from './components/chat-message';
import { ChatInput } from './components/chat-input';

export const Chatbot = ({ isOpen, onClose, iframeRef }: ChatbotProps) => {
	const { messages, isProcessing, sendMessage } = useChatStream({ iframeRef });

	return (
		<div className={`absolute top-0 right-0 h-full transition-all duration-300 ease-in-out ${isOpen
				? 'translate-x-0 w-96'
				: 'translate-x-full w-96'
			}`}>
			<div className="h-full bg-muted/20 border-l relative">
				{/* Close Button */}
				<Button
					variant="ghost"
					size="sm"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
				>
					<X className="w-4 h-4" />
				</Button>

				{/* Chatbot Content */}
				<div className="h-full flex flex-col bg-background/95 backdrop-blur-sm">
					{/* Header */}
					<div className="p-4 border-b bg-background/80 backdrop-blur-sm">
						<div className="flex items-center gap-2 text-lg font-semibold">
							<MessageCircle className="w-5 h-5 text-primary" />
							Trợ lý AI
						</div>
						<p className="text-sm text-muted-foreground mt-1">
							Hỏi đáp về thí nghiệm mạch điện
						</p>
					</div>

					{/* Messages Area */}
					<Scroller className="flex-1 p-4">
						<div className="space-y-4">
							{messages.map((message) => (
								<ChatMessage key={message.id} message={message} />
							))}
						</div>
					</Scroller>

					{/* Input Area */}
					<ChatInput onSendMessage={sendMessage} isProcessing={isProcessing} />
				</div>
			</div>
		</div>
	);
};
