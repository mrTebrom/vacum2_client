'use server'
import { redirect } from "next/navigation"

export const redirectAction = () => {
  return redirect('/')
}