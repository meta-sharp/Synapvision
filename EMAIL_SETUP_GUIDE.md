# Email Setup Guide for Contact Form

This guide will help you set up email functionality for your contact form using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose **Gmail** as your email provider
4. Follow these Gmail setup steps:
   - Sign in with your Gmail account (career.metasharp@gmail.com)
   - Allow EmailJS to access your Gmail
   - Enable 2-factor authentication if prompted
   - Generate an App Password if required
5. Note down your **Service ID** (you'll need this later)

**Important:** Since you're using Gmail, you may need to:
- Enable "Less secure app access" or use App Passwords
- Allow EmailJS to send emails on your behalf

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. Save the template and note down your **Template ID**

## Step 3.5: Configure Multiple Recipients

Your form is already configured to send emails to both:
- career.metasharp@gmail.com
- contact@metasharp.info

In your EmailJS template, make sure the "To Email" field is set to: `{{to_email}}`

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

## Step 5: Update Your Code

Replace the following placeholders in `templatemo-personal-javascripts.js`:

1. Replace `YOUR_PUBLIC_KEY` with your actual public key (line 107)
2. Replace `YOUR_SERVICE_ID` with your service ID (line 203)
3. Replace `YOUR_TEMPLATE_ID` with your template ID (line 203)

**Note:** The email addresses are already configured to send to both:
- career.metasharp@gmail.com
- contact@metasharp.info

## Step 6: Test Your Form

1. Open your website in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email for the message

## Alternative Solutions

If you prefer other methods, here are some alternatives:

### 1. Formspree
- Go to [Formspree.io](https://formspree.io/)
- Create an account and get your form endpoint
- Change the form action to your Formspree endpoint

### 2. Netlify Forms (if hosting on Netlify)
- Add `netlify` attribute to your form
- No additional setup required

### 3. Backend Solution (Node.js/PHP)
- Create a server-side script to handle form submissions
- Use services like Nodemailer (Node.js) or PHPMailer (PHP)

## Troubleshooting

- **Emails not sending**: Check your EmailJS service configuration
- **Template not working**: Verify template variables match the form data
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins
- **Rate limiting**: Free EmailJS accounts have monthly limits

## Security Notes

- Never expose sensitive credentials in client-side code
- Consider implementing server-side validation for production use
- Add CAPTCHA for spam protection if needed
