"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import Stepper, { Step } from "../Stepper/Stepper";
import { toast } from "sonner";
import { IconMessageFilled } from "@tabler/icons-react";

// message interface
interface messageData {
  autoKeyGen: string | null;
  encryptedAutoKey: string | null;
  decryptedAutoKey: string | null;
  encryptedMessage: string | null;
  decryptedMessage: string | null;
  encryptedMsgSize: string | null;
  encryptedKeySize: string | null;
  compressedData: string | null;
  compressedByteSize: string | null;
  originalByteSize: string | null;
  originalData: string | null;
};

export function DecrypterCard() {

  // call relevant hooks
  const [nextButtonText, setNextButtonText] = useState("Decrypt Message & Key");
  const [nextButtonDisable, setNextButtonDisable] = useState(false);
  const [compress, setCompress] = useState(false);
  const [message, setMessage] = useState<messageData>({} as messageData);

  // get all the recent tranmited messages
  useEffect(() => {

    // get message data from local storage
    const autoKeyGen = localStorage.getItem('autoKeyGen')
    const encryptedAutoKey = localStorage.getItem('encryptedAutoKey')
    const decryptedAutoKey = localStorage.getItem('decryptedAutoKey')
    const encryptedMessage = localStorage.getItem('encryptedMessage')
    const decryptedMessage = localStorage.getItem('decryptedMessage')
    const encryptedMsgSize = localStorage.getItem('encryptedMsgSize')
    const encryptedKeySize = localStorage.getItem('encryptedKeySize')
    const compressedData = localStorage.getItem('compressedData')
    const compressedByteSize = localStorage.getItem('compressedByteSize')
    const originalByteSize = localStorage.getItem('originalByteSize')
    const originalData = localStorage.getItem('originalData')

    // set message state variables
    setMessage({
      autoKeyGen, compressedByteSize, compressedData, encryptedAutoKey, decryptedAutoKey, encryptedKeySize, encryptedMessage, decryptedMessage, encryptedMsgSize, originalByteSize, originalData
    });


  }, [])

  // step changes
  const handleStepChange = (step: number) => {

    switch (step) {
      case 1:
        setNextButtonText("Decrypt Message & Key");
        break;

      case 2:
        setNextButtonText("Finish");
        break;

      default:
        break;
    }
  };

  // final step completed
  const handleFinalStepCompleted = () => {
    toast.success("All steps completed!");
  };

  return (
   <div className="flex w-full mx-auto flex-1 flex-col items-center justify-center gap-4 py-4 md:gap-6 md:py-6">
      <Stepper
        initialStep={1}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalStepCompleted}
        backButtonText="Previous"
        nextButtonText={nextButtonText}
        disableNextButton={nextButtonDisable}
        className="px-3 mx-auto w-full"
      >
        {/* decrypt key */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Encrypted Message & Key Received!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              <Alert variant="default" className="">
                <AlertTitle className="flex justify-between">
                  Encrypted Message
                  <Badge><strong>Size:</strong> {message.encryptedMsgSize} bytes</Badge>
                </AlertTitle>
                <AlertDescription className="flex flex-wrap max-w-[20px]">
                  <p className="">{message.encryptedMessage}</p>
                </AlertDescription>
              </Alert>

              <Alert variant="default">
                <AlertTitle className="flex justify-between">
                  Encrypted Key
                  <Badge><strong>Size:</strong> {message.encryptedKeySize} bytes</Badge>
                </AlertTitle>
                <AlertDescription className="flex flex-wrap max-w-[20px]">
                  {message.encryptedMessage}
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>
        </Step>

        {/* display original message */}
        <Step>
          <Alert variant="default">
            {/* <IconBellRinging size={10} stroke={2} className="" /> */}
            <IconMessageFilled size={10} className=""  />
            <AlertTitle>Original Message Received!</AlertTitle>
            <AlertDescription>
              {message.originalData}
            </AlertDescription>
          </Alert>
        </Step>
      </Stepper>
    </div>
  );
}
