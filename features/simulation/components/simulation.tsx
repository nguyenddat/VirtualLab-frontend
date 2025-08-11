'use client';

import { forwardRef } from 'react';

interface PhetCCKDCProps {
	onIframeRef?: (ref: HTMLIFrameElement | null) => void;
}

export const PhetCCKDC = forwardRef<HTMLIFrameElement, PhetCCKDCProps>(
	({ onIframeRef }, ref) => {
		// Tự động sử dụng tiếng Việt khi load trang
		const iframeSrc = "/rebuild-simulation/adapted-from-phet/circuit-construction-kit-dc_all_adapted-from-phet.html?locale=vi";
		
		return (
			<div className="h-full w-full">
				<iframe
					ref={(iframeRef) => {
						// Forward ref to parent component
						if (typeof ref === 'function') {
							ref(iframeRef);
						} else if (ref) {
							ref.current = iframeRef;
						}
						
						// Call callback if provided
						if (onIframeRef) {
							onIframeRef(iframeRef);
						}
					}}
					src={iframeSrc}
					className="w-full h-full border-0"
					title="Circuit Construction Kit DC - Tiếng Việt"
					allowFullScreen
				/>
			</div>
		);
	}
);

PhetCCKDC.displayName = 'PhetCCKDC';