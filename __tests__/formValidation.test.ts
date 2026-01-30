// __tests__/formValidation.test.ts
import type {
  ContactFormData,
  TradeFormData,
  FormErrorData,
} from "@/components/reuse/Form/formTypes";

// ============================================
// VALIDATION HELPER (mimics your validateForm logic)
// ============================================

const validateContactForm = (
  formData: ContactFormData,
): { isValid: boolean; errors: FormErrorData } => {
  const errors: FormErrorData = {};
  const requiredFields: (keyof ContactFormData)[] = [
    "firstName",
    "lastName",
    "email",
    "details",
    "budgetMin",
    "budgetMax",
  ];

  requiredFields.forEach((key) => {
    if (!formData[key]) {
      errors[key] = true;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateTradeForm = (
  formData: TradeFormData,
): { isValid: boolean; errors: FormErrorData } => {
  const errors: FormErrorData = {};
  const requiredFields: (keyof TradeFormData)[] = [
    "firstName",
    "lastName",
    "email",
    "details",
  ];

  requiredFields.forEach((key) => {
    if (!formData[key]) {
      errors[key] = true;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================
// CONTACT FORM VALIDATION TESTS
// ============================================

describe("ContactForm Validation", () => {
  describe("Should PASS validation", () => {
    test("all required fields filled", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details:
          "I need a custom wooden sign for my restaurant with our logo prominently displayed.",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test("with optional fields (width, height, uploads)", () => {
      const formData: ContactFormData = {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@design.com",
        details: "Looking for a 48x24 inch sign for our office entrance.",
        budgetMin: 1800,
        budgetMax: 3500,
        width: 48,
        height: 24,
        uploads: [{ name: "logo.png", type: "image/png", data: "base64data" }],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe("Should FAIL validation", () => {
    test("missing firstName", () => {
      const formData: ContactFormData = {
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
        details: "I need a sign",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBe(true);
    });

    test("missing lastName", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "",
        email: "john@example.com",
        details: "I need a sign",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.lastName).toBe(true);
    });

    test("missing email", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "",
        details: "I need a sign",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe(true);
    });

    test("missing details", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.details).toBe(true);
    });

    test("multiple missing fields", () => {
      const formData: ContactFormData = {
        firstName: "",
        lastName: "",
        email: "john@example.com",
        details: "",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBe(true);
      expect(result.errors.lastName).toBe(true);
      expect(result.errors.details).toBe(true);
    });

    test("completely empty form", () => {
      const formData: ContactFormData = {
        firstName: "",
        lastName: "",
        email: "",
        details: "",
        budgetMin: 0,
        budgetMax: 0,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });
  });

  describe("Optional fields should NOT cause validation failure", () => {
    test("width and height not provided", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "I need a custom sign for my business",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
        // width and height intentionally not set
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
    });

    test("no uploads provided", () => {
      const formData: ContactFormData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        details: "I need a custom sign for my business",
        budgetMin: 2000,
        budgetMax: 4000,
        uploads: [],
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
    });
  });
});

// ============================================
// TRADE FORM VALIDATION TESTS
// ============================================

describe("TradeForm Validation", () => {
  describe("Should PASS validation", () => {
    test("all required fields filled", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@design-firm.com",
        details:
          "I run an interior design firm and would like to discuss a trade partnership for custom signage projects.",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test("with honeypot field (should not affect validation)", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@design-firm.com",
        details: "Interested in trade partnership opportunities.",
        company: "", // honeypot empty is fine
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(true);
    });
  });

  describe("Should FAIL validation", () => {
    test("missing firstName", () => {
      const formData: TradeFormData = {
        firstName: "",
        lastName: "Smith",
        email: "jane@design-firm.com",
        details: "Interested in partnership",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBe(true);
    });

    test("missing lastName", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "",
        email: "jane@design-firm.com",
        details: "Interested in partnership",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.lastName).toBe(true);
    });

    test("missing email", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "",
        details: "Interested in partnership",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe(true);
    });

    test("missing details", () => {
      const formData: TradeFormData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@design-firm.com",
        details: "",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.details).toBe(true);
    });

    test("multiple missing fields", () => {
      const formData: TradeFormData = {
        firstName: "",
        lastName: "",
        email: "",
        details: "",
      };

      const result = validateTradeForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBe(true);
      expect(result.errors.lastName).toBe(true);
      expect(result.errors.email).toBe(true);
      expect(result.errors.details).toBe(true);
    });
  });
});

// ============================================
// EMAIL FORMAT VALIDATION (BONUS)
// ============================================

describe("Email Format Validation", () => {
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  describe("Valid email formats", () => {
    test("standard email", () => {
      expect(isValidEmail("john@example.com")).toBe(true);
    });

    test("email with subdomain", () => {
      expect(isValidEmail("jane@design.studio.com")).toBe(true);
    });

    test("email with numbers", () => {
      expect(isValidEmail("user123@domain.com")).toBe(true);
    });

    test("email with hyphen", () => {
      expect(isValidEmail("john-doe@example.com")).toBe(true);
    });
  });

  describe("Invalid email formats", () => {
    test("missing @", () => {
      expect(isValidEmail("johnexample.com")).toBe(false);
    });

    test("missing domain", () => {
      expect(isValidEmail("john@")).toBe(false);
    });

    test("missing username", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });

    test("spaces in email", () => {
      expect(isValidEmail("john doe@example.com")).toBe(false);
    });

    test("missing TLD", () => {
      expect(isValidEmail("john@example")).toBe(false);
    });
  });
});
