import { SpecialistMCPRegistry, Sector } from "./types.js";

/**
 * Registry of all 10 specialist MCP servers in the CSOAI ecosystem
 * This is the authoritative source for ecosystem topology and capabilities
 */
export const SPECIALIST_MCP_REGISTRY: SpecialistMCPRegistry[] = [
  {
    id: "csoai-governance",
    name: "CSOAI Governance Framework MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3001",
    capabilities: [
      "risk_assessment",
      "crosswalk_mapping",
      "governance_evaluation",
      "framework_comparison",
    ],
    sectors: [
      "aigovernance",
      "aifinance",
      "aiinsurance",
      "aihealthcare",
      "aidefence",
      "aieducation",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "Core AI governance framework assessment, risk classification, and regulatory crosswalk mapping",
  },
  {
    id: "casa-certification",
    name: "CASA Certification Framework MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3002",
    capabilities: [
      "tier_assessment",
      "certification_pathway",
      "audit_support",
      "compliance_verification",
    ],
    sectors: [
      "aigovernance",
      "aifinance",
      "aiinsurance",
      "aihealthcare",
      "aidefence",
      "aieducation",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "CASA tier assessment, certification pathways, audit support, and compliance verification",
  },
  {
    id: "csga-cybersecurity",
    name: "CSGA Cybersecurity Alliance MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3003",
    capabilities: [
      "security_assessment",
      "incident_response",
      "threat_analysis",
      "security_training",
    ],
    sectors: [
      "aifinance",
      "aiinsurance",
      "aihealthcare",
      "aidefence",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "Cybersecurity assessment, threat analysis, incident response, and security training",
  },
  {
    id: "quantra-quantum",
    name: "QuantraNet Quantum Security MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3004",
    capabilities: [
      "pqc_readiness",
      "quantum_threat_assessment",
      "migration_planning",
      "post_quantum_validation",
    ],
    sectors: [
      "aifinance",
      "aidefence",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "Post-quantum cryptography readiness assessment and quantum threat mitigation",
  },
  {
    id: "proofof-verification",
    name: "PROOFOF Content Verification MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3005",
    capabilities: [
      "content_verification",
      "authenticity_check",
      "tampering_detection",
      "provenance_tracking",
    ],
    sectors: [
      "aigovernance",
      "aifinance",
      "aiinsurance",
      "aieducation",
    ],
    description:
      "Content verification, authenticity checking, and tampering detection",
  },
  {
    id: "bmcc-cyber",
    name: "BMCC Cyber Training MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3006",
    capabilities: [
      "training_delivery",
      "skill_assessment",
      "certification_training",
      "progress_tracking",
    ],
    sectors: [
      "aigovernance",
      "aifinance",
      "aiinsurance",
      "aihealthcare",
      "aidefence",
      "aieducation",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "Cybersecurity and AI governance training delivery and certification preparation",
  },
  {
    id: "oneos-mooc",
    name: "OneOS MOOC Platform MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3007",
    capabilities: [
      "course_management",
      "enrollment_tracking",
      "assessment_delivery",
      "certification_issuing",
    ],
    sectors: [
      "aigovernance",
      "aifinance",
      "aiinsurance",
      "aihealthcare",
      "aidefence",
      "aieducation",
      "aimanufacturing",
      "aienergy",
    ],
    description:
      "Unified MOOC platform for education, enrollment, and cross-certification tracking",
  },
  {
    id: "kata-belts",
    name: "K.A.T.A. Belt System MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3008",
    capabilities: [
      "belt_progression",
      "skills_validation",
      "mastery_assessment",
      "mentorship_matching",
    ],
    sectors: [
      "aigovernance",
      "aieducation",
    ],
    description:
      "K.A.T.A. belt system for skills progression, validation, and mentorship",
  },
  {
    id: "cso-pharma",
    name: "CSO Pharma-AI MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3009",
    capabilities: [
      "pharma_compliance",
      "clinical_ai_assessment",
      "regulatory_mapping",
      "evidence_evaluation",
    ],
    sectors: ["aihealthcare"],
    description:
      "Specialized pharma and healthcare AI compliance, clinical validation, and regulatory alignment",
  },
  {
    id: "dao-defence",
    name: "DAO Defence AI MCP",
    version: "1.0.0",
    endpoint: "http://localhost:3010",
    capabilities: [
      "defence_compliance",
      "military_ai_assessment",
      "security_clearance_support",
      "autonomous_systems_evaluation",
    ],
    sectors: ["aidefence"],
    description:
      "Defence-specific AI compliance, military AI assessment, and autonomous systems evaluation",
  },
];

/**
 * Get registry entry by ID
 */
export function getSpecialistMCP(id: string): SpecialistMCPRegistry | undefined {
  return SPECIALIST_MCP_REGISTRY.find((mcp) => mcp.id === id);
}

/**
 * Get all MCPs that support a given sector
 */
export function getMCPsForSector(sector: Sector): SpecialistMCPRegistry[] {
  return SPECIALIST_MCP_REGISTRY.filter((mcp) => mcp.sectors.includes(sector));
}

/**
 * Get all MCPs with a specific capability
 */
export function getMCPsWithCapability(
  capability: string
): SpecialistMCPRegistry[] {
  return SPECIALIST_MCP_REGISTRY.filter((mcp) =>
    mcp.capabilities.includes(capability)
  );
}

/**
 * Get recommended routing path for a query
 * Uses intelligent matching based on keywords and context
 */
export function getRoutingPath(
  query: string,
  sector?: Sector
): string[] {
  const queryLower = query.toLowerCase();
  const routingPath: Set<string> = new Set();

  // Keyword-based routing
  const routingMap: Record<string, string[]> = {
    governance: ["csoai-governance", "casa-certification"],
    certification: ["casa-certification", "bmcc-cyber", "kata-belts"],
    security: ["csga-cybersecurity", "quantra-quantum"],
    cybersecurity: ["csga-cybersecurity"],
    quantum: ["quantra-quantum"],
    pqc: ["quantra-quantum"],
    crypto: ["quantra-quantum"],
    verification: ["proofof-verification"],
    authenticity: ["proofof-verification"],
    training: ["bmcc-cyber", "oneos-mooc"],
    education: ["oneos-mooc", "bmcc-cyber", "kata-belts"],
    mooc: ["oneos-mooc"],
    learning: ["oneos-mooc", "kata-belts"],
    pharma: ["cso-pharma"],
    healthcare: ["cso-pharma"],
    defence: ["dao-defence"],
    military: ["dao-defence"],
    incident: ["csga-cybersecurity", "csoai-governance"],
    compliance: ["csoai-governance", "casa-certification", "cso-pharma"],
    assessment: ["csoai-governance", "casa-certification"],
  };

  // Add routes based on keywords
  Object.entries(routingMap).forEach(([keyword, mcps]) => {
    if (queryLower.includes(keyword)) {
      mcps.forEach((mcp) => routingPath.add(mcp));
    }
  });

  // Add sector-specific routes
  if (sector) {
    getMCPsForSector(sector).forEach((mcp) => {
      routingPath.add(mcp.id);
    });
  }

  // Default to governance if no specific match
  if (routingPath.size === 0) {
    routingPath.add("csoai-governance");
  }

  return Array.from(routingPath);
}

/**
 * Get cross-ecosystem integration points
 */
export const CROSS_ECOSYSTEM_ROUTES: Record<string, string[]> = {
  "csoai-governance": [
    "casa-certification",
    "csga-cybersecurity",
    "cso-pharma",
    "dao-defence",
  ],
  "casa-certification": [
    "csoai-governance",
    "bmcc-cyber",
    "oneos-mooc",
    "kata-belts",
  ],
  "csga-cybersecurity": [
    "csoai-governance",
    "quantra-quantum",
    "proofof-verification",
  ],
  "quantra-quantum": ["csga-cybersecurity", "proofof-verification"],
  "proofof-verification": [
    "csoai-governance",
    "csga-cybersecurity",
    "oneos-mooc",
  ],
  "bmcc-cyber": ["casa-certification", "oneos-mooc", "kata-belts"],
  "oneos-mooc": [
    "casa-certification",
    "bmcc-cyber",
    "kata-belts",
    "proofof-verification",
  ],
  "kata-belts": ["bmcc-cyber", "oneos-mooc", "casa-certification"],
  "cso-pharma": ["csoai-governance", "csga-cybersecurity"],
  "dao-defence": ["csoai-governance", "csga-cybersecurity", "quantra-quantum"],
};
