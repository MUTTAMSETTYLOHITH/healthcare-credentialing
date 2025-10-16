import { redirect } from "next/navigation";

export default function Page() {
  redirect("/"); // change to "/login" if you want to land on login first
}
