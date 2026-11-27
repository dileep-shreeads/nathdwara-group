import { NextResponse } from "next/server";
import { dbGetUserByEmail } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier } = body;

    if (!identifier) {
      return NextResponse.json(
        { success: false, error: "Registered email or mobile is required" },
        { status: 400 }
      );
    }

    const user = await dbGetUserByEmail(identifier.trim().toLowerCase());

    // Generate simulated 6-digit OTP
    const generatedOtp = "582941";

    return NextResponse.json({
      success: true,
      message: "One-Time Password (OTP) sent to your registered contact channel.",
      account: identifier,
      demoOtp: generatedOtp,
      userFound: !!user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initiate password reset" },
      { status: 500 }
    );
  }
}
