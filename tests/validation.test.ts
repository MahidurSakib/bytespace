import { describe, expect, it } from "vitest";
import { loginSchema, newsletterSchema, registerSchema } from "@/lib/validation";

describe("validation schemas", () => {
  it("accepts a valid registration", () => {
    expect(registerSchema.safeParse({ fullName: "Jamie Davis", email: "jamie@example.com", password: "supersecret" }).success).toBe(true);
  });

  it("rejects short passwords and bad emails on register", () => {
    const res = registerSchema.safeParse({ fullName: "Jamie", email: "nope", password: "123" });
    expect(res.success).toBe(false);
    if (!res.success) {
      const fields = res.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("email");
      expect(fields).toContain("password");
    }
  });

  it("requires a password on login but not a minimum length", () => {
    expect(loginSchema.safeParse({ email: "a@b.co", password: "" }).success).toBe(false);
    expect(loginSchema.safeParse({ email: "a@b.co", password: "x" }).success).toBe(true);
  });

  it("validates the newsletter email", () => {
    expect(newsletterSchema.safeParse({ email: "  " }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "fan@example.com" }).success).toBe(true);
  });
});
