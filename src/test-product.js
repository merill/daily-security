// Daily Security News against the engine's shared product checks, plus what
// is particular to it: thirteen zero-trust/ pages publish in the adoption and
// operations sections, and are routed to those canonical URLs.
const path = require('node:path');
const { defineProductConformance } = require('@merill/dailynews-engine/product-conformance');

defineProductConformance({
  root: path.join(__dirname, '..'),
  // The guidance names Entra, Intune, Defender and Purview as content, so only
  // names that could only be a copying leftover are checked.
  foreignNames: /\b(memdocs|defender-docs|purview-docs|daily intune|daily entra|daily defender|daily purview)\b/i,
  mirrorState: 'security-docs/.learn-mirror/state.json',
  // Every page routes to the URL the crawl fetched it from; none are left over.
  mirrorExceptions: {},
  trackedSamples: ['security-docs/zero-trust/zero-trust-overview.md', 'security-docs/ransomware/protect-against-ransomware.md'],
  routeCases: {
    'security-docs/zero-trust/zero-trust-overview.md': 'security/zero-trust/zero-trust-overview',
    'security-docs/zero-trust/sfi/phishing-resistant-mfa.md': 'security/zero-trust/sfi/phishing-resistant-mfa',
    'security-docs/zero-trust/security-operations-playbook-phishing.md': 'security/operations/incident-response-playbook-phishing',
    'security-docs/zero-trust/security-operations-playbook-token-theft.md': 'security/operations/token-theft-playbook',
    'security-docs/zero-trust/security-adoption-model.md': 'security/adoption/',
    'security-docs/zero-trust/microsoft-reference-architecture.md': 'security/adoption/mcra',
    'security-docs/zero-trust/workshop-business-security-leaders-video.md': 'security/adoption/the-ciso-workshop-videos',
    'security-docs/engineering/Threat-modeling-aiml.md': 'security/engineering/Threat-modeling-aiml'
  },
  productCases: {
    'security-docs/zero-trust/sfi/phishing-resistant-mfa.md': 'secure-future-initiative',
    'security-docs/zero-trust/develop/token-management.md': 'zero-trust-developer',
    'security-docs/security-for-ai/govern.md': 'ai-security',
    'security-docs/zero-trust/catalog-ai-attack-techniques/x.md': 'ai-security',
    'security-docs/privileged-access-workstations/privileged-access-strategy.md': 'privileged-access',
    'security-docs/zero-trust/adopt/implement-privileged-access-plan.md': 'privileged-access',
    'security-docs/ransomware/human-operated-ransomware.md': 'ransomware',
    'security-docs/zero-trust/security-operations-playbook-phishing.md': 'security-operations',
    'security-docs/zero-trust/security-adoption-model.md': 'security-adoption',
    'security-docs/zero-trust/adopt/secure-remote-hybrid-work.md': 'security-adoption',
    'security-docs/engineering/threat-modeling-with-dev-ops.md': 'security-engineering',
    'security-docs/trusted-root/2025/feb2025.md': 'trusted-root',
    'security-docs/zero-trust/zero-trust-overview.md': 'zero-trust'
  }
});
