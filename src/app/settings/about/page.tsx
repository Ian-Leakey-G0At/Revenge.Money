import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Card>
            <CardHeader>
                <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Learn more about our company and mission.</p>
            </CardContent>
        </Card>
    </div>
  );
}
