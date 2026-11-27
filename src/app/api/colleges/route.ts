import { NextResponse } from "next/server";
import {
  dbGetColleges,
  dbCreateCollege,
  dbUpdateCollege,
  dbDeleteCollege,
} from "@/lib/db";

export async function GET() {
  try {
    const colleges = await dbGetColleges();
    return NextResponse.json({ success: true, data: colleges });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      shortName,
      code,
      affiliation,
      category,
      establishedYear,
      coursesCount,
      intakeSeats,
      principal,
      status,
    } = body;

    if (!name || !shortName || !code || !affiliation || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required college details" },
        { status: 400 }
      );
    }

    const newCollege = await dbCreateCollege({
      id: shortName.toLowerCase(),
      name,
      shortName,
      code,
      affiliation,
      category,
      establishedYear: Number(establishedYear) || 2026,
      coursesCount: Number(coursesCount) || 4,
      intakeSeats: Number(intakeSeats) || 120,
      principal,
      status: status || "Active",
    });

    return NextResponse.json({ success: true, data: newCollege }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create college" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "College ID is required" },
        { status: 400 }
      );
    }

    const updated = await dbUpdateCollege(id, updateData);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update college" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch (e) {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "College ID is required" },
        { status: 400 }
      );
    }

    const result = await dbDeleteCollege(id);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete college" },
      { status: 500 }
    );
  }
}
