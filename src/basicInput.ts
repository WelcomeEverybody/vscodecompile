
import { window,ExtensionContext,ThemeIcon,QuickPickItem } from 'vscode';
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
	switch (label) {
		case "计算器":
			showInputBox();
			break;
		default:
			break;
	}
}

export async function showInputBox() {
	const result:any = await window.showInputBox({
		value:'',
		valueSelection: [2, 4],
		placeHolder: '',
	});
	const value = result.match(/[*\/\-+]/);
	if(!value) {
		return;
	}
	const list = value.input.split(value[0]);
	const val = eval(list[0]+value[0]+list[1]);
	window.showInformationMessage(`calc: ${val}`);
}