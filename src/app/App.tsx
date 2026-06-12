import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, User } from "lucide-react";

type LoginFormData = {
  username: string;
  password: string;
};

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (data.username === "admin" && data.password === "password123") {
        setLoginSuccess(true);
      } else {
        alert("Credenciales incorrectas. Prueba: admin / password123");
      }
    }, 1200);
  };

  if (loginSuccess) {
    return (
      <div className="size-full flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-foreground">Bienvenido de nuevo</h2>
          <p className="text-muted-foreground text-sm">Has iniciado sesión correctamente.</p>
          <button
            onClick={() => setLoginSuccess(false)}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-background px-4">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <div className="w-8 h-8 bg-primary rounded-sm mb-8" />
          <h1 className="text-foreground mb-1">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm">
            Ingresa tus credenciales para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label htmlFor="username" className="text-foreground text-sm block">
              Usuario
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={16} />
              </span>
              <input
                id="username"
                type="text"
                placeholder="tu.usuario"
                autoComplete="username"
                className={[
                  "w-full h-10 pl-9 pr-3 rounded-md bg-input-background text-foreground placeholder:text-muted-foreground",
                  "border transition-colors outline-none",
                  "focus:border-foreground focus:bg-background",
                  errors.username ? "border-destructive" : "border-border",
                ].join(" ")}
                {...register("username", {
                  required: "El usuario es obligatorio.",
                  minLength: { value: 3, message: "Mínimo 3 caracteres." },
                })}
              />
            </div>
            {errors.username && (
              <p className="text-destructive text-xs">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-foreground text-sm block">
                Contraseña
              </label>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={16} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className={[
                  "w-full h-10 pl-9 pr-10 rounded-md bg-input-background text-foreground placeholder:text-muted-foreground",
                  "border transition-colors outline-none",
                  "focus:border-foreground focus:bg-background",
                  errors.password ? "border-destructive" : "border-border",
                ].join(" ")}
                {...register("password", {
                  required: "La contraseña es obligatoria.",
                  minLength: { value: 6, message: "Mínimo 6 caracteres." },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={[
              "w-full h-10 rounded-md bg-primary text-primary-foreground transition-opacity",
              "hover:opacity-90 active:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2",
            ].join(" ")}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Verificando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Demo: <span className="text-foreground">admin</span> /{" "}
          <span className="text-foreground">password123</span>
        </p>
      </div>
    </div>
  );
}
