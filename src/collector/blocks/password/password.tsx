import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Password } from "tripetto-block-password/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-password"
})
export class PasswordRenderer extends Password implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    key={this.key()}
                    type="password"
                    margin="normal"
                    fullWidth
                    required={this.required}
                    defaultValue={this.passwordSlot.value}
                    label={h.placeholder}
                    helperText={h.explanation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.passwordSlot.value = e.target.value;
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.passwordSlot.string;
                    }}
                />
            </>
        );
    }
}
