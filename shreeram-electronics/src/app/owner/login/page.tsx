import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function authenticate(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/owner");
  if (password === "Sanu0625") {
    const c = await cookies();
    c.set("owner_auth", "yes", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    redirect(next || "/owner");
  }
  redirect("/owner/login?error=1");
}

export default async function OwnerLoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const sp = await searchParams;
  const error = sp.error;
  const next = sp.next || "/owner";
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Owner Login</h1>
        <p className="text-sm text-black/70 dark:text-white/70">Enter the password to access owner controls.</p>
      </div>
      {error && (
        <div className="text-sm text-red-600">Incorrect password. Please try again.</div>
      )}
      <form action={authenticate} className="space-y-3 border border-black/10 dark:border-white/10 rounded-md p-4">
        <input type="hidden" name="next" value={next} />
        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input name="password" type="password" required className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" />
        </div>
        <button type="submit" className="rounded-md bg-foreground text-background px-4 py-2 text-sm">Login</button>
      </form>
    </div>
  );
}