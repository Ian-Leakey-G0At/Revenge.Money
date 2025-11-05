'use client';

import { Lock, Video } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function LockedVideoPlaylist({ videos }: { videos: any[] }) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {videos.map((video, index) => (
                        <AccordionItem value={video.id} key={video.id} className={index === 0 ? "border-t-0" : ""}>
                            <AccordionTrigger className="flex items-center gap-x-4 p-4 text-left hover:no-underline hover:bg-muted/50">
                                <div className="flex items-center gap-x-4 flex-1">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                                        <Video className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                      <p className="font-medium text-foreground">{video.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center px-2">
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 px-4 pl-16">
                                <p className="text-muted-foreground">
                                  This is a placeholder description for the video "{video.title}". The actual description will be added later.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
