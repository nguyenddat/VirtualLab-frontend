import { Message } from '../types';
import { openPDFWithPage } from '../utils';
import { Bot, User, FileText } from 'lucide-react';

interface ChatMessageProps {
	message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
	return (
		<div
			className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
		>
			{message.sender === 'bot' && (
				<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
					<Bot className="w-4 h-4 text-primary" />
				</div>
			)}

			<div
				className={`max-w-[80%] rounded-lg px-3 py-2 ${
					message.sender === 'user'
						? 'bg-primary text-primary-foreground'
						: message.error
						? 'bg-destructive/10 text-destructive border border-destructive/20'
						: 'bg-muted text-foreground'
				}`}
			>
				<p className="text-sm leading-relaxed whitespace-pre-line">
					{message.text}
					{message.isStreaming && (
						<span className="inline-block w-2 h-2 bg-primary rounded-full ml-1 animate-pulse" />
					)}
				</p>
				
				{/* Sources Section */}
				{message.sources && message.sources.length > 0 && (
					<div className="mt-3 pt-3 border-t border-border/50">
						<div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
							<FileText className="w-3 h-3" />
							<span className="font-medium">Nguồn tham khảo:</span>
						</div>
						<div className="space-y-1">
							{message.sources.map((source, index) => (
								<button
									key={index}
									className="text-xs text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2 transition-colors text-left w-full"
									onClick={() => openPDFWithPage(source.source, source.page)}
								>
									{source.summary}
								</button>
							))}
						</div>
					</div>
				)}
				
				<p className="text-xs opacity-70 mt-2">
					{message.timestamp.toLocaleTimeString('vi-VN', {
						hour: '2-digit',
						minute: '2-digit'
					})}
				</p>
			</div>

			{message.sender === 'user' && (
				<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
					<User className="w-4 h-4 text-muted-foreground" />
				</div>
			)}
		</div>
	);
};
