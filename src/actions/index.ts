import { defineAction } from "astro:actions";
import { Resend } from "resend";
import SampleEmail from "../emails/sampleEmail";
import { render } from "@react-email/render";
import { z } from "astro:schema";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string().optional(),
    }),
    handler: async ({ name, email, message }) => {
      // create the email
      const emailContent = SampleEmail({ name, message });
      const html = await render(emailContent);
      const text = await render(emailContent, {
        plainText: true,
      });

      // send an email
      const { data, error } = await resend.emails.send({
        from: "Matratzen24 Duisburg <noreply@matratzen24-duisburg.de>",
        to: [email],
        bcc: ["verkauf@lepur.de"],
        subject: "Ihre Nachricht ist bei uns eingegangen",
        html,
        text,
      });

      console.log(data);

      if (error) {
        throw error;
      }

      return data;
    },
  }),
};
