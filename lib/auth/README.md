# Authentication System

This document explains the authentication system for ReviewTrust.

## Overview

The authentication system uses Supabase Auth with a custom role-based access control system. There are three user roles:

1. **User** - Regular users who can browse services and write reviews
2. **Business** - Business owners who can manage their profiles and respond to reviews
3. **Admin** - Administrators who can manage the platform

## Key Components

### Supabase Configuration
- `lib/supabase/client.ts` - Browser client for frontend authentication
- `lib/supabase/server.ts` - Server client for backend authentication
- `lib/supabase/database.types.ts` - Database schema types

### Authentication Types
- `lib/auth/types.ts` - TypeScript interfaces for authentication entities

### Authentication Utilities
- `lib/auth/utils.ts` - Helper functions for authentication checks
- `lib/auth/redirects.ts` - Role-based redirect logic

### Server Actions
- `app/auth/actions.ts` - Server actions for registration and login

### Pages
- `app/auth/login-page/page.tsx` - Login form
- `app/auth/register-page/page.tsx` - Registration form
- `app/auth/forgot-password/page.tsx` - Password reset request
- `app/auth/reset-password/page.tsx` - Password reset form
- `app/admin/login/page.tsx` - Admin-only login page

### API Routes
- `app/auth/callback/route.ts` - Email verification callback
- `app/auth/signout/route.ts` - Sign out endpoint

### Middleware
- `middleware.ts` - Route protection and role-based redirects

## Authentication Flow

### User Registration
1. User fills registration form
2. Supabase creates auth user
3. System creates profile record with "user" role
4. Email verification sent
5. After verification, user is redirected to categories page

### Business Registration
1. Business fills registration form
2. Supabase creates auth user
3. System creates profile record with "business" role
4. System creates business profile record
5. Email verification sent
6. After verification, business is redirected to business dashboard

### Admin Registration
1. Admin accounts are created manually via Supabase dashboard
2. Profile record is created with "admin" role
3. No email verification required

### Login
1. User enters credentials
2. Supabase validates credentials
3. System retrieves user role from profile
4. User is redirected based on role:
   - User → `/categories`
   - Business → `/business/dashboard`
   - Admin → `/admin/dashboard`

### Email Verification
1. User clicks verification link from email
2. Supabase verifies token
3. System redirects user based on role

### Password Reset
1. User requests password reset
2. Supabase sends reset email
3. User clicks reset link
4. User enters new password
5. Supabase updates password
6. User is redirected to login page

## Security Considerations

1. All passwords are hashed by Supabase
2. JWT tokens are used for session management
3. Row Level Security (RLS) policies protect database records
4. Role-based access control prevents unauthorized access
5. Email verification ensures valid user accounts
6. Rate limiting prevents brute force attacks