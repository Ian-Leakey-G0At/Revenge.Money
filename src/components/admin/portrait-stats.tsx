
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Stat = {
  title: string;
  value: string;
};

export const PortraitStats = ({ stats }: { stats: Stat[] }) => (
  <Card className="w-full sm:max-w-xs">
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex flex-col">
        {stats.map((stat, index) => (
          <div key={stat.title}>
            <div className="flex justify-between items-baseline py-3">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            {index < stats.length - 1 && <hr className="border-t" />}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
