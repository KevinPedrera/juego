import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://mpvtihmnviektnaxmbdq.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdnRpaG1udmlla3RuYXhtYmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MTY1MjMsImV4cCI6MjA4NDA5MjUyM30.baLDC5ZFnLVeYpjxTv5lbtylBJ3huX3U95nD8UkH5tE')