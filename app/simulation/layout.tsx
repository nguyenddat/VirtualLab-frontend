'use client';

import type { ReactNode } from "react";
import { Suspense } from "react";
import { SimulationContainer } from "@/features/simulation";

const SimulationLayoutContent = ({ children }: { children: ReactNode }) => {
	return (
		<SimulationContainer />
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