import { Source, SourceObject } from './types';

// Hàm parse sources từ string array hoặc object array
export const parseSources = (sources: string[] | SourceObject[]): Source[] => {
	if (typeof sources[0] === 'string') {
		// Format cũ: string array
		return (sources as string[]).map(sourceStr => {
			// Format: "summary: ..., source: ..., page: ..."
			const summaryMatch = sourceStr.match(/summary:\s*(.+?)(?=,\s*source:)/);
			const sourceMatch = sourceStr.match(/source:\s*(.+?)(?=,\s*page:)/);
			const pageMatch = sourceStr.match(/page:\s*(\d+)/);
			
			return {
				summary: summaryMatch?.[1]?.trim() || '',
				source: sourceMatch?.[1]?.trim() || '',
				page: parseInt(pageMatch?.[1] || '0')
			};
		});
	} else {
		// Format mới: object array
		return (sources as SourceObject[]).map(sourceObj => ({
			summary: sourceObj.summary,
			source: sourceObj.filename,
			page: sourceObj.page
		}));
	}
};

// Hàm mở PDF với trang cụ thể
export const openPDFWithPage = (pdfPath: string, page: number) => {
	// Tạo URL với anchor để điều hướng đến trang cụ thể
	const pdfUrl = `https://virtuallab.onrender.com/static/${pdfPath}#page=${page}`;
	window.open(pdfUrl, '_blank');
};

// Hàm lấy dữ liệu mạch từ iframe
export const getCircuitData = (iframeRef: React.RefObject<HTMLIFrameElement | null>): string => {
	try {
		const devices = (iframeRef.current?.contentWindow as any)?.getCurrentDevices?.();
		return JSON.stringify(devices || {});
	} catch (err) {
		console.error('Lỗi lấy dữ liệu mạch:', err);
		return '{}';
	}
};
