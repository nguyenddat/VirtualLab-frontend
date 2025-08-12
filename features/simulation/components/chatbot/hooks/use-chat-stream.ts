"use client"

import { useState } from 'react';
import { Message, StreamResponse, ElectricExplainRequest } from '../types';
import { parseSources, getCircuitData } from '../utils';

interface UseChatStreamProps {
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const useChatStream = ({ iframeRef }: UseChatStreamProps) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: "Xin chào! Tôi là trợ lý AI, có thể giúp gì cho bạn với thí nghiệm mạch điện này?",
			sender: 'bot',
			timestamp: new Date()
		}
	]);
	const [nextId, setNextId] = useState(2);
	const [isProcessing, setIsProcessing] = useState(false);

	const sendMessage = async (inputMessage: string) => {
		if (!inputMessage.trim() || isProcessing) return;
		
		setIsProcessing(true);

		// Thêm tin nhắn người dùng
		const userMsg = {
			id: nextId,
			text: inputMessage,
			sender: 'user' as const,
			timestamp: new Date(),
		};
		setMessages(prev => [...prev, userMsg]);
		setNextId(prev => prev + 1);

		// Lấy dữ liệu mạch từ iframe
		const circuitJson = getCircuitData(iframeRef);

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
			const requestBody: ElectricExplainRequest = {
				question: inputMessage,
				graph: circuitJson
			};

			const response = await fetch('https://virtuallab.onrender.com/api/physics/student_explain', {
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
			let botSources: any[] = [];

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
									
									// Parse sources nếu có
									if (data.sources && data.sources.length > 0) {
										botSources = parseSources(data.sources);
									}
									
									setMessages(prev =>
										prev.map(msg =>
											msg.id === botId ? { 
												...msg, 
												text: botText,
												sources: botSources
											} : msg
										)
									);
								} else if (data.type === 'error') {
									throw new Error(data.error || 'Lỗi không xác định');
								}
								
								// Kiểm tra trạng thái completed
								if (data.status === 'completed') {
									setMessages(prev =>
										prev.map(msg =>
											msg.id === botId ? { 
												...msg, 
												isStreaming: false,
												sources: botSources
											} : msg
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
								msg.id === botId ? { 
									...msg, 
									isStreaming: false,
									sources: botSources
								} : msg
							)
						);
						return;
					}
				}
			}

			// Kết thúc stream
			setMessages(prev =>
				prev.map(msg =>
					msg.id === botId ? { 
						...msg, 
						isStreaming: false,
						sources: botSources
					} : msg
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

	return {
		messages,
		isProcessing,
		sendMessage
	};
};
