/**
 * trust-score.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateTrustScoreInput } from "../schemas.js";
import { TrustScoreInput, TrustScoreOutput } from "../types.js";

/**
 * Unified AI trust scoring combining all ecosystem signals
 * Composite score from governance compliance, security, PQC readiness, verification, and training
 */
export async function handleAiTrustScore(
  input: TrustScoreInput
): Promise<TextContent> {
  // Validate input
  const validated = validateTrustScoreInput(input);

  // Calculate trust score
  const trustScore = calculateCompositeTrustScore(validated);

  return {
    type: "text",
    text: JSON.stringify(trustScore, null, 2),
  };
}

function calculateCompositeTrustScore(
  input: TrustScoreInput
): TrustScoreOutput {
  // Calculate individual dimensions
  const governanceScore = calculateGovernanceCompliance(
    input.ai_system_name,
    input.deployment_context
  );
  const securityScore = calculateSecurityPosture(input.deployment_context);
  const pqcScore = calculatePQCReadiness(input.deployment_context);
  const verificationStatus = assessVerificationStatus(input.ai_system_name);
  const trainingCompletion = calculateTrainingCompletion(input.organization);

  // Calculate composite score with weighted components
  const compositeTrustScore = Math.round(
    governanceScore * 0.3 +
      securityScore * 0.25 +
      pqcScore * 0.15 +
      (verificationStatus === "verified"
        ? 20
        : verificationStatus === "pending"
          ? 10
          : 0) +
      trainingCompletion * 0.1
  );

  // Identify risk flags
  const riskFlags = identifyRiskFlags(
    governanceScore,
    securityScore,
    pqcScore,
    verificationStatus,
    trainingCompletion
  );

  // Generate recommendations
  const recommendations = generateTrustRecommendations(
    compositeTrustScore,
    governanceScore,
    securityScore,
    pqcScore,
    trainingCompletion
  );

  const scoreBreakdown: Record<string, number> = {
    governance_compliance: governanceScore,
    security_posture: securityScore,
    pqc_readiness: pqcScore,
    training_completion: trainingCompletion,
    verification_bonus:
      verificationStatus === "verified"
        ? 20
        : verificationStatus === "pending"
          ? 10
          : 0,
  };

  return {
    system_name: input.ai_system_name,
    composite_trust_score: Math.min(100, compositeTrustScore),
    governance_compliance_score: governanceScore,
    security_posture_score: securityScore,
    pqc_readiness_score: pqcScore,
    content_verification_status: verificationStatus,
    training_completion_percentage: trainingCompletion,
    score_breakdown: scoreBreakdown,
    risk_flags: riskFlags,
    recommendations: recommendations,
  };
}

function calculateGovernanceCompliance(
  _systemName: string,
  deploymentContext: string
): number {
  let score = 50; // Baseline

  const context = deploymentContext.toLowerCase();

  // Check for governance indicators
  if (context.includes("casa") || context.includes("certified")) {
    score += 20;
  }

  if (
    context.includes("risk assessment") ||
    context.includes("governance framework")
  ) {
    score += 15;
  }

  if (context.includes("audit") || context.includes("compliance")) {
    score += 10;
  }

  if (context.includes("oversight") || context.includes("board")) {
    score += 5;
  }

  return Math.min(100, score);
}

function calculateSecurityPosture(deploymentContext: string): number {
  let score = 40; // Baseline

  const context = deploymentContext.toLowerCase();

  // Check for security indicators
  if (context.includes("encrypted") || context.includes("encryption")) {
    score += 20;
  }

  if (context.includes("firewall") || context.includes("access control")) {
    score += 15;
  }

  if (context.includes("monitoring") || context.includes("detection")) {
    score += 15;
  }

  if (context.includes("incident response")) {
    score += 10;
  }

  if (context.includes("penetration test")) {
    score += 10;
  }

  if (context.includes("zero trust")) {
    score += 10;
  }

  return Math.min(100, score);
}

function calculatePQCReadiness(deploymentContext: string): number {
  let score = 20; // Baseline (most systems not PQC-ready)

  const context = deploymentContext.toLowerCase();

  // Check for quantum indicators
  if (context.includes("pqc") || context.includes("post-quantum")) {
    score += 40;
  }

  if (context.includes("quantum") && context.includes("assessment")) {
    score += 20;
  }

  if (context.includes("crypto") && context.includes("migration")) {
    score += 15;
  }

  if (context.includes("quantranet")) {
    score += 25;
  }

  return Math.min(100, score);
}

function assessVerificationStatus(
  systemName: string
): "verified" | "pending" | "unverified" {
  const name = systemName.toLowerCase();

  if (name.includes("verified") || name.includes("proofof")) {
    return "verified";
  } else if (name.includes("pending") || name.includes("in review")) {
    return "pending";
  }

  return "unverified";
}

function calculateTrainingCompletion(organization: string): number {
  // Simulated based on organization name patterns
  const name = organization.toLowerCase();

  let score = 30; // Baseline

  if (name.includes("oneos") || name.includes("mooc")) {
    score += 40;
  }

  if (name.includes("kata") || name.includes("belt")) {
    score += 30;
  }

  if (name.includes("training") || name.includes("certified")) {
    score += 20;
  }

  return Math.min(100, score);
}

function identifyRiskFlags(
  govScore: number,
  secScore: number,
  pqcScore: number,
  verStatus: "verified" | "pending" | "unverified",
  trainScore: number
): string[] {
  const flags: string[] = [];

  if (govScore < 40) {
    flags.push(
      "Governance compliance below threshold - requires immediate CASA assessment"
    );
  }

  if (secScore < 40) {
    flags.push(
      "Security posture critical - conduct CSGA cybersecurity assessment"
    );
  }

  if (pqcScore < 30) {
    flags.push("No quantum readiness - initiate QuantraNet PQC assessment");
  }

  if (verStatus === "unverified") {
    flags.push(
      "System not verified - engage PROOFOF content verification service"
    );
  }

  if (trainScore < 40) {
    flags.push(
      "Training completion insufficient - enroll in OneOS MOOC foundational courses"
    );
  }

  if (flags.length === 0) {
    flags.push("All trust dimensions within acceptable ranges");
  }

  return flags;
}

function generateTrustRecommendations(
  compositeScore: number,
  _govScore: number,
  secScore: number,
  pqcScore: number,
  trainScore: number
): string[] {
  const recommendations: string[] = [];

  if (compositeScore < 50) {
    recommendations.push(
      "URGENT: Comprehensive AI governance assessment required before deployment"
    );
  } else if (compositeScore < 70) {
    recommendations.push(
      "Schedule CASA certification pathway to improve governance score"
    );
  }

  if (secScore < 50) {
    recommendations.push("Engage CSGA for immediate security hardening plan");
  } else if (secScore < 75) {
    recommendations.push("Schedule regular security assessments and updates");
  }

  if (pqcScore < 50) {
    recommendations.push(
      "Initiate quantum threat assessment and PQC migration roadmap"
    );
  }

  if (trainScore < 60) {
    recommendations.push("Enroll core team in CASA and CSGA certification courses");
  }

  if (compositeScore >= 80) {
    recommendations.push(
      "System meets trust threshold - continue quarterly assessments"
    );
    recommendations.push(
      "Consider advanced certifications for increased maturity"
    );
  }

  return recommendations;
}
