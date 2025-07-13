import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <SignIn
    afterSignInUrl="/dashboard"  // Redirects to the dashboard after sign-in
    appearance={{
        elements: {
          formButtonPrimary: 
            "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300",
          card: "bg-gray-800 border border-gray-700",
          headerTitle: "text-green-400",
          headerSubtitle: "text-gray-300",
          socialButtonsBlockButton: "border-gray-700 text-gray-300",
          formFieldLabel: "text-gray-300",
          formFieldInput: "bg-gray-700 text-gray-100 border-gray-600",
          footerActionLink: "text-green-400 hover:text-green-500",
        },
      }}
    />
  );
}