import { NextResponse } from "next/server";
import { dbGetUserByEmail } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Identifier (email or mobile) and password are required" },
        { status: 400 }
      );
    }

    const email = identifier.trim().toLowerCase();
    const user = await dbGetUserByEmail(email);

    // If user exists in DB or memory
    if (user) {
      if (user.password && user.password !== password) {
        // Simple demo check: if user password is provided and doesn't match
        // For convenience in dev, allow "Admin@2026" or "Password@123" or "Student@2026"
        const allowedFallbacks = ["Admin@2026", "Password@123", "Student@2026"];
        if (!allowedFallbacks.includes(password)) {
          return NextResponse.json(
            { success: false, error: "Invalid password for this account" },
            { status: 401 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          college: user.college,
          status: user.status,
        },
      });
    }

    // Dynamic fallback for superadmin / student demo logins
    const isAdmin = email.includes("admin");
    const sessionUser = {
      id: isAdmin ? "USR-101" : `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: isAdmin ? "Er. Rahul Joshi (Super Admin)" : "Enrolled Candidate",
      email: identifier,
      phone: "+91 95713 45444",
      role: isAdmin ? "Super Admin" : "Student",
      college: "Central Administration",
      status: "Active",
    };

    return NextResponse.json({
      success: true,
      user: sessionUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Login authentication failed" },
      { status: 500 }
    );
  }
}
