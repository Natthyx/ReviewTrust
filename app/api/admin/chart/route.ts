import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";
import { NextResponse } from "next/server";

// Ensure only admins can call this
async function isAdmin(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return false;

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      global: { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      } 
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;
  
  // Check if user is admin by checking their profile
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return !error && profile?.role === "admin";
}

export async function GET(req: Request) {
  // 1. Validate admin identity
  const admin = await isAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Calculate the date 7 days ago (starting from Monday)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    // To get the most recent Monday, we subtract (dayOfWeek + 6) % 7 days
    const daysToLastMonday = (dayOfWeek + 6) % 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToLastMonday); // Start from the most recent Monday
    
    // Generate dates for the last 7 days (Monday to Sunday)
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    }
    
    // Fetch review counts per day
    const { data: reviewsData, error: reviewsError } = await supabaseAdmin
      .from("reviews")
      .select("created_at")
      .gte("created_at", startDate.toISOString());
    
    if (reviewsError) throw reviewsError;
    
    // Fetch user registration counts per day
    const { data: usersData, error: usersError } = await supabaseAdmin
      .from("profiles")
      .select("created_at, role")
      .eq("role", "user")
      .gte("created_at", startDate.toISOString());
    
    if (usersError) throw usersError;
    
    // Fetch business registration counts per day
    const { data: businessesData, error: businessesError } = await supabaseAdmin
      .from("profiles")
      .select("created_at, role")
      .eq("role", "business")
      .gte("created_at", startDate.toISOString());
    
    if (businessesError) throw businessesError;
    
    // Initialize counts for each date
    const reviewCounts: Record<string, number> = {};
    const userCounts: Record<string, number> = {};
    const businessCounts: Record<string, number> = {};
    
    dates.forEach(date => {
      reviewCounts[date] = 0;
      userCounts[date] = 0;
      businessCounts[date] = 0;
    });
    
    // Count reviews per day
    reviewsData.forEach(review => {
      if (review.created_at) {
        const reviewDate = review.created_at.split('T')[0];
        if (reviewCounts.hasOwnProperty(reviewDate)) {
          reviewCounts[reviewDate]++;
        }
      }
    });
    
    // Count user registrations per day
    usersData.forEach(user => {
      if (user.created_at) {
        const userDate = user.created_at.split('T')[0];
        if (userCounts.hasOwnProperty(userDate)) {
          userCounts[userDate]++;
        }
      }
    });
    
    // Count business registrations per day
    businessesData.forEach(business => {
      if (business.created_at) {
        const businessDate = business.created_at.split('T')[0];
        if (businessCounts.hasOwnProperty(businessDate)) {
          businessCounts[businessDate]++;
        }
      }
    });
    
    // Format data for the chart (Monday to Sunday)
    const chartData = dates.map(date => {
      // Convert date to day name (Monday to Sunday)
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const dayIndex = new Date(date).getDay();
      const dayName = dayNames[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust for Monday start
      
      return {
        day: dayName,
        reviews: reviewCounts[date],
        users: userCounts[date],
        businesses: businessCounts[date]
      };
    });
    
    return NextResponse.json(chartData);
  } catch (error: any) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}