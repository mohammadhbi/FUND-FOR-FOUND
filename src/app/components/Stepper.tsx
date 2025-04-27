"use client";

interface StepperProps {
  step: number;
  lengthSteps: number;
}

export default function Stepper({ step, lengthSteps }: StepperProps) {
  return (
    <div>
      <div className="flex items-center space-x-9">
        {Array.from({ length: lengthSteps }, (_, index) => {
          const stp = index + 1;
          return (
            <div key={stp} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stp <= step
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stp}
              </div>
              {stp < lengthSteps && (
                <div
                  className={`w-8 h-1 ${
                    stp < step ? "bg-[var(--color-primary)]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
