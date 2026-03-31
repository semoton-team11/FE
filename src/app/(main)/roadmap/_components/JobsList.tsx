"use client";

import type { Job } from "@/types";
import { Badge } from "@/components/ui/badge";

type JobsListProps = {
  jobs: Job[];
};

export default function JobsList({ jobs }: JobsListProps) {
  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <div key={job.id} className="border border-border rounded-xl p-4">
          <p className="font-semibold">{job.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
