import * as vscode from 'vscode';
import moment from 'moment';
import { showQuickPick } from './basicInput';
import { getLocale,getTimeStamp } from './utils';

const commandID = 'showtime.setting';

export function activate(context: vscode.ExtensionContext) {
	context.globalState.update('st_list', JSON.stringify([
		{label:'小工具箱',iconPath:'inbox'},
		{label:'计算器',iconPath:'symbol-operator'}
	]));

	const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,99999);
	context.subscriptions.push(status);
	context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => updateStatus(status)));
	context.subscriptions.push(vscode.commands.registerCommand(commandID, () => {
		// multiStepInput(context);
		showQuickPick(context);
	}));
	// 监听主题切换
	const themeChangeListener = vscode.window.onDidChangeActiveColorTheme(() => {
		updateStatus(status);
	});
	context.subscriptions.push(themeChangeListener);
	updateStatus(status);
	let times = 0;
	setInterval(() => {
		updateStatus(status);
	}, 1000);
}
function updateStatus(status:vscode.StatusBarItem){
	// const bgColor = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ? '#ffffff' : '#000000';
	status.text = moment().format("HH:mm:ss");
	status.tooltip = 'Time';
	// status.color = bgColor;
	status.command = commandID;
	status.show();
}
