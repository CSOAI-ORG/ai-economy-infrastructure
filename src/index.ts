#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ai-economy-infrastructure-mcp
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T05:59:00Z
 * Last Modified:   2026-02-26T05:59:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */



import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import {
  Resource,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import {
  AiEconomyRouterInputSchema,
  AiGovernanceAssessInputSchema,
  AiSectorComplianceInputSchema,
  AiEconomyDashboardInputSchema,
  AiTrustScoreInputSchema,
  AiLearningPathwayInputSchema,
  AiDataPipelineInputSchema,
  AiMarketIntelligenceInputSchema,
  AiIncidentCommandInputSchema,
  AiCertificationBundleInputSchema,
} from "./schemas.js";
import {
  handleAiEconomyRouter,
  handleAiGovernanceAssess,
  handleAiSectorCompliance,
  handleAiEconomyDashboard,
  handleAiTrustScore,
  handleAiLearningPathway,
  handleAiDataPipeline,
  handleAiMarketIntelligence,
  handleAiIncidentCommand,
  handleAiCertificationBundle,
} from "./tools/index.js";
import {
  SPECIALIST_MCP_REGISTRY,
} from "./ecosystem-registry.js";
import {
  buildEcosystemMap,
  buildTrustFramework,
  buildDataSchema,
} from "./resources.js";

/**
 * AI Economy Infrastructure MCP Server
 *
 * The master orchestration layer for the CSOAI ecosystem.
 * Aggregates 10 specialist MCP servers and provides unified governance,
 * compliance, and intelligence capabilities.
 *
 * Architecture:
 * - Intelligent routing to specialist MCPs based on query content
 * - Unified assessment across governance, certification, and security
 * - Cross-ecosystem data aggregation and analytics
 * - Integrated learning pathways and certification bundling
 * - Incident response coordination across all services
 */

const server = new Server({
  name: "ai-economy-infrastructure-mcp",
  version: "1.0.0",
  description:
    "Unified AI Economy Infrastructure — the brain of the CSOAI ecosystem. Aggregates 10 specialist MCP servers covering governance, certification, cybersecurity, verification, education, quantum security, defence, pharma, and mentoring.",
}, {
  capabilities: { tools: {}, resources: {} },
});

// Define the 10 tools
const TOOLS: Tool[] = [
  {
    name: "ai_economy_router",
    description:
      "Intelligent routing to the right specialist MCP server(s) based on natural language query. Routes to best MCP, returns aggregated results from multiple servers if needed.",
    inputSchema: AiEconomyRouterInputSchema,
  },
  {
    name: "ai_governance_assess",
    description:
      "Unified AI governance assessment combining CSOAI governance and CASA certification frameworks. Provides risk classification, applicable crosswalks, CASA tier recommendation, compliance gaps, certification pathway, and cost/timeline estimates.",
    inputSchema: AiGovernanceAssessInputSchema,
  },
  {
    name: "ai_sector_compliance",
    description:
      "Sector-branded compliance packages pulling from relevant crosswalks, standards, and certifications. Provides tailored compliance bundles for specific sectors (finance, healthcare, defence, etc.)",
    inputSchema: AiSectorComplianceInputSchema,
  },
  {
    name: "ai_economy_dashboard",
    description:
      "Cross-ecosystem analytics and intelligence dashboard. Returns usage metrics across all 10 MCPs, compliance posture score, learning progress, security status, PQC readiness, and recommended actions.",
    inputSchema: AiEconomyDashboardInputSchema,
  },
  {
    name: "ai_trust_score",
    description:
      "Unified AI trust scoring combining all ecosystem signals. Composite score (0-100) from governance compliance, security posture, PQC readiness, content verification status, and training completion.",
    inputSchema: AiTrustScoreInputSchema,
  },
  {
    name: "ai_learning_pathway",
    description:
      "Cross-ecosystem learning recommendations feeding into OneOS MOOC. Provides personalized learning pathway across BMCC Cyber, CSGA training, OneOS courses, K.A.T.A. belts, and CASA certification prep.",
    inputSchema: AiLearningPathwayInputSchema,
  },
  {
    name: "ai_data_pipeline",
    description:
      "Data collection configuration for MOOC/analytics integration. Configures data pipelines across MCPs, provides aggregated insights, and enables OneOS integration.",
    inputSchema: AiDataPipelineInputSchema,
  },
  {
    name: "ai_market_intelligence",
    description:
      "Cross-ecosystem market intelligence and opportunity assessment. Analyzes market size, regulatory landscape, competitor activity, and recommends CSOAI services.",
    inputSchema: AiMarketIntelligenceInputSchema,
  },
  {
    name: "ai_incident_command",
    description:
      "Cross-ecosystem incident response coordination. Coordinates response across CSGA, CSOAI, QuantraNet, and PROOFOF. Handles cyber, AI safety, compliance, and quantum threats.",
    inputSchema: AiIncidentCommandInputSchema,
  },
  {
    name: "ai_certification_bundle",
    description:
      "Multi-certification pathway across ecosystem. Bundles CASA + CSR5 + K.A.T.A. + PQC assessment with unified timeline, single point of contact, and combined pricing.",
    inputSchema: AiCertificationBundleInputSchema,
  },
];

// Register resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources: Resource[] = [
    {
      uri: "ai-economy://ecosystem",
      name: "AI Economy Ecosystem Map",
      description:
        "Complete map of all 10 specialist MCP servers, their capabilities, and cross-ecosystem integration points",
      mimeType: "application/json",
    },
    {
      uri: "ai-economy://sectors",
      name: "Supported Sectors and Compliance Packages",
      description:
        "All supported sectors and sector-specific compliance package definitions",
      mimeType: "application/json",
    },
    {
      uri: "ai-economy://trust-framework",
      name: "AI Trust Scoring Framework",
      description:
        "Detailed trust scoring methodology, dimensions, and score interpretations",
      mimeType: "application/json",
    },
    {
      uri: "ai-economy://data-schema",
      name: "Data Collection Schema",
      description:
        "Data schema for OneOS MOOC integration and ecosystem analytics",
      mimeType: "application/json",
    },
  ];

  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    let content: string;

    switch (uri) {
      case "ai-economy://ecosystem":
        content = JSON.stringify(buildEcosystemMap(), null, 2);
        break;

      case "ai-economy://sectors":
        content = JSON.stringify(
          {
            supported_sectors: [
              "aigovernance",
              "aifinance",
              "aiinsurance",
              "aihealthcare",
              "aidefence",
              "aieducation",
              "aimanufacturing",
              "aienergy",
            ],
            specialist_mcps_by_sector: {
              aigovernance: SPECIALIST_MCP_REGISTRY.filter((m) =>
                m.sectors.includes("aigovernance")
              ).map((m) => ({ id: m.id, name: m.name })),
              aifinance: SPECIALIST_MCP_REGISTRY.filter((m) =>
                m.sectors.includes("aifinance")
              ).map((m) => ({ id: m.id, name: m.name })),
              aihealthcare: SPECIALIST_MCP_REGISTRY.filter((m) =>
                m.sectors.includes("aihealthcare")
              ).map((m) => ({ id: m.id, name: m.name })),
              aidefence: SPECIALIST_MCP_REGISTRY.filter((m) =>
                m.sectors.includes("aidefence")
              ).map((m) => ({ id: m.id, name: m.name })),
            },
            crosswalks_by_jurisdiction: {
              EU: [
                "AI Act",
                "GDPR-AI",
                "CEP",
                "Digital Services Act",
              ],
              US: [
                "Executive Order 14110",
                "NIST AI RMF",
                "SOX-AI",
              ],
              UK: [
                "AI Bill of Rights",
                "AISI Framework",
              ],
            },
          },
          null,
          2
        );
        break;

      case "ai-economy://trust-framework":
        content = JSON.stringify(buildTrustFramework(), null, 2);
        break;

      case "ai-economy://data-schema":
        content = JSON.stringify(buildDataSchema(), null, 2);
        break;

      default:
        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: `Unknown resource: ${uri}`,
            },
          ],
        };
    }

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: content,
        },
      ],
    };
  } catch (error) {
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `Error reading resource ${uri}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
});

async function main(): Promise<void> {
  // Set up tools list handler
  await server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: TOOLS.map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })),
    };
  });

  // Set up tool execution handler
  await server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: CallToolResult;

      switch (name) {
        case "ai_economy_router":
          result = {
            content: [
              await handleAiEconomyRouter(args as any),
            ],
          };
          break;

        case "ai_governance_assess":
          result = {
            content: [
              await handleAiGovernanceAssess(args as any),
            ],
          };
          break;

        case "ai_sector_compliance":
          result = {
            content: [
              await handleAiSectorCompliance(args as any),
            ],
          };
          break;

        case "ai_economy_dashboard":
          result = {
            content: [
              await handleAiEconomyDashboard(args as any),
            ],
          };
          break;

        case "ai_trust_score":
          result = {
            content: [
              await handleAiTrustScore(args as any),
            ],
          };
          break;

        case "ai_learning_pathway":
          result = {
            content: [
              await handleAiLearningPathway(args as any),
            ],
          };
          break;

        case "ai_data_pipeline":
          result = {
            content: [
              await handleAiDataPipeline(args as any),
            ],
          };
          break;

        case "ai_market_intelligence":
          result = {
            content: [
              await handleAiMarketIntelligence(args as any),
            ],
          };
          break;

        case "ai_incident_command":
          result = {
            content: [
              await handleAiIncidentCommand(args as any),
            ],
          };
          break;

        case "ai_certification_bundle":
          result = {
            content: [
              await handleAiCertificationBundle(args as any),
            ],
          };
          break;

        default:
          result = {
            content: [
              {
                type: "text",
                text: `Unknown tool: ${name}`,
              },
            ],
            isError: true,
          };
      }

      return result;
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("AI Economy Infrastructure MCP server started on stdio");
}

main();
