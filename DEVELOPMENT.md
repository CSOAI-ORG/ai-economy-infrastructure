# Development Guide

## Project Structure

```
ai-economy-infrastructure/
├── src/
│   ├── index.ts                    # Main MCP server entry point
│   ├── types.ts                    # TypeScript type definitions
│   ├── schemas.ts                  # Zod validation schemas
│   ├── ecosystem-registry.ts       # MCP registry & routing
│   ├── resources.ts                # Resource endpoint builders
│   └── tools/
│       ├── index.ts                # Tool exports
│       ├── router.ts               # ai_economy_router tool
│       ├── governance.ts           # ai_governance_assess tool
│       ├── compliance.ts           # ai_sector_compliance tool
│       ├── dashboard.ts            # ai_economy_dashboard tool
│       ├── trust-score.ts          # ai_trust_score tool
│       ├── learning.ts             # ai_learning_pathway tool
│       ├── data-pipeline.ts        # ai_data_pipeline tool
│       ├── market-intelligence.ts  # ai_market_intelligence tool
│       ├── incident-command.ts     # ai_incident_command tool
│       └── certification-bundle.ts # ai_certification_bundle tool
├── package.json                    # Node.js project config
├── tsconfig.json                   # TypeScript configuration
├── README.md                        # User-facing documentation
├── ARCHITECTURE.md                 # Technical architecture
├── SPECIFICATION.md                # Detailed API spec
├── DEVELOPMENT.md                  # This file
└── .gitignore                      # Git ignore patterns
```

## File Descriptions

### Core System Files

**src/index.ts** (600 lines)
- Main MCP server setup using @modelcontextprotocol/sdk
- Tool handler dispatch logic
- Resource endpoint handlers
- Error handling and recovery
- Stdio transport setup

**src/types.ts** (300 lines)
- Comprehensive TypeScript interface definitions
- Enums for Sector, Jurisdiction, DeploymentType, IncidentType, OrganizationSize
- Input/Output types for all 10 tools
- Support types for DashboardMetrics, TrustFramework, etc.

**src/schemas.ts** (200 lines)
- Zod validation schemas for all 10 tools
- Input validation with descriptive error messages
- Schema composition for complex types
- Runtime type checking

**src/ecosystem-registry.ts** (250 lines)
- Registry of all 10 specialist MCPs
- Getter functions for MCP lookup
- Routing algorithm implementation
- Cross-ecosystem integration map

**src/resources.ts** (400 lines)
- Four resource endpoint builders:
  - buildEcosystemMap()
  - buildTrustFramework()
  - buildDataSchema()
  - (Sectors generated dynamically)

### Tool Implementation Files

Each tool file implements:
1. Tool handler function (async)
2. Input validation
3. Business logic
4. Output generation

**Tool File Sizes:**
- router.ts: 150 lines
- governance.ts: 200 lines
- compliance.ts: 250 lines
- dashboard.ts: 200 lines
- trust-score.ts: 250 lines
- learning.ts: 300 lines
- data-pipeline.ts: 200 lines
- market-intelligence.ts: 280 lines
- incident-command.ts: 280 lines
- certification-bundle.ts: 320 lines

### Configuration Files

**package.json**
- Project metadata (name, version, author, license)
- Dependencies: @modelcontextprotocol/sdk, zod, uuid
- Dev dependencies: TypeScript, @types/node
- Scripts: build, dev, start, test, lint, clean

**tsconfig.json**
- Target: ES2020
- Module: ES2020
- Strict mode enabled
- Declaration maps and source maps
- No unused variables/parameters allowed

### Documentation Files

**README.md** (700 lines)
- Overview and architecture diagram
- Tool specifications with examples
- Resource documentation
- Setup and installation guide
- Usage examples

**ARCHITECTURE.md** (800 lines)
- System overview with diagrams
- Component descriptions
- Routing algorithm details
- Data flow patterns
- Integration patterns
- Testing strategy
- Deployment model

**SPECIFICATION.md** (900 lines)
- Executive summary
- Detailed tool specifications
- Resource specifications
- API request/response format
- Performance SLA
- Security specifications
- Deployment requirements
- Monitoring and observability

**DEVELOPMENT.md** (This file)
- Project structure
- Development workflow
- Building and testing
- Contributing guidelines
- Code standards

## Development Workflow

### 1. Setup

```bash
# Clone/navigate to project
cd /sessions/brave-adoring-cerf/mcp-servers/ai-economy-infrastructure

# Install dependencies
npm install

# Verify setup
npm run lint
npm run build
```

### 2. Development

```bash
# Start dev server (watches + rebuilds)
npm run dev

# In another terminal, test the server
curl -X POST http://localhost:3000/tools \
  -H "Content-Type: application/json" \
  -d '{"tool": "ai_economy_router", "args": {...}}'
```

### 3. Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### 4. Building for Production

```bash
# Clean and build
npm run clean
npm run build

# Start production server
npm start
```

## Adding a New Tool

### Step 1: Define Types (src/types.ts)
```typescript
export interface NewToolInput {
  required_param: string;
  optional_param?: string;
}

export interface NewToolOutput {
  result: string;
  metadata: object;
}
```

### Step 2: Create Schema (src/schemas.ts)
```typescript
export const NewToolInputSchema = z.object({
  required_param: z.string().describe("Description"),
  optional_param: z.string().optional().describe("Description"),
});
```

### Step 3: Implement Tool (src/tools/new-tool.ts)
```typescript
export async function handleNewTool(
  input: NewToolInput
): Promise<TextContent> {
  const validated = NewToolInputSchema.parse(input);

  // Business logic
  const result = {
    result: "computation result",
    metadata: {}
  };

  return {
    type: "text",
    text: JSON.stringify(result, null, 2),
  };
}
```

### Step 4: Register Tool (src/tools/index.ts)
```typescript
export { handleNewTool } from "./new-tool.js";
```

### Step 5: Add to Server (src/index.ts)
```typescript
case "new_tool":
  result = {
    content: [await handleNewTool(args as Record<string, unknown>)],
  };
  break;
```

### Step 6: Document
- Add tool to README.md with examples
- Update SPECIFICATION.md with detailed spec
- Add to appropriate section in ARCHITECTURE.md

## Code Standards

### TypeScript
- Strict mode enabled
- No implicit any
- Explicit return types on all functions
- Interfaces over types for public APIs

### Naming Conventions
- Functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case (index.ts, ecosystem-registry.ts)
- Tools: snake_case (ai_economy_router, ai_governance_assess)

### Comments
- JSDoc for public functions
- Line comments for complex logic
- No commented-out code

### Error Handling
- Zod validation before processing
- Try-catch in async handlers
- Meaningful error messages
- No silent failures

### Testing
- Unit tests for utility functions
- Integration tests for tools
- Mock data for MCPs
- Test coverage >80%

## Common Tasks

### Add a New Sector

1. Update `SectorEnum` in src/types.ts:
```typescript
export const SectorEnum = z.enum([
  "aigovernance",
  // ... existing sectors ...
  "mynewsector",  // Add here
]);
```

2. Add sector data in compliance.ts:
```typescript
const sectorStandards: Record<string, ...> = {
  mynewsector: [...],
};
```

3. Update ARCHITECTURE.md sector list

### Update Routing Rules

Edit `getRoutingPath()` in src/ecosystem-registry.ts:
```typescript
const routingMap: Record<string, string[]> = {
  "new_keyword": ["mcp_id1", "mcp_id2"],
  // ...
};
```

### Add New Resource

1. Create builder function in src/resources.ts
2. Update ListResourcesRequestSchema in src/index.ts
3. Add case to ReadResourceRequestSchema handler
4. Document in SPECIFICATION.md

## Performance Optimization

### Current Optimizations
- In-memory routing (O(1) lookup)
- Parallel execution where possible
- Lazy loading of resources
- Caching of ecosystem metadata

### Potential Improvements
- Redis cache for frequently accessed data
- Database for historical metrics
- Streaming responses for large datasets
- Async processing for expensive operations

## Debugging

### Enable Debug Logging
```bash
LOG_LEVEL=debug npm run dev
```

### Common Issues

**"Unknown tool" error**
- Check tool name spelling
- Verify tool is exported from src/tools/index.ts
- Ensure case matches tool registration

**Schema validation failure**
- Check input matches required types
- Verify enums are correct values
- Look for typos in field names

**MCP not found**
- Verify MCP ID in ecosystem-registry.ts
- Check routing logic in getRoutingPath()
- Ensure MCP is registered

## Contributing

### Before Committing
1. Run `npm run lint` (TypeScript check)
2. Run `npm test` (unit tests)
3. Build: `npm run build`
4. Test manually

### Commit Message Format
```
[tool|core|docs] Brief description

Longer explanation if needed.
- Bullet points for changes
- One per significant change
```

### Pull Request Process
1. Fork and create feature branch
2. Make changes following code standards
3. Add tests for new functionality
4. Update documentation
5. Submit PR with clear description

## Release Process

### Version Bumping
- Major: Breaking API changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Built and tested dist/
- [ ] Git tag created
- [ ] Published to npm (if public)

## Resources

- **MCP SDK Documentation:** https://modelcontextprotocol.io
- **Zod Validation:** https://zod.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs
- **CSOAI Documentation:** https://csoai.org

## Support

For questions or issues:
1. Check existing documentation (README, ARCHITECTURE, SPECIFICATION)
2. Search GitHub issues
3. Create detailed issue with:
   - Error message
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

---

**Last Updated:** 2026-02-25
**Maintained By:** CSOAI Technical Team
