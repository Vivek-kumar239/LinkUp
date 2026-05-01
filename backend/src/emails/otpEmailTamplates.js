export function createOtpEmailTemplate(otp, name) {
  return`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinkUp Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2563eb; padding: 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">LinkUp</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px; color: #334155;">
                            <h2 style="margin-top: 0; color: #1e293b;">Reset Your Password</h2>
                            <p style="font-size: 16px; line-height: 1.6;">Hello ${name},</p>
                            <p style="font-size: 16px; line-height: 1.6;">We received a request to reset the password for your account. Use the following code to complete the verification process:</p>
                            
                            <!-- OTP Box -->
                            <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f1f5f9; border-radius: 12px; border: 1px dashed #cbd5e1;">
                                <span style="font-size: 32px; font-weight: 800; color: #2563eb; letter-spacing: 8px;">${otp}</span>
                            </div>

                            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">
                                This code is valid for <strong>10 minutes</strong>. After that, you will need to request a new one[cite: 1]. 
                                For security, do not share this code with anyone.
                            </p>
                            
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                            
                            <p style="font-size: 13px; color: #94a3b8; line-height: 1.4;">
                                If you did not request a password reset, you can safely ignore this email. Your account remains secure[cite: 1].
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f8fafc; color: #94a3b8; font-size: 12px;">
                            &copy; 2026 LinkUp App. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
} 