# EmailJS Setup Guide

## Step 1: Sign up for EmailJS
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your Gmail account (maryamamanat223@gmail.com)
5. Note down your **Service ID** (e.g., "service_abc123")

## Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New message from {{from_name}} via your portfolio

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID** (e.g., "template_xyz789")

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., "user_def456")

## Step 5: Update Your Code
Replace the placeholders in `src/app/page.tsx`:

```tsx
// Replace these values with your actual EmailJS credentials
emailjs.init('YOUR_PUBLIC_KEY'); // Your public key
'YOUR_SERVICE_ID', // Your service ID
'YOUR_TEMPLATE_ID', // Your template ID
```

## Example:
```tsx
emailjs.init('user_def456');
const result = await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'maryamamanat223@gmail.com',
  }
);
```

## Step 6: Test
1. Fill out the contact form on your portfolio
2. Click "Send Message"
3. Check your email (maryamamanat223@gmail.com)
4. You should receive the message!

## Free Tier Limits:
- 200 emails per month
- Perfect for portfolio websites

## Troubleshooting:
- Make sure all IDs are correct
- Check browser console for errors
- Verify your Gmail account is connected
- Check spam folder for test emails

