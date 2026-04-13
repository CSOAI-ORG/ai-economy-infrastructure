/**
 * router.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import {
  getRoutingPath,
  SPECIALIST_MCP_REGISTRY,
} from "../ecosystem-registry.js";
import { validateRouterInput } from "../schemas.js";
import { Sector } from "../types.js";

interface RouterInput {
  query: string;
  context?: Record<string, unknown>;
}

interface RouterResult {
  query: string;
  primary_mcps: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
  secondary_mcps: Array<{
    id: string;
    name: string;
  }>;
  recommended_sequence: string[];
  aggregation_strategy: string;
  expected_outputs: string[];
}

export async function handleAiEconomyRouter(
  input: RouterInput
): Promise<TextContent> {
  // Validate input
  const validated = validateRouterInput(input);

  const query = validated.query;
  const context = validated.context || {};

  // Extract sector from context if provided
  const sector = context.sector as Sector | undefined;

  // Get routing path based on query and context
  const routingPath = getRoutingPath(query, sector);

  // Build detailed routing information
  const primaryMcps = routingPath.slice(0, 3).map((id) => {
    const mcp = SPECIALIST_MCP_REGISTRY.find((m) => m.id === id);
    return {
      id,
      name: mcp?.name || "Unknown MCP",
      reason: generateRoutingReason(id, query),
    };
  });

  const secondaryMcps = routingPath.slice(3).map((id) => {
    const mcp = SPECIALIST_MCP_REGISTRY.find((m) => m.id === id);
    return {
      id,
      name: mcp?.name || "Unknown MCP",
    };
  });

  // Determine aggregation strategy
  let aggregationStrategy = "parallel";
  if (
    query.toLowerCase().includes("sequential") ||
    query.toLowerCase().includes("ordered")
  ) {
    aggregationStrategy = "sequential";
  } else if (
    query.toLowerCase().includes("hierarchical") ||
    query.toLowerCase().includes("priority")
  ) {
    aggregationStrategy = "hierarchical";
  }

  const result: RouterResult = {
    query,
    primary_mcps: primaryMcps,
    secondary_mcps: secondaryMcps,
    recommended_sequence: routingPath,
    aggregation_strategy: aggregationStrategy,
    expected_outputs: generateExpectedOutputs(routingPath),
  };

  return {
    type: "text",
    text: JSON.stringify(result, null, 2),
  };
}

function generateRoutingReason(mcpId: string, _query: string): string {
  const reasonMap: Record<string, string> = {
    "csoai-governance":
      "Core governance framework assessment and risk classification",
    "casa-certification": "Certification tier assessment and compliance pathway",
    "csga-cybersecurity":
      "Security posture evaluation and threat analysis",
    "quantra-quantum":
      "Post-quantum cryptography readiness and quantum threats",
    "proofof-verification":
      "Content authenticity and verification support",
    "bmcc-cyber": "Training delivery and skill development",
    "oneos-mooc": "Education platform and enrollment tracking",
    "kata-belts": "Skills progression and mastery validation",
    "cso-pharma": "Healthcare/pharma compliance assessment",
    "dao-defence": "Defence-specific AI compliance",
  };

  return (
    reasonMap[mcpId] ||
    "Relevant to query requirements"
  );
}

function generateExpectedOutputs(routingPath: string[]): string[] {
  const outputs: string[] = [];

  const outputMap: Record<string, string[]> = {
    "csoai-governance": [
      "Risk classification",
      "Applicable frameworks",
      "Compliance gaps",
    ],
    "casa-certification": [
      "Tier recommendation",
      "Certification pathway",
      "Timeline estimate",
    ],
    "csga-cybersecurity": [
      "Security assessment",
      "Threat analysis",
      "Remediation plan",
    ],
    "quantra-quantum": [
      "PQC readiness score",
      "Quantum threat assessment",
      "Migration roadmap",
    ],
    "proofof-verification": [
      "Verification status",
      "Authenticity report",
      "Provenance chain",
    ],
    "bmcc-cyber": ["Training modules", "Skills assessment", "Certification prep"],
    "oneos-mooc": [
      "Course recommendations",
      "Enrollment status",
      "Progress tracking",
    ],
    "kata-belts": ["Belt progression", "Skills validation", "Mentorship match"],
    "cso-pharma": [
      "Pharma compliance gaps",
      "Clinical validation status",
      "Regulatory alignment",
    ],
    "dao-defence": [
      "Defence compliance status",
      "Military AI assessment",
      "Security clearance support",
    ],
  };

  routingPath.forEach((id) => {
    if (outputMap[id]) {
      outputs.push(...outputMap[id]);
    }
  });

  return [...new Set(outputs)]; // Remove duplicates
}
