/**
 * compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateSectorComplianceInput } from "../schemas.js";
import {
  SectorComplianceInput,
  SectorComplianceOutput,
} from "../types.js";

/**
 * Sector-branded compliance packages pulling from relevant crosswalks, standards, and certifications
 */
export async function handleAiSectorCompliance(
  input: SectorComplianceInput
): Promise<TextContent> {
  // Validate input
  const validated = validateSectorComplianceInput(input);

  // Generate sector-specific compliance package
  const compliancePackage = generateSectorCompliancePackage(validated);

  return {
    type: "text",
    text: JSON.stringify(compliancePackage, null, 2),
  };
}

function generateSectorCompliancePackage(
  input: SectorComplianceInput
): SectorComplianceOutput {
  const requiredStandards = getRequiredStandards(input.sector, input.jurisdiction);
  const applicableCertifications = getApplicableCertifications(
    input.sector,
    input.organization_size
  );
  const sectorRequirements = getSectorSpecificRequirements(
    input.sector,
    input.jurisdiction
  );
  const roadmap = generateComplianceRoadmap(
    input.sector,
    requiredStandards,
    applicableCertifications,
    input.organization_size
  );

  return {
    sector: input.sector,
    compliance_bundle_id: generateBundleId(),
    required_standards: requiredStandards,
    applicable_certifications: applicableCertifications,
    sector_specific_requirements: sectorRequirements,
    recommended_roadmap: roadmap,
  };
}

function getRequiredStandards(
  sector: string,
  jurisdiction: string
): Array<{
  name: string;
  framework: string;
  priority: "critical" | "high" | "medium";
}> {
  const baseStandards: Array<{
    name: string;
    framework: string;
    priority: "critical" | "high" | "medium";
  }> = [
    { name: "ISO/IEC 42001", framework: "AI Management System", priority: "critical" },
    { name: "ISO/IEC 23894", framework: "AI Risk Management", priority: "critical" },
  ];

  const sectorStandards: Record<string, Array<{
    name: string;
    framework: string;
    priority: "critical" | "high" | "medium";
  }>> = {
    aifinance: [
      { name: "Basel III AI", framework: "Financial Stability", priority: "critical" },
      { name: "SEC AI Rules", framework: "Securities", priority: "high" },
    ],
    aihealthcare: [
      { name: "FDA AI/ML", framework: "Medical Device", priority: "critical" },
      { name: "HIPAA", framework: "Privacy", priority: "critical" },
    ],
    aidefence: [
      { name: "NDIA AI Standards", framework: "Defence", priority: "critical" },
      { name: "ICD 8580.1", framework: "DoD AI", priority: "high" },
    ],
    aienergy: [
      { name: "NERC CIP", framework: "Critical Infrastructure", priority: "critical" },
      { name: "IEC 62645", framework: "Nuclear", priority: "high" },
    ],
  };

  const jurisdictionStandards: Record<string, Array<{
    name: string;
    framework: string;
    priority: "critical" | "high" | "medium";
  }>> = {
    EU: [
      { name: "AI Act", framework: "Regulatory", priority: "critical" },
      { name: "GDPR", framework: "Data Protection", priority: "critical" },
    ],
    US: [
      { name: "Executive Order 14110", framework: "Policy", priority: "high" },
      { name: "NIST AI RMF", framework: "Framework", priority: "high" },
    ],
  };

  const standards = [...baseStandards];

  if (sectorStandards[sector]) {
    standards.push(...sectorStandards[sector]);
  }

  if (jurisdictionStandards[jurisdiction]) {
    standards.push(...jurisdictionStandards[jurisdiction]);
  }

  return standards;
}

function getApplicableCertifications(
  sector: string,
  organizationSize: string
): Array<{
  name: string;
  issuer: string;
  timeline_months: number;
  cost_usd: number;
}> {
  const baseCertifications = [
    {
      name: "CASA Foundation",
      issuer: "CASA",
      timeline_months: 3,
      cost_usd: 15000,
    },
  ];

  const sectorCertifications: Record<string, Array<{
    name: string;
    issuer: string;
    timeline_months: number;
    cost_usd: number;
  }>> = {
    aihealthcare: [
      {
        name: "CSO Pharma-AI",
        issuer: "CSO",
        timeline_months: 6,
        cost_usd: 35000,
      },
    ],
    aidefence: [
      {
        name: "DAO Defence AI",
        issuer: "DAO",
        timeline_months: 9,
        cost_usd: 50000,
      },
    ],
    aifinance: [
      {
        name: "CASA Financial Tier",
        issuer: "CASA",
        timeline_months: 4,
        cost_usd: 25000,
      },
    ],
  };

  const certs = [...baseCertifications];

  if (sectorCertifications[sector]) {
    certs.push(...sectorCertifications[sector]);
  }

  // Add CSGA for medium and larger orgs
  if (organizationSize !== "startup") {
    certs.push({
      name: "CSGA Cybersecurity",
      issuer: "CSGA",
      timeline_months: 3,
      cost_usd: 20000,
    });
  }

  // Add PQC for larger organizations
  if (organizationSize === "large" || organizationSize === "enterprise") {
    certs.push({
      name: "PQC Readiness",
      issuer: "QuantraNet",
      timeline_months: 2,
      cost_usd: 12000,
    });
  }

  return certs;
}

function getSectorSpecificRequirements(
  sector: string,
  jurisdiction: string
): Array<{
  requirement: string;
  source: string;
  deadline?: string;
}> {
  const sectorReqs: Record<string, Array<{
    requirement: string;
    source: string;
    deadline?: string;
  }>> = {
    aihealthcare: [
      {
        requirement: "Clinical validation documentation",
        source: "FDA AI/ML",
        deadline: "Before deployment",
      },
      {
        requirement: "Patient data consent management",
        source: "HIPAA",
      },
      {
        requirement: "Adverse event reporting",
        source: "FDA MedWatch",
        deadline: "30 days from event",
      },
    ],
    aifinance: [
      {
        requirement: "Model risk governance",
        source: "OCC SR 11-7",
      },
      {
        requirement: "Explainability for credit decisions",
        source: "FCRA",
      },
      {
        requirement: "Fair lending impact assessment",
        source: "ECOA",
      },
    ],
    aidefence: [
      {
        requirement: "Security clearance for operators",
        source: "DoD",
      },
      {
        requirement: "Autonomous system validation",
        source: "NDIA",
      },
      {
        requirement: "Rules of engagement documentation",
        source: "Military Protocol",
      },
    ],
  };

  const jurisdictionReqs: Record<string, Array<{
    requirement: string;
    source: string;
    deadline?: string;
  }>> = {
    EU: [
      {
        requirement: "High-risk AI assessment",
        source: "AI Act",
        deadline: "Before deployment",
      },
      {
        requirement: "Fundamental rights impact assessment",
        source: "AI Act",
      },
      {
        requirement: "Conformity assessment",
        source: "AI Act",
      },
    ],
  };

  let requirements: Array<{
    requirement: string;
    source: string;
    deadline?: string;
  }> = [];

  if (sectorReqs[sector]) {
    requirements.push(...sectorReqs[sector]);
  }

  if (jurisdictionReqs[jurisdiction]) {
    requirements.push(...jurisdictionReqs[jurisdiction]);
  }

  if (requirements.length === 0) {
    requirements = [
      {
        requirement: "AI system documentation",
        source: "ISO/IEC 42001",
      },
      {
        requirement: "Risk assessment completion",
        source: "ISO/IEC 23894",
      },
    ];
  }

  return requirements;
}

function generateComplianceRoadmap(
  _sector: string,
  standards: Array<{
    name: string;
    framework: string;
    priority: "critical" | "high" | "medium";
  }>,
  certifications: Array<{
    name: string;
    issuer: string;
    timeline_months: number;
    cost_usd: number;
  }>,
  organizationSize: string
): Array<{
  phase: number;
  focus: string;
  duration_months: number;
  estimated_cost_usd: number;
}> {
  const phases: Array<{
    phase: number;
    focus: string;
    duration_months: number;
    estimated_cost_usd: number;
  }> = [
    {
      phase: 1,
      focus: "Assessment & Gap Analysis",
      duration_months: 1,
      estimated_cost_usd: 10000,
    },
    {
      phase: 2,
      focus: `Implement ${standards.length} required standards`,
      duration_months: 3,
      estimated_cost_usd: 30000,
    },
    {
      phase: 3,
      focus: `Pursue ${Math.min(2, certifications.length)} core certifications`,
      duration_months: 4,
      estimated_cost_usd: 40000,
    },
    {
      phase: 4,
      focus: "Continuous Monitoring & Improvement",
      duration_months: 2,
      estimated_cost_usd: 15000,
    },
  ];

  if (organizationSize === "large" || organizationSize === "enterprise") {
    phases.push({
      phase: 5,
      focus: "Advanced certifications & quantum readiness",
      duration_months: 3,
      estimated_cost_usd: 25000,
    });
  }

  return phases;
}

function generateBundleId(): string {
  return `BUNDLE-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
}
