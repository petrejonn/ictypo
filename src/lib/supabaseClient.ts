import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://luvoaucvcfiwiegiseej.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1dm9hdWN2Y2Zpd2llZ2lzZWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MjA3MjEsImV4cCI6MjAwNjE5NjcyMX0.C6WVL5QUacPZEbYKbAHeMa5QAJvPy8695ZRs4oqc-NI'

export const supabase = createClient(supabaseUrl, supabaseKey)