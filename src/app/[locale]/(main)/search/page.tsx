'use client'
import { useSearchParams } from "next/navigation";

export default  function SearchResult () {
    const searchParams = useSearchParams();
    const dateParam = searchParams.get("date");
    const guestCountParam = searchParams.get("guestCount");
  return (
    <section>
        SEARCH {searchParams} {dateParam} {guestCountParam}
    </section>
  )
}
