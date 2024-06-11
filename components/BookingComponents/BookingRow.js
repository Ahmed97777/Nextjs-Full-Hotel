import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { format, isToday } from "date-fns";
import React from "react";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    quests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "gray",
  };

  const statusType = statusToTagName[status];

  const textColorClass = {
    blue: "text-blue-700",
    green: "text-green-700",
    gray: "text-gray-700",
  };

  const bgColorClass = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    gray: "bg-gray-100",
  };

  return (
    <div
      // Table Row
      role="row"
      key={bookingId}
      className="grid grid-cols-[1fr,2fr,2.4fr,1.4fr,1fr,3.2rem] text-xs sm:text-sm p-2 sm:p-4 items-center border-b border-solid border-gray-100 last:border-none"
    >
      <div className="w-14 font-semibold text-gray-600">{cabinName}</div>

      <div className="w-28 flex flex-col gap-1">
        <span className="text-gray-600 font-medium">{guestName}</span>

        <span className="text-gray-500">{email}</span>
      </div>

      <div className="w-28 flex flex-col gap-1">
        <span className="text-gray-600 font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>

        <span className="text-gray-500">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <div
        className={`w-28 uppercase text-center p-1 font-semibold rounded-full ${textColorClass[statusType]} ${bgColorClass[statusType]} `}
      >
        {status.replace("-", " ")}
      </div>

      <div className="w-28 font-medium text-green-700">
        {formatCurrency(totalPrice)}
      </div>
    </div>
  );
}

export default BookingRow;
