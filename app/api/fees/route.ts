import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findStudent, getPendingFees } from "@/lib/fees/store";

const querySchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z]{2,5}-\d{4}-\d{3}$/, "Invalid admission number format");

/** GET /api/fees?admission=PPS-2025-001 → student + pending fee items. */
export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(
    request.nextUrl.searchParams.get("admission") ?? ""
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter an admission number like PPS-2025-001." },
      { status: 400 }
    );
  }

  const student = await findStudent(parsed.data);
  if (!student) {
    return NextResponse.json(
      { error: "No student found for that admission number." },
      { status: 404 }
    );
  }

  const fees = await getPendingFees(student.admissionNo);
  return NextResponse.json({ student, fees });
}
