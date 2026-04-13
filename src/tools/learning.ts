/**
 * learning.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { validateLearningPathwayInput } from "../schemas.js";
import { LearningPathwayInput, LearningPathwayOutput } from "../types.js";

/**
 * Cross-ecosystem learning recommendations feeding into OneOS MOOC
 */
export async function handleAiLearningPathway(
  input: LearningPathwayInput
): Promise<TextContent> {
  // Validate input
  const validated = validateLearningPathwayInput(input);

  // Generate learning pathway
  const pathway = generateLearningPathway(validated);

  return {
    type: "text",
    text: JSON.stringify(pathway, null, 2),
  };
}

function generateLearningPathway(input: LearningPathwayInput): LearningPathwayOutput {
  const pathwayId = generatePathwayId();

  // Get foundational courses based on role and skill gaps
  const courses = selectCourses(input.role, input.skill_gaps_identified, input.sector);

  // K.A.T.A. belt progression based on skill gaps
  const kataBelts = generateKataProgression(input.skill_gaps_identified, input.role);

  // CASA certification prep
  const casaPrep = generateCasaPrep(input.sector, input.skill_gaps_identified);

  // Calculate total duration
  const totalDuration = courses.reduce((sum, c) => sum + c.duration_hours, 0) +
    kataBelts.reduce((sum, k) => sum + k.estimated_hours, 0) +
    casaPrep.estimated_prep_hours;

  // MOOC integration hooks
  const moocHooks = generateMoocHooks(courses, input.role);

  return {
    pathway_id: pathwayId,
    role: input.role,
    estimated_duration_hours: totalDuration,
    courses,
    kata_progression: kataBelts,
    casa_certification_prep: casaPrep,
    mooc_integration_hooks: moocHooks,
  };
}

function selectCourses(
  role: string,
  skillGaps: string[],
  sector: string
): Array<{
  name: string;
  provider: string;
  duration_hours: number;
  certification?: string;
  priority: "critical" | "high" | "medium";
}> {
  const courses: Array<{
    name: string;
    provider: string;
    duration_hours: number;
    certification?: string;
    priority: "critical" | "high" | "medium";
  }> = [];

  const roleLower = role.toLowerCase();
  const gapsLower = skillGaps.map((g) => g.toLowerCase());

  // Foundation courses for all roles
  if (!gapsLower.includes("ai basics")) {
    courses.push({
      name: "AI Fundamentals & Safety",
      provider: "OneOS MOOC",
      duration_hours: 12,
      certification: "AI Fundamentals",
      priority: "critical",
    });
  }

  if (gapsLower.includes("governance") || roleLower.includes("governance")) {
    courses.push({
      name: "AI Governance Framework",
      provider: "CSOAI",
      duration_hours: 16,
      certification: "CASA Foundation",
      priority: "critical",
    });
  }

  if (gapsLower.includes("security") || roleLower.includes("security")) {
    courses.push({
      name: "AI Cybersecurity Essentials",
      provider: "CSGA",
      duration_hours: 20,
      certification: "CSGA Level 1",
      priority: "high",
    });
  }

  if (
    gapsLower.includes("compliance") ||
    gapsLower.includes("governance") ||
    sector === "aihealthcare"
  ) {
    courses.push({
      name: `${sector === "aihealthcare" ? "Healthcare" : "Sector-Specific"} Compliance`,
      provider: sector === "aihealthcare" ? "CSO" : "CSOAI",
      duration_hours: 14,
      priority: "high",
    });
  }

  if (
    gapsLower.includes("quantum") ||
    gapsLower.includes("pqc") ||
    gapsLower.includes("cryptography")
  ) {
    courses.push({
      name: "Post-Quantum Cryptography & Readiness",
      provider: "QuantraNet",
      duration_hours: 12,
      certification: "PQC Assessment",
      priority: "high",
    });
  }

  if (
    gapsLower.includes("verification") ||
    gapsLower.includes("authenticity")
  ) {
    courses.push({
      name: "Content Verification & Provenance",
      provider: "PROOFOF",
      duration_hours: 8,
      priority: "medium",
    });
  }

  // Advanced courses based on role
  if (
    roleLower.includes("manager") ||
    roleLower.includes("director") ||
    roleLower.includes("executive")
  ) {
    courses.push({
      name: "AI Risk Management for Leaders",
      provider: "CSOAI",
      duration_hours: 10,
      priority: "high",
    });
  }

  if (
    roleLower.includes("engineer") ||
    roleLower.includes("developer") ||
    roleLower.includes("technical")
  ) {
    courses.push({
      name: "Technical AI Safety Implementation",
      provider: "OneOS MOOC",
      duration_hours: 18,
      priority: "high",
    });
  }

  // Sort by priority and remove duplicates
  return courses.sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      critical: 0,
      high: 1,
      medium: 2,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function generateKataProgression(
  skillGaps: string[],
  role: string
): Array<{
  belt_level: string;
  skills: string[];
  estimated_hours: number;
}> {
  const progression: Array<{
    belt_level: string;
    skills: string[];
    estimated_hours: number;
  }> = [];

  const gapsLower = skillGaps.map((g) => g.toLowerCase());

  // White Belt (foundations)
  progression.push({
    belt_level: "White",
    skills: [
      "AI Governance Fundamentals",
      "Risk Awareness",
      "CASA Tier 1 Concepts",
    ],
    estimated_hours: 8,
  });

  // Yellow Belt (intermediate)
  if (
    gapsLower.includes("governance") ||
    gapsLower.includes("intermediate")
  ) {
    progression.push({
      belt_level: "Yellow",
      skills: ["Framework Application", "Gap Analysis", "Compliance Mapping"],
      estimated_hours: 12,
    });
  }

  // Orange Belt (advanced)
  if (
    gapsLower.includes("advanced") ||
    gapsLower.includes("certification") ||
    role.toLowerCase().includes("specialist")
  ) {
    progression.push({
      belt_level: "Orange",
      skills: [
        "Governance Design",
        "Audit Support",
        "CASA Tier 3-4 Assessment",
      ],
      estimated_hours: 16,
    });
  }

  // Green Belt (mastery track)
  if (
    role.toLowerCase().includes("lead") ||
    role.toLowerCase().includes("architect")
  ) {
    progression.push({
      belt_level: "Green",
      skills: ["Framework Development", "Organization Leadership", "Strategy"],
      estimated_hours: 20,
    });
  }

  // Black Belt (expert/mentor)
  if (
    role.toLowerCase().includes("director") ||
    role.toLowerCase().includes("chief")
  ) {
    progression.push({
      belt_level: "Black",
      skills: [
        "Ecosystem Leadership",
        "Cross-Domain Integration",
        "Mentorship",
      ],
      estimated_hours: 24,
    });
  }

  return progression;
}

function generateCasaPrep(
  sector: string,
  skillGaps: string[]
): {
  tier: number;
  focus_areas: string[];
  estimated_prep_hours: number;
} {
  let recommendedTier = 2; // Default

  const gapsLower = skillGaps.map((g) => g.toLowerCase());

  // Adjust tier based on skill gaps and sector
  if (gapsLower.includes("critical") || sector === "aidefence" || sector === "aihealthcare") {
    recommendedTier = 4;
  } else if (gapsLower.includes("advanced") || sector === "aifinance") {
    recommendedTier = 3;
  }

  const focusAreas: Record<number, string[]> = {
    1: ["Basic AI Governance", "Risk Identification"],
    2: ["Governance Framework", "Compliance Mapping", "Documentation"],
    3: [
      "Advanced Risk Management",
      "Sector-Specific Requirements",
      "Audit Readiness",
    ],
    4: [
      "Critical Infrastructure Governance",
      "Complex Compliance Scenarios",
      "Leadership & Strategy",
    ],
    5: [
      "Enterprise Governance",
      "Global Compliance",
      "Innovation Leadership",
    ],
  };

  return {
    tier: recommendedTier,
    focus_areas: focusAreas[recommendedTier] || focusAreas[2],
    estimated_prep_hours: recommendedTier * 8,
  };
}

function generateMoocHooks(
  courses: Array<{
    name: string;
    provider: string;
    duration_hours: number;
    certification?: string;
  }>,
  role: string
): Array<{
  course_id: string;
  enrollment_data: Record<string, unknown>;
}> {
  return courses.map((course) => ({
    course_id: generateCourseId(course.name),
    enrollment_data: {
      course_name: course.name,
      provider: course.provider,
      duration_hours: course.duration_hours,
      learner_role: role,
      auto_enroll: true,
      tracking_enabled: true,
      completion_deadline_days: Math.ceil(course.duration_hours / 8),
    },
  }));
}

function generatePathwayId(): string {
  return `PATHWAY-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
}

function generateCourseId(courseName: string): string {
  const sanitized = courseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `COURSE-${sanitized}-${Math.random().toString(36).substring(7).toUpperCase()}`;
}
