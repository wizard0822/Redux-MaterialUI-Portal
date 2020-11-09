import { Editor, IDefinition } from "tripetto";
import "./blocks";
import "./editor.less";

export const create = (element: HTMLElement | null, definition?: IDefinition) =>
    Editor.open(definition, {
        element: element,
        fonts: "fonts/",
        disableSaveButton: true,
        disableRestoreButton: true,
        disableClearButton: false,
        disableCloseButton: true,
        supportURL: false,
        disableOpenCloseAnimation: true,
        showTutorial: true,
        zoom: "fit-horizontal"
    });
