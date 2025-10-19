import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />
      <main className="flex-1 p-6">
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <Label htmlFor="theme-switcher">Theme</Label>
                    <ThemeSwitcher />
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
