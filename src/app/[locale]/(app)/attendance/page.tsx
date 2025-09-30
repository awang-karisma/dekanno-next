import { getTranslations } from "next-intl/server";

import { AttendanceManager } from "@/components/attendance/attendance-manager";

export default async function AttendancePage() {
  const tAttendance = await getTranslations({ namespace: "attendance" });

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          {tAttendance("title")}
        </h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          {tAttendance("subtitle")}
        </p>
      </section>
      <AttendanceManager />
    </div>
  );
}
