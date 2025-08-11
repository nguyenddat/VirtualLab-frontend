'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scroller } from '@/components/ui/scroller';
import { MessageCircle, Send, Bot, User, X } from 'lucide-react';

interface Message {
	id: number;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
	isStreaming?: boolean;
	error?: boolean;
}

interface ElectricExplainRequest {
	question: string;
	graph: string;
}

interface StreamResponse {
	type: 'content' | 'error';
	chunk_id?: number;
	content?: string;
	status?: 'streaming' | 'completed';
	error?: string;
}

interface ChatbotProps {
	isOpen: boolean;
	onClose: () => void;
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const Chatbot = ({ isOpen, onClose, iframeRef }: ChatbotProps) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: "Xin chào! Tôi là trợ lý AI, có thể giúp gì cho bạn với thí nghiệm mạch điện này?",
			sender: 'bot',
			timestamp: new Date()
		}
	]);
	const [inputMessage, setInputMessage] = useState('');
	const [nextId, setNextId] = useState(2);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSendMessage = async () => {
		if (!inputMessage.trim() || isProcessing) return;
		
		// Disable input trong khi đang xử lý
		const currentInput = inputMessage;
		setInputMessage('');
		setIsProcessing(true);

		// Thêm tin nhắn người dùng
		const userMsg = {
			id: nextId,
			text: currentInput,
			sender: 'user' as const,
			timestamp: new Date(),
		};
		setMessages(prev => [...prev, userMsg]);
		setNextId(prev => prev + 1);

		// Lấy dữ liệu mạch từ iframe
		let circuitJson = '{}';
		try {
			const devices = (iframeRef.current?.contentWindow as any)?.getCurrentDevices?.();
			circuitJson = JSON.stringify(devices || {});
		} catch (err) {
			console.error('Lỗi lấy dữ liệu mạch:', err);
		}

		// Thêm tin nhắn bot rỗng (streaming)
		const botId = nextId + 1;
		setMessages(prev => [...prev, {
			id: botId,
			text: 'Đang xử lý...',
			sender: 'bot' as const,
			timestamp: new Date(),
			isStreaming: true
		}]);
		setNextId(prev => prev + 2);

		// Gọi API stream
		try {
			const requestBody = {
				question: inputMessage,
				graph: circuitJson
			};

			const response = await fetch('http://localhost:8000/api/physics/electric_explain', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestBody)
			});

			if (!response.ok || !response.body) {
				throw new Error(`HTTP ${response.status}`);
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');
			let buffer = '';
			let botText = '';

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				
				// Xử lý từng dòng SSE
				const lines = buffer.split('\n');
				buffer = lines.pop() || ''; // Giữ lại phần chưa hoàn chỉnh

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						try {
							const jsonStr = line.slice(6); // Bỏ 'data: '
							if (jsonStr.trim()) {
								const data: StreamResponse = JSON.parse(jsonStr);
								
								if (data.type === 'content' && data.content) {
									botText = data.content;
									setMessages(prev =>
										prev.map(msg =>
											msg.id === botId ? { ...msg, text: botText } : msg
										)
									);
								} else if (data.type === 'error') {
									throw new Error(data.error || 'Lỗi không xác định');
								}
								
								// Kiểm tra trạng thái completed
								if (data.status === 'completed') {
									setMessages(prev =>
										prev.map(msg =>
											msg.id === botId ? { ...msg, isStreaming: false } : msg
										)
									);
								}
							}
						} catch (err) {
							console.error('Lỗi parse SSE data:', err, 'Line:', line);
						}
					} else if (line.startsWith('event: close')) {
						// Kết thúc stream
						setMessages(prev =>
							prev.map(msg =>
								msg.id === botId ? { ...msg, isStreaming: false } : msg
							)
						);
						return;
					}
				}
			}

			// Kết thúc stream
			setMessages(prev =>
				prev.map(msg =>
					msg.id === botId ? { ...msg, isStreaming: false } : msg
				)
			);
		} catch (err) {
			console.error('Lỗi gọi API:', err);
			setMessages(prev =>
				prev.map(msg =>
					msg.id === botId
						? { 
							...msg, 
							text: `❌ Lỗi: ${err instanceof Error ? err.message : 'Không thể kết nối đến server'}`, 
							isStreaming: false,
							error: true
						}
						: msg
				)
			);
		} finally {
			setIsProcessing(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

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
								<div
									key={message.id}
									className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
										}`}
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
										<p className="text-xs opacity-70 mt-1">
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
							))}
						</div>
					</Scroller>

					{/* Input Area */}
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
				</div>
			</div>
		</div>
	);
};
