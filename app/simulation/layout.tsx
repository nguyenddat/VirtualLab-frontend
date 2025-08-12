'use client';

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SimulationContainer } from "@/features/simulation";

const SimulationLayoutContent = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams();
	const lessonTitle = searchParams.get('lesson') || "Thí nghiệm mạch điện DC";

	return (
		<SimulationContainer lessonTitle={lessonTitle}>
			{children}
		</SimulationContainer>
	);
};

const SimulationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SimulationLayoutContent>
				{children}
			</SimulationLayoutContent>
		</Suspense>
	);
};

export default SimulationLayout;