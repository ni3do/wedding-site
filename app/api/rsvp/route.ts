import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

// Zod schema for RSVP validation
const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
  email: z.string().email('Invalid email address').max(200, 'Email is too long'),
  attendance: z.enum(['attending', 'declining'], {
    errorMap: () => ({ message: 'Please select your attendance status' }),
  }),
  guestCount: z.number().int().min(1).max(10).default(1),
  dietaryRestrictions: z.string().max(500, 'Dietary restrictions text is too long').optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

// POST /api/rsvp - Create a new RSVP
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validatedData = rsvpSchema.parse(body);

    // Save RSVP to database
    const rsvp = await prisma.rsvp.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        attendance: validatedData.attendance,
        guestCount: validatedData.guestCount,
        dietaryRestrictions: validatedData.dietaryRestrictions || null,
        message: validatedData.message || null,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'RSVP submitted successfully',
        data: {
          id: rsvp.id,
          createdAt: rsvp.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle database errors
    console.error('RSVP submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit RSVP. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// GET /api/rsvp - List all RSVPs (for future admin panel)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin access

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const attendance = searchParams.get('attendance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query filter
    const where = attendance ? { attendance } : {};

    // Fetch RSVPs from database
    const [rsvps, total] = await Promise.all([
      prisma.rsvp.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.rsvp.count({ where }),
    ]);

    // Calculate statistics
    const stats = await prisma.rsvp.groupBy({
      by: ['attendance'],
      _count: true,
      _sum: {
        guestCount: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        rsvps,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
        stats: {
          attending: stats.find((s) => s.attendance === 'attending')?._count || 0,
          declining: stats.find((s) => s.attendance === 'declining')?._count || 0,
          totalGuests: stats.find((s) => s.attendance === 'attending')?._sum.guestCount || 0,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch RSVPs',
      },
      { status: 500 }
    );
  }
}
