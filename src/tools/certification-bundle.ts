/**
 * certification-bundle.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateCertificationBundleInput } from "../schemas.js";
import {
  CertificationBundleInput,
  CertificationBundleOutput,
} from "../types.js";

/**
 * Multi-certification pathway across ecosystem
 * Bundles CASA, CSR5, K.A.T.A., and PQC certifications
 */
export async function handleAiCertificationBundle(
  input: CertificationBundleInput
): Promise<TextContent> {
  // Validate input
  const validated = validateCertificationBundleInput(input);

  // Generate certification bundle
  const bundle = generateCertificationBundle(validated);

  return {
    type: "text",
    text: JSON.stringify(bundle, null, 2),
  };
}

function generateCertificationBundle(
  input: CertificationBundleInput
): CertificationBundleOutput {
  const bundleId = generateBundleId();

  // Build certification list based on organization profile
  const certifications = buildCertificationList(
    input.organization_profile,
    input.target_certifications
  );

  // Build critical path for execution
  const criticalPath = buildCriticalPath(
    certifications,
    input.timeline_months
  );

  // Calculate unified timeline
  const unifiedTimeline = calculateUnifiedTimeline(criticalPath);

  // Single point of contact
  const singlePointOfContact = {
    role: "Certification Program Manager",
    responsibilities: [
      "Coordinate across all certification providers",
      "Track progress and milestones",
      "Manage compliance documentation",
      "Handle escalations and exceptions",
      "Provide quarterly business reviews",
      "Manage vendor relationships and contracts",
    ],
  };

  // Combined pricing with bundle discount
  const combinedPricing = calculateCombinedPricing(
    certifications,
    input.organization_profile.size
  );

  return {
    bundle_id: bundleId,
    organization_name: input.organization_profile.name,
    certifications,
    unified_timeline_months: unifiedTimeline,
    critical_path: criticalPath,
    single_point_of_contact: singlePointOfContact,
    combined_pricing: combinedPricing,
  };
}

function buildCertificationList(
  orgProfile: {
    name: string;
    sector: string;
    size: string;
    jurisdiction: string;
  },
  _targetCertifications: string[]
): Array<{
  name: string;
  issuer: string;
  tier?: number;
  duration_months: number;
  cost_usd: number;
  prerequisites: string[];
  dependencies: string[];
}> {
  const certifications: Array<{
    name: string;
    issuer: string;
    tier?: number;
    duration_months: number;
    cost_usd: number;
    prerequisites: string[];
    dependencies: string[];
  }> = [];

  // Always include CASA Foundation as baseline
  certifications.push({
    name: "CASA Tier 1: Foundational",
    issuer: "CASA",
    tier: 1,
    duration_months: 3,
    cost_usd: 15000,
    prerequisites: [],
    dependencies: [],
  });

  // Determine CASA tier progression
  const casaTiers = determineCasaTiers(orgProfile.sector, orgProfile.size);
  for (let tier of casaTiers) {
    if (tier > 1) {
      certifications.push({
        name: `CASA Tier ${tier}: Advanced`,
        issuer: "CASA",
        tier,
        duration_months: 4,
        cost_usd: 20000,
        prerequisites: [`CASA Tier ${tier - 1}`],
        dependencies: [`CASA Tier ${tier - 1}`],
      });
    }
  }

  // Add sector-specific certifications
  if (orgProfile.sector === "aihealthcare") {
    certifications.push({
      name: "CSO Pharma-AI Specialist",
      issuer: "CSO",
      duration_months: 6,
      cost_usd: 35000,
      prerequisites: ["CASA Tier 1"],
      dependencies: ["CASA Tier 1"],
    });
  } else if (orgProfile.sector === "aidefence") {
    certifications.push({
      name: "DAO Defence AI Specialist",
      issuer: "DAO",
      duration_months: 8,
      cost_usd: 45000,
      prerequisites: ["CASA Tier 2"],
      dependencies: ["CASA Tier 2"],
    });
  }

  // Add K.A.T.A. belt certifications
  if (
    orgProfile.size === "large" ||
    orgProfile.size === "enterprise"
  ) {
    certifications.push({
      name: "K.A.T.A. Yellow Belt",
      issuer: "K.A.T.A.",
      duration_months: 2,
      cost_usd: 8000,
      prerequisites: ["CASA Tier 1"],
      dependencies: [],
    });

    certifications.push({
      name: "K.A.T.A. Orange Belt",
      issuer: "K.A.T.A.",
      duration_months: 3,
      cost_usd: 12000,
      prerequisites: ["K.A.T.A. Yellow Belt"],
      dependencies: ["K.A.T.A. Yellow Belt"],
    });
  }

  // Add PQC assessment for tech-heavy sectors
  if (
    orgProfile.sector !== "aieducation" &&
    orgProfile.size !== "startup"
  ) {
    certifications.push({
      name: "QuantraNet PQC Readiness",
      issuer: "QuantraNet",
      duration_months: 2,
      cost_usd: 12000,
      prerequisites: ["CASA Tier 1"],
      dependencies: [],
    });
  }

  // Add CSGA cybersecurity for larger organizations
  if (
    orgProfile.size === "large" ||
    orgProfile.size === "enterprise"
  ) {
    certifications.push({
      name: "CSGA Level 2: Advanced Security",
      issuer: "CSGA",
      duration_months: 3,
      cost_usd: 25000,
      prerequisites: ["CASA Tier 2"],
      dependencies: [],
    });
  }

  return certifications;
}

function determineCasaTiers(sector: string, size: string): number[] {
  let maxTier = 2; // Default

  if (
    sector === "aifinance" ||
    sector === "aihealthcare" ||
    sector === "aidefence"
  ) {
    maxTier = 4;
  } else if (sector === "aiinsurance" || sector === "aienergy") {
    maxTier = 3;
  }

  if (size === "enterprise") {
    maxTier = Math.max(maxTier, 4);
  } else if (size === "large") {
    maxTier = Math.max(maxTier, 3);
  } else if (size === "startup") {
    maxTier = Math.min(maxTier, 2);
  }

  return Array.from({ length: maxTier }, (_, i) => i + 1);
}

function buildCriticalPath(
  certifications: Array<{
    name: string;
    issuer: string;
    duration_months: number;
    prerequisites: string[];
    dependencies: string[];
  }>,
  _desiredTimelineMonths: number
): Array<{
  phase: number;
  certifications: string[];
  duration_months: number;
  dependencies: string[];
}> {
  const phases: Array<{
    phase: number;
    certifications: string[];
    duration_months: number;
    dependencies: string[];
  }> = [];

  // Phase 1: Foundation
  phases.push({
    phase: 1,
    certifications: [
      certifications.find((c) => c.name.includes("CASA Tier 1"))?.name || "",
    ].filter(Boolean),
    duration_months: 3,
    dependencies: [],
  });

  // Phase 2: Parallel advancement
  const phase2Certs = certifications
    .filter(
      (c) =>
        c.name.includes("CASA Tier 2") ||
        c.name.includes("PQC") ||
        c.name.includes("Yellow Belt")
    )
    .map((c) => c.name);

  if (phase2Certs.length > 0) {
    phases.push({
      phase: 2,
      certifications: phase2Certs,
      duration_months: 3,
      dependencies: ["CASA Tier 1"],
    });
  }

  // Phase 3: Specialization and advanced
  const phase3Certs = certifications
    .filter(
      (c) =>
        c.name.includes("CASA Tier 3") ||
        c.name.includes("Specialist") ||
        c.name.includes("Orange Belt") ||
        c.name.includes("Advanced Security")
    )
    .map((c) => c.name);

  if (phase3Certs.length > 0) {
    phases.push({
      phase: 3,
      certifications: phase3Certs,
      duration_months: 4,
      dependencies: ["Phase 2"],
    });
  }

  // Phase 4: Enterprise and highest tier
  const phase4Certs = certifications
    .filter((c) => c.name.includes("CASA Tier 4"))
    .map((c) => c.name);

  if (phase4Certs.length > 0) {
    phases.push({
      phase: 4,
      certifications: phase4Certs,
      duration_months: 4,
      dependencies: ["Phase 3"],
    });
  }

  return phases;
}

function calculateUnifiedTimeline(
  criticalPath: Array<{ duration_months: number }>
): number {
  return criticalPath.reduce((sum, phase) => sum + phase.duration_months, 0);
}

function calculateCombinedPricing(
  certifications: Array<{
    cost_usd: number;
  }>,
  organizationSize: string
): {
  total_usd: number;
  bundle_discount_percentage: number;
  payment_terms: string;
} {
  const subtotal = certifications.reduce((sum, cert) => sum + cert.cost_usd, 0);

  // Apply bundle discount based on org size
  let discountPercentage = 10; // Base 10% discount
  if (organizationSize === "enterprise") {
    discountPercentage = 20;
  } else if (organizationSize === "large") {
    discountPercentage = 15;
  }

  const total = Math.round(subtotal * (1 - discountPercentage / 100));

  // Payment terms based on total
  let paymentTerms = "Monthly installments (12 months)";
  if (total < 50000) {
    paymentTerms = "Net 30 (single payment)";
  } else if (total < 100000) {
    paymentTerms = "Quarterly installments (4 payments)";
  }

  return {
    total_usd: total,
    bundle_discount_percentage: discountPercentage,
    payment_terms: paymentTerms,
  };
}

function generateBundleId(): string {
  return `BUNDLE-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
}
