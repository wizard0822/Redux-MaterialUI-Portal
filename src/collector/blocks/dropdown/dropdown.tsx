import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Dropdown, IDropdownOption } from "tripetto-block-dropdown/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-dropdown"
})
export class DropdownRenderer extends Dropdown implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <TextField
                    key={this.key()}
                    select
                    margin="normal"
                    fullWidth
                    required={this.required}
                    label={h.placeholder}
                    value={this.value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        this.value = e.target.value;
                    }}
                    helperText={h.explanation}
                >
                    {this.props.options.map(
                        (option: IDropdownOption) =>
                            option.name && (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            )
                    )}
                </TextField>
            </>
        );
    }
}
