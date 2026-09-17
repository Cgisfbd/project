"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/shared/stores/authStore";
import { useForceChangePasswordMutation } from "../api/auth.api";
import {
  forceChangePasswordSchema,
  type ForceChangePasswordFormData,
} from "../model/forceChangePasswordSchema";
import { GlassInput } from "@/shared/ui/glass-input";
import { Button } from "@/shared/ui/button";

export function ForceChangePasswordForm() {
  const router = useRouter();
  const { tempToken, clearTempToken } = useAuthStore();
  const { mutateAsync: forceChangePassword, isPending } = useForceChangePasswordMutation();

  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Guard: If no tempToken, redirect back to login
  React.useEffect(() => {
    if (!tempToken) {
      router.replace("/login");
    }
  }, [tempToken, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForceChangePasswordFormData>({
    resolver: zodResolver(forceChangePasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ForceChangePasswordFormData) => {
    try {
      await forceChangePassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Password changed successfully! Please sign in again.");
      clearTempToken();
      router.push("/login");
    } catch {
      toast.error("Failed to change password. Please try again.");
    }
  };

  if (!tempToken) return null;

  return (
    <div className="min-h-screen flex items-center justify-center exact-pastel-mesh-bg p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/30 dark:bg-black/30 border border-white/60 dark:border-white/15 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 dark:bg-amber-950/40 border border-amber-500/30 flex items-center justify-center shadow-inner">
              <KeyRound className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
              Set New Password
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your account requires a password change before proceeding.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 pl-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                <GlassInput
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isPending}
                  className={`pl-10 pr-10 h-12 bg-white/30 dark:bg-black/30 backdrop-blur-2xl rounded-[0.625rem] border-white/70 dark:border-white/15 ${errors.newPassword ? "border-red-400" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewPassword((p) => !p)}
                  tabIndex={-1}
                  className="absolute right-1 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10 cursor-pointer h-9 w-9 hover:bg-transparent"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 pl-2">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 pl-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <ShieldCheck className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                <GlassInput
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isPending}
                  className={`pl-10 pr-10 h-12 bg-white/30 dark:bg-black/30 backdrop-blur-2xl rounded-[0.625rem] border-white/70 dark:border-white/15 ${errors.confirmPassword ? "border-red-400" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  tabIndex={-1}
                  className="absolute right-1 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10 cursor-pointer h-9 w-9 hover:bg-transparent"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 pl-2">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 mt-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold rounded-[0.625rem] shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              {isPending ? (
                <span className="font-bold tracking-wide">Updating Password...</span>
              ) : (
                <>
                  <span className="font-bold tracking-wide">Set Password & Continue</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForceChangePasswordForm;
