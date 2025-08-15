"use client";

import PageHeading from "@/components/common/page-heading";
import { useTeacherOverviewSWR } from "../hooks/use-teacher-overview-swr";
import { TeacherOverviewStatisticBlocks } from "./teacher-overview-statistic-blocks";
import { TeachingProgressLineChart } from "./teaching-progress-line-chart";
import { StudentAssignmentBarChart } from "./student-assignment-bar-chart";

export const TeacherOverview = () => {
	const {
		overviewStats,
		overviewStatsError,
		isLoadingOverviewStats,

		teachingProgressData,
		teachingProgressError,
		isLoadingTeachingProgress,

		studentAssignmentStats,
		studentAssignmentError,
		isLoadingStudentAssignment,
	} = useTeacherOverviewSWR();

	return (
		<div className="flex flex-col gap-6">
			<PageHeading 
				title="Tổng quan" 
				subtitle="Cái nhìn tổng thể về hoạt động giảng dạy và học tập"
			/>
			
			{/* Thống kê tổng quan */}
			<TeacherOverviewStatisticBlocks
				overviewStats={overviewStats}
				overviewStatsError={overviewStatsError}
				isLoadingOverviewStats={isLoadingOverviewStats}
			/>
			
			{/* Biểu đồ và thống kê chi tiết */}
			<div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
				<div>
					<TeachingProgressLineChart
						teachingProgressData={teachingProgressData || []}
						teachingProgressError={teachingProgressError}
						isLoadingTeachingProgress={isLoadingTeachingProgress}
					/>
				</div>
				<div>
					<StudentAssignmentBarChart
						studentAssignmentStats={studentAssignmentStats}
						studentAssignmentError={studentAssignmentError}
						isLoadingStudentAssignment={isLoadingStudentAssignment}
					/>
				</div>
			</div>
		</div>
	);
};
