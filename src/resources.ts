import {
  SPECIALIST_MCP_REGISTRY,
  CROSS_ECOSYSTEM_ROUTES,
} from "./ecosystem-registry.js";
import {
  EcosystemMap,
  TrustFramework,
  DataSchema,
} from "./types.js";

/**
 * Build ecosystem map resource
 */
export function buildEcosystemMap(): EcosystemMap {
  // Data integration points
  const dataIntegrationPoints = [
    {
      source: "csoai-governance",
      target: "oneos-mooc",
      data_type: "governance_assessments",
      frequency: "real-time",
    },
    {
      source: "casa-certification",
      target: "oneos-mooc",
      data_type: "certification_records",
      frequency: "daily",
    },
    {
      source: "bmcc-cyber",
      target: "oneos-mooc",
      data_type: "training_completions",
      frequency: "real-time",
    },
    {
      source: "kata-belts",
      target: "oneos-mooc",
      data_type: "belt_progressions",
      frequency: "daily",
    },
    {
      source: "csga-cybersecurity",
      target: "csoai-governance",
      data_type: "security_assessments",
      frequency: "weekly",
    },
    {
      source: "quantra-quantum",
      target: "csga-cybersecurity",
      data_type: "pqc_readiness_scores",
      frequency: "monthly",
    },
    {
      source: "proofof-verification",
      target: "csoai-governance",
      data_type: "verification_status",
      frequency: "real-time",
    },
    {
      source: "cso-pharma",
      target: "casa-certification",
      data_type: "compliance_gaps",
      frequency: "weekly",
    },
    {
      source: "dao-defence",
      target: "casa-certification",
      data_type: "compliance_gaps",
      frequency: "weekly",
    },
  ];

  return {
    total_servers: SPECIALIST_MCP_REGISTRY.length,
    specialist_servers: SPECIALIST_MCP_REGISTRY,
    cross_ecosystem_routes: CROSS_ECOSYSTEM_ROUTES,
    data_integration_points: dataIntegrationPoints,
  };
}

/**
 * Build trust framework resource
 */
export function buildTrustFramework(): TrustFramework {
  return {
    methodology:
      "Composite trust scoring across governance, security, quantum readiness, verification, and training dimensions. Each dimension weighted based on risk profile and sector requirements.",
    scoring_dimensions: [
      {
        dimension: "Governance Compliance",
        weight: 0.3,
        subcriteria: [
          "CASA tier alignment",
          "Risk classification accuracy",
          "Regulatory framework coverage",
          "Audit readiness",
        ],
      },
      {
        dimension: "Security Posture",
        weight: 0.25,
        subcriteria: [
          "Encryption standards",
          "Access controls",
          "Threat monitoring",
          "Incident response capability",
        ],
      },
      {
        dimension: "PQC Readiness",
        weight: 0.15,
        subcriteria: [
          "Quantum threat assessment completion",
          "Cryptographic inventory",
          "Migration roadmap status",
          "Post-quantum algorithm adoption",
        ],
      },
      {
        dimension: "Content Verification",
        weight: 0.15,
        subcriteria: [
          "PROOFOF verification status",
          "Authenticity validation",
          "Provenance tracking",
          "Tampering detection capability",
        ],
      },
      {
        dimension: "Training Completion",
        weight: 0.15,
        subcriteria: [
          "OneOS MOOC course completion",
          "K.A.T.A. belt progression",
          "CASA certification status",
          "Continuous learning engagement",
        ],
      },
    ],
    score_ranges: [
      {
        range: "0-20",
        risk_level: "Critical",
        interpretation:
          "Immediate action required. System poses significant risk. Governance, security, or training severely deficient.",
      },
      {
        range: "21-40",
        risk_level: "High",
        interpretation:
          "Urgent remediation needed. Multiple compliance gaps. Recommend engagement with CSOAI governance assessment.",
      },
      {
        range: "41-60",
        risk_level: "Medium",
        interpretation:
          "Notable gaps present. Recommend compliance roadmap development and phased improvement plan.",
      },
      {
        range: "61-80",
        risk_level: "Low",
        interpretation:
          "Generally compliant with minor gaps. Continue monitoring and quarterly assessments.",
      },
      {
        range: "81-100",
        risk_level: "Minimal",
        interpretation:
          "Strong trust posture across dimensions. Eligible for advanced certifications. Maintain continuous monitoring.",
      },
    ],
  };
}

/**
 * Build data schema resource
 */
export function buildDataSchema(): DataSchema {
  return {
    version: "1.0.0",
    collections: [
      {
        name: "governance_assessments",
        fields: [
          {
            name: "assessment_id",
            type: "string",
            required: true,
            description: "Unique assessment identifier",
          },
          {
            name: "organization_id",
            type: "string",
            required: true,
            description: "Organization being assessed",
          },
          {
            name: "risk_classification",
            type: "enum",
            required: true,
            description: "Risk level: critical, high, medium, low, minimal",
          },
          {
            name: "casa_tier",
            type: "integer",
            required: true,
            description: "CASA tier recommendation (1-5)",
          },
          {
            name: "compliance_score",
            type: "number",
            required: true,
            description: "Overall compliance score (0-100)",
          },
          {
            name: "assessment_date",
            type: "datetime",
            required: true,
            description: "Date of assessment",
          },
        ],
      },
      {
        name: "certifications",
        fields: [
          {
            name: "certification_id",
            type: "string",
            required: true,
            description: "Unique certification identifier",
          },
          {
            name: "organization_id",
            type: "string",
            required: true,
            description: "Certified organization",
          },
          {
            name: "certification_type",
            type: "string",
            required: true,
            description: "Type of certification (CASA, CSGA, K.A.T.A., etc.)",
          },
          {
            name: "tier_or_level",
            type: "string",
            required: false,
            description: "Tier or level if applicable",
          },
          {
            name: "issue_date",
            type: "datetime",
            required: true,
            description: "Date certification was issued",
          },
          {
            name: "expiry_date",
            type: "datetime",
            required: false,
            description: "Date certification expires",
          },
          {
            name: "status",
            type: "enum",
            required: true,
            description: "Current status: active, expired, suspended",
          },
        ],
      },
      {
        name: "security_assessments",
        fields: [
          {
            name: "assessment_id",
            type: "string",
            required: true,
            description: "Unique assessment identifier",
          },
          {
            name: "organization_id",
            type: "string",
            required: true,
            description: "Organization being assessed",
          },
          {
            name: "security_score",
            type: "number",
            required: true,
            description: "Security posture score (0-100)",
          },
          {
            name: "threats_identified",
            type: "integer",
            required: true,
            description: "Number of threats identified",
          },
          {
            name: "remediation_status",
            type: "enum",
            required: true,
            description: "Status: open, in_progress, resolved",
          },
          {
            name: "assessment_date",
            type: "datetime",
            required: true,
            description: "Date of assessment",
          },
        ],
      },
      {
        name: "learning_records",
        fields: [
          {
            name: "learner_id",
            type: "string",
            required: true,
            description: "Unique learner identifier",
          },
          {
            name: "course_id",
            type: "string",
            required: true,
            description: "Course identifier",
          },
          {
            name: "enrollment_date",
            type: "datetime",
            required: true,
            description: "Date enrolled",
          },
          {
            name: "completion_date",
            type: "datetime",
            required: false,
            description: "Date completed",
          },
          {
            name: "progress_percentage",
            type: "number",
            required: true,
            description: "Current progress (0-100)",
          },
          {
            name: "assessment_score",
            type: "number",
            required: false,
            description: "Assessment/test score if completed",
          },
          {
            name: "status",
            type: "enum",
            required: true,
            description: "Current status: enrolled, in_progress, completed",
          },
        ],
      },
      {
        name: "belt_progressions",
        fields: [
          {
            name: "learner_id",
            type: "string",
            required: true,
            description: "Unique learner identifier",
          },
          {
            name: "current_belt",
            type: "string",
            required: true,
            description: "Current belt level (white, yellow, orange, etc.)",
          },
          {
            name: "belt_award_date",
            type: "datetime",
            required: true,
            description: "Date belt was awarded",
          },
          {
            name: "next_belt_target",
            type: "string",
            required: false,
            description: "Target next belt level",
          },
          {
            name: "progress_to_next",
            type: "number",
            required: true,
            description: "Progress toward next belt (0-100)",
          },
          {
            name: "skills_validated",
            type: "array",
            required: true,
            description: "List of validated skills",
          },
        ],
      },
    ],
    mooc_integration: {
      enrollment_schema: {
        learner_id: "string (uuid)",
        course_id: "string",
        enrollment_date: "datetime (ISO 8601)",
        organization_id: "string",
        auto_enroll: "boolean",
        tracking_enabled: "boolean",
        completion_deadline_days: "integer",
      },
      progress_tracking_schema: {
        learner_id: "string",
        course_id: "string",
        module_id: "string",
        progress_percentage: "number (0-100)",
        time_spent_hours: "number",
        last_accessed: "datetime",
        assessment_attempts: "integer",
        assessment_score: "number",
      },
      assessment_schema: {
        assessment_id: "string",
        learner_id: "string",
        course_id: "string",
        assessment_type: "enum (quiz, project, exam, practical)",
        score: "number",
        max_score: "number",
        passed: "boolean",
        attempted_date: "datetime",
        passed_date: "datetime",
      },
    },
  };
}
