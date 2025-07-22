import { NextRequest, NextResponse } from 'next/server';

import { getMyProducts } from '@web/services/products/server';

import { ProductStatus } from '@web/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const products = await getMyProducts({
      status: status as ProductStatus,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get user products' }, { status: 500 });
  }
}
