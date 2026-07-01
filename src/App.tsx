import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import L from 'leaflet';
import type { ActivePanel, AiConfig, AppData, PointDocument, SurveyPoint } from './types/data';
import { bearingDeg, directionName, distanceKm, gaussToLngLat, lngLatToGauss } from './lib/geo';
import { defaultData, exportJson, importJson, loadAppData, saveAppData } from './lib/storage';

const TIANDITU_KEY = 'd97cd54dde044f0cb3f4da9ea3cc848c';
const TIANDITU_SUBDOMAINS = ['0', '1', '2', '3', '4', '5', '6', '7'];
const tiandituImageUrl = `https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEFORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`;
const tiandituLabelUrl = `https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&TILEFORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`;

export default function App() {
  const [data, setData] = useState<AppData>(defaultData);
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [activePanel, setActivePanel] = useState<ActivePanel>('groups');
  const [searchText, setSearchText] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<number>>(new Set());
  const [visibleGroupIds, setVisibleGroupIds] = useState<Set<number>>(new Set());
  const [locationStatus, setLocationStatus] = useState('');
  const [panelHidden, setPanelHidden] = useState(false);
  const [mapPickMode, setMapPickMode] = useState(false);
  const [pickedMapPoint, setPickedMapPoint] = useState<{ lng: number; lat: number; nonce: number } | null>(null);
  const locationMarkerRef = useRef<L.CircleMarker | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const mapPickModeRef = useRef(false);
  const previousGroupIdsRef = useRef<Set<number>>(new Set());

  const selectedPoint = data.points.find(point => point.id === selectedPointId) || null;

  useEffect(() => {
    loadAppData().then(setData);
  }, []);

  useEffect(() => {
    const previousGroupIds = previousGroupIdsRef.current;
    const groupIds = data.groups.map(group => group.id);
    setVisibleGroupIds(prev => {
      if (prev.size === 0) return new Set(groupIds);
      const next = new Set<number>();
      groupIds.forEach(id => {
        if (prev.has(id) || !previousGroupIds.has(id)) {
          next.add(id);
        }
      });
      return next.size ? next : new Set(groupIds);
    });
    previousGroupIdsRef.current = new Set(groupIds);
  }, [data.groups]);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map('mobile-map', { zoomControl: false }).setView([39.9042, 116.4074], 9);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer(tiandituImageUrl, {
      maxZoom: 18,
      subdomains: TIANDITU_SUBDOMAINS,
      attribution: '天地图影像'
    })
      .on('tileerror', () => setLocationStatus('地图底图加载失败，请检查手机网络'))
      .addTo(map);
    L.tileLayer(tiandituLabelUrl, {
      maxZoom: 18,
      subdomains: TIANDITU_SUBDOMAINS,
      attribution: '天地图注记'
    })
      .on('tileerror', () => setLocationStatus('地图注记加载失败，请检查手机网络'))
      .addTo(map);
    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    markerLayerRef.current = layer;
    map.on('click', event => {
      if (!mapPickModeRef.current) return;
      const { lng, lat } = event.latlng;
      setPickedMapPoint({ lng, lat, nonce: Date.now() });
      setActivePanel('add');
      setPanelHidden(false);
      setMapPickMode(false);
      setLocationStatus(`已选择地图点 ${lng.toFixed(6)}, ${lat.toFixed(6)}`);
    });

    const refreshMapSize = () => map.invalidateSize(false);
    window.requestAnimationFrame(refreshMapSize);
    const resizeTimer = window.setTimeout(refreshMapSize, 350);
    window.addEventListener('resize', refreshMapSize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', refreshMapSize);
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    window.setTimeout(() => mapRef.current?.invalidateSize(false), 80);
  }, [panelHidden]);

  useEffect(() => {
    mapPickModeRef.current = mapPickMode;
    const container = mapRef.current?.getContainer();
    if (container) container.style.cursor = mapPickMode ? 'crosshair' : '';
  }, [mapPickMode]);

  useEffect(() => {
    const layer = markerLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    const visiblePointsOnMap = data.points.filter(point => visibleGroupIds.has(point.groupId));
    visiblePointsOnMap.forEach(point => {
      const marker = L.circleMarker([point.lat, point.lng], {
        radius: selectedPointId === point.id ? 9 : 7,
        color: '#ffffff',
        weight: 2,
        fillColor: point.iconColor || '#e74c3c',
        fillOpacity: 1
      }).addTo(layer);
      marker.bindTooltip(point.name, {
        permanent: true,
        direction: 'top',
        offset: [0, -8],
        className: 'point-label'
      });
      marker.on('click', () => {
        setSelectedPointId(point.id);
        setActivePanel('nearby');
        setPanelHidden(false);
      });
    });
  }, [data.points, selectedPointId, visibleGroupIds]);

  function persist(next: AppData) {
    setData(next);
    saveAppData(next);
  }

  function focusPoint(point: SurveyPoint, zoom = 15) {
    setSelectedPointId(point.id);
    mapRef.current?.setView([point.lat, point.lng], zoom);
  }

  async function locateMe() {
    setLocationStatus('定位中');
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 12000
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const map = mapRef.current;
      if (map) {
        if (locationMarkerRef.current) locationMarkerRef.current.remove();
        locationMarkerRef.current = L.circleMarker([lat, lng], {
          radius: 8,
          color: '#ffffff',
          weight: 2,
          fillColor: '#2563eb',
          fillOpacity: 1
        }).addTo(map);
        locationMarkerRef.current.bindTooltip('当前位置', {
          permanent: true,
          direction: 'top',
          offset: [0, -8],
          className: 'point-label current-location-label'
        });
        map.setView([lat, lng], 16);
      }
      setLocationStatus(`已定位 ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      return { lat, lng };
    } catch (error) {
      setLocationStatus(error instanceof Error ? error.message : '定位失败');
      return null;
    }
  }

  function addPoint(payload: { name: string; x: number; y: number; groupId: number }) {
    const converted = gaussToLngLat(payload.x, payload.y);
    const point: SurveyPoint = {
      id: String(Date.now()),
      name: payload.name || `点_${Date.now()}`,
      lng: converted.lng,
      lat: converted.lat,
      originalX: payload.x,
      originalY: payload.y,
      groupId: payload.groupId,
      attachedText: '',
      iconColor: '#e74c3c',
      documents: []
    };
    persist({ ...data, points: [...data.points, point] });
    focusPoint(point);
    setActivePanel('nearby');
  }

  function updatePointDocuments(pointId: string, documents: PointDocument[]) {
    const nextPoints = data.points.map(point => point.id === pointId ? { ...point, documents } : point);
    const nextDocuments = { ...(data.documents || {}), [pointId]: documents };
    persist({ ...data, points: nextPoints, documents: nextDocuments });
  }

  function updateAiConfig(aiConfig: AiConfig) {
    persist({ ...data, aiConfig });
  }

  const filteredGroups = useMemo(() => {
    return data.groups.map(group => ({
      group,
      points: visibleGroupIds.has(group.id)
        ? data.points.filter(point => point.groupId === group.id && point.name.includes(searchText.trim()))
        : []
    }));
  }, [data.groups, data.points, searchText, visibleGroupIds]);

  const visiblePoints = useMemo(() => {
    return data.points.filter(point => visibleGroupIds.has(point.groupId));
  }, [data.points, visibleGroupIds]);

  function toggleGroupVisible(groupId: number) {
    setVisibleGroupIds(prev => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  }

  function startMapPick() {
    setActivePanel('add');
    setPanelHidden(true);
    setMapPickMode(true);
    setLocationStatus('地图点选模式：请在地图上点击新增点位置');
  }

  return (
    <div className={`app-shell ${panelHidden ? 'panel-hidden' : ''}`}>
      <header className="top-bar">
        <div>
          <div className="app-title">邻井助手</div>
          <div className="app-subtitle">手机端点位与邻近搜索</div>
        </div>
        <button className="ghost-button" onClick={() => {
          setActivePanel('settings');
          setPanelHidden(false);
        }}>导入</button>
      </header>

      <main className="map-wrap">
        <div id="mobile-map" />
        <button className="locate-button" onClick={locateMe}>定位</button>
        {mapPickMode && <button className="map-pick-banner" onClick={() => {
          setMapPickMode(false);
          setPanelHidden(false);
          setLocationStatus('已取消地图点选');
        }}>地图点选中，点击取消</button>}
        {panelHidden && <button className="show-panel-button" onClick={() => setPanelHidden(false)}>显示功能区</button>}
        {selectedPoint && (
          <button className="focus-card" onClick={() => focusPoint(selectedPoint)}>
            {selectedPoint.name}
            <span>{selectedPoint.lng.toFixed(6)}, {selectedPoint.lat.toFixed(6)}</span>
          </button>
        )}
        {locationStatus && <div className="location-status">{locationStatus}</div>}
      </main>

      {!panelHidden && (
        <>
          <nav className="tab-bar">
            <button className={activePanel === 'groups' ? 'active' : ''} onClick={() => setActivePanel('groups')}>点位</button>
            <button className={activePanel === 'add' ? 'active' : ''} onClick={() => setActivePanel('add')}>新增</button>
            <button className={activePanel === 'distance' ? 'active' : ''} onClick={() => setActivePanel('distance')}>两点距</button>
            <button className={activePanel === 'nearby' ? 'active' : ''} onClick={() => setActivePanel('nearby')}>邻近点</button>
            <button className={activePanel === 'coord' ? 'active' : ''} onClick={() => setActivePanel('coord')}>助手</button>
            <button className={activePanel === 'docs' ? 'active' : ''} onClick={() => setActivePanel('docs')}>文档</button>
            <button className={activePanel === 'ai' ? 'active' : ''} onClick={() => setActivePanel('ai')}>AI</button>
          </nav>

          <section className="bottom-sheet">
            <button className="collapse-panel-button" onClick={() => setPanelHidden(true)}>隐藏功能区</button>
            {activePanel === 'groups' && (
              <GroupsPanel
                groups={filteredGroups}
                collapsedGroups={collapsedGroups}
                visibleGroupIds={visibleGroupIds}
                searchText={searchText}
                onSearch={setSearchText}
                onToggleGroupVisible={toggleGroupVisible}
                onToggleGroup={groupId => setCollapsedGroups(prev => {
                  const next = new Set(prev);
                  next.has(groupId) ? next.delete(groupId) : next.add(groupId);
                  return next;
                })}
                onExpandAll={() => setCollapsedGroups(new Set())}
                onCollapseAll={() => setCollapsedGroups(new Set(data.groups.map(group => group.id)))}
                onSelectPoint={focusPoint}
              />
            )}
            {activePanel === 'add' && <AddPointPanel groups={data.groups} pickedPoint={pickedMapPoint} onAdd={addPoint} onLocate={locateMe} onStartMapPick={startMapPick} />}
            {activePanel === 'distance' && <DistancePanel points={visiblePoints} />}
            {activePanel === 'nearby' && <NearbyPanel points={visiblePoints} selectedPoint={selectedPoint && visibleGroupIds.has(selectedPoint.groupId) ? selectedPoint : null} onSelectPoint={focusPoint} />}
            {activePanel === 'coord' && <AssistantPanel />}
            {activePanel === 'docs' && <DocumentsPanel point={selectedPoint} onUpdate={updatePointDocuments} />}
            {activePanel === 'ai' && <AiPanel data={data} points={visiblePoints} selectedPoint={selectedPoint} onSelectPoint={focusPoint} onSaveConfig={updateAiConfig} />}
            {activePanel === 'settings' && <SettingsPanel data={data} onImport={persist} />}
          </section>
        </>
      )}
    </div>
  );
}

function GroupsPanel(props: {
  groups: { group: AppData['groups'][number]; points: SurveyPoint[] }[];
  collapsedGroups: Set<number>;
  visibleGroupIds: Set<number>;
  searchText: string;
  onSearch: (value: string) => void;
  onToggleGroupVisible: (groupId: number) => void;
  onToggleGroup: (groupId: number) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onSelectPoint: (point: SurveyPoint) => void;
}) {
  return (
    <>
      <div className="sheet-header">
        <strong>点位分组</strong>
        <span>{props.groups.reduce((sum, item) => sum + item.points.length, 0)} 个点</span>
      </div>
      <input className="mobile-input" value={props.searchText} onChange={event => props.onSearch(event.target.value)} placeholder="搜索点名称" />
      <div className="row-actions">
        <button onClick={props.onExpandAll}>全部展开</button>
        <button onClick={props.onCollapseAll}>全部收缩</button>
      </div>
      <div className="group-scroll">
        {props.groups.map(({ group, points }) => {
          const collapsed = props.collapsedGroups.has(group.id);
          const visible = props.visibleGroupIds.has(group.id);
          return (
            <div className="mobile-group" key={group.id}>
              <div className="group-heading">
                <label className="group-check">
                  <input type="checkbox" checked={visible} onChange={() => props.onToggleGroupVisible(group.id)} />
                  <span>{group.name}</span>
                </label>
                <button className="group-collapse-button" onClick={() => props.onToggleGroup(group.id)}>{collapsed ? '展开' : '收缩'}</button>
                <em>{points.length}</em>
              </div>
              {visible && !collapsed && points.map(point => (
                <button className="point-row" key={point.id} onClick={() => props.onSelectPoint(point)}>
                  <span className="point-dot" style={{ backgroundColor: point.iconColor || '#e74c3c' }} />
                  <span>{point.name}</span>
                  <small>{point.lng.toFixed(4)}, {point.lat.toFixed(4)}</small>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

function AddPointPanel({
  groups,
  onAdd,
  onLocate,
  onStartMapPick,
  pickedPoint
}: {
  groups: AppData['groups'];
  onAdd: (payload: { name: string; x: number; y: number; groupId: number }) => void;
  onLocate: () => Promise<{ lat: number; lng: number } | null>;
  onStartMapPick: () => void;
  pickedPoint: { lng: number; lat: number; nonce: number } | null;
}) {
  const [name, setName] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [groupId, setGroupId] = useState(groups[0]?.id || 1);
  const [message, setMessage] = useState('');

  async function useCurrentLocation() {
    setMessage('正在获取当前位置');
    const position = await onLocate();
    if (!position) {
      setMessage('当前位置获取失败');
      return;
    }
    const projected = lngLatToGauss(position.lng, position.lat);
    setX(projected.x.toFixed(3));
    setY(projected.y.toFixed(3));
    setMessage(`已填入当前位置 ${position.lng.toFixed(6)}, ${position.lat.toFixed(6)}`);
  }

  useEffect(() => {
    if (!pickedPoint) return;
    const projected = lngLatToGauss(pickedPoint.lng, pickedPoint.lat);
    setX(projected.x.toFixed(3));
    setY(projected.y.toFixed(3));
    setMessage(`已填入地图点选位置 ${pickedPoint.lng.toFixed(6)}, ${pickedPoint.lat.toFixed(6)}`);
  }, [pickedPoint?.nonce]);

  const parsedX = Number(x);
  const parsedY = Number(y);
  const canSave = Number.isFinite(parsedX) && Number.isFinite(parsedY);

  return (
    <>
      <div className="sheet-header"><strong>新增坐标点</strong><span>北京54 / 6度带20带</span></div>
      <input className="mobile-input" value={name} onChange={event => setName(event.target.value)} placeholder="点名称" />
      <div className="two-col">
        <input className="mobile-input" value={x} onChange={event => setX(event.target.value)} inputMode="decimal" placeholder="Y 横坐标" />
        <input className="mobile-input" value={y} onChange={event => setY(event.target.value)} inputMode="decimal" placeholder="X 纵坐标" />
      </div>
      <select className="mobile-input" value={groupId} onChange={event => setGroupId(Number(event.target.value))}>
        {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
      </select>
      <div className="row-actions">
        <button onClick={useCurrentLocation}>使用当前位置</button>
        <button onClick={onStartMapPick}>地图点选</button>
      </div>
      <button className="primary-button" onClick={() => onAdd({ name, x: parsedX, y: parsedY, groupId })} disabled={!canSave}>保存点位</button>
      <div className="coordinate-preview">
        {canSave ? `当前坐标：Y=${parsedX.toFixed(3)}，X=${parsedY.toFixed(3)}` : '请输入坐标，或使用当前位置/地图点选'}
      </div>
      {message && <div className="import-message">{message}</div>}
    </>
  );
}

function DistancePanel({ points }: { points: SurveyPoint[] }) {
  const [aId, setAId] = useState(points[0]?.id || '');
  const [bId, setBId] = useState(points[1]?.id || '');
  const a = points.find(point => point.id === aId);
  const b = points.find(point => point.id === bId);
  const distance = a && b ? distanceKm(a, b) : null;
  const bearing = a && b ? bearingDeg(a, b) : null;

  return (
    <>
      <div className="sheet-header"><strong>两点距离</strong><span>{points.length} 个点可选</span></div>
      <select className="mobile-input" value={aId} onChange={event => setAId(event.target.value)}>
        <option value="">选择第一个点</option>
        {points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}
      </select>
      <select className="mobile-input" value={bId} onChange={event => setBId(event.target.value)}>
        <option value="">选择第二个点</option>
        {points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}
      </select>
      {distance !== null && bearing !== null && (
        <div className="result-box">
          <strong>{distance.toFixed(3)} km</strong>
          <span>方位 {bearing.toFixed(1)}° / {directionName(bearing)}</span>
        </div>
      )}
    </>
  );
}

function NearbyPanel({
  points,
  selectedPoint,
  onSelectPoint
}: {
  points: SurveyPoint[];
  selectedPoint: SurveyPoint | null;
  onSelectPoint: (point: SurveyPoint, zoom?: number) => void;
}) {
  const [centerId, setCenterId] = useState(selectedPoint?.id || points[0]?.id || '');
  const [radiusMeters, setRadiusMeters] = useState('1000');

  useEffect(() => {
    if (selectedPoint) setCenterId(selectedPoint.id);
  }, [selectedPoint]);

  const center = points.find(point => point.id === centerId) || null;
  const radiusKm = Math.max(0, Number(radiusMeters) / 1000);
  const nearbyPoints = useMemo(() => {
    if (!center || !Number.isFinite(radiusKm)) return [];
    return points
      .filter(point => point.id !== center.id)
      .map(point => ({
        point,
        distance: distanceKm(center, point),
        bearing: bearingDeg(center, point)
      }))
      .filter(item => item.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }, [center, points, radiusKm]);

  return (
    <>
      <div className="sheet-header"><strong>半径邻近点</strong><span>{nearbyPoints.length} 个结果</span></div>
      <select className="mobile-input" value={centerId} onChange={event => setCenterId(event.target.value)}>
        <option value="">选择中心点</option>
        {points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}
      </select>
      <input className="mobile-input" value={radiusMeters} onChange={event => setRadiusMeters(event.target.value)} inputMode="numeric" placeholder="搜索半径，单位米" />
      {center && <button className="secondary-button" onClick={() => onSelectPoint(center, 15)}>定位到中心点</button>}
      <div className="nearby-list">
        {nearbyPoints.map(({ point, distance, bearing }) => (
          <button className="nearby-row" key={point.id} onClick={() => onSelectPoint(point, 15)}>
            <span>{point.name}</span>
            <small>{(distance * 1000).toFixed(0)} m · {bearing.toFixed(1)}° {directionName(bearing)}</small>
          </button>
        ))}
        {center && nearbyPoints.length === 0 && <div className="empty-state compact">当前半径内没有邻近点</div>}
        {!center && <div className="empty-state compact">请选择中心点</div>}
      </div>
    </>
  );
}

type CoordinateCalcField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'number' | 'select';
  options?: string[] | ((values: Record<string, string>) => string[]);
};

type CoordinateCalcResult = {
  label: string;
  value: string;
};

type CoordinateCalcDefinition = {
  id: string;
  title: string;
  fields: CoordinateCalcField[];
  defaultValues?: Record<string, string>;
  calculate: (values: Record<string, string>) => CoordinateCalcResult[];
};

const unitConversionGroups: Record<string, { name: string; toBase: number; fromBase: number }[]> = {
  '长度': [
    { name: '米', toBase: 1, fromBase: 1 },
    { name: '厘米', toBase: 0.01, fromBase: 100 },
    { name: '公里', toBase: 1000, fromBase: 0.001 },
    { name: '毫米', toBase: 0.001, fromBase: 1000 },
    { name: '英尺', toBase: 0.3048, fromBase: 3.28083989501312 },
    { name: '英寸', toBase: 0.0254, fromBase: 39.3700787401575 },
    { name: '英里', toBase: 1609.344, fromBase: 0.000621371192237334 },
    { name: '海里', toBase: 1852, fromBase: 0.000539956803455724 },
    { name: '码', toBase: 0.9144, fromBase: 1.0936 }
  ],
  '重量': [
    { name: '公斤', toBase: 1, fromBase: 1 },
    { name: '克', toBase: 0.001, fromBase: 1000 },
    { name: '公吨', toBase: 1000, fromBase: 0.001 },
    { name: '长吨', toBase: 1015.87301587302, fromBase: 0.000984 },
    { name: '短吨', toBase: 907.02947845805, fromBase: 0.0011023 },
    { name: '磅', toBase: 0.453514739229025, fromBase: 2.205 },
    { name: '盎司', toBase: 0.0283446712018141, fromBase: 35.28 }
  ],
  '压力': [
    { name: '千克/平方厘米', toBase: 1, fromBase: 1 },
    { name: '磅/平方英寸', toBase: 0.070307, fromBase: 14.2233348030779 },
    { name: '帕', toBase: 1.01971864079092e-5, fromBase: 98066.2665168476 },
    { name: '兆帕', toBase: 10.1971864079092, fromBase: 0.0980662665168476 }
  ],
  '面积': [
    { name: '平方毫米', toBase: 1, fromBase: 1 },
    { name: '平方厘米', toBase: 100, fromBase: 0.01 },
    { name: '平方分米', toBase: 10000, fromBase: 0.0001 },
    { name: '平方米', toBase: 1000000, fromBase: 1e-6 },
    { name: '平方公里', toBase: 1000000000000, fromBase: 1e-12 },
    { name: '平方英寸', toBase: 645.16, fromBase: 0.0015500031000062 },
    { name: '平方英尺', toBase: 92903.04, fromBase: 1.07639104167097e-5 },
    { name: '英亩Acre', toBase: 4046856422.4, fromBase: 2.47105381467165e-10 },
    { name: '平方英里sq. mile', toBase: 2589988110336, fromBase: 3.86102158542446e-13 }
  ],
  '密度/比重': [
    { name: '千克/升', toBase: 1, fromBase: 1 },
    { name: '磅/加仑ppg', toBase: 0.1198, fromBase: 8.34724540901503 },
    { name: '磅/立方英尺', toBase: 0.01602, fromBase: 62.4219725343321 }
  ],
  '体积/容积': [
    { name: '立方毫米', toBase: 1, fromBase: 1 },
    { name: '立方厘米', toBase: 1000, fromBase: 0.001 },
    { name: '立方分米', toBase: 1000000, fromBase: 1e-6 },
    { name: '立方米', toBase: 1000000000, fromBase: 1e-9 },
    { name: '立方公里', toBase: 1e18, fromBase: 1e-18 },
    { name: '立方英寸', toBase: 16387.064, fromBase: 6.10237440947323e-5 },
    { name: '立方英尺', toBase: 28316846.592, fromBase: 3.53146667214886e-8 },
    { name: '升', toBase: 1000000, fromBase: 1e-6 },
    { name: '美加仑gal(US)', toBase: 3785000, fromBase: 2.64200792602378e-7 },
    { name: '油桶bbl', toBase: 158970000, fromBase: 6.29049506196138e-9 }
  ],
  '温度': [
    { name: '摄氏℃', toBase: 1, fromBase: 1 },
    { name: '华氏℉', toBase: 1, fromBase: 1 }
  ]
};

const coordinateCalculators: CoordinateCalcDefinition[] = [
  {
    id: 'directional-trajectory-estimate',
    title: '定向井轨迹概算',
    defaultValues: {
      wellN: '3939990.3',
      wellE: '20339996.3',
      target1N: '3940040',
      target1E: '20339840',
      target1Tvd: '2930',
      target2N: '3940070',
      target2E: '20339740',
      target2Tvd: '3110',
      buildRate: '3.6'
    },
    fields: [
      { key: 'wellN', label: '井口 X/北坐标' },
      { key: 'wellE', label: '井口 Y/东坐标' },
      { key: 'target1N', label: '靶 I X/北坐标' },
      { key: 'target1E', label: '靶 I Y/东坐标' },
      { key: 'target1Tvd', label: '靶 I 垂深' },
      { key: 'target2N', label: '靶 II X/北坐标' },
      { key: 'target2E', label: '靶 II Y/东坐标' },
      { key: 'target2Tvd', label: '靶 II 垂深' },
      { key: 'buildRate', label: '造斜率', placeholder: '°/30m' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['wellN', 'wellE', 'target1N', 'target1E', 'target1Tvd', 'target2N', 'target2E', 'target2Tvd', 'buildRate']);
      if (n.buildRate === 0) throw new Error('造斜率不能为 0');
      const target1Disp = planarDistance(n.wellN, n.wellE, n.target1N, n.target1E);
      const target2Disp = planarDistance(n.wellN, n.wellE, n.target2N, n.target2E);
      const targetIntervalTvd = Math.abs(n.target2Tvd - n.target1Tvd);
      const targetIntervalDisp = planarDistance(n.target1N, n.target1E, n.target2N, n.target2E);
      if (targetIntervalTvd === 0) throw new Error('两靶垂深不能相同');
      const intervalIncl = radToDeg(Math.atan(targetIntervalDisp / targetIntervalTvd));
      const intervalInclRad = degToRad(intervalIncl);
      if (Math.sin(intervalInclRad) === 0) throw new Error('靶间井斜过小，无法估算稳斜段');
      const buildLength = intervalIncl / n.buildRate * 30;
      const buildTvd = buildLength * Math.cos(intervalInclRad / 2);
      const buildDisp = buildLength * Math.sin(intervalInclRad / 2);
      const holdDisp = target1Disp - buildDisp;
      const holdLength = holdDisp / Math.sin(intervalInclRad);
      const holdTvd = holdLength * Math.cos(intervalInclRad);
      const kickoffDepth = n.target1Tvd - buildTvd - holdTvd;
      return [
        { label: '靶 I 位移', value: `${formatCalcNumber(target1Disp, 2)} m` },
        { label: '靶 I 闭合方位', value: `${formatCalcNumber(coordBearing(n.wellN, n.wellE, n.target1N, n.target1E), 2)}°` },
        { label: '靶 II 位移', value: `${formatCalcNumber(target2Disp, 2)} m` },
        { label: '靶 II 闭合方位', value: `${formatCalcNumber(coordBearing(n.wellN, n.wellE, n.target2N, n.target2E), 2)}°` },
        { label: '靶间垂深', value: `${formatCalcNumber(targetIntervalTvd, 2)} m` },
        { label: '靶间位移', value: `${formatCalcNumber(targetIntervalDisp, 2)} m` },
        { label: '靶间井斜', value: `${formatCalcNumber(intervalIncl, 2)}°` },
        { label: '靶间方位', value: `${formatCalcNumber(coordBearing(n.target1N, n.target1E, n.target2N, n.target2E), 2)}°` },
        { label: '预计造斜点', value: `${formatCalcNumber(kickoffDepth, 0)} m` },
        { label: '定向段长度', value: `${formatCalcNumber(buildLength, 2)} m` },
        { label: '定向段垂深增量', value: `${formatCalcNumber(buildTvd, 2)} m` },
        { label: '定向段位移', value: `${formatCalcNumber(buildDisp, 2)} m` },
        { label: '靶 I 前稳斜段长度', value: `${formatCalcNumber(holdLength, 2)} m` },
        { label: '靶 I 前稳斜段垂深增量', value: `${formatCalcNumber(holdTvd, 2)} m` },
        { label: '靶 I 前稳斜段位移增量', value: `${formatCalcNumber(holdDisp, 2)} m` }
      ];
    }
  },
  {
    id: 'unit-converter',
    title: '单位换算',
    defaultValues: {
      unitGroup: '长度',
      inputValue: '1',
      inputUnit: '米',
      outputUnit: '英尺'
    },
    fields: [
      { key: 'unitGroup', label: '单位类型', type: 'select', options: Object.keys(unitConversionGroups) },
      { key: 'inputValue', label: '输入数值' },
      { key: 'inputUnit', label: '输入单位', type: 'select', options: values => unitOptionsForGroup(values.unitGroup) },
      { key: 'outputUnit', label: '输出单位', type: 'select', options: values => unitOptionsForGroup(values.unitGroup) }
    ],
    calculate(values) {
      const groupName = unitConversionGroups[values.unitGroup] ? values.unitGroup : '长度';
      const value = Number(values.inputValue);
      if (!Number.isFinite(value)) throw new Error('请输入完整有效数字');
      const units = unitConversionGroups[groupName];
      const inputUnit = units.find(unit => unit.name === values.inputUnit) || units[0];
      const outputUnit = units.find(unit => unit.name === values.outputUnit) || units[Math.min(1, units.length - 1)];
      const converted = convertUnitValue(groupName, value, inputUnit.name, outputUnit.name);
      return [
        { label: '输入', value: `${formatFlexibleNumber(value)} ${inputUnit.name}` },
        { label: '输出', value: `${formatFlexibleNumber(converted)} ${outputUnit.name}` }
      ];
    }
  },
  {
    id: 'well-target-bearing',
    title: '井口与双靶点：求方位、位移',
    fields: [
      { key: 'wellN', label: '井口北坐标' },
      { key: 'wellE', label: '井口东坐标' },
      { key: 'target1N', label: 'I 靶点北坐标' },
      { key: 'target1E', label: 'I 靶点东坐标' },
      { key: 'target2N', label: 'II 靶点北坐标' },
      { key: 'target2E', label: 'II 靶点东坐标' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['wellN', 'wellE', 'target1N', 'target1E', 'target2N', 'target2E']);
      return [
        { label: 'I 靶点位移', value: `${formatCalcNumber(planarDistance(n.wellN, n.wellE, n.target1N, n.target1E), 2)} m` },
        { label: 'I 靶点方位', value: `${formatCalcNumber(coordBearing(n.wellN, n.wellE, n.target1N, n.target1E), 2)}°` },
        { label: 'II 靶点位移', value: `${formatCalcNumber(planarDistance(n.wellN, n.wellE, n.target2N, n.target2E), 2)} m` },
        { label: 'II 靶点方位', value: `${formatCalcNumber(coordBearing(n.wellN, n.wellE, n.target2N, n.target2E), 2)}°` }
      ];
    }
  },
  {
    id: 'bearing-displacement-target',
    title: '井口、方位、位移：求靶点坐标',
    fields: [
      { key: 'wellN', label: '井口北坐标' },
      { key: 'wellE', label: '井口东坐标' },
      { key: 'azimuth', label: '方位角', placeholder: '度' },
      { key: 'displacement', label: '位移', placeholder: 'm' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['wellN', 'wellE', 'azimuth', 'displacement']);
      const rad = degToRad(n.azimuth);
      return [
        { label: '靶点北坐标', value: formatCalcNumber(n.wellN + n.displacement * Math.cos(rad), 2) },
        { label: '靶点东坐标', value: formatCalcNumber(n.wellE + n.displacement * Math.sin(rad), 2) }
      ];
    }
  },
  {
    id: 'front-distance-well',
    title: '双靶点、靶前距：求井口坐标',
    fields: [
      { key: 'targetAN', label: 'A 靶点北坐标' },
      { key: 'targetAE', label: 'A 靶点东坐标' },
      { key: 'targetBN', label: 'B 靶点北坐标' },
      { key: 'targetBE', label: 'B 靶点东坐标' },
      { key: 'frontDistance', label: '靶前距', placeholder: 'm' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['targetAN', 'targetAE', 'targetBN', 'targetBE', 'frontDistance']);
      const length = planarDistance(n.targetAN, n.targetAE, n.targetBN, n.targetBE);
      if (length === 0) throw new Error('A、B 靶点不能是同一个坐标');
      const unitN = (n.targetBN - n.targetAN) / length;
      const unitE = (n.targetBE - n.targetAE) / length;
      return [
        { label: 'AB 方向', value: targetRelativeText(n.targetAN, n.targetAE, n.targetBN, n.targetBE) },
        { label: '井口北坐标', value: formatCalcNumber(n.targetAN - unitN * n.frontDistance, 2) },
        { label: '井口东坐标', value: formatCalcNumber(n.targetAE - unitE * n.frontDistance, 2) }
      ];
    }
  },
  {
    id: 'two-target-depth-well',
    title: '双靶点、垂深：求井口坐标',
    fields: [
      { key: 'targetAN', label: 'A 靶点北坐标' },
      { key: 'targetAE', label: 'A 靶点东坐标' },
      { key: 'targetATvd', label: 'A 靶点垂深' },
      { key: 'targetBN', label: 'B 靶点北坐标' },
      { key: 'targetBE', label: 'B 靶点东坐标' },
      { key: 'targetBTvd', label: 'B 靶点垂深' },
      { key: 'firstBuildRate', label: '第一造斜率', placeholder: '°/30m' },
      { key: 'firstEndIncl', label: '第一段完钻井斜', placeholder: '°' },
      { key: 'secondBuildRate', label: '第二造斜率', placeholder: '°/30m' },
      { key: 'topBuildRate', label: '探顶造斜率', placeholder: '°/30m' },
      { key: 'topLength', label: '探顶段长', placeholder: 'm' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, [
        'targetAN', 'targetAE', 'targetATvd', 'targetBN', 'targetBE', 'targetBTvd',
        'firstBuildRate', 'firstEndIncl', 'secondBuildRate', 'topBuildRate', 'topLength'
      ]);
      const targetDistance = planarDistance(n.targetAN, n.targetAE, n.targetBN, n.targetBE);
      const depthDiff = Math.abs(n.targetATvd - n.targetBTvd);
      if (targetDistance === 0 || depthDiff === 0) throw new Error('两靶点平距和垂深差必须大于 0');
      if (n.firstBuildRate === 0 || n.secondBuildRate === 0) throw new Error('造斜率不能为 0');
      const secondEndIncl = radToDeg(Math.atan(targetDistance / depthDiff));
      const firstBuildLength = 30 / n.firstBuildRate * n.firstEndIncl;
      const verticalIncrement =
        30 / n.firstBuildRate * 360 / 2 / Math.PI * Math.sin(degToRad(n.firstEndIncl)) +
        30 / n.secondBuildRate * 360 / 2 / Math.PI * Math.abs(Math.sin(degToRad(secondEndIncl)) - Math.sin(degToRad(n.firstEndIncl)));
      const frontDistance =
        30 / n.firstBuildRate * 360 / 2 / Math.PI * Math.abs(Math.cos(degToRad(n.firstEndIncl)) - 1) +
        30 / n.secondBuildRate * 360 / 2 / Math.PI * Math.abs(Math.cos(degToRad(secondEndIncl)) - Math.cos(degToRad(n.firstEndIncl)));
      const topIncl = secondEndIncl - n.topLength / 30 * n.topBuildRate;
      const bearing = coordBearing(n.targetAN, n.targetAE, n.targetBN, n.targetBE);
      const bearingRad = degToRad(bearing);
      const slantDistance = Math.sqrt(targetDistance * targetDistance + depthDiff * depthDiff);
      const kickoffDepth = n.targetATvd - verticalIncrement;
      const totalDepth = kickoffDepth + firstBuildLength + slantDistance;
      return [
        { label: 'AB 方向', value: targetRelativeText(n.targetAN, n.targetAE, n.targetBN, n.targetBE) },
        { label: '两靶位移', value: `${formatCalcNumber(targetDistance, 2)} m` },
        { label: '两靶垂深差', value: `${formatCalcNumber(depthDiff, 2)} m` },
        { label: '两靶空间距', value: `${formatCalcNumber(slantDistance, 2)} m` },
        { label: '第二段完钻井斜', value: `${formatCalcNumber(secondEndIncl, 2)}°` },
        { label: '探顶井斜角', value: `${formatCalcNumber(topIncl, 2)}°` },
        { label: '方位角', value: `${formatCalcNumber(bearing, 2)}° ${bearingQuadrantText(bearing)}` },
        { label: '垂直增量', value: `${formatCalcNumber(verticalIncrement, 2)} m` },
        { label: '靶前距', value: `${formatCalcNumber(frontDistance, 2)} m` },
        { label: '造斜点深度', value: `${formatCalcNumber(kickoffDepth, 2)} m` },
        { label: '第一造斜段长', value: `${formatCalcNumber(firstBuildLength, 2)} m` },
        { label: '总斜深', value: `${formatCalcNumber(totalDepth, 2)} m` },
        { label: '井口北坐标', value: formatCalcNumber(n.targetAN - Math.cos(bearingRad) * frontDistance, 2) },
        { label: '井口东坐标', value: formatCalcNumber(n.targetAE - Math.sin(bearingRad) * frontDistance, 2) }
      ];
    }
  },
  {
    id: 'well-target-profile',
    title: '井口、靶点、垂深：求造斜点',
    fields: [
      { key: 'wellN', label: '井口北坐标' },
      { key: 'wellE', label: '井口东坐标' },
      { key: 'targetN', label: '靶点北坐标' },
      { key: 'targetE', label: '靶点东坐标' },
      { key: 'targetTvd', label: '靶点垂深' },
      { key: 'buildRate', label: '造斜率', placeholder: '°/30m' },
      { key: 'maxIncl', label: '最大井斜', placeholder: '°' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['wellN', 'wellE', 'targetN', 'targetE', 'targetTvd', 'buildRate', 'maxIncl']);
      if (n.buildRate === 0 || n.maxIncl === 0) throw new Error('造斜率和最大井斜不能为 0');
      const closure = planarDistance(n.wellN, n.wellE, n.targetN, n.targetE);
      const buildLength = n.maxIncl / n.buildRate * 30;
      const halfInclRad = degToRad(n.maxIncl) / 2;
      const maxInclRad = degToRad(n.maxIncl);
      const buildTvd = buildLength * Math.cos(halfInclRad);
      const buildDisp = buildLength * Math.sin(halfInclRad);
      const holdDisp = closure - buildDisp;
      const holdLength = holdDisp / Math.sin(maxInclRad);
      const holdTvd = holdLength * Math.cos(maxInclRad);
      const kickoffDepth = n.targetTvd - buildTvd - holdTvd;
      const totalMd = kickoffDepth + buildLength + holdLength;
      const buildEnd = kickoffDepth + buildLength;
      return [
        { label: '闭合距', value: `${formatCalcNumber(closure, 2)} m` },
        { label: '闭合方位', value: `${formatCalcNumber(coordBearing(n.wellN, n.wellE, n.targetN, n.targetE), 2)}°` },
        { label: '造斜点深度', value: `${formatCalcNumber(kickoffDepth, 2)} m` },
        { label: '总斜深', value: `${formatCalcNumber(totalMd, 2)} m` },
        { label: '造斜段长', value: `${formatCalcNumber(buildLength, 2)} m` },
        { label: '造斜段垂深', value: `${formatCalcNumber(buildTvd, 2)} m` },
        { label: '造斜段位移', value: `${formatCalcNumber(buildDisp, 2)} m` },
        { label: '稳斜段位移', value: `${formatCalcNumber(holdDisp, 2)} m` },
        { label: '稳斜段长', value: `${formatCalcNumber(holdLength, 2)} m` },
        { label: '稳斜段垂深', value: `${formatCalcNumber(holdTvd, 2)} m` },
        { label: '造斜井段', value: `${formatCalcNumber(kickoffDepth, 2)}～${formatCalcNumber(buildEnd, 2)} m` }
      ];
    }
  },
  {
    id: 'point-line-offset',
    title: '井口到两靶点连线：求偏移距',
    fields: [
      { key: 'pointN', label: '井口北坐标' },
      { key: 'pointE', label: '井口东坐标' },
      { key: 'targetAN', label: 'A 靶点北坐标' },
      { key: 'targetAE', label: 'A 靶点东坐标' },
      { key: 'targetBN', label: 'B 靶点北坐标' },
      { key: 'targetBE', label: 'B 靶点东坐标' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['pointN', 'pointE', 'targetAN', 'targetAE', 'targetBN', 'targetBE']);
      const lineLength = planarDistance(n.targetAN, n.targetAE, n.targetBN, n.targetBE);
      if (lineLength === 0) throw new Error('A、B 靶点不能是同一个坐标');
      const offset = Math.abs(
        (n.targetBN - n.targetAN) * n.pointE -
        (n.targetBE - n.targetAE) * n.pointN +
        n.targetAN * (n.targetBE - n.targetAE) -
        n.targetAE * (n.targetBN - n.targetAN)
      ) / lineLength;
      return [{ label: '偏移距', value: `${formatCalcNumber(offset, 2)} m` }];
    }
  },
  {
    id: 'single-bend-build-rate',
    title: '单弯双稳螺杆：求造斜率',
    fields: [
      { key: 'bendAngle', label: '螺杆弯角', placeholder: '°' },
      { key: 'l1', label: 'L1 长度', placeholder: 'm' },
      { key: 'l2', label: 'L2 长度', placeholder: 'm' },
      { key: 'l3', label: 'L3 长度', placeholder: 'm' },
      { key: 'holeDiameter', label: '井眼直径' },
      { key: 'lowerStabilizer', label: '下稳定器外径' },
      { key: 'upperStabilizer', label: '上稳定器外径' },
      { key: 'correction', label: '修正系数' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['bendAngle', 'l1', 'l2', 'l3', 'holeDiameter', 'lowerStabilizer', 'upperStabilizer', 'correction']);
      const m1 = n.l2 + n.l3;
      const m2 = n.l2 + n.l3 + n.bendAngle;
      const m3 = n.l1 + n.l2 + n.l3;
      if (m1 === 0 || m2 === 0 || m3 === 0 || n.l1 === 0) throw new Error('长度参数不能导致分母为 0');
      const theoretical = (n.l3 / m1) * (2 * n.bendAngle / m2) * 30 +
        1.719 * ((n.lowerStabilizer - n.upperStabilizer) / m1 / m3 - (n.holeDiameter - n.lowerStabilizer) / n.l1 / m3);
      return [
        { label: '理论造斜率', value: `${formatCalcNumber(theoretical, 2)} °/30m` },
        { label: '实际造斜率', value: `${formatCalcNumber(theoretical * n.correction, 2)} °/30m` }
      ];
    }
  },
  {
    id: 'toolface-difference',
    title: '定向工具角差计算',
    fields: [
      { key: 'instrumentScale', label: '仪器刻度总格' },
      { key: 'instrumentGrid', label: '仪器角差格数' },
      { key: 'engineeringScale', label: '工程刻度总格' },
      { key: 'engineeringGrid', label: '工程角差格数' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['instrumentScale', 'instrumentGrid', 'engineeringScale', 'engineeringGrid']);
      if (n.instrumentScale === 0 || n.engineeringScale === 0) throw new Error('刻度总格不能为 0');
      const instrumentAngle = n.instrumentGrid * 360 / n.instrumentScale;
      const engineeringAngle = n.engineeringGrid * 360 / n.engineeringScale;
      return [
        { label: '仪器角差', value: `${formatCalcNumber(instrumentAngle, 2)}°` },
        { label: '工程角差', value: `${formatCalcNumber(engineeringAngle, 2)}°` },
        { label: '工具角差', value: `${formatCalcNumber(instrumentAngle + engineeringAngle, 2)}°` }
      ];
    }
  },
  {
    id: 'grid-azimuth',
    title: '网格方位修正',
    fields: [
      { key: 'magneticAzimuth', label: '磁方位', placeholder: '°' },
      { key: 'correction', label: '方位修正角', placeholder: '°' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['magneticAzimuth', 'correction']);
      return [{ label: '网格方位', value: `${formatCalcNumber(normalizeDegrees(n.magneticAzimuth + n.correction), 2)}°` }];
    }
  },
  {
    id: 'bend-angle-choice',
    title: '单弯螺杆弯角选择',
    fields: [
      { key: 'l1', label: 'L1 长度', placeholder: 'm' },
      { key: 'l2', label: 'L2 长度', placeholder: 'm' },
      { key: 'l3', label: 'L3 长度', placeholder: 'm' },
      { key: 'holeDiameter', label: '井眼直径' },
      { key: 'lowerStabilizer', label: '下稳定器外径' },
      { key: 'upperStabilizer', label: '上稳定器外径' },
      { key: 'designBuildRate', label: '设计造斜率', placeholder: '°/30m' },
      { key: 'safetyFactor', label: '安全系数' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['l1', 'l2', 'l3', 'holeDiameter', 'lowerStabilizer', 'upperStabilizer', 'designBuildRate', 'safetyFactor']);
      const sum23 = n.l2 + n.l3;
      const sum123 = n.l1 + n.l2 + n.l3;
      if (n.l1 === 0 || n.l3 === 0 || sum23 === 0 || sum123 === 0) throw new Error('长度参数不能导致分母为 0');
      const correctedRate = n.designBuildRate * n.safetyFactor;
      const requiredBend = (correctedRate - 1791 * (
        (n.lowerStabilizer - n.upperStabilizer) / 1000 / sum23 / sum123 -
        (n.holeDiameter - n.lowerStabilizer) / 1000 / n.l1 / sum123
      )) * sum23 * sum123 / n.l3 / 60;
      const motorAngleRate = 60 * requiredBend / sum123;
      const bitAngleRate = n.l3 / sum23 * motorAngleRate;
      return [
        { label: '修正后设计造斜率', value: `${formatCalcNumber(correctedRate, 2)} °/30m` },
        { label: '所需弯角', value: `${formatCalcNumber(requiredBend, 2)}°` },
        { label: '马达弯角贡献', value: `${formatCalcNumber(motorAngleRate, 2)}` },
        { label: '钻头处角度', value: `${formatCalcNumber(bitAngleRate, 2)}` },
        { label: '建议选择弯角', value: selectBendAngle(requiredBend) }
      ];
    }
  },
  {
    id: 'build-rate',
    title: '造斜率计算',
    fields: [
      { key: 'md1', label: '起始测深', placeholder: 'm' },
      { key: 'incl1', label: '起始井斜', placeholder: '°' },
      { key: 'md2', label: '结束测深', placeholder: 'm' },
      { key: 'incl2', label: '结束井斜', placeholder: '°' }
    ],
    calculate(values) {
      const n = readCalcNumbers(values, ['md1', 'incl1', 'md2', 'incl2']);
      const mdDiff = n.md2 - n.md1;
      if (mdDiff === 0) throw new Error('两次测深不能相同');
      return [
        { label: '造斜率', value: `${formatCalcNumber(30 * (n.incl2 - n.incl1) / mdDiff, 2)} °/30m` },
        { label: '造斜率', value: `${formatCalcNumber(10 * (n.incl2 - n.incl1) / mdDiff, 2)} °/10m` }
      ];
    }
  }
];

type ZjzsCategory = {
  id: string;
  title: string;
  tools: ZjzsTool[];
};

type ZjzsTool = {
  id: string;
  title: string;
  path?: string;
  calculatorId?: string;
};

const utilityAssistantCategory: ZjzsCategory = {
  id: 'practical-utility',
  title: '实用工具',
  tools: [
    { id: 'directional-trajectory-estimate', title: '定向井轨迹概算', calculatorId: 'directional-trajectory-estimate' },
    { id: 'unit-converter', title: '单位换算', calculatorId: 'unit-converter' }
  ]
};

const excludedZjzsGalleryIds = new Set(['Gallery017', 'Gallery018', 'Gallery019', 'Gallery020', 'Gallery021']);

function AssistantPanel() {
  const [categories, setCategories] = useState<ZjzsCategory[]>([utilityAssistantCategory]);
  const [categoryId, setCategoryId] = useState(utilityAssistantCategory.id);
  const [toolId, setToolId] = useState(utilityAssistantCategory.tools[0].id);
  const [fullscreen, setFullscreen] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/zjzs/index.html')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(html => {
        if (cancelled) return;
        const parsed = parseZjzsMenu(html);
        setCategories([utilityAssistantCategory, ...parsed]);
      })
      .catch(error => {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : '助手菜单加载失败');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const category = categories.find(item => item.id === categoryId) || categories[0];
  const tool = category.tools.find(item => item.id === toolId) || category.tools[0];

  useEffect(() => {
    if (!category.tools.some(item => item.id === toolId)) {
      setToolId(category.tools[0]?.id || '');
    }
  }, [category, toolId]);

  return (
    <div className={`assistant-panel ${fullscreen ? 'assistant-fullscreen' : ''}`}>
      <div className="sheet-header">
        <strong>助手</strong>
        <span>{category.tools.length} 个工具</span>
      </div>
      <div className="assistant-toolbar">
        <select className="mobile-input" value={category.id} onChange={event => setCategoryId(event.target.value)}>
          {categories.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
        <select className="mobile-input" value={tool?.id || ''} onChange={event => setToolId(event.target.value)}>
          {category.tools.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </div>
      <div className="row-actions">
        <button onClick={() => setFullscreen(value => !value)}>{fullscreen ? '退出全屏' : '全屏显示'}</button>
        <button onClick={() => tool?.path && window.open(tool.path, '_blank')} disabled={!tool?.path}>单独打开</button>
      </div>
      {loadError && <div className="import-message">{loadError}</div>}
      {tool?.calculatorId ? (
        <SingleCoordinateCalculatorPanel calculatorId={tool.calculatorId} />
      ) : tool?.path ? (
        <iframe className="assistant-frame" title={tool.title} src={tool.path} />
      ) : (
        <div className="empty-state compact">请选择助手工具</div>
      )}
    </div>
  );
}

function parseZjzsMenu(html: string): ZjzsCategory[] {
  const document = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(document.querySelectorAll<HTMLDivElement>('.gallery-page'))
    .filter(page => !excludedZjzsGalleryIds.has(page.id))
    .map(page => {
      const heading = page.querySelector('h1')?.textContent?.trim() || page.id;
      const tools = Array.from(page.querySelectorAll<HTMLAnchorElement>('li a[href]'))
        .map((link, index) => {
          const href = link.getAttribute('href') || '';
          return {
            id: `${page.id}-${index}`,
            title: link.textContent?.trim() || `工具 ${index + 1}`,
            path: `/zjzs/${href.replace(/\\/g, '/').replace(/^\/+/, '')}`
          };
        })
        .filter(tool => tool.path?.includes('/html/'));
      return { id: page.id, title: heading, tools };
    })
    .filter(category => category.tools.length > 0);
}

function SingleCoordinateCalculatorPanel({ calculatorId }: { calculatorId: string }) {
  const calculator = coordinateCalculators.find(item => item.id === calculatorId) || coordinateCalculators[0];
  const [values, setValues] = useState<Record<string, string>>(calculator.defaultValues || {});
  const hasInput = Object.values(values).some(value => value.trim());

  useEffect(() => {
    setValues(calculator.defaultValues || {});
  }, [calculator]);

  useEffect(() => {
    if (calculator.id !== 'unit-converter') return;
    const group = unitConversionGroups[values.unitGroup] ? values.unitGroup : '长度';
    const units = unitConversionGroups[group];
    if (!units.some(unit => unit.name === values.inputUnit) || !units.some(unit => unit.name === values.outputUnit)) {
      setValues(prev => ({
        ...prev,
        unitGroup: group,
        inputUnit: units[0].name,
        outputUnit: units[Math.min(1, units.length - 1)].name
      }));
    }
  }, [calculator.id, values.inputUnit, values.outputUnit, values.unitGroup]);

  const results = useMemo(() => {
    if (!hasInput) return [];
    try {
      return calculator.calculate(values);
    } catch (error) {
      return [{ label: '提示', value: error instanceof Error ? error.message : '请输入完整有效数字' }];
    }
  }, [calculator, hasInput, values]);

  return (
    <div className="assistant-calculator">
      <div className="sheet-header compact"><strong>{calculator.title}</strong><span>实用工具</span></div>
      <div className="calc-field-grid">
        {calculator.fields.map(field => (
          <label className="calc-field" key={field.key}>
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select
                value={values[field.key] || resolveFieldOptions(field, values)[0] || ''}
                onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))}
              >
                {resolveFieldOptions(field, values).map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input
                value={values[field.key] || ''}
                onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))}
                inputMode="decimal"
                placeholder={field.placeholder || '请输入数值'}
              />
            )}
          </label>
        ))}
      </div>
      <div className="row-actions">
        <button onClick={() => setValues(calculator.defaultValues || {})} disabled={!hasInput}>恢复示例</button>
        <button onClick={() => setValues({ ...values })} disabled={!hasInput}>重新计算</button>
      </div>
      <div className="calc-results">
        {results.map((result, index) => (
          <div className="calc-result-row" key={`${result.label}-${index}`}>
            <span>{result.label}</span>
            <strong>{result.value}</strong>
          </div>
        ))}
        {!hasInput && <div className="empty-state compact">请输入参数</div>}
      </div>
    </div>
  );
}

function CoordinateCalcPanel() {
  const [calcId, setCalcId] = useState(coordinateCalculators[0].id);
  const [values, setValues] = useState<Record<string, string>>(coordinateCalculators[0].defaultValues || {});
  const calculator = coordinateCalculators.find(item => item.id === calcId) || coordinateCalculators[0];
  const hasInput = Object.values(values).some(value => value.trim());

  useEffect(() => {
    setValues(calculator.defaultValues || {});
  }, [calculator]);

  useEffect(() => {
    if (calculator.id !== 'unit-converter') return;
    const group = unitConversionGroups[values.unitGroup] ? values.unitGroup : '长度';
    const units = unitConversionGroups[group];
    if (!units.some(unit => unit.name === values.inputUnit) || !units.some(unit => unit.name === values.outputUnit)) {
      setValues(prev => ({
        ...prev,
        unitGroup: group,
        inputUnit: units[0].name,
        outputUnit: units[Math.min(1, units.length - 1)].name
      }));
    }
  }, [calculator.id, values.inputUnit, values.outputUnit, values.unitGroup]);

  const results = useMemo(() => {
    if (!hasInput) return [];
    try {
      return calculator.calculate(values);
    } catch (error) {
      return [{ label: '提示', value: error instanceof Error ? error.message : '请输入完整有效数字' }];
    }
  }, [calculator, hasInput, values]);

  return (
    <>
      <div className="sheet-header"><strong>坐标计算</strong><span>第 15 项</span></div>
      <select className="mobile-input" value={calcId} onChange={event => setCalcId(event.target.value)}>
        {coordinateCalculators.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <div className="calc-field-grid">
        {calculator.fields.map(field => (
          <label className="calc-field" key={field.key}>
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select
                value={values[field.key] || resolveFieldOptions(field, values)[0] || ''}
                onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))}
              >
                {resolveFieldOptions(field, values).map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input
                value={values[field.key] || ''}
                onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))}
                inputMode="decimal"
                placeholder={field.placeholder || '请输入数值'}
              />
            )}
          </label>
        ))}
      </div>
      <div className="row-actions">
        <button onClick={() => setValues(calculator.defaultValues || {})} disabled={!hasInput}>恢复示例</button>
        <button onClick={() => setValues({ ...values })} disabled={!hasInput}>重新计算</button>
      </div>
      <div className="calc-results">
        {results.map((result, index) => (
          <div className="calc-result-row" key={`${result.label}-${index}`}>
            <span>{result.label}</span>
            <strong>{result.value}</strong>
          </div>
        ))}
        {!hasInput && <div className="empty-state compact">请选择计算项并输入参数</div>}
      </div>
    </>
  );
}

function readCalcNumbers(values: Record<string, string>, keys: string[]): Record<string, number> {
  return keys.reduce<Record<string, number>>((result, key) => {
    const value = Number(values[key]);
    if (!Number.isFinite(value)) throw new Error('请输入完整有效数字');
    result[key] = value;
    return result;
  }, {});
}

function resolveFieldOptions(field: CoordinateCalcField, values: Record<string, string>): string[] {
  if (!field.options) return [];
  return typeof field.options === 'function' ? field.options(values) : field.options;
}

function unitOptionsForGroup(groupName: string): string[] {
  const group = unitConversionGroups[groupName] || unitConversionGroups['长度'];
  return group.map(unit => unit.name);
}

function convertUnitValue(groupName: string, value: number, inputUnitName: string, outputUnitName: string): number {
  if (groupName === '温度') {
    if (inputUnitName === outputUnitName) return value;
    return inputUnitName === '摄氏℃' ? value * 9 / 5 + 32 : (value - 32) * 5 / 9;
  }
  const units = unitConversionGroups[groupName] || unitConversionGroups['长度'];
  const inputUnit = units.find(unit => unit.name === inputUnitName) || units[0];
  const outputUnit = units.find(unit => unit.name === outputUnitName) || units[0];
  return value * inputUnit.toBase * outputUnit.fromBase;
}

function formatFlexibleNumber(value: number): string {
  if (!Number.isFinite(value)) throw new Error('计算结果无效，请检查输入');
  if (Math.abs(value) >= 100000000 || (Math.abs(value) > 0 && Math.abs(value) < 0.000001)) {
    return value.toExponential(8);
  }
  return Number(value.toFixed(8)).toString();
}

function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

function radToDeg(rad: number): number {
  return rad * 180 / Math.PI;
}

function normalizeDegrees(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function planarDistance(aN: number, aE: number, bN: number, bE: number): number {
  return Math.sqrt((bN - aN) ** 2 + (bE - aE) ** 2);
}

function coordBearing(aN: number, aE: number, bN: number, bE: number): number {
  return normalizeDegrees(radToDeg(Math.atan2(bE - aE, bN - aN)));
}

function formatCalcNumber(value: number, digits: number): string {
  if (!Number.isFinite(value)) throw new Error('计算结果无效，请检查输入');
  return value.toFixed(digits);
}

function targetRelativeText(aN: number, aE: number, bN: number, bE: number): string {
  const eastWest = aE > bE ? '右' : '左';
  const northSouth = aN > bN ? '上' : '下';
  return `${eastWest}${northSouth}`;
}

function bearingQuadrantText(bearing: number): string {
  if (bearing > 0 && bearing < 90) return 'NE 区';
  if (bearing > 90 && bearing < 180) return 'SE 区';
  if (bearing > 180 && bearing < 270) return 'SW 区';
  if (bearing > 270 && bearing < 360) return 'NW 区';
  return '坐标轴方向';
}

function selectBendAngle(value: number): string {
  if (value <= 0.75) return '0.75°';
  if (value <= 1) return '1°';
  if (value <= 1.5) return '1.5°';
  if (value <= 1.75) return '1.75°';
  if (value <= 2) return '2°';
  if (value <= 2.25) return '2.25°';
  if (value <= 2.5) return '2.5°';
  if (value <= 2.75) return '2.75°';
  if (value <= 3) return '3°';
  return '无解';
}

function DocumentsPanel({
  point,
  onUpdate
}: {
  point: SurveyPoint | null;
  onUpdate: (pointId: string, documents: PointDocument[]) => void;
}) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const documents = point?.documents || [];

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !point) return;
    const text = await readTextFile(file);
    const doc: PointDocument = {
      id: String(Date.now()),
      name: file.name,
      content: text,
      note: '',
      fileType: file.type || file.name.split('.').pop() || '',
      createdAt: new Date().toISOString()
    };
    onUpdate(point.id, [...documents, doc]);
  }

  function addManualDocument() {
    if (!point || (!name.trim() && !content.trim())) return;
    const doc: PointDocument = {
      id: String(Date.now()),
      name: name.trim() || `文档_${new Date().toLocaleString()}`,
      content,
      note: content.slice(0, 100),
      createdAt: new Date().toISOString()
    };
    onUpdate(point.id, [...documents, doc]);
    setName('');
    setContent('');
  }

  function deleteDocument(docId: string) {
    if (!point) return;
    onUpdate(point.id, documents.filter(doc => doc.id !== docId));
  }

  if (!point) {
    return <div className="empty-state compact">请先在地图或点位列表选择一个坐标点</div>;
  }

  return (
    <>
      <div className="sheet-header"><strong>关联文档</strong><span>{point.name} / {documents.length} 个</span></div>
      <input ref={fileInputRef} type="file" className="hidden-file-input" accept=".txt,.md,.json,.csv,text/*" onChange={handleFile} />
      <button className="primary-button file-button" onClick={() => fileInputRef.current?.click()}>选择文本文件</button>
      <input className="mobile-input" value={name} onChange={event => setName(event.target.value)} placeholder="文档名称" />
      <textarea className="mobile-textarea tall" value={content} onChange={event => setContent(event.target.value)} placeholder="粘贴或输入文档内容" />
      <button className="primary-button" onClick={addManualDocument}>添加到当前点</button>
      <div className="doc-list">
        {documents.map(doc => (
          <div className="doc-card" key={doc.id}>
            <div>
              <strong>{doc.name}</strong>
              <small>{formatDocumentSummary(doc)}</small>
            </div>
            <button onClick={() => deleteDocument(doc.id)}>删除</button>
          </div>
        ))}
        {documents.length === 0 && <div className="empty-state compact">暂无关联文档</div>}
      </div>
    </>
  );
}

function AiPanel({
  data,
  points,
  selectedPoint,
  onSelectPoint,
  onSaveConfig
}: {
  data: AppData;
  points: SurveyPoint[];
  selectedPoint: SurveyPoint | null;
  onSelectPoint: (point: SurveyPoint, zoom?: number) => void;
  onSaveConfig: (config: AiConfig) => void;
}) {
  const [centerId, setCenterId] = useState(selectedPoint?.id || points[0]?.id || '');
  const [radiusMeters, setRadiusMeters] = useState('500');
  const [prompt, setPrompt] = useState('请综合当前点和所选邻近点的信息（包括关联文档内容），分析地质情况、邻井影响、密度建议和调研建议：');
  const [apiKey, setApiKey] = useState(data.aiConfig?.apiKey || '');
  const [endpoint, setEndpoint] = useState(data.aiConfig?.endpoint || 'https://api.deepseek.com/v1/chat/completions');
  const [model, setModel] = useState(data.aiConfig?.model || 'deepseek-chat');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPoint) setCenterId(selectedPoint.id);
  }, [selectedPoint]);

  useEffect(() => {
    setApiKey(data.aiConfig?.apiKey || '');
    setEndpoint(data.aiConfig?.endpoint || 'https://api.deepseek.com/v1/chat/completions');
    setModel(data.aiConfig?.model || 'deepseek-chat');
  }, [data.aiConfig]);

  const center = points.find(point => point.id === centerId) || null;
  const radiusKm = Math.max(0, Number(radiusMeters) / 1000);
  const nearby = useMemo(() => {
    if (!center || !Number.isFinite(radiusKm)) return [];
    return points
      .filter(point => point.id !== center.id)
      .map(point => ({ point, distance: distanceKm(center, point), bearing: bearingDeg(center, point) }))
      .filter(item => item.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }, [center, points, radiusKm]);

  async function runAnalysis() {
    if (!center) {
      setResult('请先选择当前点');
      return;
    }
    if (!apiKey.trim()) {
      setResult('请先填写 API Key');
      return;
    }
    const config = { apiKey: apiKey.trim(), endpoint: endpoint.trim(), model: model.trim() };
    onSaveConfig(config);
    setLoading(true);
    setResult('');
    try {
      const analysisInput = buildAiContext(center, nearby.map(item => item.point), prompt);
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: '你是地质邻井调研助手，请基于坐标点、邻近点和关联文档内容给出专业、结构化建议。' },
            { role: 'user', content: analysisInput }
          ],
          temperature: 0.3
        })
      });
      const text = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${text}`);
      const json = JSON.parse(text);
      setResult(json.choices?.[0]?.message?.content || text);
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'AI 分析失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="sheet-header"><strong>AI 智能分析</strong><span>{nearby.length} 个邻近点</span></div>
      <select className="mobile-input" value={centerId} onChange={event => setCenterId(event.target.value)}>
        <option value="">选择当前点</option>
        {points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}
      </select>
      <input className="mobile-input" value={radiusMeters} onChange={event => setRadiusMeters(event.target.value)} inputMode="numeric" placeholder="分析半径，单位米" />
      {center && <button className="secondary-button" onClick={() => onSelectPoint(center, 15)}>定位到当前点</button>}
      <textarea className="mobile-textarea tall" value={prompt} onChange={event => setPrompt(event.target.value)} />
      <input className="mobile-input" value={apiKey} onChange={event => setApiKey(event.target.value)} type="password" placeholder="API Key" />
      <input className="mobile-input" value={endpoint} onChange={event => setEndpoint(event.target.value)} placeholder="API Base URL / chat completions" />
      <input className="mobile-input" value={model} onChange={event => setModel(event.target.value)} placeholder="模型 ID，例如 deepseek-chat" />
      <button className="primary-button" disabled={loading} onClick={runAnalysis}>{loading ? '分析中...' : '开始 AI 分析'}</button>
      <div className="nearby-list">
        {nearby.map(({ point, distance, bearing }) => (
          <button className="nearby-row" key={point.id} onClick={() => onSelectPoint(point, 15)}>
            <span>{point.name}</span>
            <small>{(distance * 1000).toFixed(0)} m · {bearing.toFixed(1)}° {directionName(bearing)} · 文档 {(point.documents || []).length} 个</small>
          </button>
        ))}
      </div>
      {result && <pre className="ai-result">{result}</pre>}
    </>
  );
}

async function readTextFile(file: File): Promise<string> {
  if (file.type.startsWith('text/') || /\.(txt|md|json|csv)$/i.test(file.name)) {
    return file.text();
  }
  return `文件名：${file.name}\n类型：${file.type || '未知'}\n移动端暂不解析此文件正文，请手动粘贴关键内容。`;
}

function buildAiContext(center: SurveyPoint, nearbyPoints: SurveyPoint[], prompt: string): string {
  const describePoint = (point: SurveyPoint, index: number) => {
    const docs = (point.documents || []).map(formatDocumentForAi).join('\n\n') || '无关联文档';
    return [
      `${index}. ${point.name}`,
      `经纬度：${point.lng.toFixed(6)}, ${point.lat.toFixed(6)}`,
      point.originalX !== undefined && point.originalY !== undefined ? `原始坐标：X=${point.originalX}, Y=${point.originalY}` : '',
      point.attachedText ? `备注：${point.attachedText}` : '',
      docs
    ].filter(Boolean).join('\n');
  };
  return [
    prompt,
    '',
    '当前点：',
    describePoint(center, 1),
    '',
    '邻近点：',
    nearbyPoints.length ? nearbyPoints.map((point, index) => describePoint(point, index + 1)).join('\n\n') : '半径内无邻近点'
  ].join('\n');
}

function formatDocumentSummary(doc: PointDocument): string {
  const text = doc.content || doc.note || '';
  if (text.trim()) return text.slice(0, 80);
  return [
    doc.fileType ? `类型：${doc.fileType}` : '',
    doc.size ? `大小：${formatFileSize(doc.size)}` : '',
    doc.path ? '已导入电脑端文档记录' : '无正文内容'
  ].filter(Boolean).join(' / ');
}

function formatDocumentForAi(doc: PointDocument): string {
  const lines = [
    `文档：${doc.name}`,
    doc.originalName && doc.originalName !== doc.name ? `原文件名：${doc.originalName}` : '',
    doc.fileType ? `类型：${doc.fileType}` : '',
    doc.size ? `大小：${formatFileSize(doc.size)}` : '',
    doc.path ? `电脑端路径：${doc.path}` : '',
    doc.content || doc.note ? `内容：${(doc.content || doc.note || '').slice(0, 3000)}` : '内容：备份中只有文档元数据，没有内嵌正文；请结合文档名称和点位信息分析，必要时提示用户补充正文。'
  ];
  return lines.filter(Boolean).join('\n');
}

function formatFileSize(size: number): string {
  if (!Number.isFinite(size) || size <= 0) return '0 B';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function SettingsPanel({ data, onImport }: { data: AppData; onImport: (data: AppData) => void }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function importBackupContent(content: string) {
    try {
      const imported = importJson(content);
      onImport(imported);
      setText(content);
      setMessage(`已导入 ${imported.groups.length} 个分组、${imported.points.length} 个点`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '导入失败');
    }
  }

  async function handleBackupFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const content = await file.text();
      importBackupContent(content);
    } catch {
      setMessage('读取备份文件失败');
    }
  }

  return (
    <>
      <div className="sheet-header"><strong>数据导入导出</strong><span>兼容电脑端 backup.json</span></div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden-file-input"
        onChange={handleBackupFile}
      />
      <button className="primary-button file-button" onClick={() => fileInputRef.current?.click()}>选择备份文件</button>
      <textarea className="mobile-textarea tall" value={text} onChange={event => setText(event.target.value)} placeholder="粘贴电脑端导出的 backup.json 内容" />
      <div className="row-actions">
        <button onClick={() => setText(exportJson(data))}>导出到文本框</button>
        <button onClick={() => importBackupContent(text)}>导入文本框</button>
      </div>
      {message && <div className="import-message">{message}</div>}
    </>
  );
}
