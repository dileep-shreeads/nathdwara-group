import { NextResponse } from "next/server";
import {
  dbGetEnquiries,
  dbCreateEnquiry,
  dbUpdateEnquiryStatus,
  dbDeleteEnquiry,
} from "@/lib/db";

export async function GET() {
  try {
    const enquiries = await dbGetEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, college, course, state, status, source, notes } = body;

    if (!name || !phone || !course) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and course are required" },
        { status: 400 }
      );
    }

    // Determine college if not explicitly provided
    let inferredCollege = college;
    if (!inferredCollege) {
      if (course.includes("B.Tech") || course.includes("Engineering") || course.includes("Polytechnic")) {
        inferredCollege = "NIET";
      } else if (course.includes("Law") || course.includes("LL.B")) {
        inferredCollege = "NLC";
      } else if (course.includes("Ayurved") || course.includes("Nursing")) {
        inferredCollege = "NCAN";
      } else if (course.includes("DMLT") || course.includes("Radiation") || course.includes("Medical")) {
        inferredCollege = "VDSMS";
      } else if (course.includes("ITI") || course.includes("Electrician") || course.includes("Fitter")) {
        inferredCollege = "NPITI";
      } else {
        inferredCollege = "NIBM";
      }
    }

    // By default, every enquiry starts with status "New"
    const newEnquiry = await dbCreateEnquiry({
      name,
      phone,
      email: email || "",
      college: inferredCollege,
      course,
      state: state || "Rajasthan",
      status: status || "New",
      source: source || "Website Fast-Track Form",
      notes: notes || "Initial enquiry submitted via website",
    });

    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create enquiry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await dbUpdateEnquiryStatus(id, status);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update enquiry status" },
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
        { success: false, error: "Enquiry ID is required" },
        { status: 400 }
      );
    }

    const result = await dbDeleteEnquiry(id);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
