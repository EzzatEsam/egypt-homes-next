import {
  ClearResponseSession,
  HasCredentialsFromReq,
  SetResponseSession,
  TokenExpiredFromReq,
} from "@/lib/Session";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (
    (await HasCredentialsFromReq(request)) &&
    (await TokenExpiredFromReq(request))
  ) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const accessToken = request.cookies.get("accessToken")?.value;

    const result = await fetch(`${process.env.SERVER_ADDR}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
        accessToken: accessToken,
      }),
    });

    if (response.ok) {
      const { accessToken, expiresAt } = await result.json();
      const expiresAtDate = new Date(expiresAt);

      await SetResponseSession(
        response,
        accessToken,
        refreshToken!,
        expiresAtDate
      );
    } else {
      await ClearResponseSession(response);
      return NextResponse.redirect("/logout");
    }
  }
  return response;
}

export const config = {
  matcher: "/:path*",
};
