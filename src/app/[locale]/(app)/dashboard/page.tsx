import { ArrowUpRight, CalendarRange, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { AttendanceTrendChart } from "@/components/charts/attendance-trend-chart";
import { ClassAttendanceChart } from "@/components/charts/class-attendance-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ATTENDANCE_TREND = [
  { date: "Mon", present: 118, absent: 12 },
  { date: "Tue", present: 122, absent: 8 },
  { date: "Wed", present: 117, absent: 13 },
  { date: "Thu", present: 121, absent: 9 },
  { date: "Fri", present: 124, absent: 6 },
];

const CLASS_OVERVIEW = [
  { name: "Grade 7A", present: 32 },
  { name: "Grade 7B", present: 30 },
  { name: "Grade 8A", present: 28 },
  { name: "Grade 8B", present: 31 },
  { name: "Grade 9A", present: 29 },
];

const LATEST_ABSENTEES = [
  { name: "Andi Wijaya", className: "Grade 7A", reasonKey: "sick" },
  { name: "Felicia Tan", className: "Grade 8B", reasonKey: "family" },
  { name: "Samuel Prakoso", className: "Grade 9A", reasonKey: "permit" },
];

export default async function DashboardPage() {
  const tDashboard = await getTranslations({ namespace: "dashboard" });
  const tCommon = await getTranslations({ namespace: "common" });

  const stats = [
    {
      label: tDashboard("stats.totalStudents"),
      value: "138",
      helper: tDashboard("statsHelper.total", { value: "12 classes" }),
      icon: Users,
    },
    {
      label: tDashboard("stats.presentToday"),
      value: "124",
      helper: tDashboard("statsHelper.present", { value: "+4" }),
      icon: ArrowUpRight,
    },
    {
      label: tDashboard("stats.absentToday"),
      value: "14",
      helper: tDashboard("statsHelper.absent", { value: "-2" }),
      icon: CalendarRange,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          {tDashboard("title")}
        </h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          {tDashboard("subtitle")}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground">
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.helper}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>{tDashboard("attendanceTrend")}</CardTitle>
            <CardDescription>
              {tDashboard("attendanceTrendDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <AttendanceTrendChart
              data={ATTENDANCE_TREND}
              presentLabel={tCommon("present")}
              absentLabel={tCommon("absent")}
            />
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>{tDashboard("classOverview")}</CardTitle>
            <CardDescription>
              {tDashboard("classOverviewDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ClassAttendanceChart
              data={CLASS_OVERVIEW}
              presentLabel={tCommon("present")}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/80">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{tDashboard("latestAbsentees")}</CardTitle>
            <CardDescription>
              {tDashboard("latestAbsenteesDescription")}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            {tDashboard("actions.viewAttendance")}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          {LATEST_ABSENTEES.map((item, index) => (
            <Fragment key={item.name}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.className}
                  </p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {tDashboard(`reasons.${item.reasonKey}`)}
                </span>
              </div>
              {index < LATEST_ABSENTEES.length - 1 ? (
                <Separator className="bg-border/70" />
              ) : null}
            </Fragment>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <span className="text-xs text-muted-foreground">
            {tDashboard("updatedAt", { value: "09:30" })}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
