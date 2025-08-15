"use client";

import { redirect } from "next/navigation";
import { AdminGuard } from "@/features/auth";

const DashboardPage = () => {
    return (
        <AdminGuard>
            {redirect('/dashboard/overview')}
        </AdminGuard>
    );
};

export default DashboardPage;