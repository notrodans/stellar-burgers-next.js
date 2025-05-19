import { JWTPayload, jwtVerify, SignJWT } from "jose";

export type SecretKey = Parameters<typeof SignJWT.prototype.sign>[0];
export type Payload<T> = T extends object & JWTPayload ? T : JWTPayload;

export async function encrypt<T>(payload: Payload<T>, secret: SecretKey) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function decrypt<T extends object = object>(
  session: string | undefined = "",
  secret: SecretKey,
): Promise<Payload<T> | undefined> {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });
    return payload as Payload<T>;
  } catch {}
}
