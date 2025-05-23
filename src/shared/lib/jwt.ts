import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { jwtDecode } from "jwt-decode";

export type SecretKey = Parameters<typeof SignJWT.prototype.sign>[0];
export type Payload<T> = T extends object & JWTPayload ? T : JWTPayload;

export async function encrypt<T>(
  payload: Payload<T>,
  config: {
    secret: SecretKey;
    maxAge?: number;
  },
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${config.maxAge}d` || "7d")
    .sign(config.secret);
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

export function decode<T>(token: string) {
  return jwtDecode<Payload<T>>(token);
}
