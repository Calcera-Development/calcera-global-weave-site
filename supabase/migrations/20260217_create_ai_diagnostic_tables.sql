-- Calcera AI Diagnostic Platform - Database Schema
-- Migration: 001_create_ai_diagnostic_tables
-- Description: Create tables for storing leads, diagnostic reports, and agent interactions

-- Enable pgvector extension for future RAG capabilities
CREATE EXTENSION IF NOT EXISTS vector;

-- Table: leads
-- Stores contact information and initial diagnostic requests
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  
  -- Company Details
  industry TEXT NOT NULL,
  company_size TEXT, -- e.g., "1-10", "11-50", "51-200", "201-1000", "1000+"
  revenue_band TEXT, -- e.g., "<1M", "1M-10M", "10M-50M", "50M+"
  
  -- Diagnostic Input
  operational_challenges TEXT NOT NULL,
  current_systems TEXT,
  desired_outcomes TEXT,
  
  -- Metadata
  source TEXT DEFAULT 'web_form',
  ip_address TEXT,
  user_agent TEXT,
  
  -- Indexes
  CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_industry ON leads(industry);

-- Table: diagnostic_reports
-- Stores AI-generated diagnostic reports and analysis
CREATE TABLE IF NOT EXISTS diagnostic_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Report Data
  report_json JSONB NOT NULL, -- Full structured report
  
  -- Classification
  complexity_tier TEXT NOT NULL CHECK (complexity_tier IN ('T1', 'T2', 'T3', 'T4')),
  complexity_label TEXT NOT NULL, -- e.g., "Simple", "Medium", "Complex", "Enterprise"
  
  -- Timeline Estimates
  estimated_timeline_weeks INTEGER,
  estimated_timeline_range TEXT, -- e.g., "8-12 weeks"
  
  -- Financial Analysis
  roi_metrics JSONB, -- {breakEvenMonths, paybackPeriod, estimatedROI, etc.}
  budget_band TEXT, -- e.g., "$50K-$100K", "$100K-$250K"
  
  -- AI Metadata
  openai_model TEXT NOT NULL,
  total_tokens INTEGER,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  processing_time_ms INTEGER,
  
  -- Status
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'sent', 'viewed', 'archived')),
  email_sent_at TIMESTAMP WITH TIME ZONE,
  first_viewed_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0
);

CREATE INDEX idx_reports_lead_id ON diagnostic_reports(lead_id);
CREATE INDEX idx_reports_created_at ON diagnostic_reports(created_at DESC);
CREATE INDEX idx_reports_complexity ON diagnostic_reports(complexity_tier);
CREATE INDEX idx_reports_status ON diagnostic_reports(status);

-- Table: agent_logs
-- Audit trail for AI agent interactions and tool calls
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES diagnostic_reports(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Request Details
  event_type TEXT NOT NULL, -- e.g., 'agent_request', 'tool_call', 'completion'
  
  -- Agent Interaction
  agent_input JSONB, -- User input sent to agent
  agent_output JSONB, -- Agent's structured response
  
  -- Tool Calls
  tool_name TEXT, -- e.g., 'roi_calculator', 'complexity_mapper'
  tool_input JSONB,
  tool_output JSONB,
  
  -- Performance
  duration_ms INTEGER,
  tokens_used INTEGER,
  
  -- Error Tracking
  error_message TEXT,
  error_stack TEXT,
  
  -- Metadata
  openai_model TEXT,
  completion_id TEXT -- OpenAI completion ID for reference
);

CREATE INDEX idx_agent_logs_report_id ON agent_logs(report_id);
CREATE INDEX idx_agent_logs_created_at ON agent_logs(created_at DESC);
CREATE INDEX idx_agent_logs_event_type ON agent_logs(event_type);
CREATE INDEX idx_agent_logs_tool_name ON agent_logs(tool_name) WHERE tool_name IS NOT NULL;

-- Table: rate_limits
-- Track API usage for rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Identifier (IP or API key)
  identifier TEXT NOT NULL,
  identifier_type TEXT NOT NULL CHECK (identifier_type IN ('ip', 'api_key', 'email')),
  
  -- Usage Tracking
  endpoint TEXT NOT NULL, -- e.g., '/api/ai-diagnostic'
  request_count INTEGER DEFAULT 1,
  last_request_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Time Window
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  window_duration_hours INTEGER DEFAULT 1,
  
  UNIQUE(identifier, endpoint, window_start)
);

CREATE INDEX idx_rate_limits_identifier ON rate_limits(identifier, endpoint);
CREATE INDEX idx_rate_limits_window ON rate_limits(window_start DESC);

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON diagnostic_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function: Increment report view count
CREATE OR REPLACE FUNCTION increment_report_view()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.view_count > OLD.view_count THEN
    IF OLD.first_viewed_at IS NULL THEN
      NEW.first_viewed_at = NOW();
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_report_views
  BEFORE UPDATE ON diagnostic_reports
  FOR EACH ROW
  EXECUTE FUNCTION increment_report_view();

-- Row Level Security (RLS) Policies
-- Note: Adjust these based on your authentication setup

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow service role (Supabase functions) full access
CREATE POLICY "Service role has full access to leads"
  ON leads FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to reports"
  ON diagnostic_reports FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to agent_logs"
  ON agent_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to rate_limits"
  ON rate_limits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public read access to reports by ID (for email-gated viewing)
CREATE POLICY "Public can view reports by ID"
  ON diagnostic_reports FOR SELECT
  TO anon, authenticated
  USING (true);

-- Comments for documentation
COMMENT ON TABLE leads IS 'Stores contact information and initial diagnostic requests from potential clients';
COMMENT ON TABLE diagnostic_reports IS 'AI-generated diagnostic reports with complexity analysis and ROI calculations';
COMMENT ON TABLE agent_logs IS 'Audit trail for all AI agent interactions, tool calls, and performance metrics';
COMMENT ON TABLE rate_limits IS 'Rate limiting tracker to prevent API abuse';

COMMENT ON COLUMN diagnostic_reports.complexity_tier IS 'T1=Simple, T2=Medium, T3=Complex, T4=Enterprise';
COMMENT ON COLUMN diagnostic_reports.roi_metrics IS 'JSON containing: {breakEvenMonths, paybackPeriod, estimatedROI, costSavings, etc.}';
