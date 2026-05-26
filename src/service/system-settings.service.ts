import type { SystemSettingsResponse } from "../dtos/response/system-settings-response.dto";
import { apiRequest } from "./api";

export const SystemSettingsService = {
  orderingAvailability: async (): Promise<SystemSettingsResponse> => {
    return apiRequest<SystemSettingsResponse>(
      "/system-settings/ordering-availability",
    );
  },
};
