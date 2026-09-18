import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
   /* <select name="country_id">
      <option value="">Select your country</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  */
  );
}
