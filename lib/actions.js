"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  // console.log(formData)
  const session = await auth();

  if(!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID")
  const [nationality, countryFlag] = formData.get("nationality").split('%')
  // console.log(nationality, countryFlag)

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid natonal ID");

  const updateData = {nationalID , nationality, countryFlag}

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)


  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile')

}

export async function signInAction() {
  await signIn('google', {redirectTo : "/account"})
}

export async function signOutAction() {
  await signOut({redirectTo: '/'})
}