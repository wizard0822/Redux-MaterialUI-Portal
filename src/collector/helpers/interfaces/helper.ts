import * as React from "react";

export interface IBlockHelper {
    /** Parsed markdown name. */
    name: (required?: boolean, labelFor?: string) => React.ReactNode;

    /** Parsed markdown name as label (single line). */
    label: (required?: boolean) => React.ReactNode;

    /** Parsed markdown description. */
    description: React.ReactNode;

    /** Parsed markdown explanation. */
    explanation: React.ReactNode;

    /** Parsed markdown placeholder. */
    placeholder: string;
}
