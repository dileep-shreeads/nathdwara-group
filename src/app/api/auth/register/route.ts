import { NextResponse } from "next/server";
import { dbCreateUser, dbGetUserByEmail } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, mobile, password, college, course } = body;

    if (!fullName || !email || !mobile || !password) {
      return NextResponse.json(
        { success: false, error: "Full name, email, mobile, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await dbGetUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email address already exists" },
        { status: 409 }
      );
    }

    // Create user in database with role "Applicant" or "Student"
    const newUser = await dbCreateUser({
      name: fullName,
      email,
      phone: mobile,
      role: "Student",
      college: college || "NIET — Engineering & Technology",
      password,
      status: "Active",
    });

    const appId = `NGI-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user: newUser,
        appId,
        college: college || "NIET",
        course: course || "B.Tech Computer Science & Engineering",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}
