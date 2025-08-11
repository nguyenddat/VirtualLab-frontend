'use client';

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { SimulationContainer } from "@/features/simulation";

const SimulationLayout = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams();
	const lessonTitle = searchParams.get('lesson') || "Thí nghiệm mạch điện DC";

	return (
		<SimulationContainer lessonTitle={lessonTitle}>
			{children}
		</SimulationContainer>
	);
};

export default SimulationLayout;