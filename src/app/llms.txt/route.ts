import { guides } from "@/lib/guides";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** A plain-text summary of the business for AI assistants. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## About",
    `- Website: ${site.url}`,
    "- What we build: custom business websites, e-commerce, AI chatbots and integration, AI booking systems, AI lead generation, website redesign, SEO and speed optimization, maintenance and support.",
    "- How we quote: every project is scoped to the business; there is no public price list. Request a quote through the project form on the home page.",
    "",
    "## Key pages",
    `- [Services](${site.url}/#services)`,
    `- [Portfolio](${site.url}/#work)`,
    `- [Industries](${site.url}/industries)`,
    `- [Guides](${site.url}/guides)`,
    `- [Privacy policy](${site.url}/privacy)`,
    "",
    "## Industries",
    ...industries.map((i) => `- [${i.name}](${site.url}/industries/${i.slug})`),
    "",
    "## Guides",
    ...guides.map((g) => `- [${g.title}](${site.url}/guides/${g.slug})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
