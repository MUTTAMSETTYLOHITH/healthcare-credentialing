import { redirect } from "next/navigation";

export default function Page() {
  redirect("/verifications"); // or "/providers" or "/login"
}
