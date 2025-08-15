import { RootHeader } from "@/components/layout/root-header";
import { TeacherDashboardNav } from "@/components/layout/teacher-dashboard-nav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <RootHeader />
      <main className="flex-1 overflow-y-auto bg-background p-6">
        <TeacherDashboardNav />
        {children}
      </main>
    </div>
  );
}
