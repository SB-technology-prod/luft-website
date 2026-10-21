"use client";

import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    AdvancedMarker,
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    useMap,
} from "@vis.gl/react-google-maps";

type PriceMarker = {
    id: number;
    lat: number;
    lng: number;
    price: number;
};

type PropertyMapProps = {
    prices: PriceMarker[];
    className?: string;
};

const INITIAL_CENTER = {
    lat: 30.025,
    lng: 31.235,
};

function ZoomControls() {
    const map = useMap();

    return (
        <MapControl position={ControlPosition.RIGHT_TOP}>
            <div className="mr-3 mt-3 flex flex-col gap-1">
                <button
                    type="button"
                    aria-label="Zoom in"
                    onClick={() => map?.setZoom((map.getZoom() ?? 12) + 1)}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md transition hover:bg-neutral-100"
                >
                    <Plus className="size-4" />
                </button>

                <button
                    type="button"
                    aria-label="Zoom out"
                    onClick={() => map?.setZoom((map.getZoom() ?? 12) - 1)}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md transition hover:bg-neutral-100"
                >
                    <Minus className="size-4" />
                </button>
            </div>
        </MapControl>
    );
}

function PriceMarkers({ prices }: { prices: PriceMarker[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <>
            {prices.map((marker) => {
                const selected = selectedId === marker.id;

                return (
                    <AdvancedMarker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() =>
                            setSelectedId(selected ? null : marker.id)
                        }
                        zIndex={selected ? 10 : 1}
                    >
                        <div className="relative">
                            <button
                                type="button"
                                aria-label={`View stay for $${marker.price} per night`}
                                aria-expanded={selected}
                                className={cn(
                                    "whitespace-nowrap rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium shadow-md transition",
                                    selected
                                        ? "scale-110 border-neutral-900 bg-neutral-900 text-white"
                                        : "bg-white text-neutral-900 hover:scale-105 hover:shadow-lg"
                                )}
                            >
                                EGP{marker.price}
                            </button>

                            {selected && (
                                <div className="absolute left-1/2 top-full z-20 mt-2 w-36 -translate-x-1/2 rounded-xl bg-white p-3 text-center shadow-xl">
                                    <p className="text-sm font-semibold">
                                        ${marker.price} / night
                                    </p>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Cairo, Egypt
                                    </p>
                                </div>
                            )}
                        </div>
                    </AdvancedMarker>
                );
            })}
        </>
    );
}

export default function PropertyMap({
    prices,
    className,
}: PropertyMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-2xl bg-neutral-200 p-6 text-center text-sm text-neutral-600",
                    className
                )}
            >
                Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map.
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl bg-neutral-200",
                className
            )}
        >
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={INITIAL_CENTER}
                    defaultZoom={12}
                    mapId="DEMO_MAP_ID"
                    gestureHandling="greedy"
                    disableDefaultUI
                    clickableIcons={false}
                    className="h-full w-full"
                >
                    <PriceMarkers prices={prices} />
                    <ZoomControls />
                </Map>
            </APIProvider>
        </div>
    );
}
