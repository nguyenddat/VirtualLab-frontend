export interface Message {
	id: number;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
	isStreaming?: boolean;
	error?: boolean;
	sources?: Source[];
}

export interface Source {
	summary: string;
	source: string;
	page: number;
}

export interface ElectricExplainRequest {
	question: string;
	graph: string;
}

export interface StreamResponse {
	type: 'content' | 'error';
	chunk_id?: number;
	content?: string;
	status?: 'streaming' | 'completed';
	error?: string;
	sources?: string[] | SourceObject[];
}

export interface SourceObject {
	summary: string;
	page: number;
	filename: string;
}

export interface ChatbotProps {
	isOpen: boolean;
	onClose: () => void;
	iframeRef: React.RefObject<HTMLIFrameElement | null>;
}
