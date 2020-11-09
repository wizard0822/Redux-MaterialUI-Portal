import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Checkbox } from "tripetto-block-checkbox/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-checkbox"
})
export class CheckboxRenderer extends Checkbox implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            key={this.key()}
                            defaultChecked={this.checkboxSlot.value}
                            onChange={(e: {}, isChecked: boolean) => {
                                this.checkboxSlot.value = isChecked;
                            }}
                        />
                    }
                    label={h.label(this.required)}
                />
                {h.explanation && <FormHelperText>{h.explanation}</FormHelperText>}
            </FormGroup>
        );
    }
}
