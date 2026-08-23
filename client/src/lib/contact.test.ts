import { describe, expect, it } from "vitest";
import { buildContactMailto, validateContactFields } from "./contact";

describe("contact form contract", () => {
  const validFields = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    subject: "A collaboration idea",
    message: "I would like to discuss a thoughtful project collaboration.",
    company: "",
  };

  it("accepts a valid visitor message", () => {
    expect(validateContactFields(validFields)).toBeNull();
  });

  it("rejects malformed or too-short messages", () => {
    expect(validateContactFields({ ...validFields, email: "not-an-email" })).toBe("email");
    expect(validateContactFields({ ...validFields, message: "short" })).toBe("message");
  });

  it("rejects the honeypot field", () => {
    expect(validateContactFields({ ...validFields, company: "spam bot" })).toBe("spam");
  });

  it("targets the owner email and encodes the message safely", () => {
    const mailto = buildContactMailto(validFields);
    expect(mailto).toContain("mailto:krishkake69@gmail.com");
    expect(mailto).toContain("subject=A%20collaboration%20idea");
    expect(mailto).toContain("Name%3A%20Ada%20Lovelace");
  });
});
