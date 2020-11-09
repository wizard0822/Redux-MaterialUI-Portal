import * as Editor from "./editor/editor";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Superagent from "superagent";
import { Collector } from "./collector/collector";
import { Export, ISnapshot, Instance } from "tripetto-collector";
import { Header } from "./header/header";
import { IDefinition, IEditorChangeEvent, IEditorReadyEvent } from "tripetto";
import "typeface-roboto";

const DEFINITION = "tripetto-example-react-material-ui-definition";
const SNAPSHOT = "tripetto-example-react-material-ui-snapshot";

// For this demo we use the local store to save the definition and snapshot.
// Here we try to retrieve that saved data.
const definition: IDefinition = JSON.parse(localStorage.getItem(DEFINITION) || "null") || undefined;
const snapshot: ISnapshot = JSON.parse(localStorage.getItem(SNAPSHOT) || "null") || undefined;
let demoDefinition: IDefinition;

// Fetch our demo form
Superagent.get("demo.json").end((error: {}, response: Superagent.Response) => {
    if (response.ok) {
        demoDefinition = JSON.parse(response.text);

        // If there was no definition found in the local store, use our demo definition.
        if (!definition) {
            editor.load(demoDefinition);
        }
    }
});

// Create the editor.
const editor = Editor.create(document.getElementById("editor"), definition);

// Wait until the editor is ready!
editor.hook("OnReady", "synchronous", (editorEvent: IEditorReadyEvent) => {
    // We use refs to allow the header and collector component to talk to each other.
    // We could have implemented the header inside the collector component.
    // But this header has some specific controls for this demo you normally wouldn't have in a real world application.
    // By keeping them separated you can just copy and paste the collector component and use it in your own project.
    const header = React.createRef<Header>();
    const collector = React.createRef<Collector>();

    // Render the collector component and feed the initial definition from the editor.
    ReactDOM.render(
        <Collector
            ref={collector}
            definition={editorEvent.definition}
            mode="paginated"
            snapshot={snapshot}
            update={header}
            onFinish={(i: Instance) => {
                // Output the collected data to the console for demo purposes.
                console.dir(Export.fields(i));

                // Output can also be exported as CSV for your convenience.
                console.dir(Export.CSV(i));
            }}
            onPause={(s: ISnapshot) => {
                // Store the snapshot in the local store, so we can restore it on browser refresh.
                localStorage.setItem(SNAPSHOT, JSON.stringify(s));
            }}
        />,
        document.getElementById("collector")
    );

    // Render the header component.
    ReactDOM.render(
        <Header
            ref={header}
            editor={editor}
            collector={collector}
            reset={() => {
                localStorage.removeItem(DEFINITION);
                localStorage.removeItem(SNAPSHOT);

                editor.definition = demoDefinition;

                if (collector.current) {
                    collector.current.reset();
                }
            }}
        />,
        document.getElementById("header")
    );

    // Store the definition in the local store upon each editor change and reload the collector
    editor.hook("OnChange", "synchronous", (changeEvent: IEditorChangeEvent) => {
        // Store the definition in the persistent local store
        localStorage.setItem(DEFINITION, JSON.stringify(changeEvent.definition));

        // Reload the collector with the new definition
        if (collector.current) {
            collector.current.reload(changeEvent.definition);
        }
    });
});

// When the host window resizes, we should notify the editor component about that.
// This is only necessary when you embed the editor in a custom element.
window.addEventListener("resize", () => editor.resize());
window.addEventListener("orientationchange", () => editor.resize());
