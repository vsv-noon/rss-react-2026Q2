import { NextResponse } from 'next/server';

import { userCsvConfig } from '@/features/users/csvConfig';
import { convertToCsv } from '@/lib/utils/csv';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Data must be an array' },
        { status: 400 }
      );
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 400 });
    }

    const csv = convertToCsv(data, userCsvConfig);

    const filename = `${data.length}_selectedCharacters.csv`;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename=${filename}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Error converting to CSV' },
      { status: 500 }
    );
  }
}
