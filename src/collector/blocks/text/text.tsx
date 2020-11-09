import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Text } from "tripetto-block-text/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-text"
})
export class TextRenderer extends Text implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    key={this.key()}
                    type="text"
                    margin="normal"
                    fullWidth
                    required={this.required}
                    defaultValue={this.textSlot.value}
                    label={h.placeholder}
                    helperText={h.explanation}
                    inputProps={{
                        maxLength: this.maxLength
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.textSlot.value = e.target.value;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.textSlot.string;
                    }}
                />
            </>
        );
    }
}
