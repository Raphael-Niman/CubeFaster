"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm({ countries }) {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [countryId, setCountryId] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isLoaded || !signUp) return;

        setError("");
        setLoading(true);

        try {
            await signUp.create( {
                firstName, lastName, username, emailAddress, password,
                unsafeMetadata: { country_id: countryId },
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);
        } catch (err) {
            const message = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    async function handleVerify(e) {
        e.preventDefault();
        if (!isLoaded || !signUp) return;

        setError("");
        setLoading(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({ code });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/");
                return;
            }

            setError("Verification incomplete. Please try again.");
        } catch (err) {
            const message = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || "Invalid code. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    
    }

    const fieldClass = "mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900";
    const labelClass = "block text-sm font-medium text-zinc-700";

    return (
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-semibold text-zinc-900">Create your account</h1>
            <p className="mt-1 text-sm text-zinc-500">
                Welcome! Please fill in the details to get started.
            </p>

            {!pendingVerification ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass} htmlFor="firstName">First name</label>
                            <input id="firstName" className={fieldClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="lastName">Last name</label>
                            <input id="lastName" className={fieldClass} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="username">Username</label>
                        <input id="username" className={fieldClass} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="emailAddress">Email address</label>
                        <input id="emailAddress" className={fieldClass} value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="password">Password</label>
                        <input id="password" className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="country">Country</label>
                        <select id="country" className={fieldClass} name="country_id" value={countryId} onChange={(e) => setCountryId(e.target.value)} required>
                            <option value="">Select your country</option>
                            {countries.map((c)=> (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error ? <p className="text-sm text-red-600">{error}</p> : null}

                    <button type="submit" disabled={!isLoaded || loading} className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60">
                        {loading ? "Creating account..." : "Continue"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerify} className="mt-6 space-y-4">
                    <p className="text-sm text-zinc-600">Enter the verification code set to <strong>{emailAddress}</strong></p>
                    <div>
                        <label className={labelClass} htmlFor="code">Verification code</label>
                        <input id="code" className={fieldClass} value={code} onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" disabled={!isLoaded || loading} className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60">
                        {loading ? "Verifying..." : "Verify email"}
                    </button>
                </form>
            )}

            <p className="mt-6 text-center text-sm text-zinc-600">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-zinc-900 underline">Sign in</Link>
            </p>
        </div>
    );
}