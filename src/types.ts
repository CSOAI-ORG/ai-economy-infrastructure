import { z } from "zod";

// Enum definitions for consistency across tools
export const SectorEnum = z.enum([
  "aigovernance",
  "aifinance",
  "aiinsurance",
  "aihealthcare",
  "aidefence",
  "aieducation",
  "aimanufacturing",
  "aienergy",
]);
export type Sector = z.infer<typeof SectorEnum>;

export const JurisdictionEnum = z.enum([
  "EU",
  "US",
  "UK",
  "CA",
  "AU",
  "SG",
  "HK",
  "JP",
  "IN",
  "GLOBAL",
]);
export type Jurisdiction = z.infer<typeof JurisdictionEnum>;

export const DeploymentTypeEnum = z.enum([
  "cloud",
  "on-premise",
  "hybrid",
  "edge",
  "distributed",
]);
export type DeploymentType = z.infer<typeof DeploymentTypeEnum>;

export const IncidentTypeEnum = z.enum([
  "cyber",
  "ai_safety",
  "compliance",
  "quantum_threat",
  "multi_domain",
]);
export type IncidentType = z.infer<typeof IncidentTypeEnum>;

export const OrganizationSizeEnum = z.enum([
  "startup",
  "small",
  "medium",
  "large",
  "enterprise",
]);
export type OrganizationSize = z.infer<typeof OrganizationSizeEnum>;

// Core interface definitions
export interface SpecialistMCPRegistry {
  id: string;
  name: string;
  version: string;
  endpoint?: string;
  capabilities: string[];
  sectors: Sector[];
  description: string;
}

export interface GovernanceAssessmentInput {
  ai_system_description: string;
  sector: Sector;
  jurisdiction: Jurisdiction;
  deployment_type: DeploymentType;
  additional_context?: Record<string, unknown>;
}

export interface GovernanceAssessmentOutput {
  risk_classification: "critical" | "high" | "medium" | "low" | "minimal";
  applicable_crosswalks: string[];
  casa_tier_recommendation: 1 | 2 | 3 | 4 | 5;
  compliance_gaps: Array<{
    category: string;
    gap: string;
    severity: "critical" | "high" | "medium" | "low";
  }>;
  certification_pathway: string[];
  estimated_timeline_months: number;
  estimated_cost_usd: number;
}

export interface SectorComplianceInput {
  sector: Sector;
  organization_size: OrganizationSize;
  current_compliance: string[];
  jurisdiction: Jurisdiction;
}

export interface SectorComplianceOutput {
  sector: Sector;
  compliance_bundle_id: string;
  required_standards: Array<{
    name: string;
    framework: string;
    priority: "critical" | "high" | "medium";
  }>;
  applicable_certifications: Array<{
    name: string;
    issuer: string;
    timeline_months: number;
    cost_usd: number;
  }>;
  sector_specific_requirements: Array<{
    requirement: string;
    source: string;
    deadline?: string;
  }>;
  recommended_roadmap: Array<{
    phase: number;
    focus: string;
    duration_months: number;
    estimated_cost_usd: number;
  }>;
}

export interface DashboardMetrics {
  organization_id: string;
  timestamp: string;
  cross_ecosystem_usage: Record<string, number>;
  compliance_posture_score: number;
  learning_progress_percentage: number;
  security_status: "secure" | "at_risk" | "critical";
  pqc_readiness: number;
  recommended_actions: Array<{
    action: string;
    priority: "critical" | "high" | "medium" | "low";
    estimated_effort_hours: number;
  }>;
}

export interface TrustScoreInput {
  ai_system_name: string;
  organization: string;
  deployment_context: string;
}

export interface TrustScoreOutput {
  system_name: string;
  composite_trust_score: number;
  governance_compliance_score: number;
  security_posture_score: number;
  pqc_readiness_score: number;
  content_verification_status: "verified" | "pending" | "unverified";
  training_completion_percentage: number;
  score_breakdown: Record<string, number>;
  risk_flags: string[];
  recommendations: string[];
}

export interface LearningPathwayInput {
  role: string;
  skill_gaps_identified: string[];
  sector: Sector;
  career_goals: string;
}

export interface LearningPathwayOutput {
  pathway_id: string;
  role: string;
  estimated_duration_hours: number;
  courses: Array<{
    name: string;
    provider: string;
    duration_hours: number;
    certification?: string;
    priority: "critical" | "high" | "medium";
  }>;
  kata_progression: Array<{
    belt_level: string;
    skills: string[];
    estimated_hours: number;
  }>;
  casa_certification_prep: {
    tier: number;
    focus_areas: string[];
    estimated_prep_hours: number;
  };
  mooc_integration_hooks: Array<{
    course_id: string;
    enrollment_data: Record<string, unknown>;
  }>;
}

export interface DataPipelineInput {
  data_sources: string[];
  metrics_wanted: string[];
  aggregation_period: "hourly" | "daily" | "weekly" | "monthly";
}

export interface DataPipelineOutput {
  pipeline_id: string;
  configuration: {
    sources: Array<{
      source: string;
      metrics: string[];
      collection_interval: string;
    }>;
    aggregation: {
      period: string;
      methods: string[];
    };
  };
  collection_status: "active" | "configured" | "error";
  aggregated_insights: Record<string, unknown>;
  mooc_integration: {
    enabled: boolean;
    data_flow: string;
    sync_interval: string;
  };
}

export interface MarketIntelligenceInput {
  sector: Sector;
  geography: string;
  time_horizon: "6months" | "1year" | "3years" | "5years";
}

export interface MarketIntelligenceOutput {
  sector: Sector;
  geography: string;
  market_size_usd_millions: number;
  market_growth_rate_percentage: number;
  regulatory_landscape: Array<{
    jurisdiction: string;
    key_regulations: string[];
    maturity_level: "nascent" | "developing" | "mature";
  }>;
  competitor_activity: Array<{
    competitor: string;
    recent_moves: string[];
    threat_level: "low" | "medium" | "high";
  }>;
  opportunity_assessment: Array<{
    opportunity: string;
    market_size_usd_millions: number;
    timeline: string;
  }>;
  recommended_csoai_services: string[];
}

export interface IncidentInput {
  incident_type: IncidentType;
  severity: "critical" | "high" | "medium" | "low";
  affected_systems: string[];
  description: string;
  additional_context?: Record<string, unknown>;
}

export interface IncidentResponseOutput {
  incident_id: string;
  incident_type: IncidentType;
  severity: "critical" | "high" | "medium" | "low";
  unified_response_plan: {
    phase: string;
    responsible_mcp: string;
    actions: Array<{
      action: string;
      mcp: string;
      timeline: string;
      dependencies: string[];
    }>;
  };
  coordinated_actions: Array<{
    mcp_server: string;
    action: string;
    expected_output: string;
  }>;
  escalation_path: string[];
  communication_protocol: string;
}

export interface CertificationBundleInput {
  organization_profile: {
    name: string;
    sector: Sector;
    size: OrganizationSize;
    jurisdiction: Jurisdiction;
  };
  target_certifications: string[];
  timeline_months: number;
}

export interface CertificationBundleOutput {
  bundle_id: string;
  organization_name: string;
  certifications: Array<{
    name: string;
    issuer: string;
    tier?: number;
    duration_months: number;
    cost_usd: number;
    prerequisites: string[];
    dependencies: string[];
  }>;
  unified_timeline_months: number;
  critical_path: Array<{
    phase: number;
    certifications: string[];
    duration_months: number;
    dependencies: string[];
  }>;
  single_point_of_contact: {
    role: string;
    responsibilities: string[];
  };
  combined_pricing: {
    total_usd: number;
    bundle_discount_percentage: number;
    payment_terms: string;
  };
}

export interface EcosystemMap {
  total_servers: number;
  specialist_servers: SpecialistMCPRegistry[];
  cross_ecosystem_routes: Record<string, string[]>;
  data_integration_points: Array<{
    source: string;
    target: string;
    data_type: string;
    frequency: string;
  }>;
}

export interface TrustFramework {
  methodology: string;
  scoring_dimensions: Array<{
    dimension: string;
    weight: number;
    subcriteria: string[];
  }>;
  score_ranges: Array<{
    range: string;
    risk_level: string;
    interpretation: string;
  }>;
}

export interface DataSchema {
  version: string;
  collections: Array<{
    name: string;
    fields: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
    }>;
  }>;
  mooc_integration: {
    enrollment_schema: Record<string, unknown>;
    progress_tracking_schema: Record<string, unknown>;
    assessment_schema: Record<string, unknown>;
  };
}
