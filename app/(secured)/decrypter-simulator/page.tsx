"use client";

import Stepper, { Step } from "@/components/Stepper/Stepper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBellRinging,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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

function DecrypterSimulatorPage() {

  // call relevant hooks
  const [nextButtonText, setNextButtonText] = useState("Decrypt Key");
  const [nextButtonDisable, setNextButtonDisable] = useState(false);
  const [compress, setCompress] = useState(false);
  const [message, setMessage] = useState<messageData>({} as messageData);

  // const { Decompressor } = useCompressEncryptHook();

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
        setNextButtonText("Decrypt Key");
        break;

      case 2:
        setNextButtonText("Decrypt Message with Key");
        setCompress(false);
        break;

      case 3:
        // setEncryptedMessageSize(encMsgSize)
        // setencryptedKeySize(encKeySize)
        setNextButtonText("Decompress Message");
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
        disableNextButton={nextButtonDisable}
        className="px-3 mx-auto w-full"
      >
        {/* decrypt key */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Encrypted Key Received!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              <Alert variant="default" className="flex flex-col space-y-5">
                <AlertTitle className="flex w-full justify-between">
                  Encrypted Key Received
                  <Badge><strong>Size:</strong> {message.encryptedKeySize} bytes</Badge>
                </AlertTitle>
                <AlertDescription>
                  <p className="truncate max-w-[95%]">{message.encryptedMessage}</p>
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>
        </Step>

        {/* decrypt message with decrypted key */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Show Encrypted Message With Decrypted Key!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

             <Alert variant="default" className="flex flex-col space-y-5">
                <AlertTitle className="flex w-full justify-between">
                  Encrypted Message 
                  <Badge><strong>Size:</strong> {message.encryptedMsgSize} bytes</Badge>
                </AlertTitle>
                <AlertDescription>
                  <p className="truncate max-w-[95%]">{message.encryptedMessage}</p>
                </AlertDescription>
              </Alert>

              <Alert variant="default" className="flex flex-col space-y-5">
                <AlertTitle className="flex w-full justify-between">
                  Decrypted Key
                  <Badge><strong>Size:</strong> {message.encryptedKeySize} bytes</Badge>
                </AlertTitle>
                <AlertDescription>
                 <p className="truncate max-w-[95%]">{message.decryptedAutoKey}</p> 
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>
        </Step>

        {/* decompress message */}
        <Step>
          <Card className="w-full md:max-w-xl px-2 mb-8">
            <CardHeader className="text-center">
              <CardTitle>Decrypted Message is Compressed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              <Alert variant="default" className="flex flex-col space-y-5">
                <AlertTitle className="flex w-full justify-between">
                  Compressed Message
                  <Badge><strong>Size:</strong> {message.encryptedKeySize} bytes</Badge>
                </AlertTitle>
                <AlertDescription>
                  <p className="truncate max-w-[95%]">{message.encryptedMessage}</p>
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>
        </Step>

        {/* display original message */}
        <Step>
          <Alert variant="default">
            <IconBellRinging size={10} stroke={2} className="" />
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

export default DecrypterSimulatorPage;
