import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Textarea } from "tripetto-block-textarea/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-textarea"
})
export class TextareaRenderer extends Textarea implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    multiline
                    key={this.key()}
                    type="text"
                    margin="normal"
                    fullWidth
                    rows="3"
                    rowsMax="8"
                    required={this.required}
                    defaultValue={this.textareaSlot.value}
                    label={h.placeholder}
                    helperText={h.explanation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.textareaSlot.value = e.target.value;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.textareaSlot.string;
                    }}
                />
            </>
        );
    }
}
