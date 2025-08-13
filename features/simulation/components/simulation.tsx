'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { ExperimentData } from '../services/simulation';

interface PhetCCKDCProps {
	onIframeRef?: (ref: HTMLIFrameElement | null) => void;
	experimentData?: ExperimentData;
}

export const PhetCCKDC = forwardRef<HTMLIFrameElement, PhetCCKDCProps>(
	({ onIframeRef, experimentData }, ref) => {
		const localIframeRef = useRef<HTMLIFrameElement | null>(null);

		// Lắng nghe thông báo từ iframe
		useEffect(() => {
			const handleMessage = (event: MessageEvent) => {
				if (event.data?.type === 'phet-ready') {
					console.log('Simulation ready');
					if (experimentData) {
					  setTimeout(() => {
						const cw = localIframeRef.current?.contentWindow as any;
						if (cw?.loadSavedCircuit) {
						  cw.loadSavedCircuit(experimentData);
						}
					  }, 300);
					}
				  }
			};
			window.addEventListener('message', handleMessage);
			return () => window.removeEventListener('message', handleMessage);
		}, [experimentData]);

		return (
			<div className="h-full w-full">
				<iframe
					ref={(iframeRef) => {
						localIframeRef.current = iframeRef;
						if (typeof ref === 'function') {
							ref(iframeRef);
						} else if (ref) {
							ref.current = iframeRef;
						}
						if (onIframeRef) {
							onIframeRef(iframeRef);
						}
					}}
					src="/rebuild-simulation/adapted-from-phet/circuit-construction-kit-dc_all_adapted-from-phet.html?locale=vi"
					className="w-full h-full border-0"
					title="Circuit Construction Kit DC - Tiếng Việt"
					allowFullScreen
				/>
			</div>
		);
	}
);

PhetCCKDC.displayName = 'PhetCCKDC';