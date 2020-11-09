import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Number } from "tripetto-block-number/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-number"
})
export class NumberRenderer extends Number implements IBlockRenderer {
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
                    defaultValue={this.value}
                    label={h.placeholder}
                    helperText={h.explanation}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.value = e.target.value;
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        const el = e.target;

                        this.focus();

                        // Switch to number type when focus is gained.
                        el.value = this.value;
                        el.type = "number";
                        el.step = this.stepSize;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const el = e.target;

                        this.blur();

                        // Switch to text type to allow number prefix and suffix.
                        el.type = "text";
                        el.value = this.value;
                    }}
                />
            </>
        );
    }
}
