'use client';

import { PlayCircle, Video, ChevronDown } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { type Lesson } from "@/lib/types";

interface VideoPlaylistProps {
    videos: Lesson[];
    onVideoSelect: (video: Lesson) => void;
}

export function VideoPlaylist({ videos, onVideoSelect }: VideoPlaylistProps) {
    const handlePlayClick = (e: React.MouseEvent, video: Lesson) => {
        e.stopPropagation();
        onVideoSelect(video);
    };

    return (
        <div className="glass-card bg-void/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {videos.map((video, index) => (
                        <AccordionItem value={video.id} key={video.id} className={`border-white/5 ${index === 0 ? "border-t-0" : ""}`}>
                            <AccordionTrigger
                                className="p-4 hover:no-underline group [&>svg]:hidden hover:bg-white/5 transition-colors" // Hide the default chevron
                            >
                                <div className="flex items-center justify-between w-full">
                                    {/* Left Side: Text and Icon */}
                                    <div className="flex items-center gap-x-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                                            <Video className="h-5 w-5 text-cyber-mute" />
                                        </div>
                                        <p className="font-medium text-white text-left">{video.title}</p>
                                    </div>

                                    {/* Right Side: Controls */}
                                    <div className="flex items-center gap-x-2">
                                        <div
                                            role="button"
                                            aria-label={`Play video: ${video.title}`}
                                            onClick={(e) => handlePlayClick(e, video)}
                                            className="p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                                        >
                                            <PlayCircle className="h-6 w-6 text-cyber-mute group-hover:text-brand-purple transition-colors" />
                                        </div>
                                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-cyber-mute group-data-[state=open]:rotate-180" />
                                    </div>
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
