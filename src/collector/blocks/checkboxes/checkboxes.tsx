import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Checkboxes, ICheckbox } from "tripetto-block-checkboxes/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-checkboxes"
})
export class CheckboxesRenderer extends Checkboxes implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name()}
                {h.description}
                <FormControl>
                    <FormGroup>
                        {this.props.checkboxes.map((checkbox: ICheckbox) => {
                            return (
                                checkbox.name && (
                                    <FormControlLabel
                                        key={this.key(checkbox.id)}
                                        control={
                                            <Checkbox
                                                defaultChecked={this.isChecked(checkbox)}
                                                onChange={() => {
                                                    this.toggle(checkbox);
                                                }}
                                            />
                                        }
                                        label={checkbox.name}
                                    />
                                )
                            );
                        })}
                    </FormGroup>
                    {h.explanation && <FormHelperText>{h.explanation}</FormHelperText>}
                </FormControl>
            </>
        );
    }
}
