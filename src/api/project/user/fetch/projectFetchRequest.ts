import { ProjectStatus } from "@api/project/types";

export interface ProjectFetchRequest {
  statuses?: ProjectStatus[];
  categoryId?: number;
  limit?: number;
}
