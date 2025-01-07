
import { window,ExtensionContext,ThemeIcon,QuickPickItem,commands } from 'vscode';
import {getList} from "./utils";
export async function showQuickPick(context: ExtensionContext) {
	const st_list:QuickPickItem[] = getList(context);
	st_list.forEach((item:any) => {
		item.iconPath = new ThemeIcon(item.iconPath);
	});
	const result:QuickPickItem | any = await window.showQuickPick(st_list, {
		placeHolder: '',
		title:'工具',
	});
	const label = result.label;
	if(!label){
		return;
	}
	switch (label) {
		case "计算器":
			calcInput();
			break;
		case "设置":
			// 打开设置页 @ext:SHOWTIME.zztool
			commands.executeCommand('workbench.action.openSettings',"@ext:SHOWTIME.zztool");
		default:
			break;
	}
}

async function calcInput() {
	const result:any = await window.showInputBox({
		value:'',
		valueSelection: [2, 4],
		placeHolder: '',
	});
	if(!result){
		return;
	}
	const value = result.match(/[*\/\-+]/);
	if(!value) {
		return;
	}
	const list = value.input.split(value[0]);
	const val = eval(list[0]+value[0]+list[1]);
	window.showInformationMessage(`calc: ${val}`);
}