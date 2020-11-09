import * as React from "react";
import { Context, IVariable, MarkdownTypes, castToString, markdownifyTo } from "tripetto-collector";

/** Parses markdown to JSX. */
export function markdownToJSX(md: string, context: Context, lineBreaks: boolean = true): React.ReactNode {
    return markdownifyTo(md, context, {
        lineBreaks: lineBreaks,
        reduce: (type: MarkdownTypes | undefined, content: string | React.ReactNode[], value?: IVariable | string) => {
            const children = typeof content === "string" ? [content] : content;

            switch (type) {
                case "bold":
                    return React.createElement("b", undefined, ...children);
                case "italic":
                    return React.createElement("i", undefined, ...children);
                case "bold+italic":
                    return React.createElement("b", undefined, React.createElement("i", undefined, ...children));
                case "underline":
                    return React.createElement("u", undefined, ...children);
                case "strikethrough":
                    return React.createElement("s", undefined, ...children);
                case "break":
                    return React.createElement("br");
                case "hyperlink":
                    return React.createElement(
                        "a",
                        {
                            href: castToString(value),
                            target: "_blank"
                        },
                        ...children
                    );
                case "mention":
                    return React.createElement("span", undefined, (value ? (value as IVariable).string : "") || "...");
            }

            return React.createElement("span", undefined, ...children);
        }
    });
}
