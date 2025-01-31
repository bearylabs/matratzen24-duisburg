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
    }),
    handler: async ({ name, email }) => {
      // create the email
      const emailContent = SampleEmail({ name });
      const html = await render(emailContent);
      const text = await render(emailContent, {
        plainText: true,
      });

      // send an email
      const { data, error } = await resend.emails.send({
        from: "Matratzen24 Duisburg <matratzen24-duisburg@resend.dev>",
        to: [email],
        subject: "It works!",
        html,
        text,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  }),
};
