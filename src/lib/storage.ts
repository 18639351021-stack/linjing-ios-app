import { Preferences } from '@capacitor/preferences';
import type { AiConfig, AppData, PointDocument, SurveyPoint } from '../types/data';

const STORAGE_KEY = 'linjing-mobile-doc-ai-data';

export const defaultData: AppData = {
  groups: [{ id: 1, name: '默认分组' }],
  points: [],
  documents: {},
  aiConfig: {
    apiKey: '',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat'
  }
};

export async function loadAppData(): Promise<AppData> {
  const result = await Preferences.get({ key: STORAGE_KEY });
  if (!result.value) return defaultData;
  try {
    const parsed = JSON.parse(result.value) as AppData;
    return normalizeImportedData(parsed);
  } catch {
    return defaultData;
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(normalizeImportedData(data)) });
}

export function exportJson(data: AppData): string {
  return JSON.stringify(normalizeImportedData(data), null, 2);
}

export function importJson(text: string): AppData {
  const parsed = JSON.parse(text) as Partial<AppData>;
  return normalizeImportedData(parsed);
}

export function normalizeImportedData(parsed: Partial<AppData>): AppData {
  if (!Array.isArray(parsed.groups) || !Array.isArray(parsed.points)) {
    throw new Error('备份格式不正确');
  }
  const importedDocuments = parsed.documents || {};
  const points = parsed.points.map(point => normalizePoint(point as SurveyPoint, importedDocuments));
  const documents = buildDocumentsMap(points, importedDocuments);
  const importedAiConfig = (parsed.aiConfig || {}) as Partial<AiConfig>;
  return {
    groups: parsed.groups.length ? parsed.groups : defaultData.groups,
    points: points.map(point => ({ ...point, documents: documents[point.id] || point.documents || [] })),
    documents,
    aiConfig: {
      apiKey: importedAiConfig.apiKey || defaultData.aiConfig!.apiKey,
      endpoint: importedAiConfig.endpoint || defaultData.aiConfig!.endpoint,
      model: importedAiConfig.model || defaultData.aiConfig!.model
    }
  };
}

function normalizePoint(point: SurveyPoint, documents: Record<string, PointDocument[]>): SurveyPoint {
  const topLevelDocuments = documents[String(point.id)] || documents[point.id] || [];
  const inlineDocuments = Array.isArray(point.documents) ? point.documents : [];
  const pointDocuments = mergeDocumentLists(topLevelDocuments, inlineDocuments);
  return {
    ...point,
    id: String(point.id),
    groupId: Number(point.groupId || 1),
    documents: pointDocuments.map(normalizeDocument)
  };
}

function buildDocumentsMap(points: SurveyPoint[], importedDocuments: Record<string, PointDocument[]>): Record<string, PointDocument[]> {
  const map: Record<string, PointDocument[]> = {};
  Object.entries(importedDocuments || {}).forEach(([pointId, docs]) => {
    if (Array.isArray(docs)) {
      map[String(pointId)] = docs.map(normalizeDocument);
    }
  });
  points.forEach(point => {
    const docs = Array.isArray(point.documents) ? point.documents.map(normalizeDocument) : [];
    if (docs.length) {
      map[String(point.id)] = docs;
    } else if (!map[String(point.id)]) {
      map[String(point.id)] = [];
    }
  });
  return map;
}

function mergeDocumentLists(...lists: PointDocument[][]): PointDocument[] {
  const merged: PointDocument[] = [];
  const seen = new Set<string>();
  lists.flat().forEach(doc => {
    const normalized = normalizeDocument(doc);
    const key = normalized.name || normalized.id;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(normalized);
  });
  return merged;
}

function normalizeDocument(documentItem: PointDocument): PointDocument {
  const name = documentItem.name || documentItem.originalName || '未命名文档';
  const content = documentItem.content || documentItem.note || '';
  return {
    ...documentItem,
    id: String(documentItem.id || Date.now() + Math.random()),
    name,
    originalName: documentItem.originalName || name,
    note: documentItem.note || '',
    content,
    path: documentItem.path || '',
    size: Number(documentItem.size || 0),
    fileType: documentItem.fileType || '',
    uploadTime: documentItem.uploadTime || documentItem.createdAt || '',
    parsedSuccess: documentItem.parsedSuccess,
    createdAt: documentItem.createdAt || documentItem.uploadTime || new Date().toISOString()
  };
}
