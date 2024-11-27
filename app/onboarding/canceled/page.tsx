import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelecPage() {
  return (
    <div>
      <p className="mb-8">
        This execution has been canceled ❌, please go back to the home page to
        start a new one
      </p>
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
