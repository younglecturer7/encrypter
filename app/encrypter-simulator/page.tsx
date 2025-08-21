"use client";

import Stepper, { Step } from "@/components/Stepper/Stepper";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

function DecrypterSimulatorPage() {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-row mx-auto justify-center gap-4 py-4 md:gap-6 md:py-6">
      {/* <Card className="w-full md:max-w-xl px-2">
        <CardHeader className="text-center">
          <CardTitle>Encrypter Simulator App</CardTitle>
        </CardHeader>
        <CardContent> */}

      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Continue"
        className="w-full md:min-w-7xl mx-auto justify-center"
        // stepCircleContainerClassName="bg-gray-100 dark:bg-gray-700"
        // stepContainerClassName="bg-green-500 dark:bg-gray-300"
      >
        <Step>
          <h2>Welcome to the React Bits stepper!</h2>
          <p>Check out the next step!</p>
        </Step>
        <Step>
          <h2>Step 2</h2>
          <p>Custom step content like image!</p>
        </Step>
        <Step>
          <h2>How about an input?</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name?"
          />
        </Step>
        <Step>
          <h2>Final Step</h2>
          <p>You made it!</p>
        </Step>
      </Stepper>

      {/* </CardContent> */}
      {/* </Card> */}
    </div>
  );
}

export default DecrypterSimulatorPage;
