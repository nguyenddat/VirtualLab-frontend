"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GeminiIcon } from "@/components/common/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURES } from "../utils/constants";
import type { IFeature } from "../utils/types";
import { FeaturesPattern } from "./background-pattern";

export const Features = () => {
	return (
		<section id="features" className="py-8 md:py-12 w-full container relative">
			<FeaturesPattern />
			
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="flex flex-col justify-center items-center space-y-3 mb-8 text-center relative z-10"
			>
				<div className="flex justify-center items-center gap-4 mb-3">
					<Badge
						className="mb-3 px-3 py-1 rounded-full font-semibold text-sm transition-none"
						variant="secondary"
					>
						<GeminiIcon className="size-4 text-primary" />
						Tính năng chính
					</Badge>
				</div>
				<p className="bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 font-bold text-transparent text-3xl md:text-4xl tracking-tight">
					Các tính năng nổi bật
				</p>
				<p className="max-w-[800px] text-muted-foreground md:text-lg">
					Khám phá tổng quan các tính năng chính của nền tảng ViLAB
				</p>
			</motion.div>

			<div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 relative z-10">
				{FEATURES.map((feature, index) => (
					<motion.div
						key={feature.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<FeatureCard feature={feature} />
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="flex justify-center mt-8 relative z-10"
				style={{ position: "relative", zIndex: 20 }}
			>
				<Link href="/explore" passHref>
					<Button size="lg" className="z-20 relative">
						Khám phá ngay
						<ArrowRight className="size-4" />
					</Button>
				</Link>
			</motion.div>
		</section>
	);
};

const FeatureCard = ({ feature }: { feature: IFeature }) => {
	return (
		<motion.div
			whileHover={{
				y: -5,
				transition: { duration: 0.3 },
			}}
			className="h-full"
		>
			<Card className="hover:shadow-primary p-0 hover:border-primary/100 h-full overflow-hidden transition-all cursor-pointer backdrop-blur-sm bg-background/80">
				<div className="relative p-4 h-full">
					<div className="-top-10 -right-10 absolute bg-gradient-to-b from-primary/20 to-primary/5 opacity-80 blur-3xl w-32 h-32 pointer-events-none" />
					<div className="z-10 relative">
						<div className="flex justify-center items-center bg-gradient-to-br from-primary/10 to-primary/5 mb-3 rounded-lg size-12 text-primary">
							{feature.icon}
						</div>
						<p className="mb-3 font-semibold text-xl">{feature.name}</p>
						<p className="text-muted-foreground">{feature.description}</p>
					</div>
				</div>
			</Card>
		</motion.div>
	);
};
