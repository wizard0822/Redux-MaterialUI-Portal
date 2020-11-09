import * as Tripetto from "tripetto-collector";

export interface ICollectorProps {
    /** Specifies the definition to run. */
    readonly definition: Tripetto.IDefinition | string;

    /** Specifies the snapshot that should be restored. */
    readonly snapshot?: Tripetto.ISnapshot;

    /** Specifies the mode of operation for the collector (default is `paginated`). */
    readonly mode?: Tripetto.TModes;

    /** Specifies if the preview mode should be enabled or not (default is `false`) */
    readonly preview?: boolean;

    /** Specifies if block enumerators (question numbers) should be displayed (default is `false`). */
    readonly enumerators?: boolean;

    /** Specifies if the page indicators should be displayed (only available in paginated mode, default is `true`). */
    readonly pages?: boolean;

    /** Specifies if the progressbar should be displayed (default is `true`). */
    readonly progressbar?: boolean;

    /** Specifies a ref to an external component that should be updated when the collector is updated. */
    readonly update?: React.RefObject<React.Component>;

    /** Specifies a function that is invoked when the collector is finished. */
    readonly onFinish?: (instance: Tripetto.Instance) => void;

    /** Specifies a function that is invoked when the collector is paused. */
    readonly onPause?: (snapshot: Tripetto.ISnapshot) => void;
}
