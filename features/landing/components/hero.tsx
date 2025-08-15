import Image from "next/image";
import type React from "react";
import HeroImgDark from "@/assets/imgs/new-hero-dark.png";
import HeroImgLight from "@/assets/imgs/new-hero-light.png";
import { GeminiIcon } from "@/components/common/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TECH_STACK } from "../utils/constants";
import { HeroPattern } from "./background-pattern";

export function Hero() {
	return (
		<section className="isolate py-16 md:py-20 lg:py-24 w-full container relative">
			<HeroPattern />
			
			<div className="z-10 relative">
				<div className="items-center gap-8 grid lg:grid-cols-2">
					<div className="mx-auto lg:mx-0 max-w-2xl text-left">
						<div>
							<Badge
								className="mb-4 px-3 py-1 rounded-full font-semibold text-sm"
								variant="secondary"
							>
								<GeminiIcon className="size-4 text-primary" />
								ViLAB - Nền tảng học tập STEM
							</Badge>
						</div>
						<p className="bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 mb-4 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl tracking-tight">
							Khám phá thế giới{" "}
							<span className="font-serif font-medium text-primary italic">
							STEM
							</span>
							<br />
							trực tuyến!
						</p>
						<p className="mb-6 text-muted-foreground text-lg md:text-xl leading-relaxed">
						Nền tảng học tập STEM hiện đại với mô phỏng thí nghiệm trực tuyến, kho học liệu số phong phú và công cụ tương tác trực tiếp cho giáo viên và học sinh.
						</p>

						<div className="mt-6">
							<p className="mb-3 font-semibold text-muted-foreground text-sm">
								Được xây dựng với các tiêu chí
							</p>
							<div className="gap-3 grid grid-cols-2 lg:grid-cols-3">
								{TECH_STACK.map((tech) => (
									<TechCard
										key={tech.id}
										icon={tech.icon}
										name={tech.name}
										description={tech.description}
										link={tech.link}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="hidden lg:block relative">
						<Card className="relative bg-gradient-to-b from-background to-background/95 shadow-xl backdrop-blur p-0 overflow-hidden">
							<Image
								src={HeroImgLight}
								alt="Hình ảnh minh họa ViLAB"
								className="dark:hidden"
								priority
							/>
							<Image
								src={HeroImgDark}
								alt="Hình ảnh minh họa ViLAB"
								className="hidden dark:block"
								priority
							/>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

const TechCard = ({
	icon,
	name,
	description,
	link,
}: {
	icon: React.ReactNode;
	name: string;
	description: string;
	link?: string;
}) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="no-underline"
		>
			<Card className="group hover:bg-primary/5 p-0 hover:border-primary/100 h-full transition-all duration-300">
				<CardContent className="flex items-center gap-3 p-3">
					<div className="flex-shrink-0 p-2 border group-hover:border-primary/70 rounded-md group-hover:text-primary transition-all">
						{icon}
					</div>
					<div>
						<p className="font-medium text-sm">{name}</p>
						<p className="text-muted-foreground text-xs">{description}</p>
					</div>
				</CardContent>
			</Card>
		</a>
	);
};

export default TechCard;
