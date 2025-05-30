declare namespace CesiumMap {
  interface ExtendWindow {
    Register(
      element: HTMLElement,
      boxId: string,
      css_urls: string[],
      events: any
    ): void;
    Remove(id: string): void;
  }
  /**
   * 报警点位（已过期）
   *
   * @interface AlarmPoint
   */
  interface AlarmPoint {
    /**
     * 添加报警点位（已过期）
     *
     * @param {CesiumDataController.Position} position 位置信息
     * @param {CesiumDataController.AlarmColor} color 报警等级
     * @param {*} callback
     * @returns {string} 报警点位Id
     * @memberof AlarmPoint
     */
    Add(
      position: CesiumDataController.Position,
      color: CesiumDataController.AlarmColor,
      callback: any
    ): string;
    /**
     * 聚焦报警点位（已过期）
     *
     * @param {*} alarmId
     * @param {boolean} [isInWindow] 是否在窗口
     * @returns {string} 报警点位Id
     * @memberof AlarmPoint
     */
    Remove(alarmId: string, isInWindow?: boolean): string;
    /**
     * 聚焦报警点位（已过期）
     *
     * @param {*} alarmId 报警点位Id
     * @memberof AlarmPoint
     */
    Focus(alarmId: string): void;
  }

  /**
   * 报警线段（已过期）
   *
   * @interface AlarmLine
   */
  interface AlarmLine {
    /**
     * 报警线段（已过期）
     *
     * @param {string} id 编号
     * @param {CesiumDataController.AlarmColor} color 报警等级
     * @returns {boolean}
     * @memberof AlarmLine
     */
    Start(id: string, color: CesiumDataController.AlarmColor): boolean;
    /**
     * 停止报警（已过期）
     *
     * @param {string} id
     * @returns {boolean}
     * @memberof AlarmLine
     */
    Stop(id: string): boolean;
  }

  /**
   * 报警
   *
   * @interface Alarm
   */
  interface Alarm {
    /**
     * 报警点位
     *
     * @type {AlarmPoint}
     * @memberof Alarm
     */
    Point: AlarmPoint;
    /**
     * 报警线段
     *
     * @type {AlarmLine}
     * @memberof Alarm
     */
    Line: AlarmLine;
  }

  interface Map {
    SetStyle(style: CesiumDataController.ModelStyle): boolean;
    SetFloorModel(floorModel: CesiumDataController.ModelType): boolean;
  }

  interface Viewer {
    /// <summary>移动视角</summary>
    /// <param name="position" type="Position">纬度</param>
    MoveTo(position: CesiumDataController.Position): void;
    Focus(villageId: string): void;
    SetViewMode(mode: CesiumDataController.ViewMode): void;
    FullScreen(): void;
    SetDateTime(datetime: Date): void;
  }

  interface Overlay {
    /// <summary>创建覆盖物</summary>
    /// <param name="html" type="string">html内容</param>
    /// <param name="position" type="Position">位置信息</param>
    /// <param name="style" type="json">样式</param>
    /// <returns type="string">覆盖物Id</returns>
    Create(
      html: string,
      position: CesiumDataController.Position,
      style: any,
      events: any
    ): string;
    /// <summary>删除气泡</summary>
    /// <param name="id" type="string">编号</param>
    Remove(id: string): string;
  }

  interface Village {
    Basic(Id: string): void;
    /// <summary>选中小区</summary>
    /// <param name="villageId" type="string">小区ID</param>
    Select(villageId: string, isBasic?: boolean): string;
    Reload(villageId: string): string;
    Mask(villageId: string): void;
  }
  interface PointNameController {
    Show(id?: string, style?: CesiumDataController.GuideboardStyle): void;
    Hide(id?: string, style?: CesiumDataController.GuideboardStyle): void;
  }
  enum PointStatus {
    normal = 0,
    alarm = 1,
  }
  interface PointStatusOptions {
    id: string;
    status: PointStatus;
  }

  interface PointVisibilityOptions {
    camera?: boolean;
    entrance?: boolean;
    annunciator?: boolean;
    sensor?: boolean;
    person?: boolean;
    vehicle?: boolean;
    missionPoint?: boolean;
    parkingLot?: boolean;
  }
  interface Point {
    Name: PointNameController;

    /// <summary>创建点位信息</summary>
    /// <param name="point" type="CesiumMapClient.Point">点位信息</param>
    Create(point: CesiumDataController.Point): CesiumDataController.Point;

    Set(opts: CesiumDataController.Point): CesiumDataController.Point;
    Select(pointId: string): CesiumDataController.Point;
    /// <summary>设置点位状态</summary>
    /// <param name="status" type="{id:string, status:number}">点位状态</param>
    Status(status: PointStatusOptions[]): void;
    Remove(pointId: string): boolean;
    Display(id: string, visibility: PointVisibilityOptions): boolean;
    /// <summary>元素点位筛选</summary>
    /// <param name="filter" type="json">筛选参数 (camera, entrance, annunciator, sensor)</param>
    Filter(filter: PointVisibilityOptions): void;

    Draggable(draggable: boolean): void;
    SetVisibility(id: string, value: boolean): void;
  }

  interface Label {
    Show(types?: CesiumDataController.ImageResource): void;
    Hide(types?: CesiumDataController.ImageResource): void;
    Set(
      opts: CesiumDataController.LabelOptions,
      type?: CesiumDataController.ImageResource
    ): void;
    Set(
      opts: CesiumDataController.LabelOptions[],
      type?: CesiumDataController.ImageResource
    ): void;
    Remove(id: string): void;
    Remove(ids: string[]): void;
  }

  interface ContextMenu {
    Enable(): void;
    Disable(): void;
    AddItem(text: string, fn: Function, num: number): void;
    RemoveItem(text: string, fn: Function): void;
  }

  interface EventTriggers {
    OnLoading(): void;
    OnLoaded(): void;
    OnBuildingClicked(building: CesiumDataController.Building): void;
    OnFloorClicked(floor: CesiumDataController.Floor): void;
    OnElementsClicked<T extends CesiumDataController.Element>(
      elements: Array<T> | null
    ): void;
    OnElementsDoubleClicked<T extends CesiumDataController.Element>(
      elements: Array<T>
    ): void;
    OnVillageClicked(village: CesiumDataController.Village): void;
    GetCoordinate(lng: number, lat: number): void;
    OnMouseMoving(lng: number, lat: number): void;
    OnError(sender: any, error: any): void;
    OnShapesDisplayed(shapes: any[]): void;
    OnCameraMoveEnd(): void;
    OnElementDragend(
      element: CesiumDataController.Element,
      position: CesiumDataController.Position
    ): void;
    OnMouseClick(position: CesiumDataController.Position): void;
    OnMouseDoubleClick(position: CesiumDataController.Position): void;
    OnPointVisibieChanged(pointId: string, value: boolean): void;
  }

  class Client {
    constructor(iframeId: string);

    ExtendWindow: ExtendWindow;
    AlarmPoint: AlarmPoint;
    Alarm: Alarm;
    Map: Map;
    Viewer: Viewer;
    Overlay: Overlay;
    Village: Village;
    Point: Point;
    DataController: CesiumDataController.Controller;

    Events: EventTriggers;
    ContextMenu: ContextMenu;
    Label: Label;
  }
}

declare class CesiumMapClient extends CesiumMap.Client {
  constructor(iframeId: string | HTMLElement);
}
