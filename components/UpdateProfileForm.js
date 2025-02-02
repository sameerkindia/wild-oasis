"use client";

import { updateGuest } from "@/lib/actions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, children }) {

  const { name, email, natinoality, nationalID, countryFlag } = guest;

  return (
    <form action={updateGuest} className="bg-primary-900 py-6 ms:py-8 px-4 ms:px-6 sm:px-10 2md:px-12 text-sm sm:text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={name}
          name="name"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            name="countryFlag"
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {/* <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={nationality}
          /> */}

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel='Updating...' >Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
