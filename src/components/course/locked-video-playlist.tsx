'use client';

import { Lock, Video, Bot } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function LockedVideoPlaylist({ videos, isAiTool = false }: { videos: any[], isAiTool?: boolean }) {
    return (
        <div className="glass-card bg-void/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {videos.map((video, index) => (
                        <AccordionItem value={video.id} key={video.id} className={`border-white/5 ${index === 0 ? "border-t-0" : ""}`}>
                            <AccordionTrigger className="flex items-center gap-x-4 p-3 text-left hover:no-underline hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-x-3 flex-1">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                                        {isAiTool ? (
                                            <Bot className="h-4 w-4 text-cyber-mute" />
                                        ) : (
                                            <Video className="h-4 w-4 text-cyber-mute" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-xs font-normal text-gray-300">{video.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center px-2">
                                    <Lock className="h-4 w-4 text-vengeance-red" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 px-4 pl-16">
                                <p className="text-cyber-mute text-sm">
                                    {video.content}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
