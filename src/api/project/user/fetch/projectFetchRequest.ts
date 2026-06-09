import { CursorRequest } from "@api/_common/types";
import { ProjectStatus } from "@api/project/types";

export interface ProjectFetchRequest extends CursorRequest {
  statuses?: ProjectStatus[];
  categoryId?: number;
  limit?: number;
}
