// __tests__/formBotDetection.test.ts
import { looksLikeBot } from "@/components/reuse/Form/formTypes";
import type {
  ContactFormData,
  TradeFormData,
} from "@/components/reuse/Form/formTypes";

describe("Bot Detection Tests", () => {
  // ============================================
  // CONTACT FORM TESTS
  // ============================================

  describe("ContactForm - Should BLOCK (detect as bot)", () => {
    test("honeypot filled", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        company: "Spam Company", // ← HONEYPOT FILLED
        details: "I would like a custom sign for my business location",
        budgetMin: 2000,
        budgetMax: 4000,
        width: 48,
        height: 24,
        uploads: [
          { name: "design.jpg", type: "image/jpeg", data: "base64data" },
        ],
      };
      expect(looksLikeBot(formData)).toBe(true);
    });

    test("all default values + no uploads + short details", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "I want a sign", // ← TOO SHORT (< 40 chars)
        budgetMin: 1500, // ← DEFAULT
        budgetMax: 5000, // ← DEFAULT
        width: 36, // ← DEFAULT
        height: 36, // ← DEFAULT
        uploads: [], // ← NO UPLOADS
      };
      expect(looksLikeBot(formData)).toBe(true);
    });

    test("default budget + no uploads + short details (no dimensions)", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "Quick sign", // ← TOO SHORT
        budgetMin: 1500, // ← DEFAULT
        budgetMax: 5000, // ← DEFAULT
        uploads: [], // ← NO UPLOADS
      };
      expect(looksLikeBot(formData)).toBe(true);
    });
  });

  describe("ContactForm - Should ALLOW (human)", () => {
    test("changed budget values", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "Short text", // Even short details
        budgetMin: 2000, // ← CHANGED
        budgetMax: 4000, // ← CHANGED
        width: 36,
        height: 36,
        uploads: [],
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("uploaded files", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "I want a sign",
        budgetMin: 1500,
        budgetMax: 5000,
        width: 36,
        height: 36,
        uploads: [
          { name: "design.jpg", type: "image/jpeg", data: "base64data" },
        ], // ← HAS UPLOAD
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("long details text", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details:
          "I would like to order a custom wooden sign for my restaurant. The sign should feature our logo and be weatherproof.", // ← LONG ENOUGH
        budgetMin: 1500,
        budgetMax: 5000,
        width: 36,
        height: 36,
        uploads: [],
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("changed dimensions", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "Quick sign",
        budgetMin: 1500,
        budgetMax: 5000,
        width: 48, // ← CHANGED
        height: 24, // ← CHANGED
        uploads: [],
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("real human submission example", () => {
      const formData: ContactFormData = {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@design-studio.com",
        details:
          "Hi! I'm looking for a custom wood sign for our new office space. We want something rustic with our company name and logo. Can you help?",
        budgetMin: 2500,
        budgetMax: 4500,
        width: 60,
        height: 30,
        uploads: [
          { name: "logo.png", type: "image/png", data: "base64data" },
          { name: "inspiration.jpg", type: "image/jpeg", data: "base64data" },
        ],
      };
      expect(looksLikeBot(formData)).toBe(false);
    });
  });

  // ============================================
  // TRADE FORM TESTS
  // ============================================

  describe("TradeForm - Should BLOCK (detect as bot)", () => {
    test("honeypot filled", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        company: "Spam Inc", // ← HONEYPOT FILLED
        details:
          "I am interested in partnering with your company for trade opportunities",
      };
      expect(looksLikeBot(formData)).toBe(true);
    });

    test("very short details text (< 10 chars)", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        details: "test", // ← TOO SHORT (< 10 chars)
      };
      expect(looksLikeBot(formData)).toBe(true);
    });

    test("empty details", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        details: "", // ← EMPTY
      };
      expect(looksLikeBot(formData)).toBe(true);
    });
  });

  describe("TradeForm - Should ALLOW (human)", () => {
    test("brief but legitimate inquiry (10+ chars)", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        details: "Interested in trade", // ← 20 chars, should be fine
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("long enough details", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@design-firm.com",
        details:
          "Hello! I run an interior design firm and we frequently work with custom signage. Would love to discuss a trade partnership.",
      };
      expect(looksLikeBot(formData)).toBe(false);
    });

    test("real human trade inquiry", () => {
      const formData: TradeFormData = {
        firstName: "Michael",
        lastName: "Chen",
        email: "michael@architecture-studio.com",
        details:
          "Hi there! I'm an architect and often have clients asking about custom wood signage for their projects. I'd like to explore a trade program where I can refer clients to you. Let me know if this is something you offer!",
      };
      expect(looksLikeBot(formData)).toBe(false);
    });
  });
});
