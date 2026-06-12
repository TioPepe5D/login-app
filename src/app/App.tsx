import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type LoginFormData = {
  username: string;
  password: string;
};

const C = {
  bg: "#F3F4FA",
  surface: "#FFFFFF",
  border: "#E2E4F0",
  primary: "#3D3A8C",
  primarySoft: "#EDEDFB",
  accent1: "#6C63FF",
  accent2: "#9D7BEA",
  text: "#1B1B2F",
  textSoft: "#5A5A78",
  error: "#B3403A",
  errorPastel: "#FBEAEA",
  success: "#1B8A5A",
};

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputStyle = (name: string, hasError: boolean): React.CSSProperties => ({
    width: "100%",
    height: 44,
    borderRadius: 9,
    border: hasError
      ? `1.5px solid ${C.error}`
      : focused === name
      ? `1.5px solid ${C.accent1}`
      : `1.5px solid ${C.border}`,
    background: hasError ? C.errorPastel : focused === name ? C.surface : "#FAFAFA",
    padding: "0 14px",
    color: C.text,
    fontSize: "0.9375rem",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s, background 0.15s",
    fontFamily: "inherit",
  });

  if (loginSuccess) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E6F4EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={C.success} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p style={{ color: C.text, fontSize: "1.0625rem", fontWeight: 600, margin: 0 }}>Bienvenido de nuevo</p>
          <p style={{ color: C.textSoft, fontSize: "0.875rem", margin: 0 }}>Has iniciado sesión correctamente.</p>
          <button onClick={() => setLoginSuccess(false)} style={{ color: C.accent1, fontSize: "0.875rem", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.bg,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      {/* MARKER-MAKE-KIT-INVOKED */}
      <div style={{ width: "100%", maxWidth: 360 }}>

        {/* Orb + wordmark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ position: "relative", width: 52, height: 52 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${C.accent1}, ${C.accent2})`,
              boxShadow: `0 8px 24px ${C.accent1}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3 L20 18 H4 Z" fill="white" opacity="0.9" />
                <circle cx="12" cy="14" r="2.2" fill="white" opacity="0.6" />
              </svg>
            </div>
          </div>
          <span style={{
            fontSize: "1.4375rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            background: `linear-gradient(135deg, ${C.primary}, ${C.accent2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            AURA
          </span>
        </div>

        {/* Card */}
        <div style={{
          background: C.surface,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: "32px 28px",
          boxShadow: "0 2px 16px rgba(60,58,140,0.07)",
        }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <p style={{ color: C.text, fontSize: "1.375rem", fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>
              Iniciar sesión
            </p>
            <p style={{ color: C.textSoft, fontSize: "0.875rem", margin: "4px 0 0" }}>
              Accede a tu cuenta Aura
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }} noValidate>

            {/* Username */}
            <div>
              <label style={{ display: "block", color: C.textSoft, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
                Usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder="tu.usuario"
                autoComplete="username"
                style={inputStyle("username", !!errors.username)}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                {...register("username", {
                  required: "El usuario es obligatorio.",
                  minLength: { value: 3, message: "Mínimo 3 caracteres." },
                })}
              />
              {errors.username && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                  <span style={{ display: "inline-flex", background: C.errorPastel, color: C.error, fontSize: "0.6875rem", fontWeight: 600, borderRadius: 99, padding: "2px 8px", letterSpacing: "0.02em" }}>
                    {errors.username.message}
                  </span>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <div style={{ marginBottom: 6 }}>
                <label style={{ color: C.textSoft, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  Contraseña
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{ ...inputStyle("password", !!errors.password), paddingRight: 40 }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  {...register("password", {
                    required: "La contraseña es obligatoria.",
                    minLength: { value: 6, message: "Mínimo 6 caracteres." },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: C.textSoft, background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <div style={{ marginTop: 5 }}>
                  <span style={{ display: "inline-flex", background: C.errorPastel, color: C.error, fontSize: "0.6875rem", fontWeight: 600, borderRadius: 99, padding: "2px 8px", letterSpacing: "0.02em" }}>
                    {errors.password.message}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 9,
                background: isLoading ? C.accent2 : `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`,
                color: "white",
                border: "none",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 4,
                letterSpacing: "-0.01em",
                fontFamily: "inherit",
                boxShadow: isLoading ? "none" : `0 4px 14px ${C.accent1}44`,
                transition: "opacity 0.15s, box-shadow 0.15s",
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                    <circle style={{ opacity: 0.3 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                    <path style={{ opacity: 0.9 }} fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verificando…
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p style={{ textAlign: "center", marginTop: 20, color: C.textSoft, fontSize: "0.75rem" }}>
          Demo: <span style={{ color: C.text, fontWeight: 500 }}>admin</span> / <span style={{ color: C.text, fontWeight: 500 }}>password123</span>
        </p>
      </div>
    </div>
  );
}
