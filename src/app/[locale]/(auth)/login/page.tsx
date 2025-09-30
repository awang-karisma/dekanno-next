import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tAuth = await getTranslations({ namespace: "auth", locale });
  const tCommon = await getTranslations({ namespace: "common", locale });

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-background px-4 py-12">
      <div className="absolute right-6 top-6 flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-10 rounded-3xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur-lg lg:grid-cols-5 lg:p-12">
        <div className="hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 lg:col-span-2 lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {tAuth("title")}
            </span>
            <h2 className="text-xl font-semibold text-foreground">
              {tAuth("subtitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tCommon("searchByNameOrId")}
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>- Grade analytics updated daily</p>
            <p>- Unified attendance and student records</p>
            <p>- Secure by design</p>
          </div>
        </div>

        <Card className="lg:col-span-3">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-semibold text-foreground lg:text-3xl">
              {tAuth("title")}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground lg:text-base">
              {tAuth("subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{tCommon("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@school.edu"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{tCommon("password")}</Label>
                  <Button
                    variant="link"
                    type="button"
                    className="px-0 text-sm font-normal text-primary"
                  >
                    {tCommon("forgotPassword")}
                  </Button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label
                  className="flex cursor-pointer items-center gap-2 text-muted-foreground"
                  htmlFor="remember"
                >
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  {tCommon("rememberMe")}
                </label>
              </div>
              <Button type="submit" className="w-full">
                {tAuth("button")}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {tAuth("divider")}
                </span>
                <Separator className="flex-1" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  Microsoft
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              <Link
                href={`/${locale}/dashboard`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {tAuth("button")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
