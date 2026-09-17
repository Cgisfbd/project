"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Shield, User, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { GlassInput } from "@/shared/ui/glass-input";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { useAuthStore } from "@/shared/stores/authStore";
import axios from "axios";
import type { ApiErrorResponse } from "@/shared/api/httpClient";
import { loginSchema, type LoginFormData } from "../model/loginSchema";
import { useLoginMutation } from "../api/auth.api";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const loginMutation = useLoginMutation();
  const isPending = loginMutation.isPending;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", rememberMe: false },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setErrorMessage(null);

    loginMutation.mutate(
      {
        data: {
          username: data.username,
          password: data.password,
          rememberMe: data.rememberMe,
        },
      },
      {
        onSuccess: (response) => {
          if (response.success && response.data.requiresPasswordChange) {
            toast.info("Password change required on first login.");
            router.push("/force-change-password");
          } else if (response.success) {
            toast.success("Signed in successfully!");
            router.push("/dashboard");
          } else {
            setErrorMessage(response.message || "Login failed");
          }
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError<ApiErrorResponse>(error)) {
            const serverMsg = error.response?.data?.message;
            const message = Array.isArray(serverMsg)
              ? serverMsg.join(", ")
              : serverMsg || "An error occurred during sign in";
            setErrorMessage(message);
          } else {
            setErrorMessage("An unexpected error occurred during sign in");
          }
        },
      }
    );
  };

  return (
    <div className="w-full space-y-5 text-center">
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-full bg-amber-500/15 dark:bg-amber-950/40 border border-amber-500/30 flex items-center justify-center shadow-inner">
          <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400 fill-amber-500/20" />
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Sign in to continue to your account</p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-[0.625rem] bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs font-semibold text-left">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-4 text-left pt-1">
        <input type="text" name="decoy_username" tabIndex={-1} aria-hidden="true" className="sr-only fixed -top-96 pointer-events-none" />
        <input type="password" name="decoy_password" tabIndex={-1} aria-hidden="true" className="sr-only fixed -top-96 pointer-events-none" />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 pl-1">Username or Email</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <GlassInput
              {...register("username")}
              type="text"
              placeholder="Enter your credentials"
              disabled={isPending}
              className={`pl-10 h-12 bg-white/30 dark:bg-black/30 backdrop-blur-2xl rounded-[0.625rem] border-white/70 dark:border-white/15 ${errors.username ? "border-red-400" : ""}`}
            />
          </div>
          {errors.username && <p className="text-xs text-red-500 pl-2">{errors.username.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 pl-1">Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <GlassInput
              {...register("password")}
              onKeyUp={(e) => setIsCapsLockOn(e.getModifierState("CapsLock"))}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isPending}
              className={`pl-10 pr-10 h-12 bg-white/30 dark:bg-black/30 backdrop-blur-2xl rounded-[0.625rem] border-white/70 dark:border-white/15 ${errors.password ? "border-red-400" : ""}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((p) => !p)}
              tabIndex={-1}
              className="absolute right-1 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10 cursor-pointer h-9 w-9 hover:bg-transparent"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {isCapsLockOn && <p className="text-[11px] text-amber-500 pl-2">⚠️ Caps Lock is ON</p>}
          {errors.password && <p className="text-xs text-red-500 pl-2">{errors.password.message}</p>}
        </div>

        <div className="flex items-center text-xs pt-0.5 px-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              )}
            />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Remember Me</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="relative group w-full h-12 mt-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold rounded-[0.625rem] shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer overflow-hidden border-0"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              <span className="relative z-10 font-bold tracking-wide">Signing In...</span>
            </>
          ) : (
            <>
              <span className="relative z-10 font-bold tracking-wide">Sign In</span>
              <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
