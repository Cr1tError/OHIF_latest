import {
  HangingProtocolService,
  CustomizationService,
  MeasurementService,
  ViewportGridService,
  ToolbarService,
  DisplaySetService,
} from '../services';

/**
 * The interface for the services object
 */
export default interface Services {
  userAuthenticationService?: Record<string, unknown>;
  hangingProtocolService?: HangingProtocolService;
  customizationService?: CustomizationService;
  measurementService?: MeasurementService;
  displaySetService?: DisplaySetService;
  cineService?: Record<string, unknown>;
  toolbarService?: ToolbarService;
  cornerstoneViewportService?: Record<string, unknown>;
  uiDialogService?: Record<string, unknown>;
  toolGroupService?: Record<string, unknown>;
  uiNotificationService?: Record<string, unknown>;
  uiModalService?: Record<string, unknown>;
  viewportGridService?: ViewportGridService;
  syncGroupService?: Record<string, unknown>;
  cornerstoneCacheService?: Record<string, unknown>;
  segmentationService?: Record<string, unknown>;
}
