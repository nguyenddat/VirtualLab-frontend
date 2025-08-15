import type { ReactNode } from "react";
import { ExploreHeader } from "@/components/layout/explore-header";

const HelpLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<ExploreHeader />
			<main className="flex-1 w-full">{children}</main>
		</div>
	);
};

export default HelpLayout;
