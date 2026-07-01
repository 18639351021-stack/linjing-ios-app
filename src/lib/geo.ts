import proj4 from 'proj4';
import type { SurveyPoint } from '../types/data';

const wgs84 = 'EPSG:4326';
const beijing54Zone20 = '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +ellps=krass +units=m +no_defs';

export function gaussToLngLat(x: number, y: number): { lng: number; lat: number } {
  const [lng, lat] = proj4(beijing54Zone20, wgs84, [x, y]);
  return { lng, lat };
}

export function lngLatToGauss(lng: number, lat: number): { x: number; y: number } {
  const [x, y] = proj4(wgs84, beijing54Zone20, [lng, lat]);
  return { x, y };
}

export function distanceKm(a: Pick<SurveyPoint, 'lat' | 'lng'>, b: Pick<SurveyPoint, 'lat' | 'lng'>): number {
  const radius = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function bearingDeg(a: Pick<SurveyPoint, 'lat' | 'lng'>, b: Pick<SurveyPoint, 'lat' | 'lng'>): number {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function directionName(bearing: number): string {
  const names = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
  return names[Math.round(bearing / 45) % 8];
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
