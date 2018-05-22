declare class ImageCapture {
  readonly track: MediaStreamTrack;
  constructor(videoTrack: MediaStreamTrack);
  takePhoto(photoSettings?: PhotoSettings): Promise<Blob>;
  getPhotoCapabilities(): Promise<PhotoCapabilities>;
  getPhotoSettings(): Promise<PhotoSettings>;
  grabFrame(): Promise<ImageBitmap>;
}

interface PhotoCapabilities {
  readonly redEyeReduction: RedEyeReduction;
  readonly imageHeight: MediaSettingsRange;
  readonly imageWidth: MediaSettingsRange;
  readonly fillLightMode: FillLightMode[];
}

interface PhotoSettings {
  fillLightMode?: FillLightMode;
  imageHeight?: number;
  imageWidth?: number;
  redEyeReduction?: boolean;
}

interface MediaSettingsRange {
  readonly max: number;
  readonly min: number;
  readonly step: number;
}

declare type RedEyeReduction = "never" | "always" | "controllable";
declare type FillLightMode = "auto" | "off" | "flash";

interface MediaTrackSupportedConstraints {
  whiteBalanceMode?: boolean;
  exposureMode?: boolean;
  focusMode?: boolean;
  pointsOfInterest?: boolean;

  exposureCompensation?: boolean;
  colorTemperature?: boolean;
  iso?: boolean;

  brightness?: boolean;
  contrast?: boolean;
  saturation?: boolean;
  sharpness?: boolean;
  focusDistance?: boolean;
  zoom?: boolean;
  torch?: boolean;
}

interface MediaTrackCapabilities {
  whiteBalanceMode?: string[];
  exposureMode?: string[];
  focusMode?: string[];

  exposureCompensation?: MediaSettingsRange;
  colorTemperature?: MediaSettingsRange;
  iso?: MediaSettingsRange;

  brightness?: MediaSettingsRange;
  contrast?: MediaSettingsRange;
  saturation?: MediaSettingsRange;
  sharpness?: MediaSettingsRange;

  focusDistance?: MediaSettingsRange;
  zoom?: MediaSettingsRange;

  torch?: boolean;
}

interface MediaTrackConstraintSet {
  whiteBalanceMode?: ConstrainDOMString;
  exposureMode?: ConstrainDOMString;
  focusMode?: ConstrainDOMString;
  pointsOfInterest?: ConstrainPoint2D;

  exposureCompensation?: ConstrainDouble;
  colorTemperature?: ConstrainDouble;
  iso?: ConstrainDouble;

  brightness?: ConstrainDouble;
  contrast?: ConstrainDouble;
  saturation?: ConstrainDouble;
  sharpness?: ConstrainDouble;

  focusDistance?: ConstrainDouble;
  zoom?: ConstrainDouble;

  torch?: ConstrainBoolean;
}

interface MediaTrackSettings {
  whiteBalanceMode?: string;
  exposureMode?: string;
  focusMode?: string;
  pointsOfInterest?: Point2D[];

  exposureCompensation?: number;
  colorTemperature?: number;
  iso?: number;

  brightness?: number;
  contrast?: number;
  saturation?: number;
  sharpness?: number;

  focusDistance?: number;
  zoom?: number;

  torch?: boolean;
}

interface ConstrainPoint2DParameters {
  exact: Point2D[];
  ideal: Point2D[];
}

declare type ConstrainPoint2D = Point2D[] | ConstrainPoint2DParameters;

declare type MeteringMode = "none" | "manual" | "single-shot" | "continuous";

interface Point2D {
  x: number;
  y: number;
}
