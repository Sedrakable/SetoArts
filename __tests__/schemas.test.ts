// Validates the JSON-LD structured-data builders.
// Acts as a fast local check that the markup is well-formed and GBP-consistent
// before deploying (no Sanity/env needed — these are pure functions).

import {
  localBusinessSchema,
  webSiteSchema,
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
  portableTextToPlain,
} from "@/components/JsonLd/schemas";
import { LocalPaths } from "@/data.d";

describe("LocalBusiness schema", () => {
  const schema = localBusinessSchema("en") as Record<string, any>;

  it("declares the right type + GBP-matching name", () => {
    expect(schema["@type"]).toBe("LocalBusiness");
    expect(schema.name).toBe("Seto x Arts | Custom LED Wood Signs");
  });

  it("includes the synced NAP fields", () => {
    expect(schema.telephone).toBe("+1-438-405-8699");
    expect(schema.address.addressLocality).toBe("Laval");
    expect(schema.address.postalCode).toBe("H7R 2B7");
    expect(schema.geo.latitude).toBeTruthy();
    expect(schema.foundingDate).toBe("2024-09-01");
  });

  it("serves the GBP areas including Fabreville", () => {
    const cities = schema.areaServed.map((a: any) => a.name);
    expect(cities).toEqual(expect.arrayContaining(["Laval", "Montreal", "Fabreville"]));
  });

  it("omits empty fields entirely (no blank keys)", () => {
    for (const value of Object.values(schema)) {
      expect(value).not.toBe("");
    }
  });

  it("is JSON-serializable (valid for ld+json output)", () => {
    expect(() => JSON.stringify(schema)).not.toThrow();
  });
});

describe("Service + WebSite schemas", () => {
  it("links the service to the business and localizes FR", () => {
    const en = serviceSchema("en") as Record<string, any>;
    const fr = serviceSchema("fr") as Record<string, any>;
    expect(en.serviceType).toMatch(/Custom LED Wood Signs/);
    expect(fr.serviceType).toMatch(/sur mesure/);
    expect(en.provider["@id"]).toContain("#business");
  });

  it("website node references the business as publisher", () => {
    const site = webSiteSchema("en") as Record<string, any>;
    expect(site["@type"]).toBe("WebSite");
    expect(site.publisher["@id"]).toContain("#business");
  });
});

describe("Breadcrumb schema", () => {
  it("numbers items in order with absolute URLs", () => {
    const bc = breadcrumbSchema("en", [
      { name: "Home", path: LocalPaths.HOME },
      { name: "Projects", path: LocalPaths.PROJECTS },
      { name: "Cafe Sign", path: `${LocalPaths.PROJECTS}/cafe-sign` },
    ]) as Record<string, any>;
    expect(bc.itemListElement).toHaveLength(3);
    expect(bc.itemListElement[0].position).toBe(1);
    expect(bc.itemListElement[2].item).toContain("/en/projects/cafe-sign");
  });
});

describe("FAQPage schema", () => {
  it("builds Q&A from Portable Text answers", () => {
    const faq = faqPageSchema([
      {
        question: "How long does a sign take?",
        answer: [
          { _type: "block", children: [{ text: "Usually 2 to 4 weeks." }] },
        ],
      },
    ]) as Record<string, any>;
    expect(faq.mainEntity[0].name).toBe("How long does a sign take?");
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe("Usually 2 to 4 weeks.");
  });

  it("returns null when there are no usable questions", () => {
    expect(faqPageSchema([])).toBeNull();
    expect(faqPageSchema([{ question: "", answer: "" }])).toBeNull();
  });

  it("flattens plain strings and portable text alike", () => {
    expect(portableTextToPlain("hello")).toBe("hello");
    expect(
      portableTextToPlain([
        { _type: "block", children: [{ text: "a" }, { text: "b" }] },
      ]),
    ).toBe("ab");
  });
});
