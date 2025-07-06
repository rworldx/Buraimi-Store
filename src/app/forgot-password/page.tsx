'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to send the reset code
    console.log('Sending verification code to:', email);
    
    toast({
      title: "Verification Code Sent",
      description: `An email with a verification code has been sent to ${email}.`,
    });

    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Forgot Password</CardTitle>
          <CardDescription>
            {submitted 
              ? "Check your inbox for the code."
              : "Enter your email to receive a verification code."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center p-4 bg-muted rounded-md">
                <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="font-bold">A verification code has been sent to:</p>
                <p className="text-muted-foreground">{email}</p>
                <p className="text-sm mt-4">Please check your spam folder if you don&apos;t see it.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Send Verification Code</Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm">
            <Button variant="link" asChild className="p-0 mx-auto">
              <Link href="/login">Back to Login</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}