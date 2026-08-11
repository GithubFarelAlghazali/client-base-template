import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // get form values
    const body = await request.json();
    const { email, password } = body;

    // compare with env email & password
    const matchingEmail = email === process.env.ADMIN_EMAIL;

    console.log("[DEBUG] matchingEmail:", matchingEmail);
    console.log(
      "[DEBUG] input email length:",
      email?.length,
      "| env ADMIN_EMAIL length:",
      process.env.ADMIN_EMAIL?.length,
    );
    console.log(
      "[DEBUG] env ADMIN_PASSWORD_HASH prefix:",
      process.env.ADMIN_PASSWORD_HASH?.slice(0, 7),
      "| length:",
      process.env.ADMIN_PASSWORD_HASH?.length,
    );

    const matchingPassword = matchingEmail
      ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
      : false;

    // kabarin kalo email / password salah
    if (!matchingEmail || !matchingPassword) {
      return NextResponse.json(
        {
          error: "Email atau Password salah",
        },
        { status: 401 },
      );
    }

    // bikin token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const res = NextResponse.json({ message: "Login berhasil" });
    // set cookies
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server :" + error,
      },
      { status: 400 },
    );
  }
}
