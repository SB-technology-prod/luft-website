'use client'
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';

import { SlidersHorizontal } from "lucide-react";

import { useInfiniteQuery } from "@tanstack/react-query";

import StatusLayout from "@/components/shared/StatusLayout";
import { Button } from "@/components/ui/button";

import PropertySearchMap from "./_components/PropertySearchMap";
import PropertySearchResultsCard from "./_components/PropertySearchResultsCard";
import { PropertySearchResultsCardSkeleton } from "./_components/PropertySearchResultsCardSkeleton";

import { searchProperties, searchQueryKey } from "@/api/search";

export default function SearchResult() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const dateCheckInParam = searchParams.get("checkInDate");
  const dateCheckOutParam = searchParams.get("checkOutDate");
  const guestCountParam = searchParams.get("guestCount");
  const governorateParam = searchParams.get("governorateId");
  // const [filterOpen, setFilterOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      searchQueryKey,
      guestCountParam,
      dateCheckInParam,
      dateCheckOutParam,
      governorateParam,
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchProperties(
        guestCountParam ?? "",
        dateCheckInParam ?? "",
        dateCheckOutParam ?? "",
        governorateParam ?? "",
        pageParam,
      ),
    getNextPageParam: (lastPage) => {
      const { pageNumber, pageSize, totalCount } = lastPage.result;
      return pageNumber * pageSize < totalCount
        ? pageNumber + 1
        : undefined;
    },
  });
  const items = data?.pages.flatMap((page) => page.result.items) ?? [];
  const mapPrices = items
    .filter(
      (item) =>
        item.latitude != null &&
        item.longitude != null &&
        item.pricePerNight != null,
    )
    .map((item, index) => ({
      id: index + 1,
      lat: item.latitude,
      lng: item.longitude,
      price: item.pricePerNight,
    }));

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement || !hasNextPage || isFetching || isError) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void fetchNextPage();
    });

    observer.observe(loadMoreElement);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isError, isFetching]);

  if (!isLoading && (isError || !items.length))
    return (
      <StatusLayout
        title={t('sections.homeSearch.emptySates.emptyTitle')}
        paragraph={t('sections.homeSearch.emptySates.emptyDescription')}
        mainImageSrc='/svg/emptyWishlist.svg'
        buttonLabel={t('sections.homeSearch.emptySates.discoverHomes')}
      />
    );
  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(380px,1.5fr)]">
        {/* Properties */}
        <section className="min-w-0">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h1 className="text-base font-medium text-neutral-900">
              {t("sections.homeSearch.overStay")}
            </h1>

            {/* <Button
              type="button"
              variant="outline"
              onClick={() => setFilterOpen((open) => !open)}
              className="h-9 rounded-full border-neutral-300 bg-transparent px-4"
              disabled
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Filter
            </Button> */}
          </div>

          {/* {filterOpen && (
            <div className="mb-5 rounded-xl border bg-white p-4">
              <p className="text-sm text-neutral-600">
                Add your existing property filters here.
              </p>
            </div>
          )} */}

          <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
            {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                  <PropertySearchResultsCardSkeleton key={index} />
                ))
                : items.map((item) => (
                  <PropertySearchResultsCard
                    key={item.id}
                    item={item}
                  />
                ))}
            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, index) => (
                <PropertySearchResultsCardSkeleton key={`loading-${index}`} />
              ))}
          </div>
          {hasNextPage && <div ref={loadMoreRef} className="h-4" />}
          {isError && items.length > 0 && (
            <div className="mt-4 text-center">
              <p role="alert" className="text-sm text-red-600">
                {t("sections.homeSearch.errors.couldNotLoadMoreStays")}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  void (fetchNextPage as () => Promise<unknown>)()
                }
                className="mt-2"
              >
                {t("sections.homeSearch.errors.retry")}
              </Button>
            </div>
          )}
        </section>

        {/* Map */}
        <aside className="min-w-0 lg:sticky lg:top-6">
          <PropertySearchMap
            prices={mapPrices}
            className="h-[400px] sm:h-[500px] lg:min-h-[600px]"
          />
        </aside>
      </div>
    </main>
  )
}
