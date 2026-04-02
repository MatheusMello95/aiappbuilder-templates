export const authors = {
  1: {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Full-stack developer and tech writer. Passionate about web performance and developer experience.',
    social: { twitter: '#', github: '#' },
  },
  2: {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    bio: 'Senior engineer focusing on distributed systems and cloud architecture.',
    social: { twitter: '#', github: '#' },
  },
  3: {
    id: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    bio: 'UI/UX designer turned frontend developer. Loves crafting beautiful interfaces.',
    social: { twitter: '#', github: '#' },
  },
};

export const categories = [
  { slug: 'technology', name: 'Technology', color: '#6366f1' },
  { slug: 'design', name: 'Design', color: '#ec4899' },
  { slug: 'development', name: 'Development', color: '#10b981' },
  { slug: 'tutorials', name: 'Tutorials', color: '#f59e0b' },
  { slug: 'career', name: 'Career', color: '#8b5cf6' },
  { slug: 'productivity', name: 'Productivity', color: '#06b6d4' },
];

export const posts = [
  {
    id: 1,
    slug: 'building-modern-web-apps-with-react-19',
    title: 'Building Modern Web Apps with React 19',
    excerpt: 'Explore the latest features in React 19 including server components, actions, and the new use() hook that are transforming how we build web applications.',
    content: `React 19 represents a major leap forward in how we build web applications. With the introduction of server components, actions, and the new use() hook, developers now have powerful tools to create faster, more efficient apps.

## Server Components

Server components allow you to render components on the server, reducing the JavaScript bundle sent to the client. This means faster initial page loads and better performance on low-powered devices.

\`\`\`jsx
// This component runs on the server
async function BlogPosts() {
  const posts = await fetchPosts();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Actions

Actions simplify form handling and data mutations. Instead of managing loading states and error handling manually, actions handle this automatically.

\`\`\`jsx
function CreatePost() {
  async function handleSubmit(formData) {
    'use server';
    const title = formData.get('title');
    await savePost({ title });
  }

  return (
    <form action={handleSubmit}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
\`\`\`

## The use() Hook

The new \`use()\` hook lets you read resources like promises and context in a more flexible way than before. You can call it conditionally, inside loops, and in ways that weren't possible with other hooks.

## Performance Improvements

React 19 also brings significant performance improvements under the hood. The new compiler optimizes re-renders automatically, reducing the need for manual memoization with \`useMemo\` and \`useCallback\`.

These improvements make React 19 an exciting release for both new and experienced developers. The framework continues to evolve in ways that make building complex web applications simpler and more efficient.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    authorId: 1,
    category: 'development',
    tags: ['react', 'javascript', 'web-development'],
    publishedAt: '2026-03-20',
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    slug: 'the-art-of-minimal-design',
    title: 'The Art of Minimal Design in 2026',
    excerpt: 'Why less is more in modern web design. Learn how minimalist principles can create more impactful and user-friendly digital experiences.',
    content: `Minimalism in web design isn't about removing features — it's about presenting them in the clearest, most purposeful way possible. In 2026, this philosophy has become more relevant than ever.

## White Space is Your Friend

The most powerful element in minimal design is what you don't see. White space (or negative space) gives your content room to breathe and helps users focus on what matters.

## Typography as Design

When you strip away visual noise, typography becomes your primary design tool. Choose fonts that communicate your brand's personality and ensure readability at every size.

## Color with Purpose

Minimal design doesn't mean monochrome. Use color strategically — a single accent color can create more impact than a rainbow palette. Every color should serve a purpose, whether it's guiding attention, indicating interactivity, or conveying meaning.

## Intentional Interactions

Every animation, transition, and hover effect should have a reason. Micro-interactions should provide feedback and delight without overwhelming the user. The best interactions feel natural and almost invisible.

## The Grid System

A strong grid system is the backbone of minimal design. It creates visual consistency and helps users navigate content intuitively. CSS Grid and Flexbox have made implementing complex grid layouts more accessible than ever.

## Conclusion

Minimal design is a practice of restraint and intention. By removing the unnecessary, you amplify what remains. The result is interfaces that are not just beautiful, but genuinely easier to use.`,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    authorId: 3,
    category: 'design',
    tags: ['design', 'ui-ux', 'minimalism'],
    publishedAt: '2026-03-18',
    readTime: 6,
    featured: true,
  },
  {
    id: 3,
    slug: 'mastering-typescript-advanced-patterns',
    title: 'Mastering TypeScript: Advanced Patterns',
    excerpt: 'Deep dive into advanced TypeScript patterns including conditional types, template literal types, and the builder pattern for type-safe APIs.',
    content: `TypeScript continues to evolve, and mastering its advanced features can dramatically improve your code quality and developer experience.

## Conditional Types

Conditional types allow you to create types that depend on other types. They follow a pattern similar to ternary expressions:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;      // false
\`\`\`

## Template Literal Types

Template literal types let you manipulate string types at the type level:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<"click">; // "onClick"
\`\`\`

## The Builder Pattern

Create type-safe, fluent APIs using the builder pattern:

\`\`\`typescript
class QueryBuilder<T extends Record<string, unknown>> {
  private filters: Partial<T> = {};

  where<K extends keyof T>(key: K, value: T[K]) {
    this.filters[key] = value;
    return this;
  }

  build() {
    return this.filters;
  }
}
\`\`\`

## Branded Types

Prevent mixing up similar primitive types by branding them:

\`\`\`typescript
type UserId = string & { __brand: 'UserId' };
type PostId = string & { __brand: 'PostId' };

function getUser(id: UserId) { /* ... */ }
function getPost(id: PostId) { /* ... */ }
\`\`\`

These patterns help you write more expressive, safer TypeScript that catches bugs at compile time rather than runtime.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    authorId: 2,
    category: 'development',
    tags: ['typescript', 'javascript', 'patterns'],
    publishedAt: '2026-03-15',
    readTime: 10,
    featured: false,
  },
  {
    id: 4,
    slug: 'getting-started-with-edge-computing',
    title: 'Getting Started with Edge Computing',
    excerpt: 'A practical guide to deploying your applications at the edge for better performance, lower latency, and improved user experiences worldwide.',
    content: `Edge computing brings your application logic closer to your users, reducing latency and improving performance. Here's how to get started.

## What is Edge Computing?

Edge computing runs your code on servers distributed around the world, close to where your users are. Instead of a single server in one region, your app runs on dozens or hundreds of nodes globally.

## Benefits

- **Lower latency**: Responses travel shorter distances
- **Better reliability**: No single point of failure
- **Improved performance**: Faster page loads and API responses
- **Cost efficiency**: Reduced bandwidth for origin servers

## Edge Functions

Most edge platforms support JavaScript/TypeScript functions that run in lightweight runtimes:

\`\`\`javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Personalize content based on location
    const country = request.headers.get('cf-ipcountry');

    return new Response(
      JSON.stringify({ message: \`Hello from \${country}!\` }),
      { headers: { 'content-type': 'application/json' } }
    );
  }
};
\`\`\`

## When to Use Edge Computing

Edge computing shines for:
- API routing and middleware
- A/B testing and feature flags
- Authentication and authorization
- Image optimization and transformation
- Personalization and localization

## Getting Started

1. Choose a platform (Cloudflare Workers, Vercel Edge, Deno Deploy)
2. Start with simple middleware (redirects, headers)
3. Gradually move more logic to the edge
4. Monitor performance improvements

Edge computing is becoming the default for modern web applications. Start small and expand as you see the benefits.`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    authorId: 2,
    category: 'technology',
    tags: ['edge-computing', 'performance', 'cloud'],
    publishedAt: '2026-03-12',
    readTime: 7,
    featured: false,
  },
  {
    id: 5,
    slug: 'css-has-selector-complete-guide',
    title: 'CSS :has() Selector: The Complete Guide',
    excerpt: 'The CSS :has() selector has changed everything. Learn how this "parent selector" enables powerful new styling patterns without JavaScript.',
    content: `The CSS \`:has()\` selector is the most significant CSS feature in years. It allows you to style an element based on its descendants — something previously impossible with CSS alone.

## Basic Syntax

\`\`\`css
/* Style a card that contains an image */
.card:has(img) {
  grid-template-rows: 200px 1fr;
}

/* Style a form with invalid inputs */
form:has(:invalid) {
  border-color: red;
}
\`\`\`

## Real-World Examples

### Navigation highlighting
\`\`\`css
nav:has(.dropdown:hover) {
  background: rgba(0, 0, 0, 0.05);
}
\`\`\`

### Responsive layouts without media queries
\`\`\`css
.grid:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}

.grid:has(> :nth-child(7)) {
  grid-template-columns: repeat(3, 1fr);
}
\`\`\`

### Form validation styling
\`\`\`css
.field:has(input:invalid) .error-message {
  display: block;
}

.field:has(input:valid) .success-icon {
  opacity: 1;
}
\`\`\`

## Combining with Other Selectors

\`:has()\` becomes even more powerful when combined with \`:not()\`, \`:is()\`, and other pseudo-classes:

\`\`\`css
/* Style empty states */
.list:not(:has(li)) {
  display: grid;
  place-items: center;
}

/* Style based on sibling state */
.tab:has(+ .tab:hover) {
  opacity: 0.7;
}
\`\`\`

## Browser Support

As of 2026, \`:has()\` is supported in all major browsers. It's production-ready and you should be using it today.

The \`:has()\` selector eliminates many cases where JavaScript was needed for styling logic. It makes CSS more expressive and reduces the gap between design intent and implementation.`,
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    authorId: 1,
    category: 'tutorials',
    tags: ['css', 'web-development', 'frontend'],
    publishedAt: '2026-03-10',
    readTime: 9,
    featured: true,
  },
  {
    id: 6,
    slug: 'building-a-successful-tech-career',
    title: 'Building a Successful Tech Career in 2026',
    excerpt: 'Practical advice for navigating the modern tech landscape, from choosing specializations to building your personal brand and network.',
    content: `The tech industry in 2026 looks very different from even a few years ago. Here's how to build a thriving career in this evolving landscape.

## Choose Your Path

The days of being a "generalist" are evolving. While broad knowledge is valuable, having a deep specialization gives you a competitive edge:

- **AI/ML Engineering**: Building and deploying machine learning systems
- **Platform Engineering**: Internal developer platforms and tooling
- **Security Engineering**: Increasingly critical as threats evolve
- **Full-Stack Development**: Still in high demand, especially with modern frameworks

## Build in Public

Share your work, write about what you learn, and contribute to open source. This creates a portfolio that speaks louder than any resume:

1. Start a technical blog (you're reading one!)
2. Share projects on GitHub
3. Engage in technical discussions
4. Speak at local meetups

## Continuous Learning

The tech landscape changes rapidly. Dedicate time each week to learning:

- Read technical blogs and documentation
- Take focused online courses
- Build side projects to experiment
- Pair program with colleagues who have different expertise

## Networking

Your network is your net worth in tech. But networking doesn't mean collecting LinkedIn connections:

- Contribute meaningfully to communities
- Help others without expecting returns
- Attend conferences and meetups
- Build genuine relationships

## Work-Life Balance

Sustainable careers require balance. Burnout is real and common in tech:

- Set boundaries with work hours
- Invest in hobbies outside coding
- Take real vacations
- Know when to say no

Building a successful tech career is a marathon, not a sprint. Focus on consistent growth, meaningful connections, and work that energizes you.`,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    authorId: 3,
    category: 'career',
    tags: ['career', 'growth', 'advice'],
    publishedAt: '2026-03-08',
    readTime: 7,
    featured: false,
  },
  {
    id: 7,
    slug: 'optimizing-developer-workflows',
    title: 'Optimizing Your Developer Workflow',
    excerpt: 'Practical tips and tools to streamline your development process, from terminal setup to IDE configuration and automation scripts.',
    content: `Small improvements in your workflow compound over time. Here are practical optimizations that can save you hours every week.

## Terminal Setup

Your terminal is where you spend most of your time. Invest in setting it up:

- Use a modern terminal emulator (Warp, Ghostty, Kitty)
- Configure shell aliases for common commands
- Use a prompt that shows git status and context
- Install fuzzy finders (fzf) for file and history search

## IDE Configuration

A well-configured IDE is a force multiplier:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.linkedEditing": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true
}
\`\`\`

## Git Workflows

Streamline your git workflow:

- Use conventional commits for clear history
- Set up git hooks for linting and testing
- Create aliases for common operations
- Use interactive rebase to keep history clean

## Automation

Automate repetitive tasks:

- CI/CD pipelines for testing and deployment
- Code generators for boilerplate
- Scripts for environment setup
- Automated dependency updates

## Keyboard Shortcuts

Learn the keyboard shortcuts for your tools. The time investment pays off exponentially:

- Navigation shortcuts in your IDE
- Terminal multiplexer shortcuts
- Browser DevTools shortcuts
- OS-level window management

## The 2-Minute Rule

If a task takes less than 2 minutes to automate, do it now. If it takes longer, add it to your automation backlog and prioritize based on frequency.

Your workflow is a product. Iterate on it regularly, measure where time goes, and optimize the bottlenecks.`,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    authorId: 1,
    category: 'productivity',
    tags: ['productivity', 'tools', 'workflow'],
    publishedAt: '2026-03-05',
    readTime: 6,
    featured: false,
  },
  {
    id: 8,
    slug: 'understanding-web-accessibility',
    title: 'Understanding Web Accessibility: A Developer Guide',
    excerpt: 'Accessibility isn\'t optional. Learn the fundamentals of building inclusive web experiences that work for everyone.',
    content: `Web accessibility ensures that websites and applications are usable by everyone, regardless of ability. It's not just the right thing to do — it's often a legal requirement.

## The POUR Principles

Accessible content must be:

1. **Perceivable**: Users must be able to perceive the information
2. **Operable**: Users must be able to operate the interface
3. **Understandable**: Users must understand the information and UI
4. **Robust**: Content must work with current and future technologies

## Semantic HTML

The foundation of accessibility is semantic HTML:

\`\`\`html
<!-- Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
\`\`\`

## ARIA When Needed

Use ARIA attributes when HTML semantics aren't enough:

\`\`\`html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <div role="tabpanel" id="panel-1">
    Content for tab 1
  </div>
</div>
\`\`\`

## Color and Contrast

Ensure sufficient color contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- Never use color as the only way to convey information

## Keyboard Navigation

Everything must be operable with a keyboard:
- All interactive elements must be focusable
- Focus order must be logical
- Focus indicators must be visible
- No keyboard traps

## Testing

- Use automated tools (axe, Lighthouse)
- Test with screen readers (VoiceOver, NVDA)
- Test with keyboard only
- Test with reduced motion settings

Accessibility is a journey, not a destination. Start with the basics and improve incrementally.`,
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop',
    authorId: 2,
    category: 'development',
    tags: ['accessibility', 'web-development', 'html'],
    publishedAt: '2026-03-02',
    readTime: 8,
    featured: false,
  },
  {
    id: 9,
    slug: 'state-of-ai-in-software-development',
    title: 'The State of AI in Software Development',
    excerpt: 'How AI is reshaping software development in 2026 — from code generation to testing, debugging, and beyond.',
    content: `AI has fundamentally changed how we write software. Here's an honest look at where things stand in 2026.

## Code Generation

AI-powered code generation has matured significantly:

- **Inline completions**: Near-universal adoption in IDEs
- **Code generation from prompts**: Reliable for boilerplate and common patterns
- **Refactoring assistance**: AI can suggest and implement refactors
- **Test generation**: Automated test writing is becoming practical

## Where AI Excels

- Boilerplate code and repetitive patterns
- Code translation between languages
- Documentation generation
- Bug detection and suggestions
- Code review assistance

## Where Humans Still Lead

- Architecture and system design decisions
- Understanding business requirements
- Creative problem-solving for novel challenges
- Code review for security and correctness
- Maintaining code quality standards

## Best Practices for AI-Assisted Development

1. **Review everything**: AI-generated code needs the same scrutiny as human code
2. **Understand before accepting**: Don't accept code you can't explain
3. **Use AI for acceleration, not replacement**: It's a tool, not a developer
4. **Stay current**: AI capabilities evolve rapidly
5. **Maintain your skills**: Don't let AI make you a weaker developer

## The Productivity Impact

Studies show AI tools can increase developer productivity by 20-40% for certain tasks. But the real benefit isn't just speed — it's reducing context switches and cognitive load.

## Looking Ahead

AI in software development will continue to evolve. The developers who thrive will be those who learn to collaborate effectively with AI tools while maintaining strong fundamental skills.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    authorId: 1,
    category: 'technology',
    tags: ['ai', 'technology', 'future'],
    publishedAt: '2026-02-28',
    readTime: 7,
    featured: false,
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
  return posts.filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts() {
  return posts.filter((p) => p.featured);
}

export function searchPosts(query) {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getAuthor(id) {
  return authors[id];
}
