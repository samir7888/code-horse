import { Button } from "@/components/ui/button";
import { LogOut } from "@/modules/auth/components/LogOut";
import { requireAuth } from "@/modules/auth/utils/auth-utils";

export default async function Home() {
  await requireAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LogOut>

        <Button>
          Log Out
        </Button>
      </LogOut>
    </div>
  );
}
