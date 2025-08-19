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

export function EncrypterCard() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Messager Enpter UI</CardTitle>
        <CardDescription>
          Enter your message you want to encrypt or decrypt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Message</Label>
              <Input
                id="email"
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
                <Label htmlFor="generate">Provide Generated Key</Label>
              </div>
              <Input id="generate" type="text" placeholder="generate key" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Encrypt Message
        </Button>
        <Button variant="outline" className="w-full">
          Transmit Encrypted Message
        </Button>
      </CardFooter>
    </Card>
  );
}
