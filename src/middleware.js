/* eslint-disable no-unused-vars */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// eslint-disable-next-line consistent-return
export function middleware(request) {
  const token = cookies().get('token');
  const paymentVerified = cookies().get('is_payment_verified');
  const isPaymentVerified = paymentVerified?.value === 'true';
  const isPublicRoute = request.nextUrl.pathname.startsWith('/auth');
  const isPrivateRoute = request.nextUrl.pathname.startsWith('/portal');
  const isPaymentRoute = request.nextUrl.pathname.startsWith('/payments');
  if (!isPublicRoute && !isPaymentRoute && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (isPrivateRoute && token && !isPaymentVerified) {
    return NextResponse.redirect(new URL('/payments/payment-plans', request.url));
  }
  if (isPublicRoute && token && isPaymentVerified) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }
}

// See "Matching Paths"
export const config = {
  matcher: ['/portal/:path*', '/auth/:path*', '/payments/:path*'],
};
