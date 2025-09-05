"use client";

import Stepper, { Step } from "@/components/Stepper/Stepper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCompressEncryptHook from "@/hooks/useCompressEncryptHook";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowsRight,
  IconBellCheck,
  IconMailCode,
  IconArrowsExchange,
  IconCloudLock,
  IconBellRinging,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// create form schema
const formSchema = z.object({
  message: z.string().min(1, { message: "message is required" }),
});

type messageData = {
  compressedData: string;
  originalByteSize: number;
  compressedByteSize: number;
};

function EncrypterSimulatorPage() {
  // const [name, setName] = useState("");
  const [nextButtonText, setNextButtonText] = useState("Next");
  const [compress, setCompress] = useState(false);
  const [message, setMessage] = useState<messageData | null>(null);
  const [autoKey, setAutoKey] = useState<string | null>(null);
  const { Compressor, AutoKeyGenerator } = useCompressEncryptHook();

  // useform is here
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  // handle onSubmit
  const onSubmit = (data: z.infer<typeof formSchema>) => {

    // generate auto key here
    const keys = AutoKeyGenerator();
    setAutoKey(keys);

    // call compress function
    const { compressedData, originalByteSize, compressedByteSize } = Compressor(
      data.message
    );

    // encrypt the compressed data here
    // const encryptedMessage = Encryptor(compressedData, autoKey);

    // set message state
    setMessage({ compressedData, originalByteSize, compressedByteSize });

    // display notification
    toast.success("Your message had been compressed.", {
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

    // disable compress button
    setCompress(true);
  };

  // step changes
  const handleStepChange = (step: number) => {
    console.log("current step: ", step);

    switch (step) {
      case 1:
        setNextButtonText("Next");
        break;

      case 2:
        setNextButtonText("Encrypt Message & Key");
        setCompress(false);
        break;

      case 3:
        setNextButtonText("Transmit Message & Key");
        break;

      case 4:
        setNextButtonText("Finish");
        break;

      default:
        break;
    }
  };

  // final step completed
  const handleFinalStepCompleted = () => {
    console.log("All steps completed!");

    toast.success("All steps completed!");
  };

  return (
    <div className="flex mx-auto flex-1 flex-col items-center justify-center gap-4 py-4 md:gap-6 md:py-6">
      <Stepper
        initialStep={1}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalStepCompleted}
        backButtonText="Previous"
        nextButtonText={nextButtonText}
        className="px-3 mx-auto w-full"
      >
        {/* compress message */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Enter New Message</CardTitle>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                  <Button disabled={compress} type="submit" className="w-full">
                    Compress Message
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </Step>

        {/* display compressed message and auto generated key */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Message Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex relative flex-col items-center">
                    <div className="flex relative">
                      <IconMailCode size={80} stroke={2} className="" />
                      <Badge
                        variant="destructive"
                        className="inline-block absolute top-2 left-7"
                      >
                        {`${message?.originalByteSize} bytes`}
                      </Badge>
                    </div>
                    <p className="text-xs italic">Input Message</p>
                  </div>

                  <IconArrowsRight
                    size={50}
                    stroke={2}
                    className="self-center text-gray-400"
                  />

                  <div className="flex relative flex-col items-center">
                    <div className="flex relative">
                      <IconMailCode size={80} stroke={2} className="" />
                      <Badge
                        variant="default"
                        className="inline-block absolute top-2 left-7"
                      >
                        {`${message?.compressedByteSize} bytes`}
                      </Badge>
                    </div>
                    <p className="text-xs italic">Compressed Message</p>
                  </div>
                </div>
                <hr className="text-muted" />
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="autoKeyGen">Auto Key Generated:</Label>
                  <Input
                    disabled
                    id="autoKeyGen"
                    type="text"
                    value={autoKey || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Step>

        {/* ecrypted message and key */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Encrypted Message & Key</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex relative flex-col items-center">
                    <div className="flex relative">
                      <IconCloudLock size={100} stroke={2} className="" />
                      <Badge
                        variant="default"
                        className="inline-block absolute top-2 left-15"
                      >
                        50kb
                      </Badge>
                    </div>
                    <p className="text-xs italic">Encrypted Message Size</p>
                  </div>

                  <IconArrowsExchange
                    size={50}
                    stroke={2}
                    className="self-center text-gray-400"
                  />

                  <div className="flex relative flex-col items-center">
                    <div className="flex relative">
                      <IconCloudLock size={100} stroke={2} className="" />
                      <Badge
                        variant="default"
                        className="inline-block absolute top-2 left-15"
                      >
                        20kb
                      </Badge>
                    </div>
                    <p className="text-xs italic">Encrypted Key Size</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Step>

        {/* both message and key transmitted */}
        <Step>
          <Alert variant="default">
            <IconBellRinging size={10} stroke={2} className="" />
            <AlertTitle>Message Transmitted Successfully!</AlertTitle>
            <AlertDescription>
              Both encrypted messages and auto key generated had been
              transmitted Successfully.
            </AlertDescription>
          </Alert>
        </Step>
      </Stepper>

      {/* </CardContent> */}
      {/* </Card> */}
    </div>
  );
}

export default EncrypterSimulatorPage;
