import type { Metadata } from "next";
import { LoginView } from "@/widgets/auth/LoginView";

export const metadata: Metadata = {
  title: "Login | TaleemOne ERP - Powered by Barkat Tech",
  description: "Secure login portal for TaleemOne ERP administration and staff",
};

export default function LoginPage() {
  return <LoginView />;
}
