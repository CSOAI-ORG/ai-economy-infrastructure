import { z } from "zod";
import {
  SectorEnum,
  JurisdictionEnum,
  DeploymentTypeEnum,
  IncidentTypeEnum,
  OrganizationSizeEnum,
} from "./types.js";

// ============================================================================
// Zod Validation Schemas (for server-side validation)
// ============================================================================

const RouterZodSchema = z.object({
  query: z.string().min(10).describe("Natural language query for routing"),
  context: z
    .record(z.unknown())
    .optional()
    .describe("Optional context about the request"),
});

const GovernanceAssessZodSchema = z.object({
  ai_system_description: z
    .string()
    .min(20)
    .describe("Description of the AI system"),
  sector: SectorEnum.describe("Target sector"),
  jurisdiction: JurisdictionEnum.describe("Target jurisdiction"),
  deployment_type: DeploymentTypeEnum.describe("Type of deployment"),
  additional_context: z
    .record(z.unknown())
    .optional()
    .describe("Additional context"),
});

const SectorComplianceZodSchema = z.object({
  sector: SectorEnum.describe("Sector for compliance"),
  organization_size: OrganizationSizeEnum.describe("Size of organization"),
  current_compliance: z
    .array(z.string())
    .describe("List of current compliance achievements"),
  jurisdiction: JurisdictionEnum.describe("Jurisdiction"),
});

const DashboardZodSchema = z.object({
  organization_id: z.string().describe("Organization identifier"),
  date_range: z
    .object({
      start_date: z.string().datetime().describe("Start date in ISO 8601"),
      end_date: z.string().datetime().describe("End date in ISO 8601"),
    })
    .describe("Date range for metrics"),
  metrics: z
    .array(z.string())
    .describe("Specific metrics to retrieve"),
});

const TrustScoreZodSchema = z.object({
  ai_system_name: z.string().describe("Name of the AI system"),
  organization: z.string().describe("Organization name"),
  deployment_context: z.string().describe("Context of deployment"),
});

const LearningPathwayZodSchema = z.object({
  role: z.string().describe("User role/title"),
  skill_gaps_identified: z.array(z.string()).describe("Identified skill gaps"),
  sector: SectorEnum.describe("Target sector"),
  career_goals: z.string().describe("Career goals"),
});

const DataPipelineZodSchema = z.object({
  data_sources: z
    .array(z.string())
    .describe("Which MCPs to collect data from"),
  metrics_wanted: z
    .array(z.string())
    .describe("List of metrics to collect"),
  aggregation_period: z
    .enum(["hourly", "daily", "weekly", "monthly"])
    .describe("How often to aggregate"),
});

const MarketIntelligenceZodSchema = z.object({
  sector: SectorEnum.describe("Target sector"),
  geography: z.string().describe("Geographic region"),
  time_horizon: z
    .enum(["6months", "1year", "3years", "5years"])
    .describe("Time horizon for analysis"),
});

const IncidentCommandZodSchema = z.object({
  incident_type: IncidentTypeEnum.describe("Type of incident"),
  severity: z
    .enum(["critical", "high", "medium", "low"])
    .describe("Severity level"),
  affected_systems: z
    .array(z.string())
    .describe("Systems affected by incident"),
  description: z
    .string()
    .min(20)
    .describe("Detailed incident description"),
  additional_context: z
    .record(z.unknown())
    .optional()
    .describe("Additional context"),
});

const CertificationBundleZodSchema = z.object({
  organization_profile: z
    .object({
      name: z.string().describe("Organization name"),
      sector: SectorEnum.describe("Organization sector"),
      size: OrganizationSizeEnum.describe("Organization size"),
      jurisdiction: JurisdictionEnum.describe("Organization jurisdiction"),
    })
    .describe("Organization profile"),
  target_certifications: z
    .array(z.string())
    .describe("Target certifications to achieve"),
  timeline_months: z
    .number()
    .positive()
    .describe("Desired timeline in months"),
});

// ============================================================================
// JSON Schema Definitions (for MCP tool inputSchema)
// ============================================================================

export const AiEconomyRouterInputSchema = {
  type: "object" as const,
  properties: {
    query: {
      type: "string",
      description: "Natural language query for routing",
    },
    context: {
      type: "object" as const,
      description: "Optional context about the request",
    },
  },
  required: ["query"],
};

export const AiGovernanceAssessInputSchema = {
  type: "object" as const,
  properties: {
    ai_system_description: {
      type: "string",
      description: "Description of the AI system",
    },
    sector: {
      type: "string",
      enum: ["aigovernance", "aifinance", "aiinsurance", "aihealthcare", "aidefence", "aieducation", "aimanufacturing", "aienergy"],
      description: "Target sector",
    },
    jurisdiction: {
      type: "string",
      enum: ["EU", "US", "UK", "CA", "AU", "SG", "HK", "JP", "IN", "GLOBAL"],
      description: "Target jurisdiction",
    },
    deployment_type: {
      type: "string",
      enum: ["cloud", "on-premise", "hybrid", "edge", "distributed"],
      description: "Type of deployment",
    },
    additional_context: {
      type: "object" as const,
      description: "Additional context",
    },
  },
  required: ["ai_system_description", "sector", "jurisdiction", "deployment_type"],
};

export const AiSectorComplianceInputSchema = {
  type: "object" as const,
  properties: {
    sector: {
      type: "string",
      enum: ["aigovernance", "aifinance", "aiinsurance", "aihealthcare", "aidefence", "aieducation", "aimanufacturing", "aienergy"],
      description: "Sector for compliance",
    },
    organization_size: {
      type: "string",
      enum: ["startup", "small", "medium", "large", "enterprise"],
      description: "Size of organization",
    },
    current_compliance: {
      type: "array",
      items: { type: "string" },
      description: "List of current compliance achievements",
    },
    jurisdiction: {
      type: "string",
      enum: ["EU", "US", "UK", "CA", "AU", "SG", "HK", "JP", "IN", "GLOBAL"],
      description: "Jurisdiction",
    },
  },
  required: ["sector", "organization_size", "current_compliance", "jurisdiction"],
};

export const AiEconomyDashboardInputSchema = {
  type: "object" as const,
  properties: {
    organization_id: {
      type: "string",
      description: "Organization identifier",
    },
    date_range: {
      type: "object" as const,
      properties: {
        start_date: {
          type: "string",
          description: "Start date in ISO 8601",
        },
        end_date: {
          type: "string",
          description: "End date in ISO 8601",
        },
      },
      required: ["start_date", "end_date"],
    },
    metrics: {
      type: "array",
      items: { type: "string" },
      description: "Specific metrics to retrieve",
    },
  },
  required: ["organization_id", "date_range", "metrics"],
};

export const AiTrustScoreInputSchema = {
  type: "object" as const,
  properties: {
    ai_system_name: {
      type: "string",
      description: "Name of the AI system",
    },
    organization: {
      type: "string",
      description: "Organization name",
    },
    deployment_context: {
      type: "string",
      description: "Context of deployment",
    },
  },
  required: ["ai_system_name", "organization", "deployment_context"],
};

export const AiLearningPathwayInputSchema = {
  type: "object" as const,
  properties: {
    role: {
      type: "string",
      description: "User role/title",
    },
    skill_gaps_identified: {
      type: "array",
      items: { type: "string" },
      description: "Identified skill gaps",
    },
    sector: {
      type: "string",
      enum: ["aigovernance", "aifinance", "aiinsurance", "aihealthcare", "aidefence", "aieducation", "aimanufacturing", "aienergy"],
      description: "Target sector",
    },
    career_goals: {
      type: "string",
      description: "Career goals",
    },
  },
  required: ["role", "skill_gaps_identified", "sector", "career_goals"],
};

export const AiDataPipelineInputSchema = {
  type: "object" as const,
  properties: {
    data_sources: {
      type: "array",
      items: { type: "string" },
      description: "Which MCPs to collect data from",
    },
    metrics_wanted: {
      type: "array",
      items: { type: "string" },
      description: "List of metrics to collect",
    },
    aggregation_period: {
      type: "string",
      enum: ["hourly", "daily", "weekly", "monthly"],
      description: "How often to aggregate",
    },
  },
  required: ["data_sources", "metrics_wanted", "aggregation_period"],
};

export const AiMarketIntelligenceInputSchema = {
  type: "object" as const,
  properties: {
    sector: {
      type: "string",
      enum: ["aigovernance", "aifinance", "aiinsurance", "aihealthcare", "aidefence", "aieducation", "aimanufacturing", "aienergy"],
      description: "Target sector",
    },
    geography: {
      type: "string",
      description: "Geographic region",
    },
    time_horizon: {
      type: "string",
      enum: ["6months", "1year", "3years", "5years"],
      description: "Time horizon for analysis",
    },
  },
  required: ["sector", "geography", "time_horizon"],
};

export const AiIncidentCommandInputSchema = {
  type: "object" as const,
  properties: {
    incident_type: {
      type: "string",
      enum: ["cyber", "ai_safety", "compliance", "quantum_threat", "multi_domain"],
      description: "Type of incident",
    },
    severity: {
      type: "string",
      enum: ["critical", "high", "medium", "low"],
      description: "Severity level",
    },
    affected_systems: {
      type: "array",
      items: { type: "string" },
      description: "Systems affected by incident",
    },
    description: {
      type: "string",
      description: "Detailed incident description",
    },
    additional_context: {
      type: "object" as const,
      description: "Additional context",
    },
  },
  required: ["incident_type", "severity", "affected_systems", "description"],
};

export const AiCertificationBundleInputSchema = {
  type: "object" as const,
  properties: {
    organization_profile: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Organization name",
        },
        sector: {
          type: "string",
          enum: ["aigovernance", "aifinance", "aiinsurance", "aihealthcare", "aidefence", "aieducation", "aimanufacturing", "aienergy"],
          description: "Organization sector",
        },
        size: {
          type: "string",
          enum: ["startup", "small", "medium", "large", "enterprise"],
          description: "Organization size",
        },
        jurisdiction: {
          type: "string",
          enum: ["EU", "US", "UK", "CA", "AU", "SG", "HK", "JP", "IN", "GLOBAL"],
          description: "Organization jurisdiction",
        },
      },
      required: ["name", "sector", "size", "jurisdiction"],
    },
    target_certifications: {
      type: "array",
      items: { type: "string" },
      description: "Target certifications to achieve",
    },
    timeline_months: {
      type: "number",
      description: "Desired timeline in months",
    },
  },
  required: ["organization_profile", "target_certifications", "timeline_months"],
};

// ============================================================================
// Export Zod Validators for Server-Side Validation
// ============================================================================

export const validateRouterInput = RouterZodSchema.parse;
export const validateGovernanceAssessInput = GovernanceAssessZodSchema.parse;
export const validateSectorComplianceInput = SectorComplianceZodSchema.parse;
export const validateDashboardInput = DashboardZodSchema.parse;
export const validateTrustScoreInput = TrustScoreZodSchema.parse;
export const validateLearningPathwayInput = LearningPathwayZodSchema.parse;
export const validateDataPipelineInput = DataPipelineZodSchema.parse;
export const validateMarketIntelligenceInput = MarketIntelligenceZodSchema.parse;
export const validateIncidentCommandInput = IncidentCommandZodSchema.parse;
export const validateCertificationBundleInput = CertificationBundleZodSchema.parse;
