import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
export default function CourseDetails() {
  return (
    <div>
      <Button>
        <Pencil className="mr-2 h-4 w-4" /> Modifier le cours
      </Button>
      Mon cours
    </div>
  );
}
