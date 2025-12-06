import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function POST() {
  const supabase = await createClient()
  
  // Sign out the user
  await supabase.auth.signOut()
  
  // Revalidate all paths
  revalidatePath('/', 'layout')
  
  // Redirect to home page
  redirect('/')
}