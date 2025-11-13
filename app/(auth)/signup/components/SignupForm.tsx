import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SignWithGoogleButton from "../../login/components/SignWithGoogleButton";
import Link from "next/link";
import { signup } from "@/lib/auth-actions";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">First Name</FieldLabel>
              <Input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="Komang"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Last Name</FieldLabel>
              <Input
                id="last-name"
                name="last-name"
                type="text"
                placeholder="Surya"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" name="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" formAction={signup}>
                  Create Account
                </Button>
                <SignWithGoogleButton />
                <FieldDescription className="px-6 text-center">
                  Already have an account?
                  <Link href="/login" className="underline ml-1">
                    Log in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
