# Reservation summary and checkout integration

Reserve calls the existing authenticated `POST api/reservations/reserve` with the selected property, dates, guests, and quoted total. The created reservation ID is returned as `result.id`. The client uses that value to open `/{locale}/reservation-summary?reservationId=...`. Personal details and prices are fetched, never passed in the URL.

Edit returns to the property with the selection returned by the summary API; the mobile selector opens with those values. It does not update or cancel the existing reservation. Submitting that form again creates another reservation; changing an existing reservation requires a separate backend contract.

## Summary endpoint

The client uses an authenticated GET with the existing `language` header (`en` or `ar`), following the reservation-details endpoint convention:

```text
api/reservations/reservation-summary?reservationId=<reservation-id>
```

The response uses the standard API envelope. `result` matches `ReservationSummary` in `src/types/reservations.ts`:

- `reservationId`, `reservationNumber`, `statusId` identify the reservation.
- `property` contains `id`, `name`, `imageUrl`, `location`, `rating`, `reviewsCount`, `maximumGuests`, `bedrooms`, `beds`, and `bathrooms`.
- `guest` contains `name`, `phone`, and `email`.
- `stay` contains calendar dates `checkInDate` and `checkOutDate`, plus `numberOfNights`.
- `guests.total` is the reserved guest count.
- `price` contains `currency`, `items`, `accommodationAmount`, `feesAmount`, `taxesAmount`, and `totalAmount`.
- Each price item contains `type`, `description`, `quantity`, `unitPrice`, and `total`. The supplied types are `Accommodation`, `Fee`, and `Tax`.
- `payment` contains `status`, `expiresAt`, and `remainingSeconds`.

The page displays accommodation as unit price times nights, and fee and tax line items with their descriptions and quantities. Taxes already appear in the items and are not displayed a second time using `taxesAmount`. All amounts, including zero-value items, come from the API. The final total uses `price.totalAmount` and the currency uses `price.currency`. For the supplied example, accommodation 140 plus fees 700 plus taxes 420 produces a total of EGP 1,260.

Payment status and expiry fields are represented in the response type; the page does not yet display a payment countdown. The client does not fall back to property or quote APIs when summary loading fails.

## Checkout endpoint

Confirm refreshes the summary and asks the user to review again if the total or currency changed. It then sends an authenticated POST to `api/payments/reservations/{reservationId}/checkout` with the reservation ID in the path and no request body. The path is relative to `NEXT_PUBLIC_API_URL`; no separate checkout environment variable is required. Duplicate clicks are blocked while the operation is pending, and failed checkout requests are not automatically retried.

The response uses the standard API envelope with `result.checkoutUrl`. The frontend redirects the current browser tab to that URL, preserving its checkout parameters. The response also contains `reservationId`, `paymentId`, `clientSecret`, `publicKey`, `amount`, `currency`, `expiresAt`, and `remainingSeconds`, represented in `ReservationCheckoutApiResponse`. The backend must revalidate the existing reservation, handle duplicate checkout requests, and configure payment success/failure callbacks to the localized `/reservation-confirmed` and `/reservation-failed` routes. Availability validation must account for the existing reservation's own booked dates.

Checkout errors display localized feedback. The reservation already exists at this point.
