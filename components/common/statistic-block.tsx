"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind";

export interface IStatisticBlockProps {
	title: string;
	value: string | number;
	description?: string;
	trend?: {
		value: string | number;
		direction: "up" | "down" | "neutral";
		label?: string;
	};
	footer?: {
		primary: string;
		secondary?: string;
	};
	variant?: "default" | "success" | "warning" | "destructive";
	className?: string;
	valueClassName?: string;
	icon?: ReactNode;
	badge?: {
		text: string;
		variant?: "default" | "secondary" | "destructive" | "outline";
	};
}

const trendIcons = {
	up: TrendingUp,
	down: TrendingDown,
	neutral: Minus,
};

const trendColors = {
	up: "text-green-600 dark:text-green-400",
	down: "text-red-600 dark:text-red-400",
	neutral: "text-gray-600 dark:text-gray-400",
};

const variantStyles = {
	default: "border-border",
	success:
		"border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
	warning:
		"border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20",
	destructive:
		"border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20",
};

export function StatisticBlock({
	title,
	value,
	description,
	trend,
	footer,
	variant = "default",
	className,
	valueClassName,
	icon,
	badge,
}: IStatisticBlockProps) {
	const TrendIcon = trend ? trendIcons[trend.direction] : null;
	const trendColorClass = trend ? trendColors[trend.direction] : "";

	return (
		<Card className={cn("h-full", variantStyles[variant], className)}>
			<CardHeader className="space-y-2 pb-2">
				<div className="flex justify-between items-start">
					<div className="flex-1 min-w-0">
						<h3 className="font-medium text-muted-foreground text-sm truncate">
							{title}
						</h3>
						{description && (
							<p className="text-muted-foreground text-xs mt-1 line-clamp-2">
								{description}
							</p>
						)}
					</div>
					{icon && <div className="text-muted-foreground flex-shrink-0 ml-2">{icon}</div>}
				</div>

				<div className="flex justify-between items-end">
					<div
						className={cn(
							"font-semibold tabular-nums text-2xl lg:text-3xl",
							valueClassName,
						)}
					>
						{typeof value === "number" ? value.toLocaleString() : value}
					</div>

					{(trend || badge) && (
						<div className="flex items-center gap-1 flex-shrink-0">
							{trend && (
								<Badge
									variant="outline"
									className={cn("gap-1 text-xs px-1 py-0.5", trendColorClass)}
								>
									{TrendIcon && <TrendIcon className="size-2.5" />}
									<span className="truncate text-xs">
										{typeof trend.value === "number" &&
										trend.direction !== "neutral"
											? `${trend.direction === "up" ? "+" : ""}${trend.value}%`
											: trend.value}
									</span>
								</Badge>
							)}

							{badge && (
								<Badge variant={badge.variant || "outline"} className="text-xs px-1 py-0.5">
									{badge.text}
								</Badge>
							)}
						</div>
					)}
				</div>
			</CardHeader>

			{footer && (
				<CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
					<div className="flex items-center gap-2 font-medium">
						{footer.primary}
						{trend && TrendIcon && (
							<TrendIcon className={cn("size-4", trendColorClass)} />
						)}
					</div>
					{footer.secondary && (
						<div className="text-muted-foreground line-clamp-2">
							{footer.secondary}
						</div>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
