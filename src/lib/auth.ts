// Utilitaire d'authentification compatible Node.js et Edge Runtime (Next.js Middleware)

const ADMIN_SECRET = process.env.ADMIN_SECRET || "neodomotique-secret-salt-2026";

/**
 * Génère un hash SHA-256 à partir du sel et de la date (rotation quotidienne)
 * Compatible avec l'environnement Edge de Next.js (Web Crypto API)
 */
export async function calculerTokenSession(): Promise<string> {
  const message = `admin-authenticated-${new Date().toISOString().slice(0, 10)}-${ADMIN_SECRET}`;
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

/**
 * Vérifie si le token fourni est valide pour aujourd'hui ou hier (tolérance transition de minuit)
 */
export async function verifierTokenSession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const tokenActuel = await calculerTokenSession();
  return token === tokenActuel;
}
