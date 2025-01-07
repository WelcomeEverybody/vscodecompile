import { ExtensionContext } from "vscode";
const obj = {
  locale: 'st_local',
  list:'st_list'
};
export function getLocale(context: ExtensionContext):string {
  const data:any = context.globalState.get(obj.locale);
  return data ? data : '';
}
export function updateLocale(context: ExtensionContext,data:string){
  context.globalState.update(obj.locale, data);
}

export function getList(context: ExtensionContext):any {
  const globalStateData:any = context.globalState.get(obj.list);
  const data = JSON.parse(globalStateData);
  return data.length > 0 ? data : ['Add'];
}
export function updateList(context: ExtensionContext,data:string){
  const list = getList(context);
  list.push(data);
  context.globalState.update(obj.list, JSON.stringify(list));
}
export function getTimeStamp(date:string) {
  if(!date){
    return 0;
  }
  // 一小时
  const hour = 3600000;
  // 一分钟
  const minute = 60000;
  const list = date.split(':');
  return parseInt(list[0]) * hour + parseInt(list[1]) * minute;
}