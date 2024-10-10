"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function SetSession(
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
) {
  const expiresAtDate = new Date(expiresAt);
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookies().set("expiresAt", expiresAtDate.toISOString());
}

export const ClearSession = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("expiresAt");
};
export const GetAccessToken = async () => {
  return cookies().get("accessToken")?.value;
};

export const HasCredentials = async () => {
  const cookieStore = cookies();
  const expiresAt = cookieStore.get("expiresAt")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    accessToken !== undefined && expiresAt !== null && refreshToken !== null
  );
};

export const TokenExpired = async () => {
  const cookieStore = cookies();
  const expiresAt = cookieStore.get("expiresAt")?.value;
  if (!expiresAt) {
    return true;
  }
  const expiresAtDate = new Date(expiresAt);
  return expiresAtDate < new Date();
};

export const HasCredentialsFromReq = async (req: NextRequest) => {
  const expiresAt = req.cookies.get("expiresAt")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;

  return (
    accessToken !== undefined && expiresAt !== null && refreshToken !== null
  );
};

export const TokenExpiredFromReq = async (req: NextRequest) => {
  const expiresAt = req.cookies.get("expiresAt")?.value;
  if (!expiresAt) {
    return true;
  }
  const expiresAtDate = new Date(expiresAt);
  return expiresAtDate < new Date();
};

export const SetResponseSession = async (
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
) => {
  const expiresAtDate = new Date(expiresAt);
  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.cookies.set("expiresAt", expiresAtDate.toISOString());
};

export const ClearResponseSession = async (res: NextResponse) => {
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");
  res.cookies.delete("expiresAt");
};
