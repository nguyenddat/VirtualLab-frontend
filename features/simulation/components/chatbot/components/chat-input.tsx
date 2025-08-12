"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	isProcessing: boolean;
}

export const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
	const [inputMessage, setInputMessage] = useState('');

	const handleSendMessage = () => {
		if (!inputMessage.trim() || isProcessing) return;
		
		onSendMessage(inputMessage);
		setInputMessage('');
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="p-2 border-t bg-background/80 backdrop-blur-sm">
			<div className="flex gap-2 items-center">
				<Input
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Nhập câu hỏi của bạn..."
					className="flex-1 h-10 text-sm"
					disabled={isProcessing}
				/>
				<Button
					onClick={handleSendMessage}
					size="sm"
					disabled={!inputMessage.trim() || isProcessing}
					className="h-8 w-8 p-0"
				>
					<Send className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};
