import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponose } from "@/types/ApiRespons";

export async function sendValrificationEmail(
  email: string,
  username: string,
  otp: string
): Promise<ApiResponose> {
  try {
    await resend.emails.send({
      from: "<onboarding@resend.dev>",
      to: email,
      subject: "FeedbackUser | Verification Code",
      react: VerificationEmail({ username, otp }),
    });
    return {
      success: true,
      message: "verification email send successfully...",
    };
  } catch (emailError) {
    console.error("Error sending verificaion email", emailError);
    return {
      success: false,
      message: "Failed to sending verification email!!....",
    };
  }
}
