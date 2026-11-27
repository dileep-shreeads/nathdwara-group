import { NextResponse } from "next/server";
import { dbUpdateUserPassword } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account, newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (account) {
      await dbUpdateUserPassword(account, newPassword);
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now login with your new credentials.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update password" },
      { status: 500 }
    );
  }
}
