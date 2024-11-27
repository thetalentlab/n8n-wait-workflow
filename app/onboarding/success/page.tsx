import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/cookies";
import SuccessCheckmark from "./_components/success-checkmark";
import PreferencesCard from "./_components/preferences-card";

export default async function SuccessPage() {
  const confirmedSummary = await getCookie("confirmedSummary");
  const parsedSummary = confirmedSummary ? JSON.parse(confirmedSummary) : {};

  console.log("sucess page", parsedSummary);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-success-light to-white">
      <div className="w-full max-w-2xl px-6 py-12 text-center">
        <div className="space-y-8">
          <div className="flex justify-center text-success animate-float">
            <SuccessCheckmark />
          </div>

          <div className="space-y-4 [&>*]:animate-fade-up [&>*]:opacity-0 [&>*]:delay-500">
            <h1 className="text-4xl font-semibold text-gray-900">
              Onboarding proccess Complete!
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Your transformation has been successfully created. You're all set
              to start your journey.
            </p>
          </div>
          <PreferencesCard summary={parsedSummary} />
          <div className="flex flex-col gap-4 items-center [&>*]:animate-fade-up [&>*]:opacity-0 [&>*]:delay-700">
            <Button className="bg-success hover:bg-success-dark text-white transition-all duration-300 ease-out hover:scale-105">
              Go to Dashboard
            </Button>
            <Button>Return Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
