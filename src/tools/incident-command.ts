/**
 * incident-command.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateIncidentCommandInput } from "../schemas.js";
import { IncidentInput, IncidentResponseOutput } from "../types.js";

/**
 * Cross-ecosystem incident response coordination
 */
export async function handleAiIncidentCommand(
  input: IncidentInput
): Promise<TextContent> {
  // Validate input
  const validated = validateIncidentCommandInput(input);

  // Generate coordinated incident response
  const response = generateIncidentResponse(validated);

  return {
    type: "text",
    text: JSON.stringify(response, null, 2),
  };
}

function generateIncidentResponse(input: IncidentInput): IncidentResponseOutput {
  const incidentId = generateIncidentId();

  // Determine responsible MCPs based on incident type
  const responsibleMcps = getResponsibleMcps(input.incident_type);

  // Build unified response plan
  const unifiedResponsePlan = buildResponsePlan(
    input.incident_type,
    input.severity,
    responsibleMcps
  );

  // Build coordinated actions
  const coordinatedActions = buildCoordinatedActions(
    input.incident_type,
    input.severity,
    responsibleMcps
  );

  // Escalation path
  const escalationPath = buildEscalationPath(input.severity);

  // Communication protocol
  const communicationProtocol =
    input.severity === "critical"
      ? "Real-time coordination, 15-min status updates, executive dashboard"
      : "Structured updates, 4-hour reporting cycle, incident tracking";

  return {
    incident_id: incidentId,
    incident_type: input.incident_type,
    severity: input.severity,
    unified_response_plan: unifiedResponsePlan,
    coordinated_actions: coordinatedActions,
    escalation_path: escalationPath,
    communication_protocol: communicationProtocol,
  };
}

function getResponsibleMcps(incidentType: string): string[] {
  const mcpMap: Record<string, string[]> = {
    cyber: ["csga-cybersecurity", "proofof-verification", "csoai-governance"],
    ai_safety: [
      "csoai-governance",
      "casa-certification",
      "oneos-mooc",
    ],
    compliance: [
      "csoai-governance",
      "casa-certification",
      "cso-pharma",
      "dao-defence",
    ],
    quantum_threat: ["quantra-quantum", "csga-cybersecurity"],
    multi_domain: [
      "csoai-governance",
      "csga-cybersecurity",
      "quantra-quantum",
      "casa-certification",
    ],
  };

  return mcpMap[incidentType] || ["csoai-governance"];
}

function buildResponsePlan(
  incidentType: string,
  severity: string,
  responsibleMcps: string[]
): {
  phase: string;
  responsible_mcp: string;
  actions: Array<{
    action: string;
    mcp: string;
    timeline: string;
    dependencies: string[];
  }>;
} {
  const actions: Array<{
    action: string;
    mcp: string;
    timeline: string;
    dependencies: string[];
  }> = [];

  // Immediate response actions
  const immediateResponder = responsibleMcps[0] || "csoai-governance";

  actions.push({
    action: "Initiate incident investigation",
    mcp: immediateResponder,
    timeline: "Immediate",
    dependencies: [],
  });

  if (incidentType === "cyber" || incidentType === "multi_domain") {
    actions.push({
      action: "Activate security incident response team",
      mcp: "csga-cybersecurity",
      timeline: "15 minutes",
      dependencies: ["incident_investigation"],
    });

    actions.push({
      action: "Conduct forensic analysis",
      mcp: "csga-cybersecurity",
      timeline: "1-2 hours",
      dependencies: ["security_team_activation"],
    });
  }

  if (incidentType === "quantum_threat") {
    actions.push({
      action: "Assess quantum threat vectors",
      mcp: "quantra-quantum",
      timeline: "30 minutes",
      dependencies: ["incident_investigation"],
    });

    actions.push({
      action: "Evaluate cryptographic exposure",
      mcp: "quantra-quantum",
      timeline: "2-4 hours",
      dependencies: ["quantum_threat_assessment"],
    });
  }

  if (incidentType === "compliance" || incidentType === "multi_domain") {
    actions.push({
      action: "Assess regulatory impact",
      mcp: "csoai-governance",
      timeline: "2-4 hours",
      dependencies: ["incident_investigation"],
    });

    actions.push({
      action: "Initiate compliance notification process",
      mcp: "casa-certification",
      timeline: "4-8 hours",
      dependencies: ["regulatory_impact_assessment"],
    });
  }

  // Post-incident actions
  actions.push({
    action: "Document incident timeline and root cause",
    mcp: immediateResponder,
    timeline: "24-48 hours",
    dependencies: ["investigation_complete"],
  });

  actions.push({
    action: "Implement remediation measures",
    mcp: immediateResponder,
    timeline: "1-7 days",
    dependencies: ["root_cause_analysis"],
  });

  return {
    phase: severity === "critical" ? "Emergency Response" : "Standard Response",
    responsible_mcp: immediateResponder,
    actions,
  };
}

function buildCoordinatedActions(
  incidentType: string,
  _severity: string,
  responsibleMcps: string[]
): Array<{
  mcp_server: string;
  action: string;
  expected_output: string;
}> {
  const actions: Array<{
    mcp_server: string;
    action: string;
    expected_output: string;
  }> = [];

  if (incidentType === "cyber") {
    actions.push({
      mcp_server: "csga-cybersecurity",
      action: "Threat analysis and containment",
      expected_output: "IOCs, containment strategy, impact assessment",
    });

    actions.push({
      mcp_server: "proofof-verification",
      action: "Verify system integrity and authenticity",
      expected_output: "Integrity report, tampering detection results",
    });

    actions.push({
      mcp_server: "csoai-governance",
      action: "Assess governance implications",
      expected_output: "Risk re-classification, compliance impact",
    });
  } else if (incidentType === "ai_safety") {
    actions.push({
      mcp_server: "csoai-governance",
      action: "Safety incident assessment",
      expected_output: "Safety risk classification, mitigation roadmap",
    });

    actions.push({
      mcp_server: "casa-certification",
      action: "Evaluate certification impact",
      expected_output: "Tier adjustment recommendations, remediation steps",
    });
  } else if (incidentType === "compliance") {
    actions.push({
      mcp_server: "csoai-governance",
      action: "Compliance gap assessment",
      expected_output: "Violations, legal exposure, remediation plan",
    });

    if (responsibleMcps.includes("cso-pharma")) {
      actions.push({
        mcp_server: "cso-pharma",
        action: "Healthcare/pharma compliance review",
        expected_output: "Regulatory exposure, reporting requirements",
      });
    }

    if (responsibleMcps.includes("dao-defence")) {
      actions.push({
        mcp_server: "dao-defence",
        action: "Defence compliance review",
        expected_output: "Security clearance impact, reporting obligations",
      });
    }
  } else if (incidentType === "quantum_threat") {
    actions.push({
      mcp_server: "quantra-quantum",
      action: "Quantum threat assessment and PQC planning",
      expected_output:
        "Quantum threat level, cryptographic inventory, migration roadmap",
    });

    actions.push({
      mcp_server: "csga-cybersecurity",
      action: "Immediate cryptographic remediation",
      expected_output: "Temporary mitigations, upgrade plan",
    });
  }

  // Always include governance coordination
  if (!actions.some((a) => a.mcp_server === "csoai-governance")) {
    actions.push({
      mcp_server: "csoai-governance",
      action: "Governance and risk coordination",
      expected_output: "Unified response strategy, escalation decisions",
    });
  }

  return actions;
}

function buildEscalationPath(severity: string): string[] {
  const basePath = [
    "Incident Commander",
    "Ecosystem Coordinator",
    "Executive Steering Committee",
  ];

  if (severity === "critical") {
    basePath.unshift("Duty Officer");
  }

  basePath.push("Board/Regulatory Authority");

  return basePath;
}

function generateIncidentId(): string {
  return `INC-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
}
