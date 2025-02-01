import { defineAction } from "astro:actions";

import SampleEmail from "../emails/sampleEmail";
import { render } from "@react-email/render";
import { z } from "astro:schema";

// Dynamisches Importieren von `resend`, um es nur auf dem Server zu laden
const Resend = import.meta.env.SSR ? (await import("resend")).Resend : null;

const resend = Resend ? new Resend(import.meta.env.RESEND_API_KEY) : null;

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string().optional(),
    }),
    handler: async ({ name, email, message }) => {
      if (!resend) {
        throw new Error("Resend kann nur auf dem Server genutzt werden.");
      }

      const emailContent = SampleEmail({ name, message });
      const html = await render(emailContent);
      const text = await render(emailContent, { plainText: true });

      await resend.emails.send({
        from: "Matratzen24 Duisburg <matratzen24-duisburg@resend.dev>",
        to: [email],
        subject: "Ihre Nachricht ist bei uns eingegangen",
        html,
        text,
      });

      await resend.emails.send({
        from: "Matratzen24 Duisburg <matratzen24-duisburg@resend.dev>",
        to: ["h.endrik.rudek@gmail.com"],
        subject: "Neue Kundenanfrage erhalten",
        html,
        text,
      });

      return { success: true };
    },
  }),
};
