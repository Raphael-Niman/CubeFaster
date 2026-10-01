import { query } from "@/lib/database";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage() {
  const countries = await query(
    "SELECT id, name FROM countries ORDER BY name ASC"
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <SignUpForm countries={countries} />
    </div>
  );
}