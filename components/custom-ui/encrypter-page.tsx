"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IconBellCheck } from "@tabler/icons-react";
import useCompressHook from "@/hooks/useCompressEncryptHook";
// import { type } from './../ui/chart';

// declare form schema
const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export function EncrypterCard() {
  const { Compressor } = useCompressHook();

  // initialize form with react-hook-form and zod for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  // handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // display a toast notification with the submitted data
    toast.success("Your message had been encrypted.", {
      // description: (
      //   <p className="text-sm text-muted-foreground">
      //     <em className="text-xs">{data.message}</em>
      //   </p>
      // ),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
      duration: 2000,
      icon: <IconBellCheck stroke={2} />,
    });

    const compressedData = Compressor(data.message);
    console.log("Compressed Data:", compressedData);
  };

  return (
    <Card className="w-full md:max-w-xl px-2">
      <CardHeader className="text-center">
        <CardTitle>Message Encrypter App</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here for encryption..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Encrypt Message
            </Button>
            {/* <Button type="button" variant="outline" className="w-full">
              Generate key
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Transmit Encrypted Message
            </Button> */}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
