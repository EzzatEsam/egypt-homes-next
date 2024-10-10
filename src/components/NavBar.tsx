"use server";
import { HasCredentials } from "@/lib/Session";
import LogoMd from "./LogoMd";
import { GetUser } from "@/app/actions";
import { User } from "@/types/user";
import { NotAuthenticatedError } from "@/types/NotAuthenticatedError";

import { redirect } from "next/navigation";

export const Navbar = async () => {
  let signedIn = await HasCredentials();
  let user: User | null = null;
  if (signedIn) {
    try {
      user = await GetUser();
    } catch (error) {
      console.error("Error getting user:", error);
      if (error instanceof NotAuthenticatedError) {
        // redirect("/logout");
        user = null;
        signedIn = false;
      }
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-md px-6 ">
      <div className="flex-1 space-x-2">
        <a className="btn btn-ghost text-l items-center" href="/">
          <LogoMd />
        </a>
        <a className="btn btn-ghost text-l" href="/search?propertyType=Rent">
          Rent
        </a>
        <a className="btn btn-ghost text-l" href="/search?propertyType=Buy">
          Buy
        </a>
        {signedIn && (
          <>
            <a className="btn btn-ghost text-l" href="/add">
              Post Your Property
            </a>
            <a className="btn btn-ghost text-l" href="/favourites">
              Favourites
            </a>
            <a className="btn btn-ghost text-l" href={`/user/${user?.id}`}>
              Your Properties
            </a>
          </>
        )}
      </div>

      <div className="flex-none gap-2">
        {/* <ThemeController className="h-1/3" /> */}

        {signedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                {/* Properly center the letter */}
                <span className="flex items-center justify-center w-full h-full text-lg font-semibold">
                  {user?.firstName?.[0].toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <div>
                  {user?.firstName} {user?.lastName}
                </div>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <a className="btn" href="/login">
            Sign in
          </a>
        )}
      </div>
    </div>
  );
};
