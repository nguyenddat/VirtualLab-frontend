import { Source, SourceObject } from './types';
import { ExperimentData } from '../../services/simulation';

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
		// Kiểm tra iframe có tồn tại không
		if (!iframeRef.current || !iframeRef.current.contentWindow) {
			console.warn('Iframe không tồn tại hoặc chưa load');
			return '{}';
		}

		// Kiểm tra hàm getCurrentDevices có tồn tại không
		const contentWindow = iframeRef.current.contentWindow as any;
		if (typeof contentWindow.getCurrentDevices !== 'function') {
			console.warn('Hàm getCurrentDevices không tồn tại trong iframe');
			return '{}';
		}

		const devices = contentWindow.getCurrentDevices();
		
		// Kiểm tra devices có dữ liệu không
		if (!devices) {
			console.warn('Không có dữ liệu devices từ iframe');
			return '{}';
		}

		// Hàm để loại bỏ circular references
		const getCircularReplacer = () => {
			const seen = new WeakSet();
			return (key: string, value: any) => {
				if (typeof value === 'object' && value !== null) {
					if (seen.has(value)) {
						return '[Circular Reference]';
					}
					seen.add(value);
				}
				return value;
			};
		};

		// Sử dụng replacer để xử lý circular references
		const result = JSON.stringify(devices, getCircularReplacer());
		console.log('Dữ liệu mạch đã được xử lý:', result.substring(0, 200) + '...');
		return result;
	} catch (err) {
		console.error('Lỗi lấy dữ liệu mạch:', err);
		return '{}';
	}
};

export const loadSavedCircuit = (
	iframeRef: React.RefObject<HTMLIFrameElement | null>,
	experimentData: ExperimentData
): void => {
	const attemptLoad = (retryCount = 0) => {
		try {
			console.log(`Attempt ${retryCount + 1} to load circuit...`);
			
			if (!iframeRef.current || !iframeRef.current.contentWindow) {
				console.warn('Iframe không tồn tại hoặc chưa load');
				if (retryCount < 20) {
					setTimeout(() => attemptLoad(retryCount + 1), 500);
				}
				return;
			}
			
			const contentWindow = iframeRef.current.contentWindow as any;
			
			// Kiểm tra xem PhET simulation đã sẵn sàng chưa
			if (typeof contentWindow.loadSavedCircuit !== 'function') {
				console.warn('Hàm loadSavedCircuit không tồn tại trong iframe, retrying...');
				if (retryCount < 20) {
					setTimeout(() => attemptLoad(retryCount + 1), 500);
				}
				return;
			}
			
			// Chuyển đổi dữ liệu để phù hợp với format của PhET
			const phetCircuitData = {
				devices: experimentData.devices.map(device => ({
					name: device.name,
					type: device.type,
					properties: device.properties,
					startVertex: [device.start_vertex.x, device.start_vertex.y],
					endVertex: device.end_vertex ? [device.end_vertex.x, device.end_vertex.y] : undefined
				})),
				connections: experimentData.connections.map(conn => [conn[0], conn[1]])
			};
			
			console.log('Calling loadSavedCircuit with data:', phetCircuitData);
			const result = contentWindow.loadSavedCircuit(phetCircuitData);
			console.log('loadSavedCircuit result:', result);
			
			if (result && result.success) {
				console.log('✅ Dữ liệu mạch đã được tải vào iframe thành công!');
			} else {
				console.error('❌ Lỗi khi tải circuit:', result?.error || 'Unknown error');
			}
		} catch (err) {
			console.error('Lỗi khi tải circuit:', err);
			if (retryCount < 20) {
				setTimeout(() => attemptLoad(retryCount + 1), 500);
			}
		}
	};
	
	attemptLoad();
}
