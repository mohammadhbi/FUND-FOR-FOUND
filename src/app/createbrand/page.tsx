// "use client";
// import React from 'react'
// import Stepper from '../components/Stepper';
// import NextButtonStep from '../components/NextButtonStep';
// export default function page() {
//   return (
//     <div>
//       <Stepper/>
//       <h1>
//         hello
//       </h1>
//       <NextButtonStep
//   onClick={handleNext}
//   disabled={step === lengthSteps}
// />
//     </div>
//   )
// }
"use client";

import { useState } from "react";
import Stepper from "../components/Stepper";
import NextButtonStep from "../components/NextButtonStep";

export default function Page() {
  const [step, setStep] = useState(1);
  const lengthSteps = 4;

  const handleNext = () => {
    if (step < lengthSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 min-h-screen justify-center">
      <Stepper step={step} lengthSteps={lengthSteps} />
      <h1 className="text-2xl font-bold">Hello</h1>
      <NextButtonStep
        onClick={handleNext}
        disabled={step === lengthSteps}
      />
    </div>
  );
}
