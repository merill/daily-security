// Product configuration for Daily.Security.Admin.News.
//
// CommonJS rather than JSON because the classification rules are RegExps.
// Everything the engine needs that is specific to this product lives here; the
// code in @merill/dailynews-engine is product-neutral and reads from this file.
//
// The source is merill/security-docs-mirror. Microsoft's security guidance
// (Zero Trust, the security adoption framework, privileged access, ransomware,
// AI security, the SDL) publishes from MicrosoftDocs/security-pr, which is not
// public; learn-mirror rebuilds it from Microsoft Learn four times a day, one
// commit per crawl that found a change, at the path of the source file Learn
// built each page from.
//
// Daily Security News is the umbrella for Microsoft security guidance: other
// security documentation mirrors can join this site later, once the engine
// reads more than one docs.source.
//
// The guidance names Entra, Intune, Defender and Purview throughout, because it
// tells you how to use them. That is content, not a leftover from a sibling.

const ICONS = 'https://github.com/DanielBradley1/msicons';
const TRACKED = /^(security-docs)\/(?!(?:.*\/)?(?:includes?|media|breadcrumb)\/).+\.md$/;

module.exports = {
  site: {
    name: 'Daily Security News',
    host: 'daily.security.admin.news',
    url: 'https://daily.security.admin.news',
    description: 'A readable record of what changed across Microsoft security guidance: Zero Trust, adoption, privileged access and AI security.',
    productName: 'Microsoft security guidance',
    audience: 'security architects and administrators'
  },

  // v1 is the site alone: no subscriber email, no Kit workflow.
  email: { enabled: false },

  brand: {
    wordmark: 'Daily Security News',
    ogAlt: 'Daily Security News: Microsoft security guidance change intelligence',
    themeStorageKey: 'security-news-theme',
    tokenStorageKey: 'security-news-github-token',
    emailEyebrow: 'Daily Security News',
    logo: 'security-news-logo.png',
    aboutIcon: '/assets/products/zero-trust.svg',
    uiAssets: ['security-news-logo.png'],
    extraCss: ''
  },

  // Written into persisted state and published records. Never change these
  // once the site is live: see the engine README.
  identity: {
    docEventPrefix: 'security-docs',
    batchEventPrefix: 'security-news',
    kitMarkerPrefix: 'daily-security-news'
  },

  build: { docsCloneDir: 'security-docs', detailDays: 30 },

  discord: { botName: 'Security Scout' },

  ai: {
    schemaPrefix: 'security',
    subject: 'security guidance',
    forbiddenOpeners: ['Microsoft security documentation', 'The security guidance', 'Zero Trust documentation'],
    impactBoost: /privileged access|ransomware|incident response|playbook|conditional access|phishing-resistant|ai agent|prompt injection|secure future initiative|token theft/
  },

  docs: {
    source: { owner: 'merill', repo: 'security-docs-mirror', branch: 'main' },
    // Learn's rendered titles end in this; it is not part of the page's name.
    titleSuffix: / \| Microsoft Learn$/,
    learnRootUrl: 'https://learn.microsoft.com/en-us/security/',

    trackedPaths: TRACKED,

    // Ordered: first match wins. Most pages publish at security/<path>, but
    // thirteen pages under zero-trust/ publish in the adoption and operations
    // sections, at the URLs the mirror's crawl fetched them from. Each is
    // routed to that canonical URL rather than to the file name (Learn would
    // redirect the file name, but the canonical link is the honest one).
    learnRoutes: [
      { match: /^security-docs\/zero-trust\/security-operations-playbook-(app-consent|compromised-malicious-app|password-spray|phishing)\.md$/, path: 'security/operations/incident-response-playbook-$1' },
      { match: /^security-docs\/zero-trust\/security-operations-playbook-token-theft\.md$/, path: 'security/operations/token-theft-playbook' },
      { match: /^security-docs\/zero-trust\/security-operations-incident-response-playbooks\.md$/, path: 'security/operations/incident-response-playbooks' },
      { match: /^security-docs\/zero-trust\/security-operations-incident-response-readiness\.md$/, path: 'security/operations/incident-response-planning' },
      { match: /^security-docs\/zero-trust\/security-adoption-discipline-security-operations-incidents\.md$/, path: 'security/operations/incident-response-overview' },
      { match: /^security-docs\/zero-trust\/security-adoption-discipline-security-operations\.md$/, path: 'security/operations/' },
      { match: /^security-docs\/zero-trust\/security-adoption-model\.md$/, path: 'security/adoption/' },
      { match: /^security-docs\/zero-trust\/microsoft-reference-architecture\.md$/, path: 'security/adoption/mcra' },
      { match: /^security-docs\/zero-trust\/workshop-business-security-leaders\.md$/, path: 'security/adoption/the-ciso-workshop' },
      { match: /^security-docs\/zero-trust\/workshop-business-security-leaders-video\.md$/, path: 'security/adoption/the-ciso-workshop-videos' },
      // Everything else publishes at its own path under security/.
      { match: /^security-docs\/(.*)\.md$/, path: 'security/$1' }
    ],

    areas: {
      stripPrefix: /^security-docs\//,
      rules: [
        { match: /^zero-trust\/sfi\//, name: 'Secure Future Initiative' },
        { match: /^zero-trust\/develop\//, name: 'Zero Trust for developers' },
        { match: /^zero-trust\/(catalog-ai-|copilots\/)/, name: 'AI security' },
        { match: /^zero-trust\/adopt\//, name: 'Zero Trust adoption' },
        { match: /^zero-trust\//, name: 'Zero Trust' },
        { match: /^privileged-access-workstations\//, name: 'Privileged access' },
        { match: /^ransomware\//, name: 'Ransomware' },
        { match: /^(security-for-ai|ai-red-team)\//, name: 'AI security' },
        { match: /^engineering\//, name: 'Security engineering' },
        { match: /^trusted-root\//, name: 'Trusted Root Program' }
      ],
      fallback: 'Microsoft security guidance'
    }
  },

  analytics: { piqoSite: '' },

  // There is no Message Center service for this guidance; a post that names
  // Zero Trust in its title is the closest relevant signal.
  messageCenter: { servicePattern: /\bZero Trust\b/i },

  links: {
    related: [],
    footer: [],
    stayCurrent: [
      { url: 'https://learn.microsoft.com/en-us/security/zero-trust/', label: 'Zero Trust guidance center' },
      { url: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-whats-new', label: "What's new in the Secure Future Initiative" }
    ],
    followProject: [
      { url: 'https://merill.net', label: 'merill.net' },
      { url: 'https://github.com/merill', label: 'GitHub' }
    ]
  },

  taxonomy: {
    products: [
      { slug: 'zero-trust', name: 'Zero Trust guidance', short: 'Zero Trust', learn: 'https://learn.microsoft.com/en-us/security/zero-trust/', icon: { sourceName: 'Security', sourcePath: 'identity/00321-icon-service-Security.svg', match: 'closest' } },
      { slug: 'security-adoption', name: 'Security adoption framework and CISO workshop', short: 'Security adoption', learn: 'https://learn.microsoft.com/en-us/security/adoption/', icon: { sourceName: 'Solutions', sourcePath: 'management-governance/00021-icon-service-Solutions.svg', match: 'closest' } },
      { slug: 'security-operations', name: 'Security operations and incident response', short: 'Security operations', learn: 'https://learn.microsoft.com/en-us/security/operations/', icon: { sourceName: 'Azure Sentinel', sourcePath: 'security/10248-icon-service-Azure-Sentinel.svg', match: 'closest' } },
      { slug: 'privileged-access', name: 'Privileged access', short: 'Privileged access', learn: 'https://learn.microsoft.com/en-us/security/privileged-access-workstations/overview', icon: { sourceName: 'Entra Privileged Identity Management', sourcePath: 'identity/02251-icon-service-Entra-Privileged-Identity-Management.svg', match: 'closest' } },
      { slug: 'ransomware', name: 'Ransomware protection', short: 'Ransomware', learn: 'https://learn.microsoft.com/en-us/security/ransomware/', icon: { sourceName: 'Shield Error', sourcePath: 'Microsoft/dark-blue-Shield Error.svg', match: 'closest' } },
      { slug: 'ai-security', name: 'Security for AI', short: 'AI security', learn: 'https://learn.microsoft.com/en-us/security/security-for-ai/', icon: { sourceName: 'Content Safety', sourcePath: 'ai-machine-learning/03390-icon-service-Content-Safety.svg', match: 'closest' } },
      { slug: 'secure-future-initiative', name: 'Secure Future Initiative', short: 'Secure Future Initiative', learn: 'https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-overview', icon: { sourceName: 'Advisor', sourcePath: 'management-governance/00003-icon-service-Advisor.svg', match: 'closest' } },
      { slug: 'zero-trust-developer', name: 'Zero Trust for developers', short: 'Developers', learn: 'https://learn.microsoft.com/en-us/security/zero-trust/develop/overview', icon: { sourceName: 'App Registrations', sourcePath: 'identity/10232-icon-service-App-Registrations.svg', match: 'closest' } },
      { slug: 'security-engineering', name: 'Security engineering and the SDL', short: 'Security engineering', learn: 'https://learn.microsoft.com/en-us/security/engineering/', icon: { sourceName: 'Bug', sourcePath: 'general/10784-icon-service-Bug.svg', match: 'closest' } },
      { slug: 'trusted-root', name: 'Microsoft Trusted Root Program', short: 'Trusted Root', learn: 'https://learn.microsoft.com/en-us/security/trusted-root/', icon: { sourceName: 'Certificate', sourcePath: 'Microsoft/dark-blue-Certificate.svg', match: 'closest' } }
    ],
    defaultProduct: 'zero-trust',

    topics: [
      { slug: 'identity', name: 'Identity and access', icon: { sourceName: 'Users', sourcePath: 'identity/10230-icon-service-Users.svg', match: 'closest' } },
      { slug: 'devices', name: 'Devices and endpoints', icon: { sourceName: 'Devices', sourcePath: 'intune/10332-icon-service-Devices.svg', match: 'closest' } },
      { slug: 'data', name: 'Data protection', icon: { sourceName: 'Document Lock', sourcePath: 'Microsoft/dark-blue-Document Lock.svg', match: 'closest' } },
      { slug: 'apps', name: 'Applications and APIs', icon: { sourceName: 'Enterprise Applications', sourcePath: 'identity/10225-icon-service-Enterprise-Applications.svg', match: 'closest' } },
      { slug: 'infrastructure', name: 'Infrastructure and networks', icon: { sourceName: 'Virtual Networks', sourcePath: 'networking/10061-icon-service-Virtual-Networks.svg', match: 'closest' } },
      { slug: 'ai', name: 'AI and agents', icon: { sourceName: 'Azure OpenAI', sourcePath: 'ai-machine-learning/03438-icon-service-Azure-OpenAI.svg', match: 'closest' } },
      { slug: 'frameworks', name: 'Standards and frameworks', icon: { sourceName: 'Compliance', sourcePath: 'management-governance/00011-icon-service-Compliance.svg', match: 'closest' } },
      { slug: 'architecture', name: 'Strategy and deployment', icon: { sourceName: 'Blueprints', sourcePath: 'management-governance/00006-icon-service-Blueprints.svg', match: 'closest' } },
      { slug: 'fundamentals', name: 'Fundamentals', icon: { sourceName: 'Guide', sourcePath: 'general/10810-icon-service-Guide.svg', match: 'closest' } },
      { slug: 'general', name: 'General', icon: { sourceName: 'Information', sourcePath: 'general/10005-icon-service-Information.svg', match: 'closest' } }
    ],
    defaultTopic: 'general',

    iconSource: { repository: ICONS, revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c' },

    stopwords: 'microsoft security zero trust guidance documentation docs update updated updates change changes new for with from into about that this your their has have will are and the how use using overview configure configuration guide learn support service services preview',

    searchAliases: {
      zt: 'zero trust',
      saf: 'security adoption framework',
      mcra: 'microsoft cybersecurity reference architecture',
      paw: 'privileged access workstation',
      sfi: 'secure future initiative',
      sdl: 'security development lifecycle',
      cae: 'continuous access evaluation',
      soc: 'security operations',
      ciso: 'chief information security officer',
      ramp: 'rapid modernization plan'
    }
  },

  // First match wins, over "<path> <title> <body>" lowercased, so a pattern
  // anchored with `^security-docs\/` reads the path. The narrower subtrees and
  // the operations and privileged-access pages that sit in zero-trust/ come
  // before the zero-trust catch-all, which is the default.
  classify: {
    products: [
      { slug: 'secure-future-initiative', match: /^security-docs\/zero-trust\/sfi\// },
      { slug: 'zero-trust-developer', match: /^security-docs\/zero-trust\/develop\// },
      { slug: 'ai-security', match: /^security-docs\/(security-for-ai|ai-red-team)\/|^security-docs\/zero-trust\/(catalog-ai-|copilots\/|workshop-zero-trust-ai-security|security-adoption-scenario-secure-ai|\S*ai-pillar|\S*get-ready-for-ai)/ },
      { slug: 'privileged-access', match: /^security-docs\/privileged-access-workstations\/|^security-docs\/zero-trust\/(security-concept-privileged-access|security-adoption-scenario-privileged-access|security-adoption-discipline-identity-access-privileged|adopt\/implement-privileged-access)/ },
      { slug: 'ransomware', match: /^security-docs\/ransomware\// },
      { slug: 'security-operations', match: /^security-docs\/zero-trust\/(security-operations-|security-adoption-discipline-security-operations|siem-xdr-|respond-incident-|workshop-business-security-operations|workshop-zero-trust-security-operations)/ },
      { slug: 'security-adoption', match: /^security-docs\/zero-trust\/(security-adoption-|workshop-business-|microsoft-reference-architecture|security-best-practices|security-standards-and-frameworks|security-platform|adopt\/)/ },
      { slug: 'security-engineering', match: /^security-docs\/engineering\// },
      { slug: 'trusted-root', match: /^security-docs\/trusted-root\// },
      { slug: 'zero-trust', match: /^security-docs\/zero-trust\// }
    ],
    topics: [
      { slug: 'ai', scope: 'title', match: /\b(ai|copilot|copilots|agent|agents|agentic|prompt|machine learning|aiml|red team)\b/ },
      { slug: 'frameworks', scope: 'title', match: /\b(cisa|dod|nist|framework|frameworks|standards?|maturity model|regulatory|compliance requirements)\b/ },
      { slug: 'identity', scope: 'title', match: /\b(identity|identities|authentication|mfa|conditional access|privileged|token|permissions?|consent|password|access)\b/ },
      { slug: 'devices', scope: 'title', match: /\b(device|devices|endpoint|endpoints|intune|workstations?|saw)\b/ },
      { slug: 'data', scope: 'title', match: /\b(data|information protection|dlp|encrypt\w*|sensitive)\b/ },
      { slug: 'apps', scope: 'title', match: /\b(app|apps|application|applications|saas|api|apis|software supply chain|source code)\b/ },
      { slug: 'infrastructure', scope: 'title', match: /\b(azure|network|networks|networking|infrastructure|iaas|paas|virtual|storage|tls|tenant|tenants)\b/ },
      { slug: 'architecture', scope: 'title', match: /\b(deploy\w*|plan\w*|implement\w*|adopt\w*|roadmap|strategy|workshop|architecture|modernization)\b/ },
      { slug: 'fundamentals', scope: 'title', match: /\b(overview|what is|introduction|concepts?)\b/ }
    ]
  },

  copy: {
    rssFeedLabel: 'Subscribe to the Daily Security News RSS feed',
    messageCenterHeading: 'Zero Trust in Message Center',
    landing: {
      heading: 'Today in Microsoft security guidance',
      blurb: 'Every tracked change across Microsoft\'s Zero Trust and security guidance, in plain English.'
    },
    directory: {
      productsLede: 'Every area of Microsoft security guidance tracked here, with what changed in each.',
      topicsLede: 'Cross-cutting themes, from identity and devices to AI and frameworks.'
    },
    search: {
      inputLabel: 'Search security guidance changes',
      placeholder: 'Search Microsoft security guidance changes'
    },
    compare: {
      pageTitle: 'Compare security guidance revisions',
      lede: 'Paste a Microsoft Learn URL to see exactly what changed between two revisions.',
      placeholderUrl: 'https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview',
      mapping: 'Security guidance pages map to merill/security-docs-mirror, rebuilt from Microsoft Learn.'
    },
    dailyEmail: {
      eyebrow: 'Daily Security News',
      intro: 'A short daily summary of what changed across Microsoft security guidance.'
    },
    detail: {
      adminHeading: 'What security teams need to know',
      adminImpactLabel: 'For security architects and administrators',
      summaryLabel: 'Change summary',
      summaryDisclosure: 'Summaries are generated from the documentation change itself.'
    },
    footer: {
      featureBlurb: 'Maester Cloud continuously tests your Microsoft 365 security configuration against Zero Trust guidance.',
      tagline: 'Daily.Security.Admin.News: an independent record of Microsoft security guidance changes.'
    },
    about: {
      heading: 'About Daily.Security.Admin.News',
      lede: 'A readable daily record of what Microsoft changed across its Zero Trust and security guidance.',
      whyItExists: [
        'Microsoft\'s security guidance, from Zero Trust deployment to privileged access, ransomware and AI security, changes constantly. Most changes are never announced anywhere.',
        'The guidance\'s documentation source is not public, so there is no commit history to read. This site rebuilds one from Microsoft Learn and writes down what changed.'
      ],
      howItWorks: [
        'Four times a day merill/security-docs-mirror fetches every page of the guidance on Microsoft Learn and commits the ones that changed.',
        'Every six hours this site reads that history. Each change is summarised, classified by area and theme, and published with a link to the exact revision that produced it.',
        'Nothing here is official. It is a reading of the public documentation.'
      ],
      emailEyebrow: 'Daily Security News',
      emailBody: 'A short daily summary of what changed across Microsoft security guidance.',
      extraSections: [],
      community: [
        'Built by Merill Fernando as part of the Admin.News network of daily and weekly Microsoft newsletters.'
      ],
      quote: 'The documentation changes every day. Somebody should be reading it.',
      bio: 'Merill Fernando builds tools for Microsoft identity and security administrators.'
    }
  }
};
