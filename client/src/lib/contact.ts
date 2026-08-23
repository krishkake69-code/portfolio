export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
};

export function validateContactFields(fields: ContactFields): string | null {
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (fields.company?.trim()) return "spam";
  if (name.length < 2 || name.length > 80) return "name";
  if (!validEmail || email.length > 160) return "email";
  if (subject.length < 3 || subject.length > 120) return "subject";
  if (message.length < 10 || message.length > 2000) return "message";
  return null;
}

export function buildContactMailto(fields: ContactFields): string {
  const body = [`Name: ${fields.name.trim()}`, `Email: ${fields.email.trim()}`, "", fields.message.trim()].join("\n");
  return `mailto:krishkake69@gmail.com?subject=${encodeURIComponent(fields.subject.trim())}&body=${encodeURIComponent(body)}`;
}
