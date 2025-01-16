"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr?.some((date) =>
      isWithinInterval(date, { start: range?.from, end: range?.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {

  const {range , setRange , resetRange} = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CHANGE
  // const regularPrice = 23;
  // const discount = 23;
  // const numNights = 23;
  // const cabinPrice = 23;
  // const range = { from: null, to: null };

  const {regularPrice, discount} = cabin
  const numNights = differenceInDays(displayRange?.to , displayRange?.from)
  const cabinPrice = numNights * (regularPrice - discount)

  // SETTINGS
  const {minBookingLength, maxBookingLength} = settings;

  console.log(+minBookingLength + 1 , "this was min booking")
  // console.log(maxBookingLength , "this was max booking")


  // console.log('cabin from cabin[id] ', cabin)

  // min={minBookingLength + 1}
  

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="p-4 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={+minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate)=> isPast(curDate) || bookedDates.some((date)=> isSameDay(date, curDate))}
      />

      <div className="flex items-center justify-between max-ms:py-2 px-4 sm:px-8 bg-accent-500 text-primary-800 min-h-[72px]">
        <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg ms:text-xl sm:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg ms:text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-1.5 ms:px-3 py-1 ms:py-2 test-base ms:text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm ms:text-base sm:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-lg ms:text-xl sm:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold max-sm:mb-auto"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
