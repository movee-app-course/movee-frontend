"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Film, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/hooks/use-auth";

const registerSchema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты"),
  username: z
    .string()
    .min(3, "Имя пользователя должно содержать хотя бы 3 символа")
    .max(50, "Имя пользователя должно содержать не более 50 символов")
    .regex(
      /^[a-z0-9_]+$/,
      "Только малые латинские буквы, цифры и подчёркивания",
    ),
  displayName: z
    .string()
    .min(1, "Отображаемое имя обязательно")
    .max(100, "Отображаемое имя должно содержать не более 100 символов"),
  password: z.string().min(6, "Пароль должен содержать хотя бы 6 символов"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", username: "", displayName: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      await registerMutation.mutateAsync(data);
      router.push("/");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(
        e.response?.data?.message ||
          "Не удалось зарегистрироваться. Попробуйте ещё раз.",
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      {/* Brand mark */}
      <Link href="/" className="group mb-8 flex items-center gap-2">
        <div className="bg-primary/10 group-hover:bg-primary/20 rounded-xl p-2 transition-colors">
          <Film className="text-primary h-6 w-6" />
        </div>
        <span className="text-xl font-bold">Movee</span>
      </Link>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Создать аккаунт</CardTitle>
          <CardDescription>
            Присоединяйтесь к Movee и начните вести список кино
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Отображаемое имя</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Иван Иванов"
                autoComplete="name"
                {...register("displayName")}
                className={errors.displayName ? "border-destructive" : ""}
              />
              {errors.displayName && (
                <p className="text-destructive text-xs">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                  @
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  autoComplete="username"
                  {...register("username")}
                  className={`pl-7 ${errors.username ? "border-destructive" : ""}`}
                />
              </div>
              {errors.username && (
                <p className="text-destructive text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-destructive/10 border-destructive/20 rounded-lg border p-3">
                <p className="text-destructive text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Создание аккаунта...
                </>
              ) : (
                "Создать аккаунт"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            У вас уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Войти
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
