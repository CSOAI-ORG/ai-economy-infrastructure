/**
 * governance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateGovernanceAssessInput } from "../schemas.js";
import {
  GovernanceAssessmentInput,
  GovernanceAssessmentOutput,
} from "../types.js";

/**
 * Unified AI governance assessment combining CSOAI governance + CASA certification
 * Provides risk classification, applicable crosswalks, CASA tier, compliance gaps, and pathways
 */
export async function handleAiGovernanceAssess(
  input: GovernanceAssessmentInput
): Promise<TextContent> {
  // Validate input
  const validated = validateGovernanceAssessInput(input);

  // Assess based on system description and deployment characteristics
  const assessment = await performGovernanceAssessment(validated);

  return {
    type: "text",
    text: JSON.stringify(assessment, null, 2),
  };
}

async function performGovernanceAssessment(
  input: GovernanceAssessmentInput
): Promise<GovernanceAssessmentOutput> {
  const description = input.ai_system_description.toLowerCase();

  // Determine risk classification based on system characteristics
  let riskClassification: "critical" | "high" | "medium" | "low" =
    "medium";

  if (
    description.includes("autonomous") ||
    description.includes("critical infrastructure") ||
    description.includes("military") ||
    description.includes("financial decision")
  ) {
    riskClassification = "critical";
  } else if (
    description.includes("high-stakes") ||
    description.includes("healthcare") ||
    description.includes("financial") ||
    description.includes("sensitive data")
  ) {
    riskClassification = "high";
  } else if (
    description.includes("low-risk") ||
    description.includes("recommendation")
  ) {
    riskClassification = "low";
  }

  // Determine CASA tier recommendation
  let casaTier: 1 | 2 | 3 | 4 | 5 = 3;
  if (riskClassification === "critical") {
    casaTier = 5;
  } else if (riskClassification === "high") {
    casaTier = 4;
  } else if (riskClassification === "low") {
    casaTier = 2;
  }

  // Identify applicable crosswalks based on sector and jurisdiction
  const applicableCrosswalks = generateApplicableCrosswalks(
    input.sector,
    input.jurisdiction
  );

  // Identify compliance gaps
  const complianceGaps = identifyComplianceGaps(
    riskClassification,
    input.sector,
    input.deployment_type
  );

  // Generate certification pathway
  const certificationPathway = generateCertificationPathway(
    casaTier,
    input.sector,
    input.jurisdiction
  );

  // Estimate timeline and cost
  const estimatedTimelineMonths = casaTier * 3 + complianceGaps.length;
  const estimatedCostUsd =
    casaTier * 25000 + complianceGaps.length * 10000;

  return {
    risk_classification: riskClassification,
    applicable_crosswalks: applicableCrosswalks,
    casa_tier_recommendation: casaTier,
    compliance_gaps: complianceGaps,
    certification_pathway: certificationPathway,
    estimated_timeline_months: estimatedTimelineMonths,
    estimated_cost_usd: estimatedCostUsd,
  };
}

function generateApplicableCrosswalks(
  sector: string,
  jurisdiction: string
): string[] {
  const crosswalks: Record<string, string[]> = {
    EU: [
      "AI Act",
      "GDPR-AI",
      "CEP",
      "Digital Services Act",
    ],
    US: ["Executive Order 14110", "NIST AI RMF", "SOX-AI"],
    UK: ["AI Bill of Rights", "AISI Framework"],
    CA: ["AIDA (proposed)", "Privacy Act"],
    AU: ["AI Ethics Principles"],
    default: ["OECD AI Principles", "ISO/IEC 42001"],
  };

  const sectorCrosswalks: Record<string, string[]> = {
    aihealthcare: ["FDA AI/ML", "HIPAA"],
    aifinance: ["SEC AI", "Basel III"],
    aidefence: ["NDIA Standards"],
    aienergy: ["NERC CIP"],
  };

  const jurisdictionCrosswalks = crosswalks[jurisdiction] || crosswalks.default;
  const sectorSpecific = sectorCrosswalks[sector] || [];

  return [...new Set([...jurisdictionCrosswalks, ...sectorSpecific])];
}

function identifyComplianceGaps(
  riskLevel: string,
  sector: string,
  deploymentType: string
): Array<{
  category: string;
  gap: string;
  severity: "critical" | "high" | "medium" | "low";
}> {
  const gaps: Array<{
    category: string;
    gap: string;
    severity: "critical" | "high" | "medium" | "low";
  }> = [];

  // Risk-based gaps
  if (riskLevel === "critical") {
    gaps.push({
      category: "Governance",
      gap: "Lack of AI oversight board",
      severity: "critical",
    });
    gaps.push({
      category: "Safety",
      gap: "No incident response plan",
      severity: "critical",
    });
    gaps.push({
      category: "Monitoring",
      gap: "Real-time monitoring not implemented",
      severity: "high",
    });
  }

  // Deployment-specific gaps
  if (deploymentType === "cloud") {
    gaps.push({
      category: "Security",
      gap: "Cloud security compliance",
      severity: "high",
    });
  } else if (deploymentType === "distributed") {
    gaps.push({
      category: "Coordination",
      gap: "Distributed governance framework",
      severity: "medium",
    });
  }

  // Sector-specific gaps
  if (sector === "aihealthcare") {
    gaps.push({
      category: "Clinical",
      gap: "Clinical validation documentation",
      severity: "critical",
    });
  } else if (sector === "aifinance") {
    gaps.push({
      category: "Regulatory",
      gap: "Financial regulatory alignment",
      severity: "high",
    });
  }

  // Add default gaps if none found
  if (gaps.length === 0) {
    gaps.push({
      category: "Documentation",
      gap: "AI system documentation completeness",
      severity: "medium",
    });
  }

  return gaps;
}

function generateCertificationPathway(
  casaTier: number,
  sector: string,
  jurisdiction: string
): string[] {
  const pathway: string[] = [];

  // Base pathway for all tiers
  pathway.push("CASA Foundational Assessment");

  // Tier-based pathway
  for (let i = 1; i <= casaTier; i++) {
    pathway.push(`CASA Tier ${i} Certification`);
  }

  // Add sector-specific certifications
  if (sector === "aihealthcare") {
    pathway.push("CSO Pharma-AI Certification");
  } else if (sector === "aidefence") {
    pathway.push("DAO Defence AI Certification");
  }

  // Add jurisdiction-specific certifications
  if (jurisdiction === "EU") {
    pathway.push("EU AI Act Compliance Certification");
  }

  // Add cross-cutting certifications
  pathway.push("CSGA Cybersecurity Certification");
  pathway.push("PQC Readiness Assessment");

  return pathway;
}
