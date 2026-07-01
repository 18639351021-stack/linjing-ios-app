export type PointDocument = {
  id: string;
  name: string;
  originalName?: string;
  path?: string;
  size?: number;
  note?: string;
  content?: string;
  fileType?: string;
  uploadTime?: string;
  parsedSuccess?: boolean;
  createdAt: string;
  [key: string]: unknown;
};

export type SurveyPoint = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  originalX?: number;
  originalY?: number;
  attachedText?: string;
  groupId: number;
  iconColor?: string;
  documents?: PointDocument[];
};

export type PointGroup = {
  id: number;
  name: string;
};

export type AppData = {
  groups: PointGroup[];
  points: SurveyPoint[];
  documents?: Record<string, PointDocument[]>;
  aiConfig?: AiConfig;
};

export type AiConfig = {
  apiKey: string;
  endpoint: string;
  model: string;
};

export type ActivePanel = 'groups' | 'add' | 'distance' | 'nearby' | 'coord' | 'docs' | 'ai' | 'settings';
