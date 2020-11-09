import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { URL } from "tripetto-block-url/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-url"
})
export class URLRenderer extends URL implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    key={this.key()}
                    type="url"
                    margin="normal"
                    fullWidth
                    required={this.required}
                    defaultValue={this.urlSlot.value}
                    label={h.placeholder || "https://"}
                    helperText={h.explanation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.urlSlot.value = e.target.value;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.urlSlot.string;
                    }}
                />
            </>
        );
    }
}
