import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Email } from "tripetto-block-email/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-email"
})
export class EmailRenderer extends Email implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    key={this.key()}
                    type="email"
                    margin="normal"
                    fullWidth
                    required={this.required}
                    defaultValue={this.emailSlot.value}
                    label={h.placeholder}
                    helperText={h.explanation}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.emailSlot.value = e.target.value;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.emailSlot.string;
                    }}
                />
            </>
        );
    }
}
