"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSignIn = () => {
    // Mock OIDC — in production you’d redirect to Azure AD and return to "/"
    router.push("/");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(120deg,#e6efff 0%,#f6f8fb 50%,#eef4ff 100%)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur border border-gray-200 shadow-lg p-8">
        <div className="mb-6 text-center">
          <div className="text-2xl font-semibold text-[#0b1a33]">HealthCred Console</div>
          <div className="text-sm text-gray-500 mt-1">Healthcare Credentialing Automation</div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                       bg-[#134ca8] hover:bg-[#0f3f8e] text-white font-medium transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
              <path d="M12 3c4.97 0 9 4.03 9 9h-4a5 5 0 10-5 5v4c-4.97 0-9-4.03-9-9s4.03-9 9-9z"/>
            </svg>
            Sign in with Hospital ID (Azure OIDC)
          </button>

          <div className="text-xs text-center text-gray-500">
            SSO enabled • SSL auto-rotation • Audit trail active
          </div>
        </div>
      </div>
    </main>
  );
}


