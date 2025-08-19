"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type } from './../ui/chart';

interface formDataProps {
    message: string;
    compress: string;
    key: string;
}

export function EncrypterCard() {
  // handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      const form = event.currentTarget;
      
    const formData: formDataProps = {
      message: (form.elements.namedItem("message") as HTMLInputElement)?.value || "",
      compress: (form.elements.namedItem("compress") as HTMLInputElement)?.value || "",
      key: (form.elements.namedItem("key") as HTMLInputElement)?.value || "",
    };
    // Handle form submission logic here
    console.log("Form submitted", formData);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Message Encrypter App</CardTitle>
        <CardDescription>
          Enter your message you want to encrypt or decrypt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                type="text"
                placeholder="message to encrypt"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="compress">Compress Message</Label>
              </div>
              <Input id="compress" type="text" placeholder="compress Message" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="key">Generated Key</Label>
              </div>
              <Input id="key" type="text" placeholder="generate key" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Encrypt Message
        </Button>
        <Button type="button" variant="outline" className="w-full">
          Generate key
        </Button>
        <Button type="button" variant="outline" className="w-full">
          Transmit Encrypted Message
        </Button>
      </CardFooter>
    </Card>
  );
}
