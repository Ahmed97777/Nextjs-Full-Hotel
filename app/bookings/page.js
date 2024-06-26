import BookingTable from "@/components/BookingComponents/BookingTable";
import BookingShowFormButton from "@/components/BookingComponents/BookingShowFormButton";
import BookingTableOperations from "@/components/BookingComponents/BookingTableOperations";
import React from "react";

function page() {
  return (
    <>
      <div className="min-w-[310px] max-w-[900px]">
        <h1 className="font-bold justify-start text-gray-600 text-lg sm:text-xl md:text-2xl mb-3">
          All bookings
        </h1>

        <div className="flex items-center gap-3 justify-between flex-wrap">
          <BookingTableOperations />
          <BookingShowFormButton />
        </div>
      </div>

      <BookingTable />
    </>
  );
}

export default page;
