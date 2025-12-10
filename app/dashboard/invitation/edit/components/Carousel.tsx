import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselProps {
    images: string[];
}

export function CarouselTutorial({ images }: CarouselProps) {
    return (
        <div className="w-full relative">
            <Carousel>
                <CarouselContent>
                    {images.map((src, index) => (
                        <CarouselItem key={index}>
                            <div
                                className="relative p-2 border aspect-video h-[300px] w-full cursor-pointer overflow-hidden rounded-md transition-all"
                            >
                                <Image
                                    src={src}
                                    alt={`Dummy ${index}`}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" />
            </Carousel>
        </div >

    )
}