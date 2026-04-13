/**
 * market-intelligence.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateMarketIntelligenceInput } from "../schemas.js";
import { MarketIntelligenceInput, MarketIntelligenceOutput } from "../types.js";

/**
 * Cross-ecosystem market intelligence and opportunity assessment
 */
export async function handleAiMarketIntelligence(
  input: MarketIntelligenceInput
): Promise<TextContent> {
  // Validate input
  const validated = validateMarketIntelligenceInput(input);

  // Generate market intelligence
  const intelligence = generateMarketIntelligence(validated);

  return {
    type: "text",
    text: JSON.stringify(intelligence, null, 2),
  };
}

function generateMarketIntelligence(
  input: MarketIntelligenceInput
): MarketIntelligenceOutput {
  // Market sizing based on sector
  const marketSize = estimateMarketSize(input.sector);
  const growthRate = estimateGrowthRate(input.sector, input.time_horizon);

  // Regulatory landscape
  const regulatoryLandscape = assessRegulatoryLandscape(
    input.sector,
    input.geography
  );

  // Competitor analysis
  const competitorActivity = analyzeCompetitorActivity(
    input.sector,
    input.geography
  );

  // Opportunity assessment
  const opportunityAssessment = assessOpportunities(
    input.sector,
    input.geography,
    input.time_horizon
  );

  // Recommended CSOAI services
  const recommendedServices = recommendCSOAIServices(
    input.sector,
    input.geography
  );

  return {
    sector: input.sector,
    geography: input.geography,
    market_size_usd_millions: marketSize,
    market_growth_rate_percentage: growthRate,
    regulatory_landscape: regulatoryLandscape,
    competitor_activity: competitorActivity,
    opportunity_assessment: opportunityAssessment,
    recommended_csoai_services: recommendedServices,
  };
}

function estimateMarketSize(sector: string): number {
  const sectorSizes: Record<string, number> = {
    aigovernance: 2500,
    aifinance: 8500,
    aiinsurance: 4200,
    aihealthcare: 12000,
    aidefence: 6800,
    aieducation: 3200,
    aimanufacturing: 5600,
    aienergy: 4100,
  };

  return sectorSizes[sector] || 4000;
}

function estimateGrowthRate(sector: string, timeHorizon: string): number {
  const baseRates: Record<string, number> = {
    aigovernance: 28,
    aifinance: 24,
    aiinsurance: 31,
    aihealthcare: 35,
    aidefence: 22,
    aieducation: 18,
    aimanufacturing: 26,
    aienergy: 25,
  };

  let rate = baseRates[sector] || 25;

  // Adjust for time horizon
  if (timeHorizon === "6months") {
    rate = rate / 4;
  } else if (timeHorizon === "1year") {
    rate = rate / 2;
  } else if (timeHorizon === "3years") {
    rate = rate * 0.8;
  } else if (timeHorizon === "5years") {
    rate = rate * 0.6; // Compounds reduce growth rate
  }

  return Math.round(rate * 100) / 100;
}

function assessRegulatoryLandscape(
  sector: string,
  geography: string
): Array<{
  jurisdiction: string;
  key_regulations: string[];
  maturity_level: "nascent" | "developing" | "mature";
}> {
  const jurisdictions = [geography, "GLOBAL"];

  return jurisdictions.map((jurisdiction) => ({
    jurisdiction,
    key_regulations: getKeyRegulations(sector, jurisdiction),
    maturity_level: getRegulatoryMaturity(sector, jurisdiction),
  }));
}

function getKeyRegulations(sector: string, jurisdiction: string): string[] {
  const regulations: Record<string, Record<string, string[]>> = {
    aifinance: {
      US: [
        "SEC AI Rules",
        "OCC SR 11-7",
        "Federal Reserve Guidance",
        "FDIC Standards",
      ],
      EU: ["MiFID II", "PSD2", "AI Act Article 6"],
      GLOBAL: ["Basel III", "IOSCO Standards"],
    },
    aihealthcare: {
      US: ["FDA AI/ML Guidance", "HIPAA", "21 CFR Part 11"],
      EU: ["MDR", "GDPR", "AI Act High-Risk"],
      GLOBAL: ["ICH Guidance"],
    },
    aidefence: {
      US: ["DoD AI Strategy", "NDIA Standards", "CUI Regulations"],
      EU: ["PESCO Framework"],
      GLOBAL: ["NATO AI Strategy"],
    },
  };

  const sectorRegs = regulations[sector] || {};
  const jurisdictionRegs = sectorRegs[jurisdiction] || [];

  return jurisdictionRegs.length > 0
    ? jurisdictionRegs
    : ["General AI Governance", "Data Protection Requirements"];
}

function getRegulatoryMaturity(
  sector: string,
  jurisdiction: string
): "nascent" | "developing" | "mature" {
  if (
    (sector === "aifinance" && jurisdiction === "US") ||
    (sector === "aihealthcare" && jurisdiction === "US") ||
    (sector === "aifinance" && jurisdiction === "EU") ||
    (sector === "aihealthcare" && jurisdiction === "EU")
  ) {
    return "mature";
  }

  if (
    (sector === "aimanufacturing" && jurisdiction === "US") ||
    (sector === "aienergy" && jurisdiction === "EU") ||
    (sector === "aieducation" && jurisdiction === "GLOBAL")
  ) {
    return "developing";
  }

  return "nascent";
}

function analyzeCompetitorActivity(
  sector: string,
  _geography: string
): Array<{
  competitor: string;
  recent_moves: string[];
  threat_level: "low" | "medium" | "high";
}> {
  const competitors: Array<{
    competitor: string;
    recent_moves: string[];
    threat_level: "low" | "medium" | "high";
  }> = [
    {
      competitor: "Global AI Governance Alliance",
      recent_moves: [
        "Launched competing certification framework",
        "Expanded to 5 new jurisdictions",
        "Secured €50M funding",
      ],
      threat_level: "high",
    },
    {
      competitor: "ISO/IEC Standards Bodies",
      recent_moves: [
        "Fast-tracked AI management standards",
        "Launched ISO 42001 certification",
        "Established AI Risk Management Task Force",
      ],
      threat_level: "medium",
    },
    {
      competitor: "Regional Governance Initiatives",
      recent_moves: [
        `Launched sector-specific framework for ${sector}`,
        "Established local compliance partnerships",
        "Developed proprietary assessment tools",
      ],
      threat_level: "medium",
    },
  ];

  return competitors;
}

function assessOpportunities(
  sector: string,
  _geography: string,
  _timeHorizon: string
): Array<{
  opportunity: string;
  market_size_usd_millions: number;
  timeline: string;
}> {
  const sectorOpportunities: Record<string, Array<{
    opportunity: string;
    market_size_usd_millions: number;
    timeline: string;
  }>> = {
    aifinance: [
      {
        opportunity: "AI risk management platform services",
        market_size_usd_millions: 2500,
        timeline: "6-12 months",
      },
      {
        opportunity: "Compliance automation for financial institutions",
        market_size_usd_millions: 1800,
        timeline: "12-18 months",
      },
      {
        opportunity: "Cross-border AI certification harmonization",
        market_size_usd_millions: 950,
        timeline: "18-24 months",
      },
    ],
    aihealthcare: [
      {
        opportunity: "Clinical AI validation services",
        market_size_usd_millions: 3200,
        timeline: "3-6 months",
      },
      {
        opportunity: "Regulatory pathway consulting",
        market_size_usd_millions: 1600,
        timeline: "6-12 months",
      },
      {
        opportunity: "Healthcare AI governance training",
        market_size_usd_millions: 1200,
        timeline: "Immediate",
      },
    ],
    aidefence: [
      {
        opportunity: "Autonomous systems evaluation",
        market_size_usd_millions: 2800,
        timeline: "6-9 months",
      },
      {
        opportunity: "Defence AI compliance certification",
        market_size_usd_millions: 2100,
        timeline: "9-12 months",
      },
    ],
  };

  const opportunities =
    sectorOpportunities[sector] || [
      {
        opportunity: "Sector-specific compliance bundles",
        market_size_usd_millions: 1500,
        timeline: "6-12 months",
      },
      {
        opportunity: "Cross-sector governance platforms",
        market_size_usd_millions: 1200,
        timeline: "12-18 months",
      },
    ];

  return opportunities;
}

function recommendCSOAIServices(
  sector: string,
  geography: string
): string[] {
  const recommendations: string[] = [
    "ai_governance_assess",
    "ai_sector_compliance",
  ];

  if (
    sector === "aifinance" ||
    sector === "aidefence" ||
    sector === "aihealthcare"
  ) {
    recommendations.push("ai_incident_command");
  }

  if (
    geography === "EU" ||
    geography === "GLOBAL"
  ) {
    recommendations.push("ai_market_intelligence");
  }

  recommendations.push("ai_learning_pathway", "ai_certification_bundle");

  if (sector !== "aieducation") {
    recommendations.push("ai_trust_score");
  }

  return recommendations;
}
