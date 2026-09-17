import type { Metadata } from "next";
import { ForceChangePasswordForm } from "@/features/auth/ui/ForceChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password | TaleemOne ERP - Powered by Barkat Tech",
  description: "Mandatory password change for first-time login",
};

export default function ForceChangePasswordPage() {
  return <ForceChangePasswordForm />;
}
