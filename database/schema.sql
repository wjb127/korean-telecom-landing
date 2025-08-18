-- Supabase SQL Schema for Korean Telecom Landing Page
-- Table name: kmong_10_leads

-- Create the leads table
CREATE TABLE IF NOT EXISTS kmong_10_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  carrier VARCHAR(10) NOT NULL,
  service VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('Asia/Seoul', NOW()),
  ip_address VARCHAR(45),
  user_agent TEXT,
  privacy_agreed BOOLEAN DEFAULT true
);

-- Create index for faster queries
CREATE INDEX idx_kmong_10_leads_created_at ON kmong_10_leads(created_at DESC);
CREATE INDEX idx_kmong_10_leads_phone ON kmong_10_leads(phone);
CREATE INDEX idx_kmong_10_leads_carrier ON kmong_10_leads(carrier);

-- Enable Row Level Security
ALTER TABLE kmong_10_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can insert)
CREATE POLICY "Enable insert for all users" ON kmong_10_leads
FOR INSERT WITH CHECK (true);

-- Create policy for select (only authenticated users can select)
CREATE POLICY "Enable select for authenticated users only" ON kmong_10_leads
FOR SELECT USING (auth.role() = 'authenticated');

-- Sample queries for data analysis
-- Get total leads count
-- SELECT COUNT(*) FROM kmong_10_leads;

-- Get leads by carrier
-- SELECT carrier, COUNT(*) as count FROM kmong_10_leads GROUP BY carrier ORDER BY count DESC;

-- Get leads by service type
-- SELECT service, COUNT(*) as count FROM kmong_10_leads GROUP BY service ORDER BY count DESC;

-- Get today's leads
-- SELECT * FROM kmong_10_leads WHERE DATE(created_at) = CURRENT_DATE ORDER BY created_at DESC;

-- Get leads from last 7 days
-- SELECT * FROM kmong_10_leads WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC;

-- Get hourly distribution of leads
-- SELECT DATE_TRUNC('hour', created_at) as hour, COUNT(*) as count 
-- FROM kmong_10_leads 
-- WHERE created_at >= NOW() - INTERVAL '24 hours' 
-- GROUP BY hour 
-- ORDER BY hour DESC;