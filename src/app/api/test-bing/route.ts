import { NextRequest, NextResponse } from 'next/server';
import { BingSearchEngine } from '../../../lib/bingSearch';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurant = searchParams.get('restaurant');

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        error: 'Restaurant name is required'
      }, { status: 400 });
    }

    console.log(`🧪 Testing Bing search for: "${restaurant}"`);

    const searchEngine = new BingSearchEngine();
    const results = await searchEngine.searchRestaurants(restaurant);

    return NextResponse.json({
      success: true,
      restaurantName: restaurant,
      results: results,
      count: results.length,
      searchEngine: 'Bing',
      cost: 'FREE',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Bing test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
