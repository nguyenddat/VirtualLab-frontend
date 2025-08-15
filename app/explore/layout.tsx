import type { ReactNode } from "react";
import { ExploreHeader } from "@/components/layout/explore-header";
import { RootFooter } from "@/components/layout/root-footer";

const ExploreLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<ExploreHeader />
			<main className="flex-1 w-full">{children}</main>
			<RootFooter />
		</div>
	);
};

export default ExploreLayout;
